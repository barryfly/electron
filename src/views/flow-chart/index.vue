<template>
<section class="m-y-15">
	<Card title="流程图">
        <FlowChart :data="data" style="height: 900px"/>
	</Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card';
import FlowChart from 'components/flow-chart';
import demoData from './data.json';
const data = {
  // 节点
  nodes: [
    {
      "id": "28df2fbe-f32b-4a9b-b544-7e70d7187b33",
      "type": "apply",
      "x": 220,
      "y": 220,
      "text": "张三",
      "properties": {
        "usernameZh": '张三',
        "username": 'zhangsan',
        "time": '2020-12-01 10:23:34',
        "result": '',
        "desc": '活动费用',
        "status": 1,
      }
    },
    {
      "id": "64179bd7-c60e-433c-8df7-97c8e98f855d",
      "type": "approver",
      "x": 350,
      "y": 220,
      "text": "李四",
      "properties": {
        "labelColor": "#000000",
        "approveTypeLabel": "直接上级",
        "approveType": "leader",
        "usernameZh": '李四',
        "username": 'zhangsan',
        "time": '2020-12-01 11:23:34',
        "result": '通过',
        "desc": '',
        "status": 1,
      }
    },
    {
      "id": "fcb96f10-720e-40e5-8ed0-ebdd0a46f234",
      "type": "jugement",
      "x": 510,
      "y": 220,
      "text": "金额\n大于1万元",
      "properties": {
        "api": "",
        "status": 1,
        "usenameZh": "系统",
        "desc": '金额大于1万元'
      },
    },
    {
      "id": "9f119df3-c449-4e5d-a67a-cb351b9cbdb5",
      "type": "approver",
      "x": 670,
      "y": 220,
      "text": "王五",
      "properties": {
        "labelColor": "#000000",
        "approveTypeLabel": "T2领导",
        "approveType": "t2Leader",
        "usernameZh": '王五',
        "username": 'wangwu',
        "time": '2020-12-01 12:23:34',
        "result": '驳回',
        "desc": '',
        "status": 2,
      }
    },
    {
      "id": "ef34f09c-38ea-4ad4-acd2-cc2f464a2be6",
      "type": "finsh",
      "x": 850,
      "y": 220,
      "text": "结束",
      "properties": {
        "status": 2,
      },
    }
  ],
  // 边
  edges: [
{
      "id": "0d87b1eb-2389-445a-9f34-6227940b2072",
      "type": "action",
      "sourceNodeId": "28df2fbe-f32b-4a9b-b544-7e70d7187b33",
      "targetNodeId": "64179bd7-c60e-433c-8df7-97c8e98f855d",
      "text": "",
      "properties": {
        "status": 1,
      },
      "pointsList": [
        { "x": 235, "y": 220 },
        { "x": 310, "y": 220 }
      ]
    },
    {
      "id": "d99e7451-b379-411e-b0da-df11be8be20a",
      "type": "action",
      "sourceNodeId": "64179bd7-c60e-433c-8df7-97c8e98f855d",
      "targetNodeId": "fcb96f10-720e-40e5-8ed0-ebdd0a46f234",
      "text": "通过",
      "properties": {
        "status": 1,
      },
      "pointsList": [
        { "x": 400, "y": 220 },
        { "x": 485, "y": 220 }
      ]
    },
    {
      "id": "4c615802-15d8-442c-be22-b65430286123",
      "type": "action",
      "sourceNodeId": "fcb96f10-720e-40e5-8ed0-ebdd0a46f234",
      "targetNodeId": "9f119df3-c449-4e5d-a67a-cb351b9cbdb5",
      "text": "是",
      "properties": {
        "status": 1,
      },
      "pointsList": [
        { "x": 545, "y": 220 },
        { "x": 630, "y": 220 }
      ]
    },
    {
      "id": "934ae03a-6ee0-4568-a2b4-8bcede565e0b",
      "type": "action",
      "sourceNodeId": "9f119df3-c449-4e5d-a67a-cb351b9cbdb5",
      "targetNodeId": "ef34f09c-38ea-4ad4-acd2-cc2f464a2be6",
      "text": "驳回",
      "properties": {
        "status": 2,
      },
      "pointsList": [
        { "x": 720, "y": 220 },
        { "x": 830, "y": 220 }
      ]
    },
  ],
};
export default defineComponent({
    components: {Card, FlowChart},
    setup() {

        return {
            data,
            demoData
        };
    }
})

</script>

<style scoped>

</style>