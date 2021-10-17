<template>
    <footer class="layout-footer"><slot></slot></footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Footer',
    setup() {

		return {

		};
    }
})

</script>

<style scoped>
.layout-footer {flex: 0 0 auto}
</style>