<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp :class="`${prefixCls}-help`" v-if="helpMessage" :text="helpMessage" />
  </span>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import BasicHelp from './basic-help';
  import { useDesign } from 'hooks/useDesign';

  const props = {
    /**
     * Help text list or string
     * @default: ''
     */
    helpMessage: {
      type: [String, Array],
      default: '',
    },
    /**
     * Whether the color block on the left side of the title
     * @default: false
     */
    span: { type: Boolean },
    /**
     * Whether to default the text, that is, not bold
     * @default: false
     */
    normal: { type: Boolean },
  };

  export default defineComponent({
    name: 'BasicTitle',
    components: { BasicHelp },
    props,
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-title');

      const getClass = computed(() => [
        prefixCls,
        { [`${prefixCls}-show-span`]: props.span && slots.default },
        { [`${prefixCls}-normal`]: props.normal },
      ]);

      return { prefixCls, getClass };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'barry-basic-title';

  .@{prefix-cls} {
    position: relative;
    display: flex;
    padding-left: 7px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: var(--grey);
    cursor: pointer;
    user-select: none;

    &-normal {
      font-size: 14px;
      font-weight: 500;
    }

    &-show-span::before {
      position: absolute;
      top: 4px;
      left: 0;
      width: 3px;
      height: 16px;
      margin-right: 4px;
      background-color: var(--primary);
      content: '';
    }

    &-help {
      margin-left: 10px;
    }
  }
</style>
