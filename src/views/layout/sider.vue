<template>
    <a-menu
        class="layout-menu scrollbar"
        :default-selected-keys="[]"
        :default-open-keys="[]"
        :mode="mode"
        :theme="theme"
        :inline-collapsed="collapsed"
        @click="switchRoute"
        >
        <template v-for="item in menuList">
            <template v-if="!item.children">
                <a-menu-item :key="item.path">
                    <template #icon>
                        <component :is="item.icon" />
                    </template>
                    <MenuItemContent :menu-info="item" />
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" :key="item.path" />
            </template>
        </template>
    </a-menu>
</template>
<script>
import { defineComponent, computed, inject } from 'vue';
import { useRouter } from 'vue-router';

import SubMenu from 'components/menus/sub-menu'
import MenuItemContent from 'components/menus/menu-item-content'
import menuList from 'router/menus';

export default defineComponent({
    name: 'Sider',
    components: {
        SubMenu,
        MenuItemContent
    },

    props: {
        theme: {
            type: String,
            default: 'dark',
            validator: (val) => ['light', 'dark'].includes(val),
        },
        mode: {
            type: String,
            default: 'inline',
            validator: (val) => ['inline', 'horizontal', 'vertical', 'vertical-right'].includes(val),
        }
    },

    setup() {
        // 获取侧边栏属性
        const collapsed = computed(() => inject('getAsideOptions').collapsed)

        // 路由控制
        const router = useRouter()
        const switchRoute = ({key}) => {
            router.push({
                path: key
            })
        };
        return {
            collapsed,
            menuList,
            switchRoute
        };
    },
});
</script>

<style lang="less">
.layout-menu {
    height: calc(100% - 55px);
}
</style>