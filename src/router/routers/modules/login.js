export default {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ 'views/login/index.vue'),
    meta: {
        title: 'login'
    }
}