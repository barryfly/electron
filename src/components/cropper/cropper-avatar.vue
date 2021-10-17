<template>
  <div :class="getClass" :style="getStyle">
    <div :class="`${prefixCls}-image-wrapper`" :style="getImageWrapperStyle" @click="openModal">
      <img :src="sourceValue" v-if="sourceValue" alt="avatar" />
    </div>
    <a-button :class="`${prefixCls}-upload-btn`" @click="openModal">
      选择图片
    </a-button>
    <CropperModal ref="cropperRef" @uploadSuccess="handleUploadSuccess" :uploadApi="uploadApi" />
  </div>
</template>
<script>
  import { defineComponent, computed, unref, ref } from 'vue';
  import CropperModal from './cropper-modal';
  import { useDesign } from 'hooks/useDesign';
  const props = {
    width: { type: [String, Number], default: '200px' },
    uploadApi: { type: Function },
  };

  export default defineComponent({
    name: 'CropperAvatar',
    components: { CropperModal },
    props,
    setup(props) {
      const sourceValue = ref('');
      const cropperRef = ref();
      const { prefixCls } = useDesign('cropper-avatar');

      const getClass = computed(() => [prefixCls]);

      const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px');

      const getStyle = computed(() => ({ width: unref(getWidth) }));

      const getImageWrapperStyle = computed(
        () => ({ width: unref(getWidth), height: unref(getWidth) })
      );

      function openModal() {
          cropperRef.value.showModal();
      }

      function handleUploadSuccess({ source }) {
        sourceValue.value = source;
        console.log('裁剪成功')
      }

      return {
        cropperRef,
        prefixCls,
        sourceValue,
        getClass,
        getImageWrapperStyle,
        getStyle,
        openModal,
        handleUploadSuccess,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'barry-cropper-avatar';

  .@{prefix-cls} {
    display: inline-block;
    text-align: center;

    &-image-wrapper {
      overflow: hidden;
      cursor: pointer;
      // background: @component-background;
      border: 1px solid var(--grey);
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    &-upload-btn {
      margin: 10px auto;
    }
  }
</style>
