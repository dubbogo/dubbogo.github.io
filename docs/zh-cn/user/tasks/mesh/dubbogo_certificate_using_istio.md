---
title: dubbo-go 获取isito 证书并使用
keywords:  dubbo-go 获取isito 证书并使用
description:  dubbo-go 获取 isito 证书并使用
---

本文介绍 dubbo go 如何获取到 istio 颁发的证书以及如何在 dubbo-go 的 rpc 通信中使用这些证书。

## 获取istio证书

分为有 istio-agent 和无 istio-agent 的情形。

### 存在istio-agent

istio-agent 是 istio 提供的辅助xds协议的 sidecar ，包括证书的获取、证书的过期检查等。  
  
此情形下，我们可以将证书的获取和更新工作交给 istio-agent ，应用侧只需要监听证书文件即可。

可以用 annotation 拉起一个 istio-agent , 确保命名空间被打标签：`kubectl label namespace default istio-injection=enabled`  

此处我们可以用 grpc-agent 来代替, spec 文件如下：  

```yaml
spec:
  template:
    metadata:
      annotations:
        inject.istio.io/templates: grpc-agent
        proxy.istio.io/config: '{"holdApplicationUntilProxyStarts": true}'
```

istio-agent 会注入环境变量`GRPC_XDS_BOOTSTRAP=/etc/istio/proxy/grpc-bootstrap.json`，告诉了我们 grpc-bootstrap.json 的位置，解析此 json 文件我们可以知道 certificate_file (公钥)、private_key_file (私钥)、ca_certificate_file ( isito-ca 的公钥)文件的位置，即可得到证书。  

grpc-bootstrap.json 文件示例如下：

```yaml
{
  "xds_servers": [
    {
      "server_uri": "unix:///etc/istio/proxy/XDS",
      "channel_creds": [
        {
          "type": "insecure"
        }
      ],
      "server_features": [
        "xds_v3"
      ]
    }
  ],
  "node": {
    "id": "sidecar~172.17.144.159~echo-v1-i3c-a-ed37cfb2-756bfffcbb-f4lws.echo-grpc~echo-grpc.svc.cluster.local",
    "metadata": {
      "ANNOTATIONS": {
        "dev.nocalhost/nocalhost-dev": "nocalhost-dev",
        "inject.istio.io/templates": "grpc-agent",
        "kubernetes.io/config.seen": "2022-07-03T22:39:22.131136080+08:00",
        "kubernetes.io/config.source": "api",
        "kubernetes.io/psp": "ack.privileged",
        "prometheus.io/path": "/stats/prometheus",
        "prometheus.io/port": "15020",
        "prometheus.io/scrape": "true",
        "proxy.istio.io/config": "{\"holdApplicationUntilProxyStarts\": true}",
        "proxy.istio.io/overrides": "{\"containers\":[{\"name\":\"nocalhost-dev\",\"image\":\"nocalhost-docker.pkg.coding.net/nocalhost/dev-images/golang:1.16\",\"command\":[\"/bin/sh\",\"-c\",\"tail -f /dev/null\"],\"args\":[\"--metrics=15014\",\"--port\",\"18080\",\"--tcp\",\"19090\",\"--xds-grpc-server=17070\",\"--grpc\",\"17070\",\"--grpc\",\"17171\",\"--port\",\"3333\",\"--port\",\"8080\",\"--version\",\"v1\",\"--crt=/cert.crt\",\"--key=/cert.key\"],\"workingDir\":\"/home/nocalhost-dev\",\"ports\":[{\"containerPort\":17070,\"protocol\":\"TCP\"},{\"containerPort\":17171,\"protocol\":\"TCP\"},{\"containerPort\":8080,\"protocol\":\"TCP\"},{\"name\":\"tcp-health-port\",\"containerPort\":3333,\"protocol\":\"TCP\"}],\"env\":[{\"name\":\"INSTANCE_IP\",\"valueFrom\":{\"fieldRef\":{\"apiVersion\":\"v1\",\"fieldPath\":\"status.podIP\"}}}],\"resources\":{},\"volumeMounts\":[{\"name\":\"nocalhost-syncthing\",\"mountPath\":\"/var/syncthing\",\"subPath\":\"syncthing\"},{\"name\":\"nocalhost-syncthing-secret\",\"mountPath\":\"/var/syncthing/secret\"},{\"name\":\"nocalhost-shared-volume\",\"mountPath\":\"/home/nocalhost-dev\"},{\"name\":\"kube-api-access-g8v66\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"terminationMessagePolicy\":\"File\",\"imagePullPolicy\":\"Always\",\"securityContext\":{\"privileged\":true}},{\"name\":\"nocalhost-sidecar\",\"image\":\"nocalhost-docker.pkg.coding.net/nocalhost/public/nocalhost-sidecar:sshversion\",\"command\":[\"/bin/sh\",\"-c\"],\"args\":[\"rc-service sshd restart \\u0026\\u0026 unset STGUIADDRESS \\u0026\\u0026 cp /var/syncthing/secret/* /var/syncthing/ \\u0026\\u0026 /bin/entrypoint.sh \\u0026\\u0026 /bin/syncthing -home /var/syncthing\"],\"workingDir\":\"/home/nocalhost-dev\",\"resources\":{\"limits\":{\"cpu\":\"1\",\"memory\":\"1Gi\"},\"requests\":{\"cpu\":\"100m\",\"memory\":\"50Mi\"}},\"volumeMounts\":[{\"name\":\"nocalhost-syncthing\",\"mountPath\":\"/var/syncthing\",\"subPath\":\"syncthing\"},{\"name\":\"nocalhost-syncthing-secret\",\"mountPath\":\"/var/syncthing/secret\"},{\"name\":\"nocalhost-shared-volume\",\"mountPath\":\"/home/nocalhost-dev\"},{\"name\":\"kube-api-access-g8v66\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"terminationMessagePolicy\":\"File\",\"imagePullPolicy\":\"Always\"}]}",
        "sidecar.istio.io/rewriteAppHTTPProbers": "false",
        "sidecar.istio.io/status": "{\"initContainers\":null,\"containers\":[\"nocalhost-dev\",\"nocalhost-sidecar\",\"istio-proxy\"],\"volumes\":[\"workload-socket\",\"workload-certs\",\"istio-xds\",\"istio-data\",\"istio-podinfo\",\"istio-token\",\"istiod-ca-cert\"],\"imagePullSecrets\":null,\"revision\":\"default\"}"
      },
      "APP_CONTAINERS": "nocalhost-dev,nocalhost-sidecar",
      "CLUSTER_ID": "Kubernetes",
      "ENVOY_PROMETHEUS_PORT": 15090,
      "ENVOY_STATUS_PORT": 15021,
      "GENERATOR": "grpc",
      "INSTANCE_IPS": "172.17.144.159",
      "INTERCEPTION_MODE": "REDIRECT",
      "ISTIO_PROXY_SHA": "6e1c8fd2905565dab1fec21ee9dc0dfbd2e056d8",
      "ISTIO_VERSION": "1.14.0",
      "LABELS": {
        "identifier": "i3c-a6-f6-55-c9-ab",
        "nocalhost.dev.workload.ignored": "true",
        "origin-workload-name": "echo-v1",
        "origin-workload-type": "deployment",
        "pod-template-hash": "756bfffcbb",
        "service.istio.io/canonical-name": "echo-v1-i3c-a-ed37cfb2",
        "service.istio.io/canonical-revision": "latest"
      },
      "MESH_ID": "cluster.local",
      "NAME": "echo-v1-i3c-a-ed37cfb2-756bfffcbb-f4lws",
      "NAMESPACE": "echo-grpc",
      "OWNER": "kubernetes://apis/apps/v1/namespaces/echo-grpc/deployments/echo-v1-i3c-a-ed37cfb2",
      "PILOT_SAN": [
        "istiod.istio-system.svc"
      ],
      "POD_PORTS": "[{\"containerPort\":17070,\"protocol\":\"TCP\"},{\"containerPort\":17171,\"protocol\":\"TCP\"},{\"containerPort\":8080,\"protocol\":\"TCP\"},{\"name\":\"tcp-health-port\",\"containerPort\":3333,\"protocol\":\"TCP\"}]",
      "PROV_CERT": "var/run/secrets/istio/root-cert.pem",
      "PROXY_CONFIG": {
        "binaryPath": "/usr/local/bin/envoy",
        "concurrency": 2,
        "configPath": "./etc/istio/proxy",
        "controlPlaneAuthPolicy": "MUTUAL_TLS",
        "discoveryAddress": "istiod.istio-system.svc:15012",
        "drainDuration": "45s",
        "holdApplicationUntilProxyStarts": true,
        "parentShutdownDuration": "60s",
        "proxyAdminPort": 15000,
        "serviceCluster": "istio-proxy",
        "statNameLength": 189,
        "statusPort": 15020,
        "terminationDrainDuration": "5s",
        "tracing": {
          "zipkin": {
            "address": "zipkin.istio-system:9411"
          }
        }
      },
      "SERVICE_ACCOUNT": "default",
      "WORKLOAD_NAME": "echo-v1-i3c-a-ed37cfb2"
    },
    "locality": {},
    "UserAgentVersionType": null
  },
  "certificate_providers": {
    "default": {
      "plugin_name": "file_watcher",
      "config": {
        "certificate_file": "/var/lib/istio/data/cert-chain.pem",
        "private_key_file": "/var/lib/istio/data/key.pem",
        "ca_certificate_file": "/var/lib/istio/data/root-cert.pem",
        "refresh_interval": "900s"
      }
    }
  },
  "server_listener_resource_name_template": "xds.istio.io/grpc/lds/inbound/%s"
}#
```

### 不存在istio-agent

没有 istio-agent 的情况下，我们需要通过在应用侧生成公钥、私钥并通过 Grpc 协议与 istio-ca 通信签署证书。在通信之前，
istio-ca 需要请求方放验证自己的身份，其通过 kubernetes 的 serviceaccount ( JWT 形式)来进行验证。众所周知，pod 在启动的时候都会默认被 kubernetes 挂载一个 serviceaccount 。  

istio 对JWT的验证( JWT_POLICY )分为 first-party-jwt 和third-party-jwt ，说明如下： 

> To authenticate with the Istio control plane, the Istio proxy will use a Service Account token. Kubernetes supports two forms of these tokens:
> - Third party tokens, which have a scoped audience and expiration.
> - First party tokens, which have no expiration and are mounted into all pods.  
> Because the properties of the first party token are less secure, Istio will default to using third party tokens. However, this feature is not enabled on all Kubernetes platforms.

简单来说，first-party-jwt 不会验证aud字段，third-party-jwt 会验证 aud 字段，但为了兼容低版本 kubernetes 当 aud 字段不存在时不会验证 aud 。  

kubernetes 版本<=1.21.x时，kubernetes 挂载到 pod 上的 serviceaccount 里没有 aud 字段，所以 istio 也会放行这种 serviceaccount 。  

kubernetes 版本>1.21.x时, serviceaccount 会有 aud 字段，在 third-party-jwt 模式下，istio 只允许 aud=istio-ca 的s erviceaccount 通过。所以这种情况下，我们只能给 dubbo-go 应用容器挂载 aud=isito-ca 的 serviceaccount ，spec 配置如下：  

```yaml
    spec:
      containers:
        - image: zlber/dubbo-go-client:1.0.0    #我的镜像是从本地的Harbor上拉取
          name: istio-ca                                 #镜像名称
          env:
           - name: POD_NAME
             valueFrom:
               fieldRef:
                 fieldPath: metadata.name
           - name: POD_NAMESPACE
             valueFrom:
               fieldRef:
                 fieldPath: metadata.namespace
          securityContext:
            privileged: true
          volumeMounts:
            - mountPath: /var/run/secrets/tokens
              name: istio-token
      volumes:
        - name: istio-token
          projected:
            defaultMode: 420
            sources:
              - serviceAccountToken:
                  audience: istio-ca
                  expirationSeconds: 43200
                  path: istio-token
```

或者我们可以修改 isito 的 JWT 策略，改成 first-party-jwt ，在 istio 启动的时候加入如下设置：

```yaml
--set values.global.jwtPolicy=first-party-jwt
```

通信之前，客户端也需要验证 istio-ca 的身份，此处是通过 root-cert 进行验证，所以需要将 istio 的 root-cert 挂载到容器中。相关挂载配置如下：

```yaml
  volumes:
  - configMap:
      defaultMode: 420
      name: istio-ca-root-cert
    name: istiod-ca-cert
   
   volumeMounts:
    - mountPath: /var/run/secrets/istio
      name: istiod-ca-cert
    - mountPath: /var/lib/istio/data    
```

至此，无论通过哪种方式我们都获取到了istio-ca颁发的证书。

## 使用isitio证书

### 获取证书管理器： 

在此之前确保上面的步骤都正确，才能获取到证书。

```yaml
  //获取证书管理器
  manager, _ := NewCertManager()
  //获取证书
    cert, _ := manager.GetCertificate()
   //获取根证书
    root, _ := manager.GetRootCertificate()
```

注意:isito-ca 签署的证书不能添加 SAN(Subject Alternative Name) ，而是通过uri进行标识，例如：URI:spiffe://cluster.local/ns/default/sa/default，但 Grpc 的 credentials.NewTLS 在 tls 握手阶段会校验 ServerName 与证书上的 SAN 是否一直，所以会导致证书校验不通过，可以通过配置 InsecureSkipVerify: true 跳过证书校验。若是想校验证书，可以通过自己实现 `credentials.TransportCredentials` 校验 uri 。

### server端：

```yaml
func server(manager CertManager) {

    cert, _ := manager.GetCertificate()
    root, _ := manager.GetRootCertificate()

    tlsConf := &tls.Config{
        ServerName:   "spiffe://cluster.local/ns/default/sa/default",
        ClientAuth:   tls.RequireAndVerifyClientCert,
        Certificates: cert,
        ClientCAs:    root,  
        InsecureSkipVerify: true,
        VerifyPeerCertificate: func(rawCerts [][]byte, verifiedChains [][]*x509.Certificate) error {
            //添加自己的证书校验逻辑
      return nil
        },
    }

    // 开启服务端监听
    listener, err := net.Listen("tcp", "127.0.0.1:8000")
    if err != nil {
        panic(err)
    }
    defer listener.Close()

    server := grpc.NewServer(grpc.Creds(credentials.NewTLS(tlsConf)))

    RegisterHelloWorldServer(server, NewHelloService())

    server.Serve(listener)
}
```

### client端：

```yaml
func client(manager CertManager) {
    time.Sleep(time.Second * 2)
    cert, _ := manager.GetCertificate()
    root, _ := manager.GetRootCertificate()

    creds := credentials.NewTLS(&tls.Config{
        ServerName:   "spiffe://cluster.local/ns/default/sa/default",
        Certificates: cert,
        RootCAs:      root,
        VerifyPeerCertificate: func(rawCerts [][]byte, verifiedChains [][]*x509.Certificate) error {
          //添加自己的证书校验逻辑
      return nil
        },
        InsecureSkipVerify: true,
    })
    fmt.Println(creds)
    clientCredentials, err := xds.NewClientCredentials(xds.ClientOptions{
        FallbackCreds: insecure.NewCredentials(),
    })
    fmt.Println(clientCredentials, err)
    conn, err := grpc.Dial("127.0.0.1:8000", grpc.WithTransportCredentials(creds))
    if err != nil {
        panic(err)
    }
    defer conn.Close()

    grpcClient := NewHelloWorldClient(conn)

    say, err := grpcClient.SayHelloWorld(context.Background(), &HelloWorldRequest{
        Referer: "hello",
    })
    fmt.Println(say)
}
```

## 参考
[https://istio.io/latest/docs/ops/best-practices/security/#configure-third-party-service-account-tokens](https://istio.io/latest/docs/ops/best-practices/security/#configure-third-party-service-account-tokens)