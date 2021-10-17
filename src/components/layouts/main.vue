<template>
    <main class="layout-main scrollbar"><slot>main</slot></main>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Main',
    components: {  },
    setup() {

		return {

		};
    }
})

</script>

<style scoped>
.layout-main {flex: auto}
</style>