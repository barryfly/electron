<template>
    <div class="logo font-22">
        <DropboxOutlined />
        <span v-if="!collapsed" class="logo-title p-l-15">{{logoTitle}}</span>
    </div> 
</template>
<script>
import { defineComponent, computed, inject } from 'vue';
import { DropboxOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'Logo',
    components: {
        DropboxOutlined,
    },

    setup() {
        let collapsed = computed(() => inject('getAsideOptions').collapsed);
        const logoTitle = 'BarryAdmin';
        return {
            logoTitle,
            collapsed
        };
    },
});
</script>

<style scoped>
.logo {
    height: 32px;
    margin: 10px;
    color: #fff;
    overflow: hidden;
}
</style>