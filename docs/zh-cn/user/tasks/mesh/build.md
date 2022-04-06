---
title: 部署 Istio 环境
keywords: 部署 Istio 环境
description: 部署 Istio 环境
---

# 部署 Istio 环境

## 1. 准备工作

- docker、helm、kubectl 环境已安装。
- dubbo-go cli 工具和依赖工具已安装

## 2. 部署 Istio 环境

使用helm 安装 istio 基础 CRD 和 istiod 组件。也可以参考 [官网教程](istio.io) 使用 istioctl 安装。

```
$ helm repo add istio https://istio-release.storage.googleapis.com/charts
$ kubectl create namespace istio-system
$ helm install istio-base istio/base -n istio-system
$ helm install istiod istio/istiod --namespace istio-system
```

安装完成后，可以在 istio-system 命名空间下看到 istiod pod 正常运行。

