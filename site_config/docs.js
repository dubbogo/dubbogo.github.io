export default {
    'en-us': {
        sidemenu: [
            {
                title: 'User Guide',
                children: [
                    {
                        title: 'Preface',
                        children: [
                            {
                                title: 'Architecture',
                                link: '/en-us/docs/user/preface/architecture.html'
                            }
                        ],
                    },
                    {
                        title: 'Quick start',
                        link: '/en-us/docs/user/quick-start.html'
                    },
                    {
                        title: 'Configuration',
                        children: [
                            {
                                title: 'Provider',
                                link: '/en-us/docs/user/configuration/provider.html'
                            }
                        ],
                    },
                    {
                        title: 'Registry configuration reference',
                        children: [
                            {
                                title: 'Introduction',
                                link: '/en-us/docs/user/registry/introduction.html',
                            },
                            {
                                title: 'Zookeeper registry',
                                link: '/en-us/docs/user/registry/zookeeper.html',
                            },
                            {
                                title: 'Nacos registry',
                                link: '/en-us/docs/user/registry/nacos.html',
                            },
                            {
                                title: 'Consul registry',
                                link: '/en-us/docs/user/registry/consul.html',
                            },
                            {
                                title: 'Etcdv3 registry',
                                link: '/en-us/docs/user/registry/etcdv3.html',
                            }
                        ]
                    }
                ],
            },
            {
                title: 'Developer guide',
                children: [
                    {
                        title: 'Design',
                        link: '/en-us/docs/developer/design.html'
                    }
                ],
            },
            {
                title: 'Source code guide',
                children: [
                    {
                        title: 'Extension',
                        link: '/en-us/docs/source_code/extension.html'
                    }
                ]
            }
        ],
        barText: 'Documentation',
    },
    'zh-cn': {
        sidemenu: [
            {
                title: '概念',
                children: [
                    {
                        title: 'Dubbo-go 是什么',
                        link: '/zh-cn/docs/user/concept/what_is_dubbogo.html',
                    },
                    {
                        title: 'RPC 调用',
                        children: [
                            {
                                title: '网络协议',
                                link: '/zh-cn/docs/user/concept/rpc/protocol.html',
                            },
                            {
                                title: '多语言 RPC',
                                link: '/zh-cn/docs/user/concept/rpc/multi_language.html',
                            },
                            {
                                title: "泛化调用",
                                link: '/zh-cn/docs/user/concept/rpc/generic.html',
                            },
                        ]
                    },
                    {
                        title: '服务治理',
                        children: [
                            {
                                title: '服务注册发现',
                                link: '/zh-cn/docs/user/concept/service_management/registry.html',
                            },
                            {
                                title: '组件加载与可扩展性',
                                link: '/zh-cn/docs/user/concept/service_management/aop_and_extension.html',
                            },
                            {
                                title: '可视化',
                                link: '/zh-cn/docs/user/concept/service_management/visualization.html',
                            },
                            {
                                title: '优雅上下线',
                                link: '/zh-cn/docs/user/concept/service_management/graceful_shutdown.html',
                            },
                            {
                                title: '柔性负载均衡',
                                link: '/zh-cn/docs/user/concept/service_management/adaptive_lb.html'
                            },
                        ]
                    },
                    {
                        title: '配置',
                        children: [
                            {
                                title: '配置基本概念',
                                link: '/zh-cn/docs/user/concept/config/basic_concept.html',
                            },
                        ]
                    },
                    {
                        title: '服务网格',
                        children: [
                            {
                                title: '无代理服务网格',
                                link: '/zh-cn/docs/user/concept/mesh/proxyless_service_mesh.html',
                            },
                        ]
                    },
                    {
                        title: '更多',
                        children: [
                            {
                                title: 'v3 版本新功能',
                                link: '/zh-cn/docs/user/concept/more/3.0_feature.html'
                            },
                            {
                                title: '应用与接口的层级关系',
                                link: '/zh-cn/docs/user/concept/more/app_and_interface.html'
                            },
                            {
                                title: '架构',
                                link: '/zh-cn/docs/user/concept/more/architecture.html'
                            }
                        ]
                    },
                ]
            },
            {
                title: '快速开始',
                children: [
                    {
                        title: '安装 Dubbo-go 开发环境',
                        link: '/zh-cn/docs/user/quickstart/install.html'
                    },
                    {
                        title: '完成一次 RPC 调用',
                        link: '/zh-cn/docs/user/quickstart/quickstart_triple.html'
                    },
                ]
            },
            {
                title: '任务',
                children: [
                    {
                        title: '服务调用',
                        children: [
                            {
                                title: '配置调用的超时',
                                link: '/zh-cn/docs/user/tasks/rpc/timeout.html'
                            },
                            {
                                title: '查看服务调用指标',
                                link: '/zh-cn/docs/user/tasks/rpc/rpc_metrics.html'
                            },
                            {
                                title: '为服务端设置限流',
                                link: '/zh-cn/docs/user/tasks/rpc/tps_limiter.html'
                            },
                            {
                                title: '与 Dubbo 应用跨语言互通',
                                link: '/zh-cn/docs/user/tasks/rpc/call_java.html'
                            },
                            {
                                title: '与 gRPC 应用互通',
                                link: '/zh-cn/docs/user/tasks/rpc/call_grpc.html'
                            },
                            {
                                title: '使用 ctx 传递上下文信息',
                                link: '/zh-cn/docs/user/tasks/rpc/context.html'
                            },
                            {
                                title: '泛化调用',
                                link: '/zh-cn/docs/user/tasks/rpc/generic.html'
                            },
                            {
                                title: '异常回传',
                                link: '/zh-cn/docs/user/tasks/rpc/error.html'
                            }
                        ],
                    },
                    {
                        title: '注册中心',
                        children: [
                            {
                                title: '使用 Nacos 作为注册中心',
                                link: '/zh-cn/docs/user/tasks/registry/nacos.html'
                            },
                            {
                                title: '多注册中心',
                                link:'/zh-cn/docs/user/tasks/registry/multi_registry.html'
                            },
                        ],
                    },
                    {
                        title: '配置',
                        children: [
                            {
                                title: '从远程加载配置启动应用',
                                link: '/zh-cn/docs/user/tasks/config/remote_config.html'
                            },
                            {
                                title: '使用配置 API 启动应用',
                                link: '/zh-cn/docs/user/tasks/config/config_api.html'
                            },
                        ],
                    },
                    {
                        title: '服务治理',
                        children: [
                            {
                                title: '自定义服务调用中间件',
                                link: '/zh-cn/docs/user/tasks/service_management/aop.html'
                            },
                            {
                                title: '优雅上下线',
                                link:'/zh-cn/docs/user/tasks/service_management/graceful_shutdown.html'
                            },
                        ],
                    },
                    {
                        title: '可视化',
                        children: [
                            {
                                title: '使用 opentelementry 协议暴露 dubbo-go 应用数据 ',
                                link: '/zh-cn/docs/user/tasks/visualization/opentelementry.html'
                            },
                            {
                                title: '自定义日志',
                                link: '/zh-cn/docs/user/tasks/visualization/logger.html'
                            },
                            {
                                title: '基于 prometheus 的指标数据上报',
                                link:'/zh-cn/docs/user/tasks/visualization/metrics.html'
                            },
                            {
                                title: '基于 jaeger 的链路追踪',
                                link:'/zh-cn/docs/user/tasks/visualization/tracing.html'
                            },
                        ],
                    },
                    {
                        title: '服务网格',
                        children: [
                            {
                                title: '部署 istio 环境',
                                link: '/zh-cn/docs/user/tasks/mesh/build.html'
                            },
                            {
                                title: '在 Istio 环境部署 Dubbo-go 应用',
                                link: '/zh-cn/docs/user/tasks/mesh/app.html'
                            },
                            {
                                title: '流量管理',
                                link: '/zh-cn/docs/user/tasks/mesh/traffic_management.html'
                            },
                            {
                                title: '使用 pixiu 网关接入 ingress 流量',
                                link:'/zh-cn/docs/user/tasks/mesh/ingress.html'
                            },
                            {
                                title: '金丝雀发布',
                                link:'/zh-cn/docs/user/tasks/mesh/gray_deploy.html'
                            },
                        ],
                    },
                    {
                        title: '调试',
                        children: [
                            {
                                title: '使用 grpc_cli 调试 triple 应用',
                                link:'/zh-cn/docs/user/tasks/debug/grpc_cli.html'
                            },
                            {
                                title: '使用dubbogo-cli 调试 dubbo 应用',
                                link:'/zh-cn/docs/user/tasks/debug/dubbogo_cli.html'
                            },
                        ],
                    },
                    {
                        title: 'Pixiu 网关',
                        children: [
                            {
                                title: '接入 Ingress 流量',
                                link: '/zh-cn/docs/user/tasks/pixiu/http_triple.html'
                            },
                        ],
                    },
                    {
                        title: '应用模板',
                        link: '/zh-cn/docs/user/tasks/cli/app_template.html'
                    },
                ]
            },
            {
                title: '示例',
                children: [
                    {
                        title: 'Dubbo-go samples',
                        link: '/zh-cn/docs/user/samples/samples_repo.html',
                        children: [
                            {
                                title: 'Go-Java 互通',
                                link: '/zh-cn/docs/user/samples/go_java_interactive.html'
                            },
                            {
                                title: '配置中心和配置监听',
                                link: '/zh-cn/docs/user/samples/config-center-dynamic.html'
                            },
                            {
                                title: 'Filter',
                                link: '/zh-cn/docs/user/samples/custom-filter.html'
                            },
                            {
                                title: '注册中心配置',
                                link: '/zh-cn/docs/user/samples/registry.html'
                            },
                            {
                                title: 'Triple 异常回传',
                                link: '/zh-cn/docs/user/samples/exception_response.html'
                            },
                            {
                                title: '日志',
                                link: '/zh-cn/docs/user/samples/custom-logger.html'
                            },
                            {
                                title: 'Metrics 数据上报',
                                link: '/zh-cn/docs/user/samples/metrics.html'
                            },
                            {
                                title: '泛化调用',
                                link: '/zh-cn/docs/user/samples/generic.html'
                            },
                            {
                                title: '使用 Pixiu 暴露 Dubbo-go 服务',
                                link: '/zh-cn/docs/user/samples/pixiu-nacos-triple.html'
                            },
                            {
                                title: '使用 grpc_cli 调试 Dubbo-go 服务',
                                link: '/zh-cn/docs/user/samples/grpc_cli.html'
                            },
                            {
                                title: '应用级服务发现',
                                link: '/zh-cn/docs/user/samples/service-discovery.html'
                            },
                            {
                                title: '路由规则',
                                link: '/zh-cn/docs/user/samples/mesh_router.html'
                            }
                        ],
                    },
                ]
            },
            {
                title: '参考',
                children: [
                    {
                        title: '配置项参考',
                        link: '/zh-cn/docs/user/refer/config.html'
                    },
                    {
                        title: 'dubbogo-cli 工具',
                        link: '/zh-cn/docs/user/refer/use_dubbogo_cli.html'
                    },
                    {
                        title: 'Dubbo-go 生态项目介绍',
                        link: '/zh-cn/docs/user/ecology/ecology.html'
                    },
                    {
                        title: '适配版本号',
                        link: '/zh-cn/docs/user/refer/compatible_version.html'
                    }
                ]
            },
            {
                title: '源码解读',
                children: [
                    {
                        title: '网络协议',
                        link: '/zh-cn/docs/user/sourcecode/protocol.html'
                    },
                    {
                        title: '注册中心',
                        link: '/zh-cn/docs/user/sourcecode/registry.html'
                    }
                ]
            },

        ],
        barText: '文档',
    }
};
