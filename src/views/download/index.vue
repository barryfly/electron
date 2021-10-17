<template>
<section class="m-y-15">
	<Card title="下载管理">
        <ManagerMenu @command="handleCommand"></ManagerMenu>
        <Create ref="modalRef"></Create>
        <DownloadItem v-for="(item,i) in downloadList" :key="i" :data="item" />
    </Card>
</section>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue';
import Card from 'components/card';
import ManagerMenu from './manager-menu';
import Create from './create';
import DownloadItem from './download-item';
import { ipcRenderer } from 'electron'
export default defineComponent({
    components: { Card, ManagerMenu, Create, DownloadItem },
    setup() {
        function handleCommand(command) {
            const actions = new Map([
                ['create', openModal],
                ['clear', setClear]
            ])

            actions.get(command)()
        }

        const modalRef = ref();
        function openModal() {
            modalRef.value.openModal();
        }

        function setClear() {
            console.log('clear')
        }

        let downloadList = reactive([]);

        function addDownloadItem(item) {
            console.log('new', item)
            downloadList.push(item)
        }

        function updateFileState(newData) {
            const index = downloadList.findIndex(item => {
                return item.id === newData.id
            })

            downloadList[index] = newData
        }

        onMounted(() => {
            ipcRenderer.on('newDownloadItem', (e, data) => {
                addDownloadItem(data)
            });

            ipcRenderer.on('downloadItemUpdate', (e, data) => {
                console.log('updateFile', data)
                updateFileState(data)
            })

            ipcRenderer.on('downloadItemDone', (e, data) => {
                console.log('doneFile', data)
            })
            
        })
        return {
            modalRef,
            handleCommand,
            openModal,
            setClear,
            downloadList,
        };
    }
})
</script>

<style scoped>

</style>