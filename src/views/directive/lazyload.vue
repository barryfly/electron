<template>
<section class="m-y-15">
	<Card title="懒加载">
        <img :src="LogoImg" v-lazyload />
	</Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
import LogoImg from 'assets/logo.png';
export default defineComponent({
    components: {Card},
    setup() {
        return {
            LogoImg
        };
    }
})

</script>

<style scoped>

</style>