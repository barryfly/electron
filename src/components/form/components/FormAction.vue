<template>
  <a-col v-bind="actionColOpt" :style="{ textAlign: 'right' }" v-if="showActionButtonGroup">
    <FormItem>
      <slot name="resetBefore"></slot>
      <Button
        type="default"
        class="mr-2"
        v-bind="getResetBtnOptions"
        @click="resetAction"
        v-if="showResetButton"
      >
        {{ getResetBtnOptions.text }}
      </Button>
      <slot name="submitBefore"></slot>

      <Button
        type="primary"
        class="mr-2"
        v-bind="getSubmitBtnOptions"
        @click="submitAction"
        v-if="showSubmitButton"
      >
        {{ getSubmitBtnOptions.text }}
      </Button>

      <slot name="advanceBefore"></slot>
      <Button
        type="link"
        size="small"
        @click="toggleAdvanced"
        v-if="showAdvancedButton && !hideAdvanceBtn"
      >
        {{ isAdvanced ? '高级' : '提交' }}
        <BasicArrow class="ml-1" :expand="!isAdvanced" up />
      </Button>
      <slot name="advanceAfter"></slot>
    </FormItem>
  </a-col>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import { Form, Col, Button } from 'ant-design-vue';
  import BasicArrow from 'components/basic/basic-arrow';
  import { useFormContext } from '../hooks/useFormContext';


  export default defineComponent({
    name: 'BasicFormAction',
    components: {
      FormItem: Form.Item,
      Button,
      BasicArrow,
      [Col.name]: Col,
    },
    props: {
      showActionButtonGroup: {type: Boolean, default: true},
      showResetButton: {type: Boolean, default: true},
      showSubmitButton: {type: Boolean, default: true},
      showAdvancedButton:{type: Boolean, default: true},
      resetButtonOptions: {
        type: Object,
        default: () => ({}),
      },
      submitButtonOptions: {
        type: Object,
        default: () => ({}),
      },
      actionColOptions: {
        type: Object,
        default: () => ({}),
      },
      actionSpan: {
        type: Number,
        default: 6
      },
      isAdvanced: {
        type: Boolean
      },
      hideAdvanceBtn: {
        type: {Boolean}
      },
    },
    emits: ['toggle-advanced'],
    setup(props, { emit }) {

      const actionColOpt = computed(() => {
        const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
        const actionSpan = 24 - span;
        const advancedSpanObj = showAdvancedButton
          ? { span: actionSpan < 6 ? 24 : actionSpan }
          : {};
        const actionColOpt = {
          span: showAdvancedButton ? 6 : 4,
          ...advancedSpanObj,
          ...actionColOptions,
        };
        return actionColOpt;
      });

      const getResetBtnOptions = computed(() => {
        return Object.assign(
          {
            text: '重置',
          },
          props.resetButtonOptions
        );
      });

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            text: "请输入",
          },
          props.submitButtonOptions
        );
      });

      function toggleAdvanced() {
        emit('toggle-advanced');
      }

      return {
        actionColOpt,
        getResetBtnOptions,
        getSubmitBtnOptions,
        toggleAdvanced,
        ...useFormContext(),
      };
    },
  });
</script>
