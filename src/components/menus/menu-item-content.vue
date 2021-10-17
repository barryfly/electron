<template>
<div class="flex align-center justify-center">
    <span class="menu-title flex-1">{{ menuInfo.name }}</span>
    <span class="menu-tag-dot rounded-circle bg-danger" v-if="menuInfo.tag&&menuInfo.tag.dot"></span>
    <span class="menu-tag-badge bg-danger" v-if="menuInfo.tag&&menuInfo.tag.content">{{menuInfo.tag.content}}</span>
</div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'MenuItemContent',
    props: {
        menuInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    setup() {
        const store = useStore();
        let collapsed = computed(() => store.state.config.collapsed);
		return {
            collapsed
		};
    }
})

</script>

<style scoped>
.menu-tag-dot {
    width: 6px;
    height: 6px;
}

.menu-tag-badge {
    padding: 0 4px;
    height: 18px;
    line-height: 15px;
}
</style>