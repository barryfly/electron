<template>
  <span :class="getClass">
    <MenuFoldOutlined />
  </span>
</template>
<script>
  import { defineComponent, computed } from 'vue';
import {
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
  import { useDesign } from 'hooks/useDesign';

  const props = {
    /**
     * Arrow expand state
     */
    expand: { type: Boolean },
    /**
     * Arrow up by default
     */
    up: { type: Boolean },
    /**
     * Arrow down by default
     */
    down: { type: Boolean },
    /**
     * Cancel padding/margin for inline
     */
    inset: { type: Boolean },
  };

  export default defineComponent({
    name: 'BasicArrow',
    components: { MenuFoldOutlined },
    props,
    setup(props) {
      const { prefixCls } = useDesign('basic-arrow');

      // get component class
      const getClass = computed(() => {
        const { expand, up, down, inset } = props;
        return [
          prefixCls,
          {
            [`${prefixCls}--active`]: expand,
            up,
            inset,
            down,
          },
        ];
      });

      return { getClass };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'barry-basic-arrow';

  .@{prefix-cls} {
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &--active {
      transform: rotate(90deg);
    }

    &.inset {
      line-height: 0px;
    }

    &.up {
      transform: rotate(-90deg);
    }

    &.down {
      transform: rotate(90deg);
    }

    &.up.@{prefix-cls}--active {
      transform: rotate(90deg);
    }

    &.down.@{prefix-cls}--active {
      transform: rotate(-90deg);
    }
  }
</style>
