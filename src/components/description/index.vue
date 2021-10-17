<template>
    <Descriptions bordered :column="column">
        <DescriptionsItem :label="key" v-for="(value, key) in data" :key="key">
            {{value}}
        </DescriptionsItem>
    </Descriptions>
</template>

<script>
import { defineComponent } from 'vue';
import { Descriptions } from 'ant-design-vue'
export default defineComponent({
    props: {
        data: {
            type: Object,
            default: ()=>{
                return {}
            }
        },
        column: {
            type: Object,
            default: ()=>{
                return { xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }
            }
        }
    },
    components: {Descriptions, DescriptionsItem: Descriptions.Item},

    setup() {
      return {
         
      };
    }
})

</script>

<style scoped>

</style>