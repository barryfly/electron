import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/setup',
    name: 'Setup',
    component: LAYOUT,
    redirect: '/setup/index',
    meta: {
        title: 'Setup',
        // middleware: [auth]
    },
    children: [
        {
           path: 'index',
           name: 'SetupPage',
           component: () => import(/* webpackChunkName: "setup" */ 'views/setup/index.vue')
        },
    ]
}