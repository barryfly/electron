<template>
<section class="m-y-15">
	<Card title="背景水印">
        <div class="watermark" v-water="option"></div>
	</Card>

    <div class="m-y-15">
        <Card title="图片水印">
            <Watermark :imgUrl="LogoImg" />
        </Card>
    </div>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card';
import Watermark from 'components/watermark';
import LogoImg from 'assets/logo.png';
export default defineComponent({
    components: {Card, Watermark},
    setup() {
        const option = {
            text:'barry版权所有',
            color:'rgba(180, 180, 180, 0.4)'
        }
        return {
            option,
            LogoImg
        };
    }
})

</script>

<style scoped>
.watermark {height: 300px;}
</style>