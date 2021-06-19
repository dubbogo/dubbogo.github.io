---
title: Registry
keywords: Registry，注册中心
description: 提示用户dubbogo可以使用的几种注册中心
---

# Registry

目前dubbo-go支持的注册中心有nacos，zookeeper，etcd，kubernetes，servicediscovery，后续将加入更多支持。

本节将介绍dubbo-go整合zookeeper作为注册中心，更多注册中心配置请参考注册中心参考手册

## zookeeper作为注册中心

分别在服务端和客服端的配置文件中进行配置即可整合zookeeper

```yml
registries :
  "Registryzk":
    protocol: "zookeeper"
    timeout	: "3s"
    address: "127.0.0.1:2181"
    username: ""
    password: ""
```

