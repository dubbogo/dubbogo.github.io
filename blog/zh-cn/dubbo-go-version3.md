---
 title: "Dubbo-go v3.0 正式发布 ——打造国内一流开源 Go 服务框架"
 linkTitle: "Dubbo-go v3.0 正式发布 ——打造国内一流开源 Go 服务框架"
 date: 2021-12-21
 description: >
 Dubbo-go v3.0 正式发布 ——打造国内一流开源 Go 服务框架
---



 ## Dubbo-go v3.0 正式发布 ——打造国内一流开源 Go 服务框架
 ```
 作者介绍：

 李志信（github @laurencelizhixin），dubbo-go 3.0 负责人，Apache Dubbo PMC，来自阿里云中间件团队，从事 Go 语言中间件的研发和开源工作。

 于雨 （github @AlexStocks），dubbo-go 社区负责人，Apache Dubbo PMC，蚂蚁集团可信原生部【TNT】基础设施和中间件研发一线程序员。工作十一年来陆续参与和改进过 Redis/Pika/Pika-Port/etcd/Muduo/Dubbo/dubbo-go/Sentinel-golang/Seata-golang 等知名项目。

 牛学蔚（github @justxuewei），Apache Dubbo Committer，北邮计算机学院二年级研究生，对中间件、云原生领域有着浓厚的兴趣。

 董剑辉（github @Mulavar），Apache Dubbo Committer，目前主要关注的开源方向为 Dubbo、Flink、Calcite。



![图片](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naLMZw0ZdkNljO0uf1S8IP6F4b5zp5lLCKic0TP8thPSRWWDdHiaUuUQK9FuTHn98RxU94ShfnnCtccA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



Go 语言作为最流行的云原生语言，近些年拥有很高的热度，一度备受国内开源生态的关注，据笔者了解，众多企业也在近年来从自身传统技术栈转型 Go 语言技术栈。Go 以其开发敏捷、易用性高、入门较为容易的优势深受广大开发者青睐。而在 Go 语言生态成日益蓬勃发展之势下，其生态的完备性，相比于饱经考验的 Java 生态依然有着很大的 Gap，对中小型企业来说，依然需要类似于 Spring 的 Go 框架来支撑日常业务开发，渴望具备 Dubbo 生态的易用性和稳定性，在这样的诉求之下，初衷为 “Bridging The Gap Between Java And Go” 的 Dubbo-go 服务框架在 2016 年应运而生，发展至今。



我们在今年下半年的云计算基础架构大会上了解到了“基础架构能力下沉”的重大意义，从单体架构到云原生架构的一步步发展，都在努力将业务代码与中间件解耦，尽可能提供统一的编程接口，通过AOP的思路将服务调用抽象化，将接口标准化，将基础设施的实现下沉化。而 Dubbo-go 正是在原有保证网络通信的高可用、稳定性的前提下，整合了一批常用开源组件，提供一致的编程接口可供扩展和调用。在此之上，对齐 Dubbo 生态主流控制面，尝试与云原生结合，朝向 Proxyless Service Mesh 方向发展，是我们整个生态项目的一致的愿景。



在 3.0 时代，我们的“野心” 不会止步于已有的用户使用场景和基础框架能力，我们选择追求高可用、多语言、跨生态的优点，打造新一代微服务基础设施，实现 “Bridging The Gap Between Dubbo And Go”，在扩展 Go 生态的同时，也实现各种基础设施的云原生化。

## 

```
###一 Dubbo-go 简介
```



Dubbo-go 是常新的，每年都在不断进化。介绍 Dubbo-go 3.0 工作之前，先回顾其过往 6 年的发展历程，以明晰未来的方向。



```
**1 什么是 Dubbo-go**


```



github.com/apache/dubbo-go 是一款高性能 Go 语言微服务 RPC 框架，在 Dubbo 多语言生态中扮演重要角色，是编写 go 语言微服务的最佳选择之一。



开发者可以使用 Dubbo-go 框架高效地编写 RPC 服务，并支持与 Dubbo、gRPC 服务跨语言互通；您可以使用 Dubbo 生态强大的服务治理能力和运维能力，例如服务注册发现、负载均衡、配置中心、可视化等功能；您也可以使用 Dubbo-go 生态的 pixiu 网关将服务暴露给集群外部访问。



Dubbo-go 项目由于雨于 2016 年创立，2018 年开始组建开源社区，2019 年项目正式进入 Apache 软件基金会，经历三年多不断地迭代和优化，2021 年底 dubbogo 社区正式推出集成 新通信协议、新序列化协议、新应用注册模型、新路由以及新的服务治理能力的 v3.0 版本，该版本在前期研发阶段已经拥有了众多生产用户的关注和使用。



Dubbo-go 是阿里开源项目中最活跃的开源社区之一，多年的发展使社区积累了众多热爱开源的活跃贡献者、 Apache Committer/PMC 成员。不仅给 Dubbo 以及其他 Dubbo 生态项目示范了通过社区的组织运营帮助项目发展，而且帮助了提升了整个 Dubbo 大社区的活跃度：



- 包括 Apache/Dubbo 与 Apache/Dubbo-go 在内的 Dubbo 生态被评为 2021 年中国 20 大最活跃社区之一，位居阿里所有开源项目第二【第一是蚂蚁集团的 AntD】



- Dubbo-go 已经成功申报中国科学技术协会主办的「 2021“科创中国”开源创新榜评选 」



- Dubbo-go 开源社区被 OSCHINA 评为“2021 年度 OSCHINA 优秀开源技术团队”



```
**2 功能介绍**
```



Dubbo-go 目前已经达成了其初始使命 “Bridging The Gap Between Java And Go” ，具备了强大的互联互通能力，并在云原生方向取得了长足的进展。



- 互联互通能力



![图片](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naLMZw0ZdkNljO0uf1S8IP6FR38Dn6WG5ADDYBKYwb2UAJ4hqnzlcKAhIMPth52UT81901tq6HC2Ww/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



Dubbo-go 生态覆盖多种网络协议：Triple、Dubbo、JSONRPC、gRPC、HTTP、HTTP2等。


其中 Triple 协议是 Dubbo3 生态主推的协议，是基于 gRPC 的扩展协议，底层为HTTP2，可与 gRPC 服务互通。相当于在 gRPC 可靠的传输基础上，增加了 Dubbo 的服务治理能力。



Dubbo-go 生态整体已经与 Dubbo、gRPC、Spring Cloud 等生态互联互通，把东西向和南北向数据面流量统一于一体：既可以通过 Dubbo-go 进行东西方向服务调用，也可以在 Dubbo-go-pixiu 中进行南北向流量治理。 



- Devops 能力



![图片](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naLMZw0ZdkNljO0uf1S8IP6F3nG7SpDCrqx7L2fwIbYzMAtjzvY7RCz2T7qMjQG33LZM1BF7d0ZLIw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



在服务注册发现方面，支持 Nacos 、Zookeeper、ETCD、Consul、Polaris-mesh（腾讯开源） 等服务注册中间件，并拥有可扩展能力。我们也会根据用户使用情况，进一步扩展出用户需要的实现。



在配置中心方面，开发者可以使用Nacos、Apollo（携程开源）、Zookeeper 进行框架/用户的配置的发布和拉取。



在流量控制方面，我们内置实现了固定窗口、滑动窗口等知名的限流算法，同时也支持与第三方成熟的限流熔断框架 Hystrix，Sentinel-golang 等集成提供治理功能。



在分布式事务方面，我们支持 Seata-golang，实现了 TCC 模式分布式事务的调用。



在链路追踪方面，我们支持基于 Jaeger、ZipKin 的链路追踪能力。



在指标可视化方面，我们支持使用 Prometheus 收集框架指标和用户指标。



```
**3 目标用户**
```



Dubbo-go 从开始即是面向生产环境基于用户的实际需求构建开发的，其目标用户如下。



- 广大 Go 语言微服务开发者

  
  如果您是 Go 语言微服务开发者，希望基于轻量级微服务框架快速开发自己的服务，那么 Dubbo-go 3.0 将是您很好的一个选择。 



- Dubbo 生态多语言使用者

  
  如果您是 Dubbo 生态使用者，或者在语言切换的过程中面对兼容性问题，Dubbo-go 在多协议跨语言互通的场景下会祝您一臂之力。 



- gRPC 使用者

  
  如果您希望在 gRPC 生态中增加服务治理能力，Dubbo-go 可帮助您很容易地从 gRPC 接入 Dubbo 生态，在不改变业务代码的情况下提供服务治理能力的支持。



- 云原生架构师



如果你在为公司选择云原生解决方案，dubbogo 3.0 提供的 proxyless service mesh 也是一个很好的选择，它可以帮助你以最低的成本助你从微服务体系接入 istio 控制面。当然，dubbogo 的控制面能力还需要进一步加强，在未来的 3.1 版本中提供 proxyless 和 proxy 两套 service mesh 方案。



## ###二 Dubbo-go 3.0 有哪些不同



Apache 软件基金会顶级项目 Dubbo 开源至今已有十年时间，而作为第三个里程碑，也是云原生时代的全新版本，Dubbo 3.0 的研发工作最早可以追溯到2018年，作为 Dubbo 多语言生态的重要一环，Dubbo-go 社区也在2020年年底，将 3.0 版本作为主推方向。



在官方新特性支持（Triple 协议、应用级服务发现、路由规则、柔性服务等等）的基础之上，Dubbo-go 社区针对使用友好性，多语言多生态的兼容性，用户编程和使用习惯等方面重点进行了优化，与其说 Go 社区的 3.0 是一次版本对齐的迭代，不如说是一个富有生命力的新开始。



```
**1 新配置方案**
```



- 配置结构



在 3.0 时代，我们更清晰地规范出了应用层级配置和接口层级配置的概念，相比于之前版本，在配置结构上进行了重构和精简化。例如开发者在微服务场景之下，会关注注册中心地址、协议、接口名等信息。只需要在配置文件中制定好：



- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 

```
```yaml
```

```
dubbo:  
  registries:   
    ZKRegistry: # 注册中心配置     
       protocol: zookeeper # 注册中心类型    
       address: 127.0.0.1:2181 # 注册中心配置 
   protocols:   
     triple: # 协议配置   
        name: tri # 协议名     
        port: 20000 # 服务端监听端口 
   provider:    
     services:   
       GreeterProvider: # 服务提供者类名    
          interface: com.dubbogo.sample.DemoServiceName # 接口 ID
```

````
```
````

-  配置中心

  

  

  在 Dubbo-go 3.0 中，可以将上述框架配置或用户配置放置在配置中心内便于管理。在容器内只需要放置配置中心相关信息即可基于该配置启动框架。 



- 
- 
- 
- 

```
```yaml
```

```
dubbo: 
  config-center: # 配置中心信息   
     protocol: nacos   
     address: 127.0.0.1:8848  
     data-id: dubbo-go-samples-configcenter-nacos-server
```

````
```
````

-  配置API

  

  开发者可以在代码内通过配置 API 生成配置实例结构，代码中生成的配置与从文件内读取的配置等价。参考于 Java Builder 的设计来自于社区同学们，也代表了开发者对于接口易用性的诉求。



- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 

```
```go
```

```
// 1. 通过 Builder 模式创建配置中心的配置configCenterConfig := config.NewConfigCenterConfigBuilder().      SetProtocol("nacos").SetAddress("127.0.0.1:8848").      SetDataID("dubbo-go-samples-configcenter-nacos-server").      SetGroup("dubbogo").      Build()
// 2. 通过 Builder 模式创建根配置rootConfig := config.NewRootConfigBuilder().    SetConfigCenter(configCenterConfig).    Build()
// 3. 加载配置并启动框架rootConfig.Load()
```

````
```
````

```
**2 Triple + PB 协议**
```



Dubbo-go 在上半年首次发布的 3.0.0-rc1 版本内已经支持 Triple 协议。在此期间，由合作方钉钉部门相关同学提出了较多针对响应时延、稳定性等优化建议。时至今日，在性能、用户使用体验、泛化调用、异常回传、PB反射等方面都进行了大量的优化工作。



- 性能优化

  
  将旧版本基于 net/http2 的实现切换为基于 grpc 的 http2 层实现方案。增强了底层传输的稳定性和性能。经过压测，4c8g 单机 Provider 可以处理 7万 tps 的简单请求。

  
  我们使用了 3 台相同规格机器，一台作为Server(运行一个 triple-server），一台作为Client（运行一个triple-server 和triple client） ，一台作为施压机向 Client 发起针对整个链路的调用施压，并进行数据记录，记录rt、真实 tps 以及client 和 server 的 CPU 占比数据。 





| TPS   | Consumer CPU (%) | Provider CPU(%) | RT(ms) |
| ----- | ---------------- | --------------- | ------ |
| 1000  | 8.9              | 4.6             | 0.6    |
| 2000  | 16.5             | 8.5             | 0.6    |
| 5000  | 18.8             | 10              | 1      |
| 10000 | 37               | 18.3            | 1      |
| 20000 | 72               | 37              | 1      |
| 25000 | 77               | 40              | 1.2    |



通过压测结果我们可以看到，我们在多跳链路和单机上万级别tps的实验环境下，可以保证毫秒级请求时延，并维持合理的 CPU 资源占用率。



- 反射支持

  
  Triple 默认开启 proto 反射，用户可以使用 grpc_cli 针对 Triple 协议暴露的pb序列化服务进行展示和调试。 

  
  在 proto 反射支持的前提下，dubbo-go-pixiu 提供了网关层协议转换调用 triple 服务的支持。 

  

  

- 
- 

```
```bash
```

```
$ grpc_cli ls localhost:20000org.apache.dubbogo.samples.api.Greetergrpc.reflection.v1alpha.ServerReflection
```

````
```
````

- 用户编程方式
  新 PB 编译插件，新版本 dubbo-go 推荐 go 用户使用 proto 文件定义接口，与 gRPC-go 的使用方式类似。 



- 

```
```bash
```

```
$ go install github.com/dubbogo/tools/cmd/protoc-gen-go-triple@v1.0.5$ protoc --go_out=. --go-triple_out=. ./helloworld.proto
```

````
```
````

关于 Triple 协议，最早是阿里云中间件团队在 Dubbo3 形成概念的时候就提出的。它相比于上一代 Dubbo 协议，解决了 Dubbo 生态与其他云原生架构生态不互通的特点，并且用户很难理解位于传输层的上一代二进制协议。基于 HTTP2 协议的 gRPC 扩展协议就很好滴解决了这一问题。第二是点是对 Mesh 等网关型组件不够友好，在 3.0 时代，我们可以直接通过解析协议头来获取必要的元数据，并很自然地适配网关对于 HTTP 协议的转发实现。



从我们社区所对接的 Go 语言开发者考虑，PB 序列化更能适配与他们的开发习惯，方便从已有 gRPC 服务迁移业务代码，还解决了升级过程中跨协议通信的兼容性问题，而在使用 Triple 协议后，跨语言互通的优势将进一步体现，从“可互通” 转变为基于成熟序列化方案的“稳定性互通”，方便用户业务更广泛的扩展，简单来说，在 Dubbo 时代，用户进行跨语言互通需要依赖多语言生态的 Dubbo 协议实现，而在3.0 时代，您可以使用任意语言的 gRPC 实现来与 Dubbo 服务直接进行互通，并共享 gRPC 生态的一系列组件，例如链路追踪、可视化、cli 工具等等。



因此，我们认为 Triple 的意义并不是一个简单的扩展协议，而是一个跨语言、跨生态概念的实现，也是 Dubbo3 的核心 Feature 所在。



```
**3 柔性服务**
```



大规模分布式系统承载的用户流量呈指数级增长，需要使用负载均衡算法将流量均匀地分散到各个机器中，提升集群的吞吐率和资源利用率。



传统负载均衡算法大多是基于消费者视角，它们共同的局限性是无法根据服务提供者的当前状态动态调整分流策略，如 RR、hash 等算法。这些算法总是以尽可能公平的概率分配流量，但在实践中公平不等于负载均衡。



我们期望的均衡分流策略是：



- 动态性能评估：用户不需要事先设置机器权重，框架在运行时自动评估系统性能，性能好的机器承担更多流量，性能不足的机器承担更少的流量；



- 故障自愈能力：负载均衡算法能够自动摘除故障的节点，并具备故障自愈能力；



- 适当限流策略：避免服务雪崩问题。



柔性服务作为新一代负载均衡策略被引入 Dubbo-go 3.0 中，核心能力包括容量评估和智能分流。



容量评估是评估当前服务提供者状态以保持最优请求队列长度。容量评估关注的两个核心指标是 TPS 和延迟，TPS 评估系统的每秒处理事物的速度，延迟反映用户等待时间。在评估服务端容量时，要平衡系统吞吐率和用户等待时间两者之间的关系，理想状态下在系统吞吐率尽可能大的情况下用户延迟尽可能小。



![图片](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naLMZw0ZdkNljO0uf1S8IP6FPNvKz47OXhqtgib3ZWB7jD3UDj7OHyKvtPibzMLaB79Sls2Ec3s7h9MA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



真实容量受到硬件和下游依赖的限制，一次性预测真实容量难度较高。如上图所示，TPS 在到达最佳值之前，与请求数呈单调递增的关系。在 Dubbo-go 3.0.0 版本中，我们引入了爬山算法（HillClimbing），在调用过程中逐步逼近系统的最佳承载量。



HillClimbing 算法作用于服务提供者，周期性地判定当前是否处于最佳状态并动态更新系统容量。



探测间隔随着时间逐步拉长，直至趋向稳定。刚启动时没有历史数据，此时需要频繁更新容量评估值，保证系统以尽可能快的速度探测到最优容量。我们假定最优容量短时间内不会再强烈波动，且容量评估也会额外消耗资源，因此当趋向稳定的时候，算法将逐步延长探测周期。



容量更新策略与 TCP 拥塞控制相似。下面公示表示 HillClimbing 算法预设的两种增量类型：



![图片](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naLMZw0ZdkNljO0uf1S8IP6FpVdkjURo29j6aMLeEEjJDzP0uUMmsSlCvGF4I9ibkhKkS3CaeiaUI4Qg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



其中，lim 表示当前容量，itv 表示当前探测间隔。



在初期采用慢启动策略，取一个较低水平的值作为容量初始值，但是以较高增量（alpha）向最优容量逼近。如果当前容量已经增长到 TPS 降低的情况，则使用较低增量（beta）以更精准的方式向最优容量移动。



在每次调用过程结束后，服务提供者会通过 Dubbo-go 的附件（attachment）特性将最新的预估容量返回给服务消费者，消费者将信息缓存至本地并使用 P2C 算法实现智能分流。



P2C（Pick Two Random Choices）算法作用于服务消费者，它有着更科学的负载均衡策略并广泛的应用在多个知名开源项目中，如 Linkerd、Rsocket 等。该算法首先随机选择两个节点，然后对比节点的剩余容量，选择其中一个剩余容量较多的节点作为本次调用的服务提供者。



柔性服务将在后续版本中持续优化，与 Dubbo 社区共同探索出一套适合微服务场景的柔性服务最佳实践。



```
**4 Pixiu 网关**
```



Dubbo-go-pixiu 网关支持调用 GO/Java 的 Dubbo 集群。在 Dubbo-go 3.0 的场景下，我们可以通过 Pixiu 网关，在集群外以 HTTP 协议请求 pixiu 网关，在网关层进行协议转换，进一步调用集群内的Dubbo-go 服务。



![图片](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naLMZw0ZdkNljO0uf1S8IP6FGzQqTSKS4jMR76Yyib5yQb7GpLNpcoVbnVa2OKfrO47uq686QkJPhAw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



用户调用 Dubbo-go 服务的 path 为http://$(app_name)/$(service_name)/$(method)。



例如一个proto文件内有如下定义：



- 
- 
- 
- 
- 
- 
- 
- 

```
```go
```

```
package org.apache.dubbo.quickstart.samples;
service UserProvider {  rpc SayHello (HelloRequest) returns (User) {}}
message HelloRequest {  string name = 1;}
```

````
```
````

并在dubbo-go 服务启动时在dubbogo.yml 内配置应用名为my-dubbogo-app: 



- 
- 

```
```go
```

```
dubbo:  application:    name: my-dubbogo-app
```

````
```
````

pixiu 网关即可解析 path 为 my-dubbogo-app/org.apache.dubbo.quickstart.samples.UserProvider/SayHello 的路由，并转发至对应服务。来自外部HTTP 请求的 body 为 json 序列化的请求参数，例如 {"name":"test"}。



我们目前推荐使用 Nacos 作为注册中心。



用户可以在自己的集群里部署我们的demo，集群最好拥有暴露 lb 类型 service 的能力，从而可以在公网访问至集群内的服务，您也可以直接集群内进行请求。



针对您的集群，执行：



```go
```bash
```

```
$ kubectl apply -f https://raw.githubusercontent.com/dubbogo/triple-pixiu-demo/master/deploy/pixiu-triple-demo.yml
```

````
```
````

会在 dubbogo-triple-nacos 命名空间下创建如下资源，包含三个 triple-server，一个pixiu网关，一个 nacos server。并通过 Servcie 将服务暴露至公网。



- 
- 
- 
- 
- 

```
```go
```

```
namespace/dubbogo-triple-nacos createdservice/dubbo-go-nacos createddeployment.apps/dubbogo-nacos-deployment createddeployment.apps/pixiu createddeployment.apps/server createdservice/pixiu created
```

````
```
````

获取 pixiu 公网 ip 并进行调用



- 
- 
- 

```
```bash
```

```
$ kubectl get svc -n dubbogo-triple-nacosNAME             TYPE           CLUSTER-IP        EXTERNAL-IP     PORT(S)          AGEdubbo-go-nacos   ClusterIP      192.168.123.204   <none>          8848/TCP         32spixiu            LoadBalancer   192.168.156.175   30.XXX.XXX.XX   8881:30173/TCP   32s
```

````
```
````

通过curl 调用 demo 服务，并获得响应结果。



- 

```
```bash
```

```
$ curl -X POST -d '{"name":"laurence"}' http://30.XXX.XXX.XX:8881/dubbogoDemoServer/org.apache.dubbo.laurence.samples.UserProvider/SayHello{"name":"Hello laurence","id":"12345","age":21}
```

````
```
````

```
**5 运维能力与工具**
```



- 可观测性



相比于上一版本的 Dubbo-go，本次发布在原来Dubbo协议的可观测性的基础上，提供了基于 Triple 协议可观测性支持，适配于 Jaeger 的链路追踪展示。对于数据上报，我们在框架中为之提供了接口，方便用户实时上报业务埋点数据，并默认开启 promehteus 的拉模式数据收集的支持。



框架对于 RPC调用相关信息，例如请求RT，接口名、方法名等数据，也提供了默认的 metrics 字段，供用户收集和统计。



- 日志



本次发版对日志模块进行了较大的改变和更新，用户可以根据需求配置日志打印的级别、分片、文件输出、保留时常等信息，并支持用户自定义日志组件。



- cli工具



Dubbo-go 3.0 会针对命令行工具进行重点开发，目前社区已提供用于发起 Dubbo RPC 调用的dubbo-go-cli；用于编译 pb 文件的protoc-gen-go-triple 插件；并且 Dubbo-go 已经适配 grpc_cli 工具的调试，在未来，我们会在健康检查、服务信息获取、RPC 调用调试、框架代码初始化和接口编译、服务部署等方面，进一步增强命令行工具的能力，以提供更完备的服务治理和运维生态。



```
###  三 用户视角的 Dubbo-go
```



作为一款站在用户角度设计的框架，我们更希望给予广大用户更简洁，更直观，更“约定大于配置”的使用体验，因此在研发阶段，我们重点进行了多轮的配置迭代以及 samples 仓库的建设和维护，为用户提供了更为精简的概念和重点突出的 samples 示例。



```
**1 面向接口和配置的开发**
```



Dubbo-go 3.0 为开发者屏蔽掉了底层实现细节，只需要关注几个关键点即可使用本框架进行开发，以 triple 服务为例。



- 框架配置文件：dubbogo.yaml

  
  框架启动所依赖的配置项。 



- 接口定义

  
  编写 proto 文件，并使用提供的 protoc-gen-go-triple 插件以及官方 protoc-gen-go 插件进行编译。 

  

- 接口代码实现

  
  编写服务实现，并使用框架进行启动即可。 



接口、实现、配置。是常见 go 微服务的基本依赖元素。Dubbo-go 提供一整套微服务的解决方案，并提供丰富的服务治理能力和可扩展能力，从而可以让用户容易地接入使用。



```
**2 代码示例仓库 dubbo-go-samples** 
```



我们在apache/dubbo-go-samples 仓库的 master 分支维护了丰富的 dubbo-go 3.0 的代码示例。包括多种协议的 rpc 调用，多种注册中心的支持，多种配置中心的使用，以及泛化调用、配置API、日志、数据上报、链路追踪等运维能力的展示，几乎框架拥有的全部能力都可以在 samples 仓库中找到对应的常见用例。用户也可以在1.5分支找到适配与dubbo-go 1.5.x 的示例。



通过 3.0 前期阶段对于配置重构和大幅度的用户友好性优化，目前 samples 仓库内的代码和配置都已经高度精简化，从而突出单个模块的能力。开发者可以下载仓库后直接按照server 到 client 的顺序来玩耍一个示例模块的服务，即可体验框架提供的能力。



samples 仓库在迭代过程中也被赋予了更多的功能，社区开发同学都会熟悉，我们将框架仓库、samples 仓库通过 ci 集成测试的方式结合起来，保证框架开发者每次提交的代码都能通过所有用例的 e2e 测试，从而保障开发质量，提高迭代的效率。

##  

```
**四 社区协作**
```



作为一个能力功能非常丰富的服务平台，dubbogo 社区很重视与各大开源社区特别是阿里系开源产品社区以及各个公司的合作。



- Nacos 社区



早期 Dubbo-go 社区就与 Nacos 社区展开密切合作，由多位核心贡献者参与 Dubbo-go 研发支持中，在 3.0.0 版本中，增加了多位 Nacos 社区成员，在社区迭代中作出了许多建设性的建议和贡献。



- Polaris 社区



北极星（Polaris）是腾讯开源的服务发现和治理中心，致力于解决分布式或者微服务架构中的服务可见、故障容错、流量控制和安全问题。在 3.0.0 版本的开发中，Dubbo-go 社区与 Polaris 社区展开合作，实现了把 Polaris 作为 dubbo-go 的注册中心。



- Sentinel-Golang 社区



Sentinel 是面向分布式服务架构的流量控制组件，在Sentinel-Golang 首个版本 0.1.0 正式发布后，Dubbo-go 社区就与 Sentinel-Golang 社区展开密切合作，在功能上支持 Sentinel-Golang 作为流量控制。



- Seata-golang 社区



从 dubbogo v1.3 开始， 就集成了 seata-golang，实现了 TCC 模式分布式事务的调用。



![图片](https://mmbiz.qpic.cn/mmbiz_gif/Z6bicxIx5naLMZw0ZdkNljO0uf1S8IP6FMbI77CTrPgRzjXxOlKcVwXkncSSKbibHtT4WzNSjsicWIylIibF1qmM9A/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)



两个社区现已合作将 TCC 模式 seata-golang 集成到了 dubbo-go-pixiu 中，只需要简单的配置、就能集成 TCC 模式协调分布式事务的方案，整体流程原理见上图。为了进一步降低大家使用分布式事务的门槛，seata-golang 社区也在考虑将 AT 模式做到 DB 代理层，届时在 dubbo-go-pixiu 中使用 seata-golang 会更加方便，敬请期待。



- 其他公司



dubbogo 本身是一个有着极高生产环境需求的项目，在发展过程中与阿里等很多公司有过合作。这些合作使得双方都有收益，dubbogo 的质量得以保证，功能得以拓展，合作方自身的平台稳定性得到极大提升。

##  

```
**五 展望**
```



前面讲到，Dubbo-go 3.0 对我们来说是一个新时代的起点，在未来的迭代中，我们除了继续维护上述流量调度以及服务治理能力之外，还会在如下方向重点发力。



### 1 流量路由规则



Dubbo-go 3.0 在路由规则方面设计与 dubbo 一致，提供了支持 mesh 方式的路由规则策略并接入了 dubbo-admin 这一控制面板。



在 mesh 路由方面，dubbo-go 将路由规则分为 VirtualService 和 DestinationRule 两部分，其中 DestinationRule 定义了目标地址的规则，通过 subset 和 host 关联到对应的集群，而 VirtualService 则定义了具体的路由匹配规则。当客户端发起一次调用时，首先经过 VirtualService 路由到具体的 subset，然后根据 DestinationRule 中对应 subset 的 labels 信息找到具体的集群。这种设计方式将路由规则和目标地址进行了解耦，支持 VirtualService 和 DestinationRule 的多种组合，实现了更加灵活的路由策略，也可以更加轻易实现 A/B 测试、金丝雀发布、蓝绿发布等能力。



关于接入 dubbo-admin 一块工作，目前 dubbo-go 已经重构了 zookeeper 配置中心的代码逻辑，并实现了和 dubbo-admin 互通，即用户可以在 dubbo-admin 上动态发布、更新路由来调度集群内流量（目前仅限 zookeeper），而应用可以立即感知，无需重启。在不久的未来我们会继续深入打通这一部分的能力互通，支持 nacos 等其他常用配置中心、注册中心的互通，彻底实现控制面板与数据面板的分离。



### 2 统一控制面与服务架构创新



我们将推出兼容 Dubbo-admin 的统一控制面，可在控制面中通过路由配置动态调度集群内流量，将新路由规则以更灵活、更易用的方式落地在生产场景下，运维人员也可以在控制面上一目了然地了解到集群内 dubbo-go 应用的实时情况，进一步来讲，控制面将会拥有服务测试、灰度发布、监控、流量调度等一系列运维能力。



我们还会在适配于 pixiu 网关协议转换的基础之上，进一步发掘网关的能力，朝 proxyless service-mesh 的方向探索新的微服务架构。



### 3 进一步云原生化



我们将在 dubbo-go 1.5 版本在 k8s 方向探索的基础之上，进一步支持云原生能力，计划包含探针、配置、资源监听等方面，使得框架在云原生架构下具有更好的使用体验，更多样的服务治理能力。
