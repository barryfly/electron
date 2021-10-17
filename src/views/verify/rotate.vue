<template>
    <section class="m-y-15">
	<Card title="图片旋转校验">
        <ImgRotate :src="LogoImg" ref="el" @success="handleSuccess" />
	</Card>
</section>
</template>
<script>
import { defineComponent } from 'vue';
import Card from 'components/card';
import ImgRotate from 'components/verify/img-rotate';
import LogoImg from 'assets/logo.png';
import {useMessage} from 'hooks/useMessage'
export default defineComponent({
    components: { Card, ImgRotate },

    setup() {
        const { createMessage } = useMessage();
        const handleSuccess = ({time}) => {
            createMessage.success(`校验成功,耗时${time}秒`);
        };
        return {
            LogoImg,
            handleSuccess
        };
    }
})
</script>
<style scoped>
</style>