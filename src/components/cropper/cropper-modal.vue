<template>
    <Modal :visible="visible" :title="title" :okText="okText" @ok="handleOk" @cancel="hideModal" :width="width">
<div :class="prefixCls">
      <div :class="`${prefixCls}-left`">
        <div :class="`${prefixCls}-cropper`">
          <CropperImage
            v-if="src"
            :src="src"
            height="300px"
            :circled="circled"
            @cropend="handleCropend"
            @ready="handleReady"
          />
        </div>

        <div :class="`${prefixCls}-toolbar`">
          <Upload :fileList="[]" accept="image/*" :beforeUpload="handleBeforeUpload">
            <a-button size="small" type="primary"><template #icon>
      <UploadOutlined />
    </template></a-button>
          </Upload>
          <Space>
            <a-button
              type="primary"
              size="small"
              @click="handlerToolbar('reset')"
            ><template #icon>
      <ReloadOutlined />
    </template></a-button>
            <a-button
              type="primary"
              size="small"
              @click="handlerToolbar('rotate', -45)"
            ><template #icon>
      <RotateLeftOutlined />
    </template></a-button>
            <a-button
              type="primary"
              size="small"
              @click="handlerToolbar('rotate', 45)"
            ><template #icon>
      <RotateRightOutlined />
    </template></a-button>
            <a-button
              type="primary"
              size="small"
              @click="handlerToolbar('scaleX')"
            ><template #icon>
      <ColumnWidthOutlined  />
    </template></a-button>
            <a-button
              type="primary"
              size="small"
              @click="handlerToolbar('scaleY')"
            ><template #icon>
      <ColumnHeightOutlined />
    </template></a-button>
            <a-button
              type="primary"
              size="small"
              @click="handlerToolbar('zoom', 0.1)"
            ><template #icon>
      <ZoomInOutlined  />
    </template></a-button>
            <a-button
              type="primary"
              size="small"
              @click="handlerToolbar('zoom', -0.1)"
            ><template #icon>
      <ZoomOutOutlined   />
    </template></a-button>
          </Space>
        </div>
      </div>
      <div :class="`${prefixCls}-right`">
        <div :class="`${prefixCls}-preview`">
          <img :src="previewSource" v-if="previewSource" />
        </div>
        <template v-if="previewSource">
          <div :class="`${prefixCls}-group`">
            <Avatar :src="previewSource" size="large" />
            <Avatar :src="previewSource" :size="48" />
            <Avatar :src="previewSource" :size="64" />
            <Avatar :src="previewSource" :size="80" />
          </div>
        </template>
      </div>
    </div>
    </Modal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import CropperImage from './index';
  import { Space, Upload, Avatar } from 'ant-design-vue';
  import Modal from 'components/modal';
  import { useDesign } from 'hooks/useDesign';
  import { dataURLtoBlob } from 'utils/file/base64Conver';
  import { isFunction } from 'utils/is';

import { UploadOutlined, ReloadOutlined, RotateLeftOutlined,RotateRightOutlined,ColumnWidthOutlined ,ColumnHeightOutlined,ZoomInOutlined ,ZoomOutOutlined  } from '@ant-design/icons-vue'

  const props = {
    circled: { type: Boolean, default: true },
    uploadApi: {
      type: Function,
    },
    width: {type: [String,Number], default: '50%'}
  };

  export default defineComponent({
    name: 'CropperAvatar',
    components: { Space, CropperImage, Upload, Avatar, Modal, UploadOutlined, ReloadOutlined, RotateLeftOutlined, RotateRightOutlined,ColumnWidthOutlined,ColumnHeightOutlined ,ZoomInOutlined ,ZoomOutOutlined  },
    props,
    emits: ['uploadSuccess'],
    setup(props, { emit }) {
      let filename = '';
      let title = "头像上传";
      let okText = "确认并上传";
      const src = ref('');
      const previewSource = ref('');
      const cropper = ref();
      let visible = ref(false);
      let scaleX = 1;
      let scaleY = 1;

      const { prefixCls } = useDesign('cropper-am');

      // Block upload
      function handleBeforeUpload(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        src.value = '';
        previewSource.value = '';
        reader.onload = function (e) {
          src.value = (e.target.result) || '';
          filename = file.name;
        };
        return false;
      }

      function handleCropend({ imgBase64 }) {
        previewSource.value = imgBase64;
      }

      function handleReady(cropperInstance) {
        cropper.value = cropperInstance;
      }

      function handlerToolbar(event, arg) {
        if (event === 'scaleX') {
          scaleX = arg = scaleX === -1 ? 1 : -1;
        }
        if (event === 'scaleY') {
          scaleY = arg = scaleY === -1 ? 1 : -1;
        }
        cropper?.value?.[event]?.(arg);
      }

    const showModal = () => {
      visible.value = true;
    };

    const hideModal = () => {
      visible.value = false;
    };
      async function handleOk() {
        const uploadApi = props.uploadApi;
        if (uploadApi && isFunction(uploadApi)) {
          const blob = dataURLtoBlob(previewSource.value);
          try {
            const result = await uploadApi({ name: 'file', file: blob, filename });
            emit('uploadSuccess', { source: previewSource.value, data: result.data });
            hideModal();
          } finally {
            console.log('success')
          }
        }
      }

      return {
        title,
        okText,
        prefixCls,
        visible,
        src,
        previewSource,
        handleBeforeUpload,
        handleCropend,
        handleReady,
        handlerToolbar,
        handleOk,
        showModal,
        hideModal
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'barry-cropper-am';

  .@{prefix-cls} {
    display: flex;

    &-left,
    &-right {
      height: 340px;
    }

    &-left {
      width: 55%;
    }

    &-right {
      width: 45%;
    }

    &-cropper {
      height: 300px;
      background: var(--grey);
      background-image: linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.25) 25%,
          transparent 0,
          transparent 75%,
          rgba(0, 0, 0, 0.25) 0
        ),
        linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.25) 25%,
          transparent 0,
          transparent 75%,
          rgba(0, 0, 0, 0.25) 0
        );
      background-position: 0 0, 12px 12px;
      background-size: 24px 24px;
    }

    &-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    &-preview {
      width: 220px;
      height: 220px;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid var(--grey);
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-group {
      display: flex;
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid var(--grey);
      justify-content: space-around;
      align-items: center;
    }
  }
</style>
