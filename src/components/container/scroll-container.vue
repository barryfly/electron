<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot></slot>
  </Scrollbar>
</template>

<script>
  import { defineComponent, ref, unref, nextTick } from 'vue';
  import Scrollbar from 'components/scrollbar';
  import { useScrollTo } from 'hooks/useScrollTo';

  export default defineComponent({
    name: 'ScrollContainer',
    components: { Scrollbar },
    setup() {
      const scrollbarRef = ref(null);

      /**
       * Scroll to the specified position
       */
      function scrollTo(to, duration = 500) {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return;
        }
        nextTick(() => {
          const wrap = unref(scrollbar.wrap);
          if (!wrap) {
            return;
          }
          const { start } = useScrollTo({
            el: wrap,
            to,
            duration,
          });
          start();
        });
      }

      function getScrollWrap() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return null;
        }
        return scrollbar.wrap;
      }

      /**
       * Scroll to the bottom
       */
      function scrollBottom() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return;
        }
        nextTick(() => {
          const wrap = unref(scrollbar.wrap);
          if (!wrap) {
            return;
          }
          const scrollHeight = wrap.scrollHeight;
          const { start } = useScrollTo({
            el: wrap,
            to: scrollHeight,
          });
          start();
        });
      }

      return {
        scrollbarRef,
        scrollTo,
        scrollBottom,
        getScrollWrap,
      };
    },
  });
</script>
<style lang="less">
  .scroll-container {
    width: 100%;
    height: 100%;

    .scrollbar__wrap {
      margin-bottom: 18px !important;
      overflow-x: hidden;
    }

    .scrollbar__view {
      box-sizing: border-box;
    }
  }
</style>
