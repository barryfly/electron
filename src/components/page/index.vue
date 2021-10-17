<template>
  <PageHeader :title="title" :sub-title="subTitle">
      <template #extra>
          <slot name="extra"></slot>
      </template>
  </PageHeader>
</template>

<script>
import { defineComponent } from 'vue';
import { PageHeader } from 'ant-design-vue';
export default defineComponent({
    name: 'PageHeader',
    props: {
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    components: {PageHeader},

    setup() {
      return {

      };
    }
})

</script>

<style scoped>

</style>