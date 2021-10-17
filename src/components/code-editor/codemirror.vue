<template>
<div class="relative h-full w-full" ref="el"> </div>
</template>

<script>
  import {
    ref,
    unref,
    onMounted,
    onUnmounted,
    watchEffect,
    watch,
    defineComponent,
    nextTick,
  } from 'vue';

  import {CodeMirror} from './codemirror';

  const props = {
    mode: { type: String, default: 'application/json' },
    value: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    options: { type: Object, default: () => {return {autoCloseBrackets: true, autoCloseTags: true, foldGutter: true, gutters: ['CodeMirror-linenumbers']}} }
  };

  export default defineComponent({
    props,
    components: {},
    emits: ['change'],
    setup(props, { emit }) {
      const el = ref();
      let editor = null;

      watch(
        () => props.value,
        async (value) => {
          await nextTick();
          const oldValue = editor?.getValue();
          if (value !== oldValue) {
            editor?.setValue(value ? value : '');
          }
        },
        { flush: 'post' }
      );

      watchEffect(() => {
        editor?.setOption('mode', props.mode);
      });

      function setTheme() {
        unref(editor)?.setOption(
          'theme',
          'material-palenight'
        );
      }

      async function init() {
        editor = CodeMirror(el.value, {
          value: '',
          mode: props.mode,
          readOnly: props.readonly,
          theme: 'material-palenight',
          lineWrapping: true,
          lineNumbers: true,
          ...props.options,
        });
        editor?.setValue(props.value);
        setTheme();
        editor?.on('change', () => {
          emit('change', editor?.getValue());
        });
      }

      onMounted(async () => {
        await nextTick();
        init();
      });

      onUnmounted(() => {
        editor = null;
      });

      return { el };
    },
  });
</script>
