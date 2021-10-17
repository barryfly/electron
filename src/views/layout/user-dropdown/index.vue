<template>
    <div class="user text-link">
        <UserOutlined class="font-22"  />
    </div> 
</template>
<script>
import { defineComponent } from 'vue';
import { UserOutlined  } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'Setting',
    components: {
        UserOutlined ,
    },

    setup() {
        return {

        };
    },
});
</script>

<style scoped>

</style>