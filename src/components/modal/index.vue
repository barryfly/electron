<template>
<Modal :visible="visible" @ok="handleOk" @cancel="handleCancel" :maskClosable="maskClosable" :width="modalWidth" :style="modalStyle" :class="{'full-modal': fullScreen}">
    <template #title>
        <slot name="title">
            <ModalHeader :title="title" />
        </slot>
    </template>
    <template #closeIcon>
        <ModalAction
            :fullScreen="fullScreen"
            @cancel="handleCancel"
            @fullscreen="handleFullScreen"
        />
    </template>
    <template #footer>
        <slot name="footer">
            <ModalFooter 
                @cancel="handleCancel"
                :cancelText="cancelText"
                :loading="loading"
                :okType="okType"
                :okText="okText"
                @ok="handleOk" />
        </slot>
    </template>

    <ModalContent><slot></slot></ModalContent>
</Modal>
</template>
<script>
import { defineComponent, ref, unref, computed, watchEffect } from 'vue';
import { Modal } from 'ant-design-vue';

import ModalHeader from './header';
import ModalAction from './action';
import ModalFooter from './footer';
import ModalContent from './content';
import { props } from './props';
export default defineComponent({
    name: 'BaseModal',
    components: { Modal, ModalHeader, ModalAction, ModalFooter, ModalContent },
    emits: ['cancel', 'ok', 'fullscreen'],
    props: props,
    // inheritAttrs: false,
    setup(props, { emit }) {
        const fullScreen = ref(props.fullscreen);
        const loading = computed(() => {
            return props.confirmLoading
        });

        const triggerLoading = (val) => {
            loading.value = val
        };

        const modalWidth = computed(() => {
            const { width } = props;
            return fullScreen.value ? '100%' : width
        });

        const handleFullScreen = (val) => {
            fullScreen.value = val;
            emit('fullscreen', val)
        };

        const modalStyle =  computed(() => {
            return fullScreen.value ? {top: 0, left: 0} : {}
        });

        const getDomStyle = (dom, attr) => {
            return getComputedStyle(dom)[attr];
        };

        const drag = (wrap) => {
            if (!wrap) return;
            wrap.setAttribute('data-drag', unref(props.draggable));
            const dialogHeaderEl = wrap.querySelector('.ant-modal-header');
            const dragDom = wrap.querySelector('.ant-modal');

            if (!dialogHeaderEl || !dragDom || !unref(props.draggable)) return;

            dialogHeaderEl.style.cursor = 'move';

            dialogHeaderEl.onmousedown = (e) => {
                if (!e) return;
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX;
                const disY = e.clientY;
                const screenWidth = document.body.clientWidth; // body当前宽度
                const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

                const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
                const dragDomheight = dragDom.offsetHeight; // 对话框高度

                const minDragDomLeft = dragDom.offsetLeft;

                const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
                const minDragDomTop = dragDom.offsetTop;
                const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

                const domLeft = getDomStyle(dragDom, 'left');
                const domTop = getDomStyle(dragDom, 'top');
                let styL = +domLeft;
                let styT = +domTop;

                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (domLeft.includes('%')) {
                    styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100);
                    styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100);
                } else {
                    styL = +domLeft.replace(/px/g, '');
                    styT = +domTop.replace(/px/g, '');
                }

                document.onmousemove = function(e) {
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;

                    // 边界处理
                    if (-left > minDragDomLeft) {
                        left = -minDragDomLeft;
                    } else if (left > maxDragDomLeft) {
                        left = maxDragDomLeft;
                    }

                    if (-top > minDragDomTop) {
                        top = -minDragDomTop;
                    } else if (top > maxDragDomTop) {
                        top = maxDragDomTop;
                    }

                    // 移动当前元素
                    dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        };

        const handleDrag = () => {
            const dragWraps = document.querySelectorAll('.ant-modal-wrap');
            for (const wrap of Array.from(dragWraps)) {
                if (!wrap) continue;
                const display = getDomStyle(wrap, 'display');
                const draggable = wrap.getAttribute('data-drag');
                if (display !== 'none') {
                    // 拖拽位置
                    if (draggable === null) {
                        drag(wrap);
                    }
                }
            }
        };

        watchEffect(() => {
            if (!props.visible || !props.draggable) {return}
            setTimeout(() => {
                handleDrag();
            }, 30);
        });

        const handleOk = ()=> {
            triggerLoading(true);
            emit('ok')
        };

        const handleCancel = ()=> {
            triggerLoading(false);
            emit('cancel')
        };

        return {
            loading,
            fullScreen,
            modalWidth,
            modalStyle,
            handleOk,
            handleCancel,
            handleFullScreen
        };
    }
})
</script>
<style lang="less">
.full-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }
    .ant-modal-body {
        flex: 1;
    }
}
</style>