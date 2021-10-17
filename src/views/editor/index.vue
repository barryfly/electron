<template>
<section class="m-y-15">
	<Card title="代码编辑器组件示例" class="flex flex-column">
    <div class="flex flex-column">
      <RadioGroup button-style="solid" :value="modeValue" @change="handleModeChange">
        <RadioButton value="application/json"> json数据 </RadioButton>
        <RadioButton value="htmlmixed"> html代码 </RadioButton>
        <RadioButton value="javascript"> javascript代码 </RadioButton>
      </RadioGroup>
      <div class="m-t-15 flex-1 h-full">
        <CodeEditor :value="value" :mode="modeValue" />
      </div>
    </div>
	</Card>
</section>
</template>
<script>
import { defineComponent, ref } from 'vue';
import Card from 'components/card'
import { Radio } from 'ant-design-vue';
import CodeEditor from 'components/code-editor';
import { jsData, jsonData, htmlData } from './data.js'

  const MODE_DATA = {
    'application/json': jsonData,
    'htmlmixed': htmlData,
    'javascript': jsData,
  };
  export default defineComponent({
    components: { Card, RadioButton: Radio.Button, RadioGroup: Radio.Group, CodeEditor },
    setup() {
      const modeValue = ref('application/json');
      const value = ref(jsonData);

      function handleModeChange(e) {
        const mode = e.target.value;
        modeValue.value = mode;
        value.value = MODE_DATA[mode];
      }

      return { value, modeValue, handleModeChange };
    },
  });
</script>

<style lang="less" scoped>
::v-deep .ant-card-body { flex: 1;}
</style>