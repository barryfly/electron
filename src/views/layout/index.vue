<template>
    <a-layout class="h-full">
        <a-layout-sider breakpoint="lg" :collapsed="collapsed" :collapsedWidth="collapsedWidth" :trigger="null" collapsible>
            <Logo />
            <Sider />
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="flex justify-between" :class="prefixCls">
                <div class="flex align-center">
                    <menu-unfold-outlined v-if="collapsed" class="action-item" @click="triggerAside" />
                    <menu-fold-outlined v-else class="action-item" @click="triggerAside" />
                    <div class="flex-1">
                        <LayoutsBreadcrumb />
                    </div>
                </div>
                <div class="flex">
                    <AppSearch class="action-item" />
                    <Notify class="action-item" />
                    <Fullscreen class="action-item" />
                    <UserDropdown class="action-item" />
                    <Setting class="action-item" />
                </div>
            </a-layout-header>
            <a-layout-content class="m-x-15 scrollbar">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, reactive, toRefs, provide } from 'vue';
import { useDesign } from 'hooks/useDesign';

import Logo from './logo'
import Sider from './sider'
import AppSearch from './search'
import Notify from './notify'
import Fullscreen from './fullscreen'
import UserDropdown from './user-dropdown'
import Setting from './setting'
import LayoutsBreadcrumb from 'components/breadcrumb'

export default defineComponent({
    components: {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        Logo,
        Sider,
        AppSearch,
        Notify,
        Fullscreen,
        UserDropdown,
        Setting,
        LayoutsBreadcrumb
    },
    setup() {
        const { prefixCls } = useDesign('layout-header');

        const asideOptions = reactive({
            collapsed: false,
            collapsedWidth: 48
        });

        const triggerAside = () => {
            asideOptions.collapsed = !asideOptions.collapsed;
        };

        // 注入侧边栏属性
        provide('getAsideOptions', asideOptions)
        
        return {
            prefixCls,
            triggerAside,
            ...toRefs(asideOptions)
        };
    },
});
</script>
<style lang="less" scoped>
.barry-layout-header {
    --height: 48px;
    --color: #eee;

    height: var(--height);
    line-height: var(--height);
    padding: 0;
    background: var(--white);

    .action-item {
        padding: 0 10px;
        font-size: 18px;
        line-height: var(--height);
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: var(--primary);
            background-color: var(--color);
        }
    }
}
</style>