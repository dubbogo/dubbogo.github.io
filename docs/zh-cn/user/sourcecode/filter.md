---
title: RPC 过滤器
keywords: RPC 过滤器
description: RPC 过滤器


---

# RPC 过滤器

## 1. Filter 概念

```go
// Filter interface defines the functions of a filter
// Extension - Filter
type Filter interface {
	// Invoke is the core function of a filter, it determines the process of the filter
	Invoke(context.Context, protocol.Invoker, protocol.Invocation) protocol.Result
	// OnResponse updates the results from Invoke and then returns the modified results.
	OnResponse(context.Context, protocol.Result, protocol.Invoker, protocol.Invocation) protocol.Result
}
```

Filter 可以加载在 Consumer 端或者 Provider端。当加载在 Consumer 端，其Invoke函数调用的下游为网络层，OnResponse 为请求结束从网络层获取到返回结果后被调用。当加载在 Provider 端，其 Invoke 函数调用的下游为用户代码，OnResponse 为用户代码执行结束后向下传递至网络层前被调用。

Filter 采用面向切面设计的思路，通过对 Filter 的合理扩展，可以记录日志、设置数据打点，记录 invoker 所对应服务端性能，限流等等工作。

## 2. 框架预定义 Filter

框架预定义了一系列filter，可以在配置中直接使用，其代码实现位于[filter](https://github.com/apache/dubbo-go/tree/3.0/filter)

- accesslog
- active
- sign: AuthConsumerFilter
- auth: AuthProviderFilter
- echo
- execute: ExecuteLimitFilter
- generic: GenericFilter
- generic_service: GenericServiceFilter
- pshutdown: GracefulShutdownProviderFilter
- cshutdown: GracefulShutdownConsumerFilter
- hystrix_consumer: HystrixConsumerFilter
- hystrix_provider: HystrixProviderFilter
- metrics
- seata
- sentinel-provider
- sentinel-consumer
- token
- tps
- tracing

## 3. 默认加载Filter

用户在配置文件中配置了将要使用的 Filter 时，框架使用用户配置的 Filter，否则则加载默认Filter：

- Consumer:

  cshutdown

- Provider:

  echo, metrics, token, accesslog, tps, generic_service, executivete, pshutdown