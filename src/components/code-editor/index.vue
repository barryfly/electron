<template>
    <CodeMirrorEditor
      :value="getValue"
      @change="handleValueChange"
      :mode="mode"
      :readonly="readonly"
    />
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import CodeMirrorEditor from './codemirror.vue';

  const MODE = {
    JSON: 'application/json',
    html: 'htmlmixed',
    js: 'javascript',
  };

  const props = {
    value: { type: [Object, String] },
    mode: { type: String, default: MODE.JSON },
    readonly: { type: Boolean, default: false },
  };

  const isString = (str) => {
      return typeof str === 'string'
  }

  export default defineComponent({
    name: 'CodeEditor',
    components: { CodeMirrorEditor },
    props,
    emits: ['change'],
    setup(props, { emit }) {
      const getValue = computed(() => {
        const { value, mode } = props;
        if (mode !== MODE.JSON) {
          return value;
        }

        return isString(value)
          ? JSON.stringify(JSON.parse(value), null, 8)
          : JSON.stringify(value, null, 8);
      });

      function handleValueChange(value) {
        emit('change', value);
      }

      return { handleValueChange, getValue };
    },
  });
</script>
