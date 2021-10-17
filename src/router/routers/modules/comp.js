import { LAYOUT, REDIRECT } from 'router/constant'
// import auth from 'router/middleware/auth'
export default {
    path: '/comp',
    name: 'Comp',
    component: LAYOUT,
    redirect: '/comp/form',
    meta: {
        title: 'Comp',
        // middleware: [auth]
    },
    children: [{
            path: 'form',
            name: 'Form',
            component: () => import( /* webpackChunkName: "form" */ 'views/form/index.vue')
        },
        {
            path: 'qrcode',
            name: 'Qrcode',
            component: () => import( /* webpackChunkName: "qrcode" */ 'views/qrcode/index.vue')
        },
        {
            path: 'verify',
            name: 'Verify',
            component: REDIRECT,
            children: [
               { path: 'drag', name: 'Drag', component: () => import( /* webpackChunkName: "drag" */ 'views/verify/drag.vue'), },
               { path: 'rotate', name: 'Rotate', component: () => import( /* webpackChunkName: "rotate" */ 'views/verify/rotate.vue'), }
            ]
        },
        {
            path: 'strength',
            name: 'Strength',
            component: () => import( /* webpackChunkName: "strength" */ 'views/strength-meter/index.vue')
        },
        {
            path: 'cropper',
            name: 'Cropper',
            component: () => import( /* webpackChunkName: "cropper" */ 'views/cropper/index.vue')
        },
        {
            path: 'modal',
            name: 'Modal',
            component: () => import( /* webpackChunkName: "modal" */ 'views/modal/index.vue')
        }
    ]
}