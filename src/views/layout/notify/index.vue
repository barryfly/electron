<template>
<div class="bell text-link">
    <Badge :dot="true">
        <BellOutlined class="font-22" />
    </Badge>
</div> 
</template>
<script>
import { defineComponent } from 'vue';
import { BellOutlined } from '@ant-design/icons-vue'
import { Badge } from 'ant-design-vue'

export default defineComponent({
    name: 'Bell',
    components: {
        BellOutlined,
        Badge
    },

    setup() {
        return {
 
        };
    },
});
</script>

<style scoped>

</style>