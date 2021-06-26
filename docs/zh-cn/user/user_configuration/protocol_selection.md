---
title: protocol selection 
keywords: protocol，协议选择
description: 提示用户dubbogo3.0使用的几种通信协议
---

# protocol selection

在云原生时代，不可变的基础设施给原有的中间件带来了不可变的中间件基础设施：gRPC 统一了底层通信层；protobuf 统一了序列化协议；以 envoy + istio 为代表的 service mesh 逐渐统一了服务的控制面与数据面。

## gRPC协议

gRPC 协议，简单来说就是 http2 协议的基础之上，增加了特定的协议 header：“grpc-” 开头的 header 字段，采用特定的打解包工具（protobuf）对数据进行序列化，从而实现 RPC 调用。

![img](https://dubbo.apache.org/imgs/blog/dubbo-go/3.0-plan/p1.webp)

众所周知，gRPC 几乎没有服务治理能力，而阿里云现有 dubbo 框架兼具 RPC 和服务治理能力，整体实力不逊于 gRPC。但在“大家都用 gRPC” 这样的背景之下，dubbogo 3.0 的新通信协议就必须**完美兼容 gRPC**，对开发者已部署的服务完全兼容，并在此基础之上延续已有 dubbo 协议和服务治理能力，进而推出一系列新策略：比如 mesh 支持、应用级服务注册等。

![img](https://dubbo.apache.org/imgs/blog/dubbo-go/3.0-plan/p2.webp)

## 基于 HTTP2 的通信流程

gRPC 一次基于 HTTP2 的 unary rpc 调用传输主要流程如下：

- client 发送 Magic 信息： PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n；
- server 收到并检查是否正确；
- client 和 server 互相发送 setting 帧，收到后发送 ACK 确认；
- client 发送 Header 帧，包含 gRPC 协议字段，以 End Headers 作为 Header 结束标志；
- client 紧接着发送 Data 帧，包含 RPC 调用的 request 信息，以 End Stream 作为 Data 结束标志；
- server 调用函数获得结果；
- server 发送 Header 帧，包含 gRPC 协议字段，以 End Headers 作为 Header 结束标志；
- server 紧接着发送 Data 帧，包含 RPC 调用回传的 response 信息；
- server 紧接着再次发送 Header 帧，包含 RPC 状态和 message 信息，以 End Stream 作为本次 RPC 调用结束标志。

其中包含 gRPC 调用信息的 HTTP2 Header 帧如下图：

![img](https://dubbo.apache.org/imgs/blog/dubbo-go/3.0-plan/p3.webp)

另外，在 gRPC 的 stream 调用中，可在 server 端回传的过程中发送多次 Data，调用结束后再发送 Header 终止 RPC 过程，并汇报状态信息。

dubbogo 3.0 的通信层将在 HTTP2 通信协议之上采用同样的通信流程，以保证与 gRPC 的底层通信沟通能力。

## dubbogo 3.0 预期通信架构

除了通信协议采用 HTTP2 外，dubbogo 3.0 将采用基于 google protobuf 的 triple 协议【下面称为 dubbo3 协议】作为 dubbogo 3.0 的序列化协议，为 dubbo 将来支持更多的编程语言打下通信协议层面的基础。

目前设计的 dubbogo 3.0 传输模型如下

![img](https://dubbo.apache.org/imgs/blog/dubbo-go/3.0-plan/p4.webp)

- 为保证同时支持 unary RPC 和 stream RPC，在 server 端和 client 端增加数据流结构，以异步调用的形式完成数据传递；
- 继续支持原有的 TCP 通信能力；
- 在 HTTP2 的通信协议之上支持 dubbo3 协议，decode 过程兼容 gRPC 使用的 protobuf，保证与 gRPC 服务打通。