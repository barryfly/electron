import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/flow',
    name: 'Flow',
    component: LAYOUT,
    redirect: '/flow/index',
    meta: {
        title: 'Flow',
        // middleware: [auth]
    },
    children: [
        {
           path: 'index',
           name: 'FlowPage',
           component: () => import(/* webpackChunkName: "flow" */ 'views/flow-chart/index.vue')
        },
    ]
}