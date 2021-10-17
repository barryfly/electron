import { LAYOUT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/editor',
    name: 'Editor',
    component: LAYOUT,
    redirect: '/editor/index',
    meta: {
        title: 'editor',
        // middleware: [auth]
    },
    children: [
        {
           path: 'index',
           name: 'EditorPage',
           component: () => import(/* webpackChunkName: "editor" */ 'views/editor/index.vue')
        },
    ]
}