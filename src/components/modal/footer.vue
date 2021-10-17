<template>
    <a-button
      @click="handleCancel"
    >
      {{ cancelText }}
    </a-button>
    <a-button
      :type="okType"
      :loading="loading"
      @click="handleOk"
    >
      {{ okText }}
    </a-button>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalFooter",
  components: {},
  props: {
    okText: { type: String },
    okType: { type: String },
    cancelText: { type: String },
    loading: {type: Boolean}
  },
  emits: ["ok", "cancel"],
  setup(_, { emit }) {
    function handleOk(e) {
        emit("ok", e);
    }

    function handleCancel(e) {
        emit("cancel", e);
    }

    return { handleOk, handleCancel };
  },
});
</script>
