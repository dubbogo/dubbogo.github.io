---
title: 使用 dubbo-go 搭建 dubbo 接口测试平台
keywords: "dubbo-go", "dubbo 接口测试"
description: 本文介绍了滴滴出行使用 dubbo-go 搭建 dubbo 接口测试平台的实践
---
# 背景
http 接口测试只需要一个 `curl` 命令，但 dubbo 协议没有这样的现成接口测试工具。通常公司内的 dubbo 控制台或其他平台会集成一个 dubbo 接口测试工具。

调用一个 dubbo 接口，需要知道服务名 `service`、方法名 `method` 和参数 `args`。

正常的调用，调用方需引入服务提供方定义的接口 jar 包。

作为接口测试平台，没办法引入所有提供方定义的接口 jar 包，可以有以下方案来解决：
1. dubbo 支持 telnet 协议调用 dubbo 接口
2. dubbo 的泛化调用可以在不引入提供方接口定义 jar 包的情况下对接口进行调用

对于方案1，实现成本很低，甚至可以在服务器上直接用 telnet 测试

![](../../img/blog/dubbo-go-test-platform.resources/p1.png)

它也有缺点
- 调用无法经过 filter
- 无法携带隐式参数 attachment

刚好我们把方案1的优缺点都踩了，我们的 dubbo 控制台是go语言编写，短时间快速实现，就采用了 telnet 的方式。

随着业务的发展，流量染色，或标签路由等需要携带隐式参数。

没有走自定义 filter，导致业务接口执行不符合预期等都迫使我们升级为泛化调用。

dubbo 接口泛化调用在控制台是go编写的情况下也有两个方案可选：
1. 单独起一个 java 进程，暴露 http 端口，与go进程进行交互，泛化调用使用 dubbo 的 java sdk 进行编写
2. 控制台引入 dubbo-go，使用 dubbo-go 进行泛化调用

出于对 dubbo java 版本的了解，方案1肯定可行，只是架构变得复杂。

而方案2由于 dubbo-go 还是比较新的项目，并不是很了解，所以不确定其可行性和兼容性，但如果能实现，会大大降低架构的复杂度。

# dubbo-go介绍
dubbo-go 是 dubbo 的 golang 实现版本，它出现的初衷是为了让 golang 和 java 的 dubbo 生态互通。

如今 dubbo-go 支持 provider 和 consumer 端，可以作为一个独立的 rpc 框架使用，同时社区也是 dubbo 生态中最火的一个。

如果要说它的意义，我觉得除了和java互通外还有一点非常重要，那就是它能发挥 golang `协程`的巨大作用，这一点可以用在 dubbo 网关上，如果用 dubbo-go 实现 dubbo 网关，就无需纠结线程池、异步等问题。

# 泛化调用的使用
首先 provider 端提供一个接口，这个不再赘述，非常简单，接口定义如下

```java
package org.newboo.basic.api;

import org.newboo.basic.model.RpcResult;
import org.newboo.basic.model.User;

public interface MyDemoService {
    RpcResult<String> call(User user);
}
```

```java
package org.newboo.basic.model;

import java.io.Serializable;

public class User implements Serializable {
    private String uid;
    private String name;
    private String remoteServiceTag;
    ...
}
```

再来编写 java 版的泛化调用代码，不引入 provider 方的 jar 包：
```java
ReferenceConfig<GenericService> reference = new ReferenceConfig<>();
// ①引用服务名
reference.setInterface("org.newboo.basic.api.MyDemoService");
// ②设置泛化调用标志
reference.setGeneric("true");

DubboBootstrap bootstrap = DubboBootstrap.getInstance();
bootstrap.application(new ApplicationConfig("dubbo-demo-api-consumer"))
        .registry(new RegistryConfig("zookeeper://127.0.0.1:2181"))
        .reference(reference)
        .start();

GenericService genericService = ReferenceConfigCache.getCache().get(reference);
String[] ps = new String[1];
// ③参数类型
ps[0] = "org.newboo.basic.model.User";
Object[] ags = new Object[1];
// ④pojo参数使用map构造
Map<String, String> user = new HashMap<>();
user.put("uid", "1");
user.put("name", "roshi");
user.put("remoteServiceTag", "tag");
ags[0] = user;
// ⑤发起调用
Object res = genericService.$invoke("call", ps, ags);
System.out.println(res);
```
> 关键的步骤已在代码注释中标明

golang 版本
> 直接修改的 dubbo-go-samples 代码，参考 https://github.com/apache/dubbo-go-samples
> 启动时需要设置配置文件路径 ENV
```go
var (
	appName         = "UserConsumer"
	referenceConfig = config.ReferenceConfig{
		InterfaceName: "org.newboo.basic.api.MyDemoService",
		Cluster:       "failover",
    // registry需要配置文件
		Registry:      "demoZk",
		Protocol:      dubbo.DUBBO,
		Generic:       true,
	}
)

func init() {
	referenceConfig.GenericLoad(appName) //appName is the unique identification of RPCService
	time.Sleep(1 * time.Second)
}

// need to setup environment variable "CONF_CONSUMER_FILE_PATH" to "conf/client.yml" before run
func main() {
	call()
}

func call() {
  // 设置attachment
	ctx := context.WithValue(context.TODO(), constant.AttachmentKey, map[string]string{"tag":"test"})

	resp, err := referenceConfig.GetRPCService().(*config.GenericService).Invoke(
		ctx,
		[]interface{}{
			"call",
			[]string{"org.newboo.basic.model.User"},
			[]interface{}{map[string]string{"uid":"111","name":"roshi","remoteServiceTag":"hello"}},
		},
	)
	if err != nil {
		panic(err)
	}
	gxlog.CInfo("success called res: %+v\n", resp)
}
```
这里我设置了一个 attachment，也能正常被 provider 识别

![](../../img/blog/dubbo-go-test-platform.resources/p2.png)

# 泛化调用原理

泛化调用 `GenericService` 是 dubbo 默认提供的一个服务。

其提供了一个名为 `$invoke` 的方法，该方法参数有三个，第一个参数是真实要调用的方法名，第二个是参数类型数组，第三个是真实的参数数组，其定义为
```java
public interface GenericService {
    Object $invoke(String method, String[] parameterTypes, Object[] args) throws GenericException;
    ...
}
```
有了这三个参数，利用反射就能调用到真实的接口了。

### java版实现细节
实现这种泛化调用主要涉及到两个 filter：
- consumer 端的 GenericImplFilter
- provider 端的 GenericFilter

consumer 端的 filter 将 generic 标志设置到 attachment 中，并封装调用为 `GenericService.$invoke`

provider 端 filter 判断请求是 generic 时进行拦截，获取调用方法名、参数、参数值，先序列化为 pojo 对象，再进行反射调用真实接口。

### dubbo-go版细节

与 java 实现基本一致，其中 generic_filter 充当 consumer 端的 filter，也是将调用封装为 GenericService.$invoke，其中还涉及到一个参数类型的转换，将 map 转换为 `dubbo-go-hessian2.Object`，这样 provider 端就可以将其反序列化为 Object 对象。

与其相关的版本变更如下

- v1.3.0 开始支持泛化调用
- v1.4.0 开始支持用户设置 attachement
- v1.5.1 开始支持动态 tag 路由
- v1.5.7-rc1 修复了直连 provider 时无法走 filter 的 bug

> 踩坑：v1.5.7-rc1 之前如果使用直连 provider 的方式，不会走 filter，导致参数序列化出错，provider 端会报类型转换异常

# 结论
dubbo-go 的泛化调用推荐使用 >=v1.5.7-rc1 版本，其功能几乎已和 java 版打平，甚至其实现都与 java 类似。

使用 dubbo-go 构建网关、接口测试平台、或者打通 golang 与 java 技术生态，不失为一个好的选择。

---
> 作者简介
>
> **李康** (GitHubID lkxiaolou)，目前就职于滴滴出行基础架构部，公众号 **捉虫大师** 作者