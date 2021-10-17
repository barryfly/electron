<template>
    <header class="layout-header"><slot>header</slot></header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Header',
    components: {  },
    setup() {

		return {

		};
    }
})

</script>

<style scoped>
.layout-header {flex: 0 0 auto}
</style>