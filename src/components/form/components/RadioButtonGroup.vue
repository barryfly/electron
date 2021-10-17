<template>
  <RadioGroup v-bind="attrs" v-model="state" button-style="solid">
      <RadioButton :value="item.value" :disabled="item.disabled" v-for="item in getOptions" :key="item.value">
        {{ item.label }}
      </RadioButton>
  </RadioGroup>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { isString } from 'utils/is';
  import { useRuleFormItem } from 'hooks/useFormItem';
  import { useAttrs } from 'hooks/useAttrs';

  export default defineComponent({
    name: 'RadioButtonGroup',
    components: {
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    props: {
      value: {
        type: [String, Number, Boolean],
      },
      options: {
        type: Array,
        default: () => {return []},
      },
    },
    setup(props) {
      const attrs = useAttrs();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);

      // Processing options value
      const getOptions = computed(() => {
        const { options } = props;
        if (!options || options?.length === 0) return [];

        const isStringArr = options.some((item) => isString(item));
        if (!isStringArr) return options;

        return options.map((item) => ({ label: item, value: item }));
      });

      return { state, getOptions, attrs };
    },
  });
</script>
