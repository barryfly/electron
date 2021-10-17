<template>
<section class="m-y-15">
	<Card title="长按指令">
        <a-button v-longpress="handleLongpress">长按</a-button>
	</Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card';
import {useMessage} from 'hooks/useMessage'
export default defineComponent({
    components: {Card},
    setup() {
        const { createMessage } = useMessage();
        const handleLongpress = ()=> {
            createMessage.success(`长按指令生效`);
        };
        return {
            handleLongpress
        };
    }
})

</script>

<style scoped>

</style>