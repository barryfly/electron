<template>
<section class="m-y-15">
	<Card title="拖动">
        <a-button v-draggable>拖动</a-button>
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