<template>
    <div class="setting text-link">
        <SettingOutlined class="font-22" />
    </div> 
</template>
<script>
import { defineComponent } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'Setting',
    components: {
        SettingOutlined,
    },

    setup() {
        return {

        };
    },
});
</script>

<style scoped>

</style>