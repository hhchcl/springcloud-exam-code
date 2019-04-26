const index = resolve => require(['@/views/components/index'], resolve)

let routes = [
    //主页
    { path: '/components/index', component: index, name: 'index' },
];

// 向外暴露routers，其他地方可以直接引用
export default routes