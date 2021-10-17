<template>
    <div class="barry-modal-action">
        <template v-if="canFullscreen">
            <FullscreenExitOutlined title="还原" @click="handleFullScreen($event,false)" v-if="fullScreen" />
            <FullscreenOutlined title="全屏" @click="handleFullScreen($event,true)" v-else />
        </template>
        <CloseOutlined title="关闭" @click="handleCancel" />
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: 'ModalAction',
    components: {FullscreenExitOutlined,FullscreenOutlined,CloseOutlined },
    props: {
        canFullscreen: { type: Boolean, default: true },
        fullScreen: { type: Boolean, default: false },
    },
    emits: ['cancel', 'fullscreen'],
    setup(_, { emit }) {
        function handleCancel(e) {
            emit('cancel', e);
        }

        function handleFullScreen(e, isFullscreen) {
            e.stopPropagation();
            e.preventDefault();
            emit('fullscreen', isFullscreen);
        }

        return {
            handleCancel,
            handleFullScreen,
        };
    },
});
</script>

<style lang="less">
@prefix-cls: ~'barry-modal-action';
  .@{prefix-cls} {
    & span:not(:last-child) {
        padding-right: 10px;
      &:hover {
        color: var(--primary);
      }
    }

    & span:last-child {
      &:hover {
        color: var(--danger);
      }
    }
  }
</style>
