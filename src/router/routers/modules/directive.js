import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/directive',
    name: 'Directive',
    component: LAYOUT,
    redirect: '/directive/copy',
    meta: {
        title: 'Directive',
        // middleware: [auth]
    },
    children: [{
            path: 'copy',
            name: 'Copy',
            component: () => import( /* webpackChunkName: "copy" */ 'views/directive/copy.vue')
        },
        {
            path: 'longpress',
            name: 'Longpress',
            component: () => import( /* webpackChunkName: "longpress" */ 'views/directive/longpress.vue')
        },
        {
            path: 'watermark',
            name: 'Watermark',
            component: () => import( /* webpackChunkName: "watermark" */ 'views/directive/watermark.vue')
        },
        {
            path: 'debounce',
            name: 'Debounce',
            component: () => import( /* webpackChunkName: "debounce" */ 'views/directive/debounce.vue')
        },
        {
            path: 'permission',
            name: 'Permission',
            component: () => import( /* webpackChunkName: "permission" */ 'views/directive/permission.vue')
        },
        {
            path: 'draggable',
            name: 'Draggable',
            component: () => import( /* webpackChunkName: "draggable" */ 'views/directive/draggable.vue')
        },
        {
            path: 'lazyload',
            name: 'Lazyload',
            component: () => import( /* webpackChunkName: "lazyload" */ 'views/directive/lazyload.vue')
        },
    ]
}