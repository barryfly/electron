<template>
    <div class="fullscreen text-link">
        <FullscreenOutlined class="font-22" />
    </div> 
</template>
<script>
import { defineComponent } from 'vue';
import { FullscreenOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'Fullscreen',
    components: {
        FullscreenOutlined,
    },

    setup() {
        return {

        };
    },
});
</script>

<style scoped>

</style>