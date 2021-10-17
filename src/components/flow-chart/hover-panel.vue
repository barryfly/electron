<template>
    <div class="fixed flow-chart-hover-panel">
        <Card :title="data.type">
            <p>{{infoData.usernameZh}}<span>{{infoData.username}}</span></p>
            <p>{{infoData.time}}</p>
            <p v-if="infoData.result">
                <CheckCircleFilled v-if="infoData.result === '通过'" :style="{color:'green'}" />
                <CloseCircleFilled v-else :style="{color:'red'}" />
                <span style="margin-left: 10px;">{{infoData.result}}</span>
            </p>
            <p v-if="infoData.desc">说明：{{infoData.desc}}</p>
        </Card>
    </div>
</template>



<script>
import { defineComponent, computed } from 'vue';
import Card from 'components/card';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';
export default defineComponent({
    props: {
      data: {
        type: Object,
        default: ()=> { return {properties:{}}}
      }
    },

    components: { Card, CheckCircleFilled, CloseCircleFilled},

    setup(props) {
        const infoData = computed(()=> props.data.properties)
        return {
            infoData
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
    .flow-chart-hover-panel {
        z-index: 9;
    }
</style>