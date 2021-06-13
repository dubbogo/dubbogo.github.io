export default {
    'en-us': {
        sidemenu: [
            {
                title: 'User guide',
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
                        title: 'Quick Start',
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
                                title: 'Dubbo-go 3.0 简介',
                                link: '/zh-cn/docs/user/preface/3.0_feature.html'
                            },
                            {
                                title: '架构',
                                link: '/zh-cn/docs/user/preface/architecture.html'
                            },
                        ]
                    },
                    {
                        title: '快速开始',
                        link: '/zh-cn/docs/user/quickstart/3.0/quickstart.html',
                    },
                    {
                        title: '用户配置',
                        children: [
                            {
                                title: '服务提供者',
                                link: '',
                            },
                            {
                                title: '客户端',
                                link: '',
                            },
                            {
                                title: '协议选择',
                                link: '',
                            },
                            {
                                title: '注册中心',
                                link: '',
                            },
                            {
                                title: '路由规则',
                                link: '',
                            }
                        ]
                    },
                    {
                        title: '示例项目',
                        link: '/zh-cn/docs/user/samples/samples.html',
                    },
                    {
                        title: '开发者指南',
                        children: [
                            {
                                title: '框架设计',
                                link: '/zh-cn/docs/developer/design.html'
                            }
                        ],
                    },
                ]
            },
            {
                title: 'Dubbo-go 1.5',
                children: [
                    {
                        title: '简介',
                        children: [
                            {
                                title: 'dubbo-go 1.5 简介',
                                link: '/zh-cn/docs/user/preface/1.5_introduce.html'
                            },
                            {
                                title: '架构',
                                link: '/zh-cn/docs/user/preface/architecture.html'
                            },
                        ]
                    },
                    {
                        title: '快速开始',
                        link: '/zh-cn/docs/user/quick-start.html'
                    },
                    {
                        title: '配置',
                        children: [
                            {
                                title: '提供者',
                                link: '/zh-cn/docs/user/configuration/provider.html'
                            }
                        ],
                    },
                    {
                        title: '注册中心参考手册',
                        children: [
                            {
                                title: '介绍',
                                link: '/zh-cn/docs/user/registry/introduction.html',
                            },
                            {
                                title: 'Zookeeper 注册中心',
                                link: '/zh-cn/docs/user/registry/zookeeper.html',
                            },
                            {
                                title: 'Nacos 注册中心',
                                link: '/zh-cn/docs/user/registry/nacos.html',
                            },
                            {
                                title: 'Consul 注册中心',
                                link: '/zh-cn/docs/user/registry/consul.html',
                            },
                            {
                                title: 'Etcdv3 注册中心',
                                link: '/zh-cn/docs/user/registry/etcdv3.html',
                            }
                        ]
                    }
                ]
            }
        ],
        barText: '文档',
    }
};
