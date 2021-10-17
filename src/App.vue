<template>
<!-- <ConfigProvider :locale="locale === 'en' ? enUS : zhCN"> -->
	<RouterView />
<!-- </ConfigProvider> -->
</template>

<script>
// import { ConfigProvider } from 'ant-design-vue';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('en');

import { defineComponent, ref, watch, onMounted  } from 'vue';
import { getLocal } from 'utils/storage'

export default defineComponent({
    name: 'Home',
    // components: { ConfigProvider },
    setup() {
		const locale = ref(enUS.locale);

		watch(locale, val => {
			moment.locale(val);
		});

		const getAntdLocale = function () {
			return getLocal('locale') || 'zh-cn'
		};

		onMounted(() => {
			locale.value = getAntdLocale()
        });

		return {
			locale,
			moment,
			enUS,
			zhCN,
			getAntdLocale
		};
    }
})

</script>

<style scoped></style>