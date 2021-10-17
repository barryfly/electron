<template>
    <Card hoverable  :size="size" :title="title">
        <template #extra>
            <slot name="extra"></slot>
        </template>
        <slot></slot>
    </Card>
</template>

<script>
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue'
export default defineComponent({
    props: {
      title: {
        type: String,
        default: 'card'
      },
      size: {
        type: String,
        default: 'small'
      }
    },

    components: { Card },

    setup() {
      return {

      };
    }
})

</script>

<style scoped>

</style>