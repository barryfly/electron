<template>
    <section class="flex layout" :style="layoutCss"><slot>layout</slot></section>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'Layout',
    props: {
      align: {
        type: String,
        default: 'stretch'
      },
      justify: {
        type: String,
        default: 'flex-start'
      },
      direction: {
        type: String,
        default: 'row'
      }
    },

    setup(props) {
      const layoutCss = computed(() => {
          return {
            'flex-direction': props.direction,
            'align-items': props.align,
            'justify-content': props.justify,
          }
      })
      return {
        layoutCss
      };
    }
})

</script>

<style scoped>
.layout { flex: auto;}
</style>