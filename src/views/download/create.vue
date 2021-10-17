<template>
<Modal :visible="visible" :title="title" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="地址：" name="url">
        <a-input :value="formState.url" />
      </a-form-item>
      <a-form-item label="文件名：" name="fileName">
        <a-input :value="formState.fileName" />
      </a-form-item>
      <a-form-item label="位置：" name="path">
        <a-input readOnly :value="formState.path">
            <template #addonAfter>
                <EllipsisOutlined @click="choosePath" />
            </template>
        </a-input>
      </a-form-item>
    </a-form>
</Modal>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { openFileDialog, getDownloadPath, newDownloadFile } from 'main/download';
import Modal from 'components/modal';
export default defineComponent({
    components: {
      EllipsisOutlined,
      Modal
    },
    emits: ['newDownload'],
    setup() {
        function openModal() {
          state.visible = true;
        }

        function hideModal() {
          state.visible = false;
        }

        function triggerLoading(loading = false) {
          state.confirmLoading = loading
        }

        function handleCancel() {
            resetForm();
            hideModal();
            triggerLoading();
        }

        function handleOk() {
          onSubmit();
        }

        const formRef = ref();
        const state = reactive({
          title: '新建下载',
          visible: false,
          confirmLoading: false,
          formState: {
            url: 'http://npm.taobao.org/mirrors/electron/13.1.4/electron-v13.1.4-win32-x64.zip',
            fileName: 'electron-v13.1.4-win32-x64.zip',
            path: getDownloadPath(),
          }
        });

        const rules = {
            url: [
              { required: true, message: "Please input", trigger: "blur" },
            ],
            fileName: [
              { required: true, message: "Please input", trigger: "blur" },
            ],
            path: [{ required: true, message: "Please input", trigger: "change" }],
        };

        function onSubmit() {
          triggerLoading(true)
          formRef.value
            .validate()
            .then(() => {
                const downloadData = Object.assign({}, state.formState)
                newDownloadFile(downloadData);
                setTimeout(()=> {
                  hideModal();
                }, 2000)
            })
            .catch(() => {
              triggerLoading()
            });
        }

        function resetForm() {
          formRef.value.resetFields();
        }

        async function  choosePath() {
            const path = await openFileDialog()
            state.formState.path = path
        }
        return {
            rules,
            formRef,
            ...toRefs(state),
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
            openModal,
            hideModal,
            handleCancel,
            handleOk,
            onSubmit,
            resetForm,
            choosePath,
        };
    }
})

</script>

<style scoped>

</style>