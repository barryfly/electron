<template>
    <a-sub-menu :menu-info="menuInfo" :key="menuInfo.path" v-bind="$props">
        <template #icon>
            <component :is="menuInfo.icon" />
        </template>
        <template #title>
            <MenuItemContent :menu-info="menuInfo"/>
        </template>
        <template v-for="item in menuInfo.children">
            <a-menu-item :key="item.path" v-if="!item.children">
                <MenuItemContent :menu-info="item" />
            </a-menu-item>
            <template v-else>
                <SubMenu :menu-info="item" :key="item.path" />
            </template>
        </template>
    </a-sub-menu>
</template>

<script>
import { defineComponent } from 'vue';
import MenuItemContent from 'components/menus/menu-item-content'

export default defineComponent({
    name: 'SubMenu',
    isSubMenu: true,
    props: {
        menuInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: { 
        MenuItemContent, 
    },
    setup() {

		return {

		};
    }
})

</script>

<style scoped>

</style>