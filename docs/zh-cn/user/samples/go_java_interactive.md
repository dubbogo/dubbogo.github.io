---
title: go-java 3.0 互通示例
keywords: go-java 3.0 互通示例
description: go-java 3.0 互通示例
---

# Go-Java 互通示例

## 前提条件

### 环境

JDK 8，Golang >= 1.11，Dubbo 3.0.2，zookeeper 启动，

### Go- Java 互通前提

- Go/Java 定义的传输结构一致

  - PB 序列化

  proto for Go

  ```protobuf
  // The response message containing the greetings
  message User {
    string name = 1;
    string id = 2;
    int32 age = 3;
  }
  ```

  proto for Java

  ```protobuf
  // The response message containing the greetings
  message User {
    string name = 1;
    string id = 2;
    int32 age = 3;
  }
  ```

  - Hessian 序列化

  POJO for Go，需参考 [Dubbogo Hessian 序列化支持文档](https://www.yuque.com/docs/share/c698bd6e-e4d6-47db-bc1c-c757cc9b4f3e?)

  ```go
  type User struct {
    ID   string
    Name string
    Age  int32
  }
  
  func (u *User) JavaClassName() string {
  	return "org.apache.dubbo.User"
  }
  
  func init(){
  	hessian.RegisterPOJO(&User{})  
  }
  ```

  POJO for Java

  ```java
  package org.apache.dubbo
    
  public class User {
    private String id;
    private String name;
    private int age;
  }
  ```

- Java 需要互通的方法签名与 Go 一致

  例如：

  Java Interface

  ```java
  public interface IGreeter {
    /**
     * <pre>
     *  Sends a greeting
     * </pre>
     */
  	User sayHello(HelloRequest request);
  }
  ```

  Go client (由protoc-gen-triple 根据 proto 文件自动生成)

  ```go
  type GreeterClientImpl struct {
  	// Sends a greeting
  	SayHello func(ctx context.Context, in *HelloRequest) (*User, error)
  }
  ```

  Go server (由开发者定义)

  ```go
  type GreeterProvider struct {
  	api.GreeterProviderBase
  }
  
  func (s *GreeterProvider) SayHello(ctx context.Context, in *api.HelloRequest) (*api.User, error) {
  	logger.Infof("Dubbo3 GreeterProvider get user name = %s\n", in.Name)
  	return &api.User{Name: "Hello " + in.Name, Id: "12345", Age: 21}, nil
  }
  ```

  Go 方法需要遵守 [Dubbogo 3.0 用户服务接口定义规范](https://www.yuque.com/docs/share/eff9c51f-a7f4-47d6-87ff-11a2152bdffe?)

  

- Java 的接口全名与Go service/reference 配置的 interface 一致

  例如：

  Java 的接口全名：com.apache.dubbo.sample.basic.IGreeter

  Go-client: 

  ```yaml
  references:
    GreeterClientImpl:
    protocol: tri
    interface: com.apache.dubbo.sample.basic.IGreeter # must be compatible with grpc or dubbo-java
  ```

  Go-server:

  ```yaml
  services:
    GreeterProvider:
    protocolIDs: tripleProtocol
    interface: com.apache.dubbo.sample.basic.IGreeter # must be compatible with grpc or dubbo-java
  ```

## 1. 基于 Triple 协议互通

参考 [dubbo-go-samples/helloworld](https://github.com/apache/dubbo-go-samples/tree/master/helloworld)

### 1.1 Go-Client -> Java-Server

#### Java-Server 启动

1. 定义 Java 的 PB 文件，可参考 [Dubbo 快速开始](https://dubbo.apache.org/zh/docs/quick-start/)

```protobuf
syntax = "proto3";

option java_package = "org.apache.dubbo.sample.hello";

package helloworld;

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message User {
  string name = 1;
  string id = 2;
  int32 age = 3;
}
```

该接口描述文件定义了将会生成的 Java 类 org.apache.dubbo.sample.hello.Helloworld，以及类中包含的传输结构 HelloRequest 和 User 类。

2. 定义服务接口: 

   com.apache.dubbo.sample.basic.IGreeter

```java
package com.apache.dubbo.sample.basic;

// 引入根据 PB 生成的类
import org.apache.dubbo.sample.hello.Helloworld.User;
import org.apache.dubbo.sample.hello.Helloworld.HelloRequest;

public interface IGreeter {
    /**
     * <pre>
     *  Sends a greeting
     * </pre>
     */
  // 定义接口
	User sayHello(HelloRequest request);
}
```

3. 实现服务接口: 

   IGreeter1Impl.java

```java
package com.apache.dubbo.sample.basic;

import org.apache.dubbo.sample.hello.Helloworld.User;
import org.apache.dubbo.sample.hello.Helloworld.HelloRequest;

public class IGreeter1Impl implements IGreeter {
    @Override
    public User sayHello(HelloRequest request) {
        System.out.println("receiv: " + request);
        User usr = User.newBuilder()
                .setName("hello " + request.getName())
                .setAge(18)
                .setId("12345").build();
        return usr;
    }
}
```

4. 使用 Dubbo3 框架启动服务

   ApiProvider.java

```java
package com.apache.dubbo.sample.basic;

import org.apache.dubbo.common.constants.CommonConstants;
import org.apache.dubbo.config.ApplicationConfig;
import org.apache.dubbo.config.ProtocolConfig;
import org.apache.dubbo.config.RegistryConfig;
import org.apache.dubbo.config.ServiceConfig;
import java.util.concurrent.CountDownLatch;

public class ApiProvider {
    public static void main(String[] args) throws InterruptedException {
      ServiceConfig<IGreeter> service = new ServiceConfig<>();
      service.setInterface(IGreeter.class);
      service.setRef(new IGreeter1Impl());
      // 使用 Triple 协议
      service.setProtocol(new ProtocolConfig(CommonConstants.TRIPLE, 50051));
      service.setApplication(new ApplicationConfig("demo-provider"));
      // 使用 ZK 作为注册中心
      service.setRegistry(new RegistryConfig("zookeeper://127.0.0.1:2181"));
      service.export();
      System.out.println("dubbo service started");
      new CountDownLatch(1).await();
    }
}
```

启动服务，可看到输出如下日志，代表 Java Triple Server 启动成功

```
main  INFO bootstrap.DubboBootstrap:  [DUBBO] DubboBootstrap has started., dubbo version: 3.0.2, current host: 192.168.0.108
dubbo service started
```

### Go-Client 启动

对于已经启动的Dubbo服务，如需要开发与其对应的Go-client，需要进行如下步骤：

1. 编写与 Java 适配的 proto文件

   samples_api.proto

```protobuf

syntax = "proto3";
package api; // pacakge 名随意指定

// necessary
option go_package = "./;api";

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (User) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message User {
  string name = 1;
  string id = 2;
  int32 age = 3;
}
```

2. 使用 protoc-gen-triple 生成接口文件

```bash
protoc -I . samples_api.proto --triple_out=plugins=triple:.
```

3. 撰写配置文件: dubbogo.yml

```yaml
dubbo:
  registries:
    demoZK:
      protocol: zookeeper
      timeout: 3s
      address: 127.0.0.1:2181
  consumer:
    registryIDs:
      - demoZK
    references:
      GreeterClientImpl:
        protocol: tri
        interface: com.apache.dubbo.sample.basic.IGreeter # must be compatible with grpc or dubbo-java
```

4. 撰写 main.go 文件，发起调用

```go
// 引入生成的接口结构
var grpcGreeterImpl = new(api.GreeterClientImpl)

// export DUBBO_GO_CONFIG_PATH=dubbogo.yml
func main() {
	config.SetConsumerService(grpcGreeterImpl)
	if err := config.Load(); err != nil {
		panic(err)
	}
	time.Sleep(3 * time.Second)

	logger.Info("start to test dubbo")
	req := &api.HelloRequest{
		Name: "laurence",
	}
	reply, err := grpcGreeterImpl.SayHello(context.Background(), req)
	if err != nil {
		logger.Error(err)
	}
	logger.Infof("client response result: %v\n", reply)
}
```

5. 可查看到调用成功的日志

- go-client

```
cmd/client.go:53        client response result: name:"hello laurence" id:"12345" age:18 
```

- java-server

```
receiv: name: "laurence"
```

### 1.2 Java-Client -> Go-Server

#### Go-Server 启动

1. 定义配置文件

```yaml
dubbo:
  registries:
    demoZK:
      protocol: zookeeper
      timeout: 3s
      address: 127.0.0.1:2181
  protocols:
    triple:
      name: tri
      port: 20000
  provider:
    registryIDs:
      - demoZK
    services:
      GreeterProvider:
        protocolIDs: triple
        interface: com.apache.dubbo.sample.basic.IGreeter # must be compatible with grpc or dubbo-java
```

2. 引入传输结构，定义服务

```go
type GreeterProvider struct {
	api.GreeterProviderBase
}

func (s *GreeterProvider) SayHello(ctx context.Context, in *api.HelloRequest) (*api.User, error) {
	logger.Infof("Dubbo3 GreeterProvider get user name = %s\n", in.Name)
	return &api.User{Name: "Hello " + in.Name, Id: "12345", Age: 21}, nil
}
```

3. 启动服务

```go
// export DUBBO_GO_CONFIG_PATH=dubbogo.yml
func main() {
	config.SetProviderService(&GreeterProvider{})
	if err := config.Load(); err != nil {
		panic(err)
	}
	select {}
}
```



#### Java-Client 启动

1. proto 文件编写和接口生成参考上述 java-server 介绍

2. 启动Consumer

   ApiCnosumer.java

```java
public class ApiConsumer {
    public static void main(String[] args) throws InterruptedException, IOException {
        ReferenceConfig<IGreeter> ref = new ReferenceConfig<>();
        ref.setInterface(IGreeter.class);
        ref.setCheck(false);
        ref.setProtocol(CommonConstants.TRIPLE);
        ref.setLazy(true);
        ref.setTimeout(100000);
        ref.setApplication(new ApplicationConfig("demo-consumer"));
        ref.setRegistry(new RegistryConfig("zookeeper://127.0.0.1:2181"));
        final IGreeter iGreeter = ref.get();

        System.out.println("dubbo ref started");
        Helloworld.HelloRequest req = Helloworld.HelloRequest.newBuilder().setName("laurence").build();
        try {
            final Helloworld.User reply = iGreeter.sayHello(req);
            TimeUnit.SECONDS.sleep(1);
            System.out.println("Reply:" + reply);
        } catch (Throwable t) {
            t.printStackTrace();
        }
        System.in.read();
    }
}
```

### 1.3 Dubbogo 泛化调用 Java Server

可参考Dubbogo 3.0 [泛化调用文档](https://www.yuque.com/docs/share/f4e72670-74ab-45b9-bc0c-4b42249ed953?#)

#### Java-Server启动

1. 传输结构定义

```java
package org.apache.dubbo;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
	private String id;

  private String name;

  private int age;

  private Date time = new Date();
}
```

2. 接口定义

```java
package org.apache.dubbo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
//import org.apache.dubbo.rpc.filter.GenericFilter;

public interface UserProvider {
	User GetUser1(String userId);
}
```

### Go-Client 泛化调用

此处展示以 API 的形式构造泛化接口引用

```go
// 初始化 Reference 配置
refConf := config.NewReferenceConfigBuilder().
  SetInterface("org.apache.dubbo.UserProvider").
  SetRegistryIDs("zk").
  SetProtocol(tripleConst.TRIPLE).
  SetGeneric(true).
  SetSerialization("hessian2").
  Build()

// 构造 Root 配置，引入注册中心模块
rootConfig := config.NewRootConfigBuilder().
  AddRegistry("zk", config.NewRegistryConfigWithProtocolDefaultPort("zookeeper")).
  Build()

// Reference 配置初始化，因为需要使用注册中心进行服务发现，需要传入经过配置的 rootConfig
if err := refConf.Init(rootConfig); err != nil{
  panic(err)
}

// 泛化调用加载、服务发现
refConf.GenericLoad(appName)

time.Sleep(time.Second)

// 发起泛化调用
resp, err := refConf.GetRPCService().(*generic.GenericService).Invoke(
  context.TODO(),
  "getUser1",
  []string{"java.lang.String"},
  []hessian.Object{"A003"},
)

if err != nil {
  panic(err)
}
logger.Infof("GetUser1(userId string) res: %+v", resp)
```

GenericService 的 Invoke 方法包括三个参数：context.Context, []string, []hessian.Object, 

其中第二个参数为对应参数的 Java 类名，例如java.lang.String、org.apache.dubbo.User，第三个参数为参数列表，hessian.Object 即为 interface。第二、第三个参数应与方法签名一致，按顺序对应。

获得map结构的返回结果

```
INFO    cmd/client.go:89        GetUser1(userId string) res: map[age:48 class:org.apache.dubbo.User id:A003 name:Joe sex:MAN time:2021-10-04 14:03:03.37 +0800 CST]
```

## 2. 基于 Dubbo 协议互通

// TODO
