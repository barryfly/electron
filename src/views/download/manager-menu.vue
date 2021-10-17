<template>
    <div class="download-menu">
        <a-button v-for="(item,i) in menu" :key="i" :type="item.type" @click="handlerClick(item.command)"><template #icon><component :is="item.icon"></component></template>{{item.name}}</a-button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusOutlined,
        DeleteOutlined
    },
    emits: ['command'],
    setup (_, { emit }) {
        const menu = [
            {
                name: '新建下载',
                icon: 'PlusOutlined',
                type: 'link',
                command: 'create'
            },
            {
                name: '清空已完成',
                icon: 'DeleteOutlined',
                type: 'link',
                command: 'clear'
            }
        ];

        // method
        const handlerClick = (command) => {
            emit('command', command)
        }

        return {
            menu,
            handlerClick
        }
    }
})

</script>

<style scoped>

</style>