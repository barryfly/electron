<template>
<section class="m-y-15">
	<Card title="矩形裁剪">
        <a-row :gutter="[16,16]">
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <CropperImage ref="refCropper" :src="LogoImg" @cropend="handleCropend" />
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <img :src="cropperImg" class="croppered" v-if="cropperImg" />
            </a-col>
        </a-row>
	</Card>
	<div class="m-y-15">
		<Card title="圆形裁剪">
            <a-row :gutter="[16,16]">
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <CropperImage ref="refCropper" :src="LogoImg" @cropend="handleCircleCropend" circled />
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <img :src="circleImg" class="croppered" v-if="circleImg" />
                </a-col>
            </a-row>
		</Card>
	</div>
	<Card title="头像裁剪">
        <CropperAvatar />
	</Card>
</section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Card from 'components/card'
import CropperImage from 'components/cropper'
import CropperAvatar from 'components/cropper/cropper-avatar'
import LogoImg from 'assets/logo.png';
export default defineComponent({
    components: {Card, CropperImage, CropperAvatar},
    setup() {
        const cropperImg = ref('');
        const circleImg = ref('');
        
      function handleCropend({ imgBase64 }) {
        cropperImg.value = imgBase64;
      }

      function handleCircleCropend({ imgBase64 }) {
        circleImg.value = imgBase64;
      }
        return {
            LogoImg,
            cropperImg,
            circleImg,
            handleCropend,
            handleCircleCropend
        };
    }
})

</script>

<style scoped>
  .container {
    display: flex;
    width: 100vw;
    align-items: center;
  }

  .cropper-container {
    width: 40vw;
  }

  .croppered {
    height: 360px;
  }

  p {
    margin: 10px;
  }
</style>