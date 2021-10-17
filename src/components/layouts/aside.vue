<template>
    <aside class="layout-aside" :style="asideCss"><slot>aside</slot></aside>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'Aside',
    props: {
      width: {
        type: [Number],
        default: 200
      }
    },
    setup(props) {
      const asideCss = computed(() => {
          return {
            'flex': `0 0 ${props.width}px`,
            'width': `${props.width}px`,
            'max-width': `${props.width}px`,
            'min-width': `${props.width}px`,
          }
      })
      return {
        asideCss
      };
    }
})

</script>

<style scoped>

</style>