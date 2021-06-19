---
title: Dubbo-go v3 统一路由规则
keywords: dubbogo，v3，路由规则
description: 提示用户dubbo使用的路由协议，介绍dubbogov3采用的统一路由规则
---

# Dubbo-go v3 统一路由规则

## 路由规则介绍
[《微服务统一路由规则方案草案V2》](https://www.yuque.com/docs/share/c132d5db-0dcb-487f-8833-7c7732964bd4?# )

## 简介

路由规则，简单来说就是根据**特定的条件**，将**特定的请求**流量发送到**特定的服务提供者**。从而实现流量的分配。

在 Dubbo3 统一路由规则的定义中，需要提供两个yaml格式的资源：virtual service 和 destination rule。其格式和 service mesh 定义的路由规则非常相似。
- virtual service

定义host，用于和destination rule建立联系。\
定义 service 匹配规则\
定义 match 匹配规则\
匹配到特定请求后，进行目标集群的查找和验证，对于为空情况，使用 fallback 机制。

- destination rule

定义特定集群子集，以及子集所适配的标签，标签从 provider 端暴露的 url 中获取，并尝试匹配。

## 提供能力
### 文件读入的路由配置

sample示例参见[router-file](https://github.com/apache/dubbo-go-samples/tree/3.0/router/uniform-router/file)

#### 1. 路由规则文件注解

路由规则只针对客户端，对于服务端，只需要在服务提供时打好特定的参数标签即可。

##### 1.1 virtual-service

go-client/conf/virtual_service.yml

```yaml
apiVersion: service.dubbo.apache.org/v1alpha1
kind: VirtualService
metadata: {name: demo-route}
spec:
  dubbo:
    # 使用正则表达式匹配service名，只有个满足该service名的请求才能路由。
    # 就此例子来说，不满足service名的请求会直接找不到provider
    - services:
        - { regex: org.apache.dubbo.UserProvider* }
    - routedetail:
        # 匹配规则，如果（sourceLabel）客户端url满足存在参数 `trafficLabel: xxx` 的才能匹配成功
        - match:
            - sourceLabels: {trafficLabel: xxx}
          name: other-condition
          route: # 一旦匹配上述match规则，将选择dest_rule.yml里定义的名为other的子集
            - destination: {host: demo, subset: other}
        - name: center-match
          # 没有match，兜底逻辑，一定会被匹配到。
          route: # 将选择dest_rule.yml里定义的名为center的子集
            - destination: {host: demo, subset: center}

  hosts: [demo]  # 匹配dest_rule.yml里面的host

```

##### 1.2 destination-rule

go-client/conf/dest_rule.yml

```yaml
apiVersion: service.dubbo.apache.org/v1alpha1
kind: DestinationRule
metadata: { name: demo-route }
spec:
  host: demo
  subsets:
    - name: all
      labels: { ut: CENTER } # 选中：服务端url存在 `ut:CENTER` 的键值参数的所有实例作为子集
    - name: center
      labels: { ut: other } # 选中：服务端url存在 `ut:other` 的键值参数的所有实例作为子集
    - name: other # 无条件，选择所有实例
```

#### 2. client、server 路由参数设置

- client 端
  在本例子中，go-client/conf/client.yml 可看到如下注释

```yaml
# reference config
references:
  "UserProvider":
    registry: "demoZk"
    protocol: "dubbo"
    interface: "org.apache.dubbo.UserProvider"
    params: { trafficLabel: xxx }
# If this line is comment, the all requests would be send to server, else the request would
# be sent to both server and server2
```

可见，params 对于客户端url参数的定义，一旦增加这个参数，根据上述配置的路由规则，就会命中上述 destination 名为 other 的子集，从而对所有 provider 采用负载均衡策略发起调用。\
而如果注释掉这行参数，会将请求路由至 center 子集，针对单一的 server 发起调用。

在环境变量中配置路由规则文件的路径

```shell
export CONF_VIRTUAL_SERVICE_FILE_PATH=xxx/virtual_service.yml
export CONF_DEST_RULE_FILE_PATH=xxx/dest_rule.yml
```

- server 端

```yaml
# service config
services:
  "UserProvider":
    registry: "demoZk"
    protocol: "dubbo"
    interface: "org.apache.dubbo.UserProvider"
    loadbalance: "random"
    warmup: "100"
    cluster: "failover"
    params: { ut: other } # 服务端标签，destination rule 根据此标签选择子集对应的所有实例
    methods:
      - name: "GetUser"
        retries: 1
        loadbalance: "random"
```

#### 3. 运行方法

直接使用goland运行本示例

router/router-server\
router/router-server2\
router/router-client


运行后，可观测到所有客户端流量都路由至 router-server，并没有请求路由至 router-server2

### 基于 K8S 动态更新的路由配置

sample示例参见[router-k8s](https://github.com/apache/dubbo-go-samples/tree/3.0/router/uniform-router/k8s)

#### 使用前提

本地已安装 docker 和 k8s集群，可通过 kubectl 命令控制集群。

#### 使用方法

`sh build.sh`

该脚本会先创建 dubbo-workplace 的命名空间，将三个服务依次构建，部署 CRD 资源和注册中心，打包镜像，并将三个服务部署至 K8s 集群。

client 端会首先从文件中读入路由规则，根据规则将所有流量打入 server，没有流量流至 server2。

之后尝试修改路由规则，将 dest_rule.yml 的子集标签限制去掉：

```yaml
apiVersion: service.dubbo.apache.org/v1alpha1
kind: DestinationRule
metadata: { name: demo-route }
spec:
  host: demo
  subsets:
    - name: all
      labels: { ut: CENTER }
    - name: center
#      labels: { ut: other } # 注释掉center对应的标签要求
    - name: other
```

更新路由规则:

```shell
kubectl apply -f ./go-client/conf/dest_rule.yml -n dubbo-workplace
```

之后可同时在两个 server 中查看到请求流量


#### 删除命名空间

```shell
kubectl delete ns dubbo-workplace
```

