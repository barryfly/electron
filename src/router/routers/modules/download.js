import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/download',
    name: 'Download',
    component: LAYOUT,
    redirect: '/download/index',
    meta: {
        title: 'Download',
        // middleware: [auth]
    },
    children: [
        {
           path: 'index',
           name: 'DownloadPage',
           component: () => import(/* webpackChunkName: "download" */ 'views/download/index.vue')
        },
    ]
}