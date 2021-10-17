<template>
<section class="m-y-15">
	<Card title="点击复制指令">
        <a-button v-copy="copyText">复制</a-button>
	</Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
export default defineComponent({
    components: {Card},
    setup() {
        const copyText = "点击复制指令生成的内容"
        return {
            copyText
        };
    }
})

</script>

<style scoped>

</style>