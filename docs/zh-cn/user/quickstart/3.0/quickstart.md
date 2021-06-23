---
title: dubbo-go3.0快速开始
keywords: 快速开始,helloworld,
description: 快速上手dubbo-go3.0，编写一个简单的helloworld应用
---

## 1. 环境安装

### 1.1 安装Go语言环境

go version >= go 1.11

[【Go 语言官网下载地址】](https://golang.google.cn/)

### 1.2 安装序列化工具protoc

[【protoc 下载地址】](https://github.com/protocolbuffers/protobuf/releases)

### 1.3 安装 proto-gen-dubbo3 编译插件

 ```shell
export GO111MODULE="on"
export GOPROXY="http://goproxy.io"
go get -u github.com/apache/dubbo-go/protocol/dubbo3/protoc-gen-dubbo3@3.0
 ```

确保上述protoc 和 protoc-gen-dubbo3在系统环境变量内

### 1.4 启动zookeeper（可选）

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
package protobuf;

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
protoc -I . helloworld.proto --dubbo3_out=plugins=grpc+dubbo:.
```

将生成 helloworld.pb.go 文件

## 3. 开启一次RPC调用

新建一个项目，运行 ` go mod init dubbo3-demo `

建立如下文件目录：

![](../../../pic/3.0/overview.png)

client.go文件：

```go
package main

import(
	"context"
	"time"
)

import (
	_ "dubbo.apache.org/dubbo-go/v3/cluster/cluster_impl"
	_ "dubbo.apache.org/dubbo-go/v3/cluster/loadbalance"
	"dubbo.apache.org/dubbo-go/v3/common/logger"
	_ "dubbo.apache.org/dubbo-go/v3/common/proxy/proxy_factory"
	"dubbo.apache.org/dubbo-go/v3/config"
	_ "dubbo.apache.org/dubbo-go/v3/filter/filter_impl"
	_ "dubbo.apache.org/dubbo-go/v3/protocol/dubbo3"
	_ "dubbo.apache.org/dubbo-go/v3/registry/protocol"
	_ "dubbo.apache.org/dubbo-go/v3/registry/zookeeper"
)

import(
	"dubbo3-demo/protobuf"
)

var greeterProvider = new(protobuf.GreeterClientImpl)

func setConfigByAPI() {
	consumerConfig := config.NewConsumerConfig(
		config.WithConsumerAppConfig(config.NewDefaultApplicationConfig()),
		config.WithConsumerRegistryConfig("registryKey", config.NewDefaultRegistryConfig("zookeeper")),
		config.WithConsumerReferenceConfig("greeterImpl", config.NewReferenceConfigByAPI(
			config.WithReferenceRegistry("registryKey"),
			config.WithReferenceProtocol("tri"),
			config.WithReferenceInterface("org.apache.dubbo.UserProvider"),
		)),
	)
	config.SetConsumerConfig(*consumerConfig)
}

func init() {
	config.SetConsumerService(greeterProvider)
	setConfigByAPI()
}

// need to setup environment variable "CONF_CONSUMER_FILE_PATH" to "conf/client.yml" before run
func main() {
	config.Load()
	time.Sleep(time.Second * 3)

	testSayHello()
}

func testSayHello() {
	ctx := context.Background()

	req := protobuf.HelloRequest{
		Name: "laurence",
	}
	user := protobuf.User{}
	err := greeterProvider.SayHello(ctx, &req, &user)
	if err != nil {
		panic(err)
	}

	logger.Infof("Receive user = %+v\n", user)
}

```

server.go文件：

```go
package main

import(
	"context"
	"fmt"
)

import (
	"dubbo.apache.org/dubbo-go/v3/common/logger"
	_ "dubbo.apache.org/dubbo-go/v3/common/proxy/proxy_factory"
	"dubbo.apache.org/dubbo-go/v3/config"
	_ "dubbo.apache.org/dubbo-go/v3/filter/filter_impl"
	_ "dubbo.apache.org/dubbo-go/v3/protocol/dubbo3"
	_ "dubbo.apache.org/dubbo-go/v3/registry/protocol"
	_ "dubbo.apache.org/dubbo-go/v3/registry/zookeeper"
	tripleConstant "github.com/dubbogo/triple/pkg/common/constant"
)

import (
	"dubbo3-demo/protobuf"
)

func setConfigByAPI() {
	providerConfig := config.NewProviderConfig(
		config.WithProviderAppConfig(config.NewDefaultApplicationConfig()),
		config.WithProviderProtocol("tripleProtocolKey", "tri", "20000"),
		config.WithProviderRegistry("registryKey", config.NewDefaultRegistryConfig("zookeeper")),

		config.WithProviderServices("greeterImpl", config.NewServiceConfigByAPI(
			config.WithServiceRegistry("registryKey"),
			config.WithServiceProtocol("tripleProtocolKey"),
			config.WithServiceInterface("org.apache.dubbo.UserProvider"),
		)),
	)
	config.SetProviderConfig(*providerConfig)
}

func init() {
	setConfigByAPI()
}

func main() {
	config.SetProviderService(NewGreeterProvider())
	config.Load()
	select {}
}

type GreeterProvider struct {
	*protobuf.GreeterProviderBase
}

func NewGreeterProvider() *GreeterProvider {
	return &GreeterProvider{
		GreeterProviderBase: &protobuf.GreeterProviderBase{},
	}
}

func (s *GreeterProvider) SayHelloStream(svr protobuf.Greeter_SayHelloStreamServer) error {
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

	svr.Send(&protobuf.User{
		Name: "hello " + c.Name,
		Age:  18,
		Id:   "123456789",
	})
	svr.Send(&protobuf.User{
		Name: "hello " + c2.Name,
		Age:  19,
		Id:   "123456789",
	})
	return nil
}

func (s *GreeterProvider) SayHello(ctx context.Context, in *protobuf.HelloRequest) (*protobuf.User, error) {
	logger.Infof("Dubbo3 GreeterProvider get user name = %s\n" + in.Name)
	fmt.Println("get triple header tri-req-id = ", ctx.Value(tripleConstant.TripleCtxKey(tripleConstant.TripleRequestID)))
	fmt.Println("get triple header tri-service-version = ", ctx.Value(tripleConstant.TripleCtxKey(tripleConstant.TripleServiceVersion)))
	return &protobuf.User{Name: "Hello " + in.Name, Id: "12345", Age: 21}, nil
}

func (g *GreeterProvider) Reference() string {
	return "greeterImpl"
}

```

分别启动服务端和客户端。可在客户端看到输出：

```
 Receive user = {Name:Hello laurence Id:12345 Age:21 ...}
```

获得调用结果成功

## 更多

细心的读者可以发现，以上例子编写的的服务端可以接受来自客户端的普通RPC、流式RPC调用请求。目前只编写了普通调用的Client，读者可以根据samples库中的例子来尝试编写流式客户端发起调用。

更多samples可以参阅 [【dubbo-go-samples】](../samples)
