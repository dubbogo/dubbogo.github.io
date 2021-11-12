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
                title: 'Dubbo-go 3.0',
                children: [
                    {
                        title: '简介',
                        children: [
                            {
                                title: '新特性介绍',
                                link: '/zh-cn/docs/user/preface/3.0_feature.html'
                            },
                            {
                                title: '架构',
                                link: '/zh-cn/docs/user/preface/architecture.html'
                            }
                        ]
                    },
                    {
                        title: '快速开始',
                        children: [
                            {
                                title: 'Triple 协议快速开始',
                                link: '/zh-cn/docs/user/quickstart/3.0/quickstart_triple.html',
                            },
                            {
                                title: 'Dubbo 协议快速开始',
                                link: '/zh-cn/docs/user/quickstart/3.0/quickstart_dubbo.html',
                            }
                        ]
                    },
                    {
                        title: '基本概念',
                        children: [
                            {
                                title: '服务层级',
                                link: '/zh-cn/docs/user/concept/app_and_interface.html',
                            },
                            {
                                title: '网络协议',
                                link: '/zh-cn/docs/user/concept/protocol.html',
                            },
                            {
                                title: '注册中心',
                                link: '/zh-cn/docs/user/concept/registry.html',
                            },
                            {
                                title: '框架配置',
                                link: '/zh-cn/docs/user/concept/configuration.html',
                            }
                        ]
                    },
                    {
                        title: '高级使用',
                        children: [
                            {
                                title: 'Samples 仓库介绍',
                                link: '/zh-cn/docs/user/samples/samples_repo.html',
                            },
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
                                title: '应用级服务发现',
                                link: '/zh-cn/docs/user/samples/service-discovery.html'
                            },
                            {
                                title: '路由规则',
                                link: '/zh-cn/docs/user/samples/mesh_router.html'
                            }
                        ]
                    },
                    {
                        title: '开发者指南',
                        children: [
                            {
                                title: '框架设计',
                                link: '/zh-cn/docs/developer/design.html'
                            }
                        ]
                    },
                ]
            },
            {
                title: 'Dubbo-go 1.5',
                children: [
                    {
                        title: '快速开始',
                        link: '/zh-cn/docs/user/quickstart/1.5/quick-start.html'
                    },
                    {
                        title: '配置',
                        children: [
                            {
                                title: '服务提供者',
                                link: '/zh-cn/docs/user/configuration/provider.html'
                            },
                            {
                                title: '消费者',
                                link: '/zh-cn/docs/user/configuration/client.html'
                            }
                        ],
                    }
                ]
            },
            {
                title: 'Dubbo-go 生态项目',
                children: [
                    {
                        title: 'Dubbo-go 生态项目',
                        link: '/zh-cn/docs/user/ecology/ecology.html'
                    }
                ]
            }
        ],
        barText: '文档',
    }
};
