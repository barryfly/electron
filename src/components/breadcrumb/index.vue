<template>
    <Breadcrumb :routes="routes">
        <template #itemRender="{ route, routes, paths }">
            <span v-if="!hasRedirect(routes, route)">
                {{ route.name || route.meta.title }}
            </span>
            <router-link v-else to="" @click="handleClick(route, paths, $event)">
                {{ route.name || route.meta.title }}
            </router-link>
        </template>
    </Breadcrumb>
</template>
<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { Breadcrumb } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import menuList from 'router/menus';
import { getAllParentPath, getMatched, filterItem } from 'router/helper/menuHelp'
import { useGo } from 'hooks/usePage';

export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { Breadcrumb },
    props: {},
    setup() {
        const routes = ref([]);
        const { currentRoute } = useRouter();
        const go = useGo();

        watchEffect(() => {
            if (currentRoute.value.name === 'Redirect') return;
            let path = currentRoute.value.path;
            const parent = getAllParentPath(menuList, path);
            const filterMenus = menuList.filter((item) => item.path === parent[0]);
            const matched = getMatched(filterMenus, parent);
            if (!matched || matched.length === 0) return;

            const breadcrumbList = filterItem(matched);
            routes.value = breadcrumbList
        });

        const handleClick = (route, paths, e) => {
            e.preventDefault();
            const { children, redirect, meta } = route;
            if (children.length && !redirect) {
                e.stopPropagation();
                return;
            }

            if (meta.carryParam) {
                return;
            }

            if (redirect) {
                go(redirect);
            } else {
                let goPath = '';
                if (paths.length === 1) {
                    goPath = paths[0];
                } else {
                    const ps = paths.slice(1);
                    const lastPath = ps.pop() || '';
                    goPath = `${lastPath}`;
                }
                goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
                go(goPath);
            }
        };

        const hasRedirect = (routes, route) => {
            if (routes.indexOf(route) === routes.length - 1) {
                return false;
            }
            return true;
        };

        return { routes, menuList, getAllParentPath, getMatched, filterItem, handleClick, hasRedirect };
    },
});
</script>
<style lang="less">
</style>