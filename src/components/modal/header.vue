<template>
    <slot name="title">{{title}}</slot>
</template>
<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ModalHeader',
    components: { },
    props: {
        title: { type: String },
    },
  });
</script>
