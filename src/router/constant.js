export const EXCEPTION_COMPONENT = () => import(/* webpackChunkName: "exception" */ 'views/exception/index.vue');
export const LAYOUT = () => import(/* webpackChunkName: "layout" */ 'views/layout/index.vue');
export const REDIRECT = () => import(/* webpackChunkName: "redirect" */ 'views/redirect/index.vue');

export const getParentLayout = (name = 'ParentLayout') => {
    return () => {
        new Promise((resolve) => {
            resolve({
                name: name,
            });
        });
    }
};