<template>
    <div class="barry-modal-content">
        <slot></slot>
    </div>
</template>
<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ModalContent',
    components: { },
    props: {
    },
  });
</script>
