<template>
<section class="m-y-15">
	<Card title="防抖指令">
        <a-button v-debounce="handleDebounce">防抖指令</a-button>
	</Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
import {useMessage} from 'hooks/useMessage'
export default defineComponent({
    components: {Card},
    setup() {
        const { createMessage } = useMessage();
        const handleDebounce = ()=> {
            createMessage.success(`延迟一秒执行`);
        };

        return {
            handleDebounce
        };
    }
})

</script>

<style scoped>

</style>