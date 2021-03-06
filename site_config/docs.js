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
                title: '??????',
                children: [
                    {
                        title: 'Dubbo-go ?????????',
                        link: '/zh-cn/docs/user/concept/what_is_dubbogo.html',
                    },
                    {
                        title: 'RPC ??????',
                        children: [
                            {
                                title: '????????????',
                                link: '/zh-cn/docs/user/concept/rpc/protocol.html',
                            },
                            {
                                title: '????????? RPC',
                                link: '/zh-cn/docs/user/concept/rpc/multi_language.html',
                            },
                            {
                                title: "????????????",
                                link: '/zh-cn/docs/user/concept/rpc/generic.html',
                            },
                        ]
                    },
                    {
                        title: '????????????',
                        children: [
                            {
                                title: '??????????????????',
                                link: '/zh-cn/docs/user/concept/service_management/registry.html',
                            },
                            {
                                title: '???????????????????????????',
                                link: '/zh-cn/docs/user/concept/service_management/aop_and_extension.html',
                            },
                            {
                                title: '?????????',
                                link: '/zh-cn/docs/user/concept/service_management/visualization.html',
                            },
                            {
                                title: '???????????????',
                                link: '/zh-cn/docs/user/concept/service_management/graceful_shutdown.html',
                            },
                            {
                                title: '??????????????????',
                                link: '/zh-cn/docs/user/concept/service_management/adaptive_lb.html'
                            },
                        ]
                    },
                    {
                        title: '??????',
                        children: [
                            {
                                title: '??????????????????',
                                link: '/zh-cn/docs/user/concept/config/basic_concept.html',
                            },
                        ]
                    },
                    {
                        title: '????????????',
                        children: [
                            {
                                title: '?????????????????????',
                                link: '/zh-cn/docs/user/concept/mesh/proxyless_service_mesh.html',
                            },
                        ]
                    },
                    {
                        title: '??????',
                        children: [
                            {
                                title: 'v3 ???????????????',
                                link: '/zh-cn/docs/user/concept/more/3.0_feature.html'
                            },
                            {
                                title: '??????????????????????????????',
                                link: '/zh-cn/docs/user/concept/more/app_and_interface.html'
                            },
                            {
                                title: '??????',
                                link: '/zh-cn/docs/user/concept/more/architecture.html'
                            }
                        ]
                    },
                ]
            },
            {
                title: '????????????',
                children: [
                    {
                        title: '??????????????????',
                        link: '/zh-cn/docs/user/quickstart/install.html'
                    },
                    {
                        title: '???????????? RPC ??????',
                        link: '/zh-cn/docs/user/quickstart/quickstart_triple.html'
                    },
                ]
            },
            {
                title: '??????',
                children: [
                    {
                        title: '????????????',
                        children: [
                            {
                                title: '??????????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/timeout.html'
                            },
                            {
                                title: '??????????????????????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/rpc_metrics.html'
                            },
                            {
                                title: '????????????????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/tps_limiter.html'
                            },
                            {
                                title: '??? Dubbo ?????????????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/call_java.html'
                            },
                            {
                                title: '??? gRPC ????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/call_grpc.html'
                            },
                            {
                                title: '?????? ctx ?????????????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/context.html'
                            },
                            {
                                title: '????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/generic.html'
                            },
                            {
                                title: '????????????',
                                link: '/zh-cn/docs/user/tasks/rpc/error.html'
                            }
                        ],
                    },
                    {
                        title: '????????????',
                        children: [
                            {
                                title: '?????? Nacos ??????????????????',
                                link: '/zh-cn/docs/user/tasks/registry/nacos.html'
                            },
                            {
                                title: '???????????????',
                                link:'/zh-cn/docs/user/tasks/registry/multi_registry.html'
                            },
                        ],
                    },
                    {
                        title: '??????',
                        children: [
                            {
                                title: '?????????????????????????????????',
                                link: '/zh-cn/docs/user/tasks/config/remote_config.html'
                            },
                            {
                                title: '???????????? API ????????????',
                                link: '/zh-cn/docs/user/tasks/config/config_api.html'
                            },
                        ],
                    },
                    {
                        title: '????????????',
                        children: [
                            {
                                title: '??????????????????????????????',
                                link: '/zh-cn/docs/user/tasks/service_management/aop.html'
                            },
                            {
                                title: '???????????????',
                                link:'/zh-cn/docs/user/tasks/service_management/graceful_shutdown.html'
                            },
                        ],
                    },
                    {
                        title: '????????????',
                        children: [
                            {
                                title: '?????? Istio ??????',
                                link: '/zh-cn/docs/user/tasks/mesh/build.html'
                            },
                            {
                                title: '??? Istio ???????????? Dubbo-go ??????',
                                link: '/zh-cn/docs/user/tasks/mesh/app.html'
                            },
                            {
                                title: '????????????',
                                link: '/zh-cn/docs/user/tasks/mesh/traffic_management.html'
                            },
                            {
                                title: '?????? Pixiu ???????????? Ingress ??????',
                                link:'/zh-cn/docs/user/tasks/mesh/ingress.html'
                            },
                            {
                                title: '???????????????',
                                link:'/zh-cn/docs/user/tasks/mesh/gray_deploy.html'
                            },
                        ],
                    },
                    {
                        title: '?????????',
                        children: [
                            {
                                title: '?????? Opentelementry ??????',
                                link: '/zh-cn/docs/user/tasks/visualization/opentelementry.html'
                            },
                            {
                                title: '??????',
                                link: '/zh-cn/docs/user/tasks/visualization/logger.html'
                            },
                            {
                                title: '?????? Prometheus ???????????????',
                                link:'/zh-cn/docs/user/tasks/visualization/metrics.html'
                            },
                            {
                                title: '?????? Jaeger ???????????????',
                                link:'/zh-cn/docs/user/tasks/visualization/tracing.html'
                            },
                        ],
                    },
                    {
                        title: '??????',
                        children: [
                            {
                                title: '?????? grpc_cli ?????? triple ??????',
                                link:'/zh-cn/docs/user/tasks/debug/grpc_cli.html'
                            },
                            {
                                title: '??????dubbogo-cli ?????? dubbo ??????',
                                link:'/zh-cn/docs/user/tasks/debug/dubbogo_cli.html'
                            },
                        ],
                    },
                    {
                        title: 'Pixiu ??????',
                        children: [
                            {
                                title: '?????? Ingress ??????',
                                link: '/zh-cn/docs/user/tasks/pixiu/http_triple.html'
                            },
                        ],
                    },
                    {
                        title: '????????????',
                        link: '/zh-cn/docs/user/tasks/cli/app_template.html'
                    },
                ]
            },
            {
                title: '??????',
                children: [
                    {
                        title: 'Dubbo-go samples',
                        link: '/zh-cn/docs/user/samples/samples_repo.html',
                        children: [
                            {
                                title: 'Go-Java ??????',
                                link: '/zh-cn/docs/user/samples/go_java_interactive.html'
                            },
                            {
                                title: '???????????????????????????',
                                link: '/zh-cn/docs/user/samples/config-center-dynamic.html'
                            },
                            {
                                title: 'Filter',
                                link: '/zh-cn/docs/user/samples/custom-filter.html'
                            },
                            {
                                title: '??????????????????',
                                link: '/zh-cn/docs/user/samples/registry.html'
                            },
                            {
                                title: 'Triple ????????????',
                                link: '/zh-cn/docs/user/samples/exception_response.html'
                            },
                            {
                                title: '??????',
                                link: '/zh-cn/docs/user/samples/custom-logger.html'
                            },
                            {
                                title: 'Metrics ????????????',
                                link: '/zh-cn/docs/user/samples/metrics.html'
                            },
                            {
                                title: '????????????',
                                link: '/zh-cn/docs/user/samples/generic.html'
                            },
                            {
                                title: '?????? Pixiu ?????? Dubbo-go ??????',
                                link: '/zh-cn/docs/user/samples/pixiu-nacos-triple.html'
                            },
                            {
                                title: '?????? grpc_cli ?????? Dubbo-go ??????',
                                link: '/zh-cn/docs/user/samples/grpc_cli.html'
                            },
                            {
                                title: '?????????????????????',
                                link: '/zh-cn/docs/user/samples/service-discovery.html'
                            },
                            {
                                title: '????????????',
                                link: '/zh-cn/docs/user/samples/mesh_router.html'
                            }
                        ],
                    },
                ]
            },
            {
                title: '??????',
                children: [
                    {
                        title: '???????????????',
                        link: '/zh-cn/docs/user/refer/config.html'
                    },
                    {
                        title: 'dubbogo-cli ??????',
                        link: '/zh-cn/docs/user/refer/use_dubbogo_cli.html'
                    },
                    {
                        title: 'Dubbo-go ??????????????????',
                        link: '/zh-cn/docs/user/ecology/ecology.html'
                    },
                    {
                        title: '???????????????',
                        link: '/zh-cn/docs/user/refer/compatible_version.html'
                    }
                ]
            },
            {
                title: '????????????',
                children: [
                    {
                        title: '????????????',
                        link: '/zh-cn/docs/user/sourcecode/protocol.html'
                    },
                    {
                        title: '????????????',
                        link: '/zh-cn/docs/user/sourcecode/registry.html'
                    }
                ]
            },

        ],
        barText: '??????',
    }
};
