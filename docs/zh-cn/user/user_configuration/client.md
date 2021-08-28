---
title: client
keywords: 客户端，client provider
description: 提示用户配置客户端相关配置
---

# client

## 第一步：编写客户端 `Provider`

1. 参考服务端第一步的第一点。

2. 与服务端不同的是，提供服务的方法作为结构体的参数，不需要编写具体业务逻辑。另外，`Provider` 不对应dubbo中的实现，而是对应一个接口。

   ```go
   type UserProvider struct {
   	GetUser func(ctx context.Context, req []interface{}, rsp *User) error
   }
   
   func (u *UserProvider) Reference() string {
   	return "UserProvider"
   }
   ```

   

3. 注册服务和对象

   ```go
   func init() {
   	config.SetConsumerService(userProvider)
   	hessian.RegisterPOJO(&User{})
   }
   ```

## 第二步：编写客户端主程序

1. 引入必需的dubbo-go包

   ```go
   import (
   	hessian "github.com/apache/dubbo-go-hessian2"
   	"github.com/apache/dubbo-go/config"
   	_ "github.com/apache/dubbo-go/registry/protocol"
   	_ "github.com/apache/dubbo-go/common/proxy/proxy_factory"
   	_ "github.com/apache/dubbo-go/filter/impl"
   	_ "github.com/apache/dubbo-go/cluster/cluster_impl"
   	_ "github.com/apache/dubbo-go/cluster/loadbalance"
   	_ "github.com/apache/dubbo-go/registry/zookeeper"
   
   	_ "github.com/apache/dubbo-go/protocol/dubbo"
   )
   ```

   

2. main 函数

   ```go
   func main() {
   	config.Load()
   	time.Sleep(3e9)
   
   	println("\n\n\nstart to test dubbo")
   	user := &User{}
   	err := userProvider.GetUser(context.TODO(), []interface{}{"A001"}, user)
   	if err != nil {
   		panic(err)
   	}
   	println("response result: %v\n", user)
   }
   func println(format string, args ...interface{}) {
   	fmt.Printf("\033[32;40m"+format+"\033[0m\n", args...)
   }
   ```

## 第三步：编写配置文件并配置环境变量

1. 编辑配置文件 log.yml, client.yml

   - log.yml 配置参照服务端设置

   - client.yml

   ```yml
   # dubbo client yaml configure file
   
   check: true
   # client
   request_timeout : "3s"
   # connect timeout
   connect_timeout : "3s"
   
   # application config
   application:
     organization : "ikurento.com"
     name  : "BDTService"
     module : "dubbogo user-info client"
     version : "0.0.1"
     owner : "ZX"
     environment : "release"
   
   registries :
     "hangzhouzk":
       protocol: "zookeeper"
       timeout	: "3s"
       address: "127.0.0.1:2181"
       username: ""
       password: ""
   
   
   references:
     "UserProvider":
       # 可以指定多个registry，使用逗号隔开;不指定默认向所有注册中心注册
       registry: "hangzhouzk"
       protocol : "dubbo"
       interface : "com.ikurento.user.UserProvider"
       cluster: "failover"
       methods :
         - name: "GetUser"
           retries: 3
   
   protocol_conf:
     dubbo:
       reconnect_interval: 0
       connection_number: 1
       heartbeat_period: "5s"
       session_timeout: "180s"
       pool_size: 64
       pool_ttl: 600
       getty_session_param:
         compress_encoding: false
         tcp_no_delay: true
         tcp_keep_alive: true
         keep_alive_period: "120s"
         tcp_r_buf_size: 262144
         tcp_w_buf_size: 65536
         pkg_rq_size: 1024
         pkg_wq_size: 512
         tcp_read_timeout: "1s"
         tcp_write_timeout: "5s"
         wait_timeout: "1s"
         max_msg_len: 1024000
         session_name: "client"
   ```

   

2. 把上面的两个配置文件费别配置为环境变量，为防止log的环境变量和服务端的log环境变量冲突，建议所有的环境变量不要做全局配置，在当前起效即可。

    ```shell
   export CONF_CONSUMER_FILE_PATH="xxx"
   export APP_LOG_CONF_FILE="xxx"
   ```


本文章源码详情见git：https://github.com/apache/dubbo-go-samples/tree/3.0/helloworld/go-client