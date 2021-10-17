<template>
    <div class="search text-link">
        <SearchOutlined @click="triggerSearch()" class="font-22" />
        <ModalSearch :visible="visible" />
    </div> 
</template>
<script>
import { defineComponent, ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue'
import ModalSearch from './modal-search.vue'

export default defineComponent({
    name: 'Search',
    components: {
        SearchOutlined,
        ModalSearch
    },

    setup() {
        const visible = ref(false);

        const triggerSearch = (isShow = true) => {
            visible.value = isShow
        };

        return {
            visible,
            triggerSearch
        };
    },
});
</script>

<style scoped>

</style>