import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/lock',
    name: 'Lock',
    component: LAYOUT,
    redirect: '/lock/tea',
    meta: {
        title: 'Lock',
        // middleware: [auth]
    },
    children: [{
            path: 'tea',
            name: 'Tea',
            component: () => import( /* webpackChunkName: "tea" */ 'views/lock/tea.vue')
        },
        {
            path: 'lamp',
            name: 'Lamp',
            component: () => import( /* webpackChunkName: "lamp" */ 'views/lock/lamp.vue')
        },
        {
            path: 'loading',
            name: 'Loading',
            component: () => import( /* webpackChunkName: "loading" */ 'views/lock/loading.vue')
        },
    ]
}