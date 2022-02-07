---
title: 小米电商 Apache Dubbo-go 微服务实践
keywords: "Dubbo-go", "protocol"
description: 小米电商 Apache Dubbo-go 微服务实践
---

以下文章来源于阿里巴巴中间件 ，作者董振兴

[![img](http://wx.qlogo.cn/mmhead/Q3auHgzwzM591PV3q88Jtdkr3PYJv5rJDwoNWar9N0xuiaKlTe2xYLg/0)**阿里巴巴中间件**.Aliware阿里巴巴中间件官方账号](https://mp.weixin.qq.com/s/p_DZzCYkcE-PCZZkTZnOow#)

### xiao'mi![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/qdzZBE73hWtObtu43aftW8t1XhQRHbvibHWNuYah3xo5Ymgh501WEo6xrricTstkOyK6iaYamOBKPia2cRFhkCrvdA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



###  

**01**

**背景**

*Aliware*

### 

2021 年是小米中国区电商部门变动调整较大的一年，小米中国区早期电商、服务体系建立在 Go 语言构建的微服务体系之上，由内部自研的 Go 语言微服务框架 koala 支撑起数以千计的微服务应用。随着业务的发展，新零售体系的成立以及业务中台普及与推广，我们更倾向于拥有丰富生态的 Java 为主的微服务体系技术选型，新项目及服务大多基于 Apache Dubbo、Spring Cloud 的微服务生态。



考虑到服务迁移的巨大成本以及服务稳定性的保障，我们最终决定在大范围投入与使用以 Apache Dubbo 为主的服务体系的同时，保留原有 Go 微服务项目。由于原有跨部门的技术选型差异，留存的服务包含基于 Thrift、gRPC 等不同协议服务，我们希望多套微服务体系能够无缝稳定地融合。在经过大量调研之后，确定了以 Dubbo+Nacos+etcd+sidecar+mirpc+Dubbo-go 的为核心的一套互通的微服务体系。



**02**

**微服务治理**

*Aliware*

### 

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtuCp35bAibL2UM4B22ibR21n99FSDoBib8F0MQ8cCBtwzcMRepicEOYs16vqLjicKiaXAwgFJoVhRh5gEA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

####  

**01**





**相关组件**



#### 

- #### **mione**

mione 是一套由小米公司新零售效能团队开源的“项目创建->开发->测试->发布->运维” 端到端的系统服务和研发工具，支持物理机部署、docker 部署、K8s、dockerFile 部署等多种部署形态，通过人工智能、自动化技术的应用助力开发者提升研发效能，持续快速交付有效价值。详细了解可以通过官网：

http://mone.xiaomiyoupin.com/index#/index





目前内部基于 Java Dubbo 生态的微服务基本上都托管于 mione，并以 Nacos 为注册中心，这些服务作为 consumer 基本上通过 Apache Dubbo、side-car 两种方式实现调用。

####  

- #### **koala**

koala 是小米内部自研的 Go 语言的微服务框架，基于 etcd 的注册中心以及 Thrift 协议。作为服务的提供方，服务注册将自身元数据等信息注册到 etcd 中，并对外提供 Thrift 的服务。



Java Dubbo 的 consumer 服务则通过 side-car 兼容 Thrift/gRPC 协议，基于 etcd 进行服务发现调用。



- #### **sidecar**

sidecar 同样是小米内部自研的用于服务注册及发现，支持跨服务调用的组件，名为 soa-agent ，以 side-car 的方式同服务部署于 mione 容器中，服务借助该组件实现兼容协议的 RPC 调用，具体技术细节这里不做详细介绍。

####  

- #### **Apache Dubbo-go**

我们以 side-car 的方式解决了 Java 服务的 consumer 到 Go 服务基于 Thrift/gRPC 的调用，而 Go 服务到新项目，即基于Apache Dubbo 生态的 Java 服务的调用，在经过大量调研与参考后，决定使用还在不断进行迭代的 Apache Dubbo-go。



Apache Dubbo-go 是当前 Apache Dubbo 多语言支持中较为热门的项目，社区也较为活跃。Apache Dubbo-go 由 Go 语言实现，继承了 Apache Dubbo 的设计理念与架构，拥有较好的可扩展性。它能够架起 Java 和 Go 之间的桥梁，与 gRPC/Apache Dubbo 生态互联互通，这正式对于是我们当前痛点较好的解决方案，所支持的 Nacos 注册中心也与我们当前中间件的技术选型契合。



**03**

**Apache Dubbo-go的应用**

*Aliware*

### 

经过调研后，我们选用了当时较为稳定的 v1.5.7 版本进行接入。



Apache Dubbo 官方文档中提供了使用 Apache Dubbo-go 的一般调用方式，如下：

https://dubbo.apache.org/zh/docs/languages/golang/dubbo-go-1.5/quick-start/

但该方式需要业务方调用方严格遵守切合服务方提供的接口格式、数据格式，因此我们选择使用泛化的方式进行调用。



对于一个 Java 的 Apache Dubbo 服务提供的接口如下：



``````golang

public interface DubboHealthService {
    List<Health> health();    String ping(String param,int param2);   
    AaRes health1(List<AaReq> list);    Health health2(AaReq aaReq);
}
//impl@Service(timeout = 1000, group = "dev", version = "4.0")
//public class DubboHealthServiceImpl implements DubboHealthService {     ......}


``````



在 Apache Dubbo-go 的 client 配置文件中，需要的核心配置如下：


 

```golang
   #registry config
registries:  
	"demoNacos": 
	  protocol: "nacos"   
      timeout: "3s"   
      address: "xxx.xxx.xxx"    
      username: "****"  
      password: "****"    
references:  
	"UserProvider":  
	registry: "demoNacos"   
    protocol: "dubbo"    
    interface: "com.xiaomi.youpin.test0930.api.service.DubboHealthService" 
    cluster: "failover"   
    version: "4.0"   
    group: "dev"  
    generic: true   
    methods:    
	 - name: "health"  
       retries: 0    
       timeout: "0.5s"  
    ......
```



首先配置对应注册中心，包括选型及地址，Nacos/zookeeper 等，其次配置需要调用的具体接口，方法、超时时间等信息。由于我们使用泛化调用，需要进行配置 generic: true。这里我们在使用 v1.5.7 版本时发现了关于泛化调用下方法级别超时时间并不生效的情况，进行了修复，详细可以参考该 pr：

https://github.com/apache/dubbo-go/pull/1336



配置完成后，泛化调用的方式我们进行了一定的封装：




```go

     var paramTypes []stringvar paramVals []interface{}for _, 

     param := range req.Params {   paramTypes = append(paramTypes, param.GetKey()) 

     paramVals = append(paramVals, param.GetVal())}
     //添加context信息m := make(map[string]string)m["xxx(generic_flag)"] = "xxx(flag)"

     //服务端返回json字符串m["xxx(return_flag)"] = "true" ctx = context.WithValue(context.Background(), constant.DubboCtxKey("attachment"), m)

     //invoke调用response, err = config.GetRPCService(req.AppName).(*config.GenericService).Invoke(ctx, []interface{}{req.MethodName, paramTypes, paramVals})if err != nil {   err = fmt.Errorf("dubbo call request appName: %s methodName: %s rpc invoke failed,err:%+v", req.AppName, req.MethodName, err)   return}
```



这里实际上业务只需要传入需要调用的 **Apache Dubbo 方法**，**参数列表**例如  ["java.lang.String"] 以及**参数值**即可。



为了切合业务需要，我们在内部维护的 Java Dubbo 版本中也做了一定程度的兼容与改造，Apache Dubbo-go 中通过 context，即 attachment 可以带上两个特殊标识，服务端的 Java Dubbo 版本中将根据该特殊标识接收处理与返回以 json 格式的数据。



这样一来，留存的 Go 服务就能够使用 Apache Dubbo 协议与 Java Dubbo 生态的服务达到互联互通，同时也由于 Apache Dubbo 的优势，也具备了一定程度的服务治理能力。



在线上运行该版本 Apache Dubbo-go 时，也发现了 Apache Dubbo-go 提供的像黑名单机制等的一些不太合理之处，例如该机制下，当服务端出现报错后，调用方会将该服务端的 ip 记录黑名单，再进行调用时可能出现 no provider 的情况，而实际上服务端可能仅是针对某个请求的处理报错，服务实际上能够正常运行，那么这时候该机制便有待商榷，我们实际使用时也是进行了摘除。详细细节可见该 pr：

https://github.com/apache/dubbo-go/pull/1605



**04**

**现状与未来发展**

*Aliware*

**01**





**当前架构**



#### 

目前小米新零售已经基于上述 mione 的体系以及上述介绍的这一部分组件，建立了一套较为完善的，包括微服务标准化、可持续集成部署、以及可见可控的观测性平台的服务治理体系。



在传统的微服务体系下，我们通常需要满足两个服务治理的基本的需求：**一站式的服务治理平台、普适性的服务开发框架。**



前者我们通过 mione 实现了包括但不限于**基于容器化的 CICD****、服务的标准化定义、服务的生命周期管理**（服务上下线、扩缩容等）、**服务的基本通信和链路治理**（如重试、限流降级熔断等）；而后者我们借助了 **Apache Dubbo 、Apache Dubbo-go** 等开源 RPC 框架，结合像 Springboot 这样的传统开发框架提供了较为标准化的服务搭建开发流程。



同时，我们内部自研了一套可见可观测性体系，帮助我们获取更多有价值的数据来反馈于服务治理，对服务做到更全面准确的把控。这实际上包括了 3 个层次的工具集合：**Logging（日志系统）、Metric（度量系统） 以及 Tracing（分布式链路追踪系统）**

**
**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtuCp35bAibL2UM4B22ibR21nicC3kFiaMSMMicC2L4ibmJ1W17VO2heclt0TSQytDPibej5k6RoYnYkJ5hg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



我们通过上述的架构与设计实际上已经基本上满足了传统方式下对微服务治理需求，然而，这还不够。



**05**

**未来方向**

*Aliware*

**01**





**Service Mesh 与 Serverless**





- Service Mesh



首先什么是 Service Mesh？Service Mesh 是一个致力于解决服务间通信的基础设施层，它负责在现代云原生应用的复杂服务拓扑下实现请求的可靠传递，它通常实现为一组轻量级的网络代理，与应用服务部署在一起，对应用服务透明。



我们上面架构组件中的 sidecar soa-agent 实际上就是一个 service mesh 的雏形，这个组件目前承担了包括服务发现、配置托管等一些能力，当然，他能够做到的应当更多。对于业务应用服务的透明以及零侵入是 service mesh 的一大优势，也是当前它正备受推崇的主要原因。



综合来看，Service Mesh 主要能够解决当下传统微服务体系的几大痛点：



**1、完善的微服务基础设施**

**
**

service mesh 能够将微服务的通信下沉到基础设施层，它屏蔽了微服务处理各种通信问题的复杂度。对于业务开发者来说，实际上他并不关心像 Rpc 通信、服务注册与发现这样的非功能性细节。但传统微服务下，拿 Thrift 举例，作为开源的一套性能较高的 Rpc 框架，由于它缺乏一些基本的服务治理能力，Thrift 很多时候并无法做到开箱即用，在早期小米电商的基础架构团队就对 Thrift 做了定制化的二次开发，在生成的桩代码中加入了服务发现、打点等功能，这些代码再与自研的开发框架 koala 耦合来实现服务的闭环调用。而这些框架代码以及生成的桩代码，与业务代码也并没有明显的隔离与区分，甚至业务能够直接修改框架代码以及桩代码，实际上埋下了较大的隐患，也造成后续升级困难、严重阻塞等问题。



而 service mesh 则可以完美的解决像这样的痛点，通过对这些能力的下沉，他们将对业务服务屏蔽实现细节，业务服务也就不再需要关心包括**服务发现、负载均衡、流量调度、限流降级熔断、监控统计**等一切细节。



**2、语言无关的通信和链路治理**



实际上 service mesh 在功能上并没有提供对于服务治理的任何新的特性和能力，它所能够提供的能力在 service mesh 之前其实都能够找到。service mesh 改变的是通信和服务治理能力的提供方式，它将这些能力从业务层面解耦，下沉到基础设施中，以更加标准化和通用的方式来提供，这样一来它便能屏蔽不同语言、不同平台的差异性，在多语言、多技术栈的团队环境中，它能够提供胶水般的融合与协同能力。这也是我们上面小米电商微服务调用架构图中 sidecar 所做到的，为跨语言的调用提供了解决方案。



**3、通信和服务治理的标准化**

**
**

通过标准化，带来一致的服务治理体验，减少多业务之间由于服务治理标准不一致带来的沟通和转换成本，提高全局服务治理的效率。



![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtuCp35bAibL2UM4B22ibR21neRITXAZdwqVAVFdjfJ5p8YQkNmDSL3rv2UVBm6V1x4ic3hDfqaOrGicw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



鉴于以上 service mesh 带来的好处，小米电商微服务的架构在未来会进一步在已有基础上更多的调研、参考以及参与该技术落地。



但是，硬币总有正反面，service mesh 也绝不是仅有优点的万能膏药。实际上，引入多一层的组件代理转发请求，本身就不可避免地带来更多的资源消耗，在一定程度上会降低系统的通信性能。其次，基础功能与服务解耦有解耦的绝对优势，但侵入式框架反而在支持业务的定制与扩展能力上反而有先天优势，这点在系统的设计中也应当考虑。第三，系统中对于组件的引入本身也带来一定的风险，业务将及其依赖 service mesh 的稳定性，在保障 service mesh 的稳定性上将带来更多的技术考验。



目前我们对于 service mesh 的用法实现设计如下图所示，我们通过 Sidecar 的方式，将服务发现、负载均衡、集群策略、健康检查以及部分的监控打点等下沉到该组件中，该组件对于不同的服务部署方式部署方式稍有不同。例如对于早期的裸物理机部署的老服务来说，该组件与服务部署在同一台物理机，而对于例如 K8s 这样的容器部署方式，只需要部署在同一个 Pod ，即共享同一个 ip 即可。



Sidecar 中开放了一些 OpenAPI，部署在一起的服务只需要访问 localhost 对应端口的 OpenAPI 即可达到相应的服务治理能力。



![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtuCp35bAibL2UM4B22ibR21n8uxANQTSxBLsibN6nhSuxCaDyszKH4zxwASpjUcqODK0k6ct2XMdTPA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



未来小米新零售效能团队也将在大量的考量与取舍中，更进一步地参与与适配该技术的落地，其中关键的一步也将会有对于 Apache Dubbo、Apache Dubbo-go 等底层框架的适配与融合，必要地情况下将进行一些定制化的改造。



**02**





**Serverless**



什么是 Serverless? Serverless（无服务器架构）指的是由开发者实现的服务端逻辑运行在无状态的计算容器中，它由事件触发， 完全被第三方管理，其业务层面的状态则被开发者使用的数据库和存储资源所记录。这也是当下比较热门的方向。



Serverless 是云原生技术发展的高级阶段，使开发者更聚焦在业务逻辑，而减少对基础架构的关注。它与我们之前说的 service mesh 实际上并不在同一理念上，service mesh 倾向于将基础能力下沉，业务服务与代理一同部署。而 Serverless 则干脆希望开发者不再关注服务器，不再关注服务所需资源，这些资源与能力将由 Serverless 的厂商来提供。开发者只需要编写业务函数即可（函数即服务 FaaS）。相同的是，两者的目的都是为了业务开发能够仅专心于业务逻辑。



![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtuCp35bAibL2UM4B22ibR21nACOXbjib5kldG6A3SGcDf2VNxsgYdL4bbM6omBklJ9ic6zNmJNicWwMzg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



目前我们小米新零售效能团队也正在尝试对一些服务进行 Serverless 化，并提供了一些基础的能力。这些 Serverless 化的服务在开发中同样不需要再关心底层的协议，无论是 Apache Dubbo、Apache Dubbo-go 都会在我们后端的 Serverless 系统中进行兼容与适配，同样以上的一些列服务治理的能力也将由 Serverless 系统全权托管。



![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qdzZBE73hWtuCp35bAibL2UM4B22ibR21n6oUyeAvK7JSNDOib7THfQJia1pYwNgX24b43cIOzbpmiboGxHmfgX5MmA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



上图就是我们目前对于服务 Serverless 化的一个基本的支持逻辑，我们定义了成为 Serverless 服务的 Function 必须实现的接口 execute ：

 

```go
public interface Handler {    Result execute(Event var1, Context var2);
    default void init(Object... objs) {    }
    default String version() {        return "0.0.1";    }}
```



业务仅需要实现该接口，并通过平台配置管理该服务的 git 库等信息，就可以以 Serverless 的方式开始提供服务，Serverless 系统将自动拉取该 Function 的代码信息，编译打包等，提交到核心池中等待执行。并且同时，服务将无感知地接入系统提供的服务治理、可观测性等能力。



**05**

**总结**

*Aliware*

### 

Dubbo 作为一个老牌的、强大的微服务框架与体系，提供了跨语言的支持，这帮助我们将内部不同的技术栈实际上形成了闭环。而 Apache Dubbo-go 作为 Apache Dubbo 生态中一个还在不断迭代发展的开源项目，会存在一些待完善的小问题，但更能够切实地帮助到我们搭建与发展整个云原生微服务体系。同样的，我们在完善传统的微服务体系架构的同时，我们也关注与尝试目前微服务技术的一些发展方向，像 Serverless、service mesh 这些较为热门的方向，我们也都将持续的跟进与参与落地。我们将不断与像 dubbogo 等开源社区合作，积极反馈我们使用的经验，参与完善，推动更多此类开源项目的发展。 



### 作者介绍

董振兴，目前就职于小米中国区新零售技术部-零售中台-研发效能组，负责小米中国区新零售微服务中间件体系及效能相关研发工作。