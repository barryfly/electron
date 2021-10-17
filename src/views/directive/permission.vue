<template>
<section class="m-y-15">
	<Card title="权限校验">
        <a-button v-permission="1">有查看权限</a-button>
        <a-button v-permission="2">有读取权限</a-button>
        <a-button v-permission="4">有写入权限</a-button>
        <a-button v-permission="8">有管理权限</a-button>
	</Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
export default defineComponent({
    components: {Card},
    setup() {
        return {
            
        };
    }
})

</script>

<style scoped>

</style>