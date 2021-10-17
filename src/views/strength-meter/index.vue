<template>
<section class="m-y-15">
    <Card title="密码强度">
        <StrengthMeter placeholder="默认" />
        <StrengthMeter placeholder="禁用" disabled />
        <StrengthMeter placeholder="隐藏input" :show-input="false" value="!@#qwe12345" />
    </Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
import StrengthMeter from 'components/strength-meter';
export default defineComponent({
    name: 'Strength',
    components: {Card,StrengthMeter},

    setup() {
      return {

      };
    }
})

</script>

<style scoped>

</style>