<template>
    <section class="m-y-15">
        <Card title="可拖动模态框">
            <a-button type="primary" @click="showModal">打开</a-button>
            <Modal :visible="visible" title="可拖动，全屏对话框" @ok="onsubmit" @cancel="hideModal">
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
                <p>Bla bla ...</p>
            </Modal>
        </Card>
    </section>
</template>
<script>
import { defineComponent, ref } from 'vue';
import Card from 'components/card';
import Modal from 'components/modal';
export default defineComponent({
    components: { Card, Modal },
    setup() {
        const visible = ref(false);

        const showModal = () => {
            visible.value = true;
        };

        const hideModal = () => {
            visible.value = false;
        };

        const onsubmit = () => {
            console.log('ok')
        };
        return {
            visible,
            showModal,
            hideModal,
            onsubmit
        };
    }
})
</script>
<style lang="less" scoped>
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