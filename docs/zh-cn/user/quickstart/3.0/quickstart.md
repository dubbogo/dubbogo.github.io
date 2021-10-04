---
title: dubbo-go3.0快速开始
keywords: 快速开始,helloworld,
description: 快速上手dubbo-go3.0，编写一个简单的helloworld应用
---

# Dubbogo 3.0 快速开始

## 1. 环境安装

### 1.1 安装Go语言环境

go version >= go 1.11

[【Go 语言官网下载地址】](https://golang.google.cn/)

将 $GOPATH/bin 加入环境变量

### 1.2 安装序列化工具protoc

[【protoc 下载地址】](https://github.com/protocolbuffers/protobuf/releases)

### 1.3 安装 proto-gen-triple 编译插件

 ```shell
export GO111MODULE="on"
export GOPROXY="http://goproxy.io"
go get -u github.com/dubbogo/tools/cmd/protoc-gen-triple
 ```

确保上述protoc 和 protoc-gen-triple在系统环境变量内

```bash
$ protoc --version
libprotoc 3.14.0
$  protoc-gen-triple
WARNING: Package "github.com/golang/protobuf/protoc-gen-go/generator" is deprecated.
        A future release of golang/protobuf will delete this package,
        which has long been excluded from the compatibility promise.
```

### 1.4 启动zookeeper

选择您喜欢的方式启动zk，如您安装docker-compose可直接从文件启动

zookeeper.yml:

```yaml
version: '3'
services:
  zookeeper:
    image: zookeeper
    ports:
      - 2181:2181
    restart: on-failure
```

```shell
docker-compose -f ./zookeeper.yml up -d
```

## 2. 编译接口

### 2.1 编写接口描述文件 helloworld.proto

```protobuf
syntax = "proto3";
package api;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (User) {}
  rpc SayHelloStream (stream HelloRequest) returns (stream User) {}
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

### 2.2 使用安装好的编译工具编译接口

```bash
protoc -I . helloworld.proto --triple_out=plugins=triple:.
```

将生成 helloworld.pb.go 文件

## 3. 开启一次RPC调用

新建一个项目，运行 ` go mod init dubbo3-demo `

建立如下文件目录：

![](../../../pic/3.0/overview.png)



client.go文件：

```go
package main

import (
	"context"
	"time"
)

import (
	"dubbo.apache.org/dubbo-go/v3/common/logger"
	"dubbo.apache.org/dubbo-go/v3/config"
	_ "dubbo.apache.org/dubbo-go/v3/imports"
)

import (
	"dubbo3-demo/api"
)

var greeterProvider = &api.GreeterClientImpl{}


func init() {
	config.SetConsumerService(greeterProvider)
}

func main() {
	// init rootConfig with config api
	rc := config.NewRootConfigBuilder().
		SetConsumer(config.NewConsumerConfigBuilder().
			SetRegistryIDs("zookeeper").
			AddReference("GreeterClientImpl", config.NewReferenceConfigBuilder().
				SetInterface("org.apache.dubbo.UserProvider").
				SetProtocol("tri").
				Build()).
			Build()).
		AddRegistry("zookeeper", config.NewRegistryConfigWithProtocolDefaultPort("zookeeper")).
		Build()

	// validate consumer greeterProvider
	if err := rc.Init(); err != nil{
		panic(err)
	}

	// waiting for service discovery
	time.Sleep(time.Second*3)

	// run rpc invocation
	testSayHello()
}

func testSayHello() {
	ctx := context.Background()

	req := api.HelloRequest{
		Name: "laurence",
	}
	user, err := greeterProvider.SayHello(ctx, &req)
	if err != nil {
		panic(err)
	}

	logger.Infof("Receive user = %+v\n", user)
}
```

server.go文件：

```go
package main

import (
	"context"
)

import (
	"dubbo.apache.org/dubbo-go/v3/common/logger"
	"dubbo.apache.org/dubbo-go/v3/config"
	_ "dubbo.apache.org/dubbo-go/v3/imports"
)

import (
	"dubbo3-demo/api"
)

func main() {
	config.SetProviderService(&GreeterProvider{})

	rc := config.NewRootConfigBuilder().
		SetProvider(config.NewProviderConfigBuilder().
			AddService("GreeterProvider", config.NewServiceConfigBuilder().
				SetInterface("org.apache.dubbo.UserProvider").
				SetProtocolIDs("tripleProtocolKey").
				Build()).
			SetRegistryIDs("registryKey").
			Build()).
		AddProtocol("tripleProtocolKey", config.NewProtocolConfigBuilder().
			SetName("tri").
			Build()).
		AddRegistry("registryKey", config.NewRegistryConfigWithProtocolDefaultPort("zookeeper")).
		Build()

	if err := rc.Init(); err != nil{
		panic(err)
	}

	select {}
}

type GreeterProvider struct {
	api.GreeterProviderBase
}

func (s *GreeterProvider) SayHelloStream(svr api.Greeter_SayHelloStreamServer) error {
	c, err := svr.Recv()
	if err != nil {
		return err
	}
	logger.Infof("Dubbo-go3 GreeterProvider recv 1 user, name = %s\n", c.Name)
	c2, err := svr.Recv()
	if err != nil {
		return err
	}
	logger.Infof("Dubbo-go3 GreeterProvider recv 2 user, name = %s\n", c2.Name)
	c3, err := svr.Recv()
	if err != nil {
		return err
	}
	logger.Infof("Dubbo-go3 GreeterProvider recv 3 user, name = %s\n", c3.Name)

	svr.Send(&api.User{
		Name: "hello " + c.Name,
		Age:  18,
		Id:   "123456789",
	})
	svr.Send(&api.User{
		Name: "hello " + c2.Name,
		Age:  19,
		Id:   "123456789",
	})
	return nil
}

func (s *GreeterProvider) SayHello(ctx context.Context, in *api.HelloRequest) (*api.User, error) {
	logger.Infof("Dubbo3 GreeterProvider get user name = %s\n", in.Name)
	return &api.User{Name: "Hello " + in.Name, Id: "12345", Age: 21}, nil
}
```

执行 `export GOPROXY="https://goproxy.cn" `设置PROXY

执行`go mod tidy`

执行 ` go get dubbo.apache.org/dubbo-go/v3@3.0 `更新依赖

如go get 3.0 分支出现错误，则查尝试更换网络环境或者代理



分别启动服务端和客户端。可在客户端看到输出：

```
 Receive user = {Name:Hello laurence Id:12345 Age:21 ...}
```

获得调用结果成功

## 4. 更多

细心的读者可以发现，以上例子编写的的服务端可以接受来自客户端的普通RPC、流式RPC调用请求。目前只编写了普通调用的Client，读者可以根据samples库中的例子来尝试编写流式客户端发起调用。

更多samples可以参阅 [【dubbo-go-samples】](../../samples/samples.html)

下一章：[【Dubbogo 基本概念】](../../concept/app_and_interface.html)
