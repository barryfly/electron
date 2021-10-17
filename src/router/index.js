import { createRouter, createWebHistory } from 'vue-router'
import routes from './routers'
import { createStore } from 'vuex'
import {importAll} from 'utils'
const modules = importAll(require.context('../store/modules', true, /\.js$/))
const store = createStore({modules});

import middlewarePipeline from './middleware/pipeline'

const router = createRouter({
    history: createWebHistory(),
    strict: true,
    routes
})

// 路由守卫+中间件
router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export function setupRouter(app) {
    app.use(router);
}

export default router
