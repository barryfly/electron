<template>
    <div class="flow-chart-prop-panel">
        <Modal :visible="visible" title="属性面板" @ok="onSubmit" @cancel="hideModal">
            <a-form :model="infoData">
                <a-form-item label="类型">
                    <span>{{infoData.type}}</span>
                </a-form-item>
                <a-form-item label="API" v-if="infoData.type === 'jugement'">
                    <a-input v-model="infoData.properties.api"></a-input>
                </a-form-item>
                <a-form-item label="审核人" v-if="infoData.type === 'approver'">
                <Select :value="infoData.properties.username" placeholder="">
                    <Select-option value="wangwu">王五</Select-option>
                    <Select-option value="zhangsan">张三</Select-option>
                </Select>
                </a-form-item>
            </a-form>
        </Modal>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import Modal from 'components/modal';
import { Select } from 'ant-design-vue'
export default defineComponent({
    props: {
      nodeData: {
        type: Object,
        // default: ()=> { return {type: 'apply', properties:{}}}
      },
      visible: {
        type: Boolean,
        default: false
      }
    },

    components: { Modal, Select},
    emits: ['submit', 'cancel'],
    setup(props,{emit}) {
        const infoData = computed(()=> props.nodeData || {})
        const onSubmit = () => {
            console.log('submit', infoData)
            emit('submit')
        };
        const hideModal = () => {
            emit('cancel', false)
        };

        return {
            infoData,
            onSubmit,
            hideModal
        };
    }
})



// import { defineProps, reactive, watch } from 'vue';

// // 接收的参数
// const props = defineProps({
//     data: Object,
// })

// let info = reactive(props.data)

// watch(
//   () => props.data,
//   (newVal) => {
//     info = newVal;
//     console.log('更新后的值：', info)
//   }
// )
</script>

<style lang="less" scoped>
    .flow-chart-prop-panel {
        z-index: 9;
    }
</style>