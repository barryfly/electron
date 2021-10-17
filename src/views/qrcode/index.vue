<template>
    <section class="m-y-15">
        <a-row :gutter="[16,16]">
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="基础">
                    <Qrcode :value="qrCodeUrl" />
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="渲染成img标签" tag="img">
                    <Qrcode :value="qrCodeUrl" />
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="颜色属性">
                    <Qrcode :value="qrCodeUrl" :options="{color:{dark: '#55D187'}}" />
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="本地logo">
                    <Qrcode :value="qrCodeUrl" :options="{color:{dark: '#55D187'}}" :logo="LogoImg" />
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="扩展属性">
                    <Qrcode :value="qrCodeUrl" @done="qrcodeDone" :width="300" :logo="{
                        src: LogoImg,
                        logoSize: 0.2,
                        borderSize: 0.05,
                        borderRadius: 50,
                        bgColor: 'white',
                      }" />
                </Card>
            </a-col>
        </a-row>
    </section>
</template>
<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
import Qrcode from 'components/qrcode'
const qrCodeUrl = 'https://www.barry.com';
import LogoImg from 'assets/logo.png';

export default defineComponent({
    components: { Card, Qrcode },

    setup() {
        const qrcodeDone = ({ctx}) => {
            if (ctx instanceof CanvasRenderingContext2D) {
                ctx.fillStyle = '#55D187';
                ctx.font = '16px "微软雅黑"';
                ctx.textBaseline = 'bottom';
                ctx.textAlign = 'center';
                ctx.fillText('快来扫码呀', 150, 300);
            }
        }
        return {
            qrCodeUrl,
            LogoImg,
            qrcodeDone
        };
    }
})
</script>
<style scoped>
</style>