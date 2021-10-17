import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/about',
    name: 'About',
    component: LAYOUT,
    redirect: '/about/index',
    meta: {
        title: 'about',
        // middleware: [auth]
    },
    children: [
        {
           path: 'index',
           name: 'AboutPage',
           component: () => import(/* webpackChunkName: "about" */ 'views/about/index.vue')
        },
    ]
}