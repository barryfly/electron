import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/capture',
    name: 'Capture',
    component: LAYOUT,
    redirect: '/capture/index',
    meta: {
        title: 'Capture',
        // middleware: [auth]
    },
    children: [
        {
           path: 'index',
           name: 'CapturePage',
           component: () => import(/* webpackChunkName: "capture" */ 'views/capture/index.vue')
        },
    ]
}