---
title: Istio 环境部署 Dubbo-go 应用
keywords: Istio 环境部署 Dubbo-go 应用
description: Istio 环境部署 Dubbo-go 应用
---

# Istio 环境部署 Dubbo-go 应用

## 1. 准备工作

- dubbo-go cli 工具和依赖工具已安装
- docker、helm、kubectl 环境已安装。
- istio 环境已部署

## 2. 开发 server 端 Dubbo-go 应用

### 2.1 使用 dubbogo-cli 创建项目模板

```plain
$ mkdir cli-create-server
$ cd cli-create-server
$ dubbogo-cli newApp . 
$  tree .
.
├── Makefile
├── api
│   └── api.proto
├── build
│   └── Dockerfile
├── chart
│   ├── app
│   │   ├── Chart.yaml
│   │   ├── templates
│   │   │   ├── _helpers.tpl
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── serviceaccount.yaml
│   │   └── values.yaml
│   └── nacos_env
│       ├── Chart.yaml
│       ├── templates
│       │   ├── _helpers.tpl
│       │   ├── deployment.yaml
│       │   └── service.yaml
│       └── values.yaml
├── cmd
│   └── app.go
├── conf
│   └── dubbogo.yaml
├── go.mod
├── go.sum
└── pkg
    └── service
        └── service.go
```

生成项目包括几个目录：

- api：放置接口文件：proto文件和生成的pb.go文件
- build：放置构建相关文件
- chart：放置发布用 chart 仓库、基础环境chart 仓库：nacos、mesh（开发中）
- cmd：程序入口
- conf：框架配置
- pkg/service：RPC 服务实现
- Makefile：

- - 镜像、应用名：

- - - IMAGE = $(your_repo)/$(namespace)/$(image_name)
      TAG = 1.0.0
    - APPNAME = dubbo-go-app # 用于 helm 发布，对应 chart 名、应用名和服务名（service名）

- - 提供脚本，例如：

- - - make build # 打包镜像并推送
    - make buildx-publish # arm架构本地打包amd64镜像并推送，依赖buildx
    - make deploy  # 通过 helm 发布应用
    - make remove  # 删除已经发布的 helm 应用
    - make proto-gen # api下生成 pb.go 文件
    - ...

### 2.2 开发和发布例子server：

- 编译接口

```plain
$ make proto-gen
protoc --go_out=./api --go-triple_out=./api ./api/api.proto
$ make tidy
go mod tidy
```

- 指定镜像：

修改 Makefile 

```
IMAGE = xxx/dubbo-go-app
HELM_INSTALL_NAME = dubbo-go-app
```

修改 chart/app/values.yaml 

```yaml
image:
  repository: xxx/dubbo-go-app
```

- 修改配置：使用xds协议作为注册中心

  conf/dubbogo.yaml

```
dubbo:
  registries:
    xds:
      protocol: xds
      address: istiod.istio-system.svc.cluster.local:15010
```

- 拉取最新依赖

  `$ export GOPROXY="https://goproxy.cn"`

  `$ go get dubbo.apache.org/dubbo-go/v3@3.0`

  `$ make tidy`

- 部署至集群

  `$ make deploy`

#### 2.3 验证部署信息

```
$ kubectl get deployment
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
dubbo-go-app   1/1     1            1           88s
可查看到部署好的 dubbo-go 应用 

$  kubectl get pods  -n istio-system | grep istiod | awk '{print $1 " -n istio-system 8080 "}' | xargs kubectl port-forward
istio 调试端口port-forward 到本地
浏览器打开 http://localhost:8080/debug/adsz
可查看到注册的接口级映射的 Mapping 信息：
"providers:api.Greeter::\":\"dubbo-go-app-v1.default.svc.cluster.local:20000\"
```

## 
