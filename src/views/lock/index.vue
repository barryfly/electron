<template>
<section class="m-y-15">
	<Card title="项目信息">
		<Descriptions :data="projectData"></Descriptions>
	</Card>
	<div class="m-y-15">
		<Card title="生产环境依赖">
			<Descriptions :data="packageJson.dependencies"></Descriptions>
		</Card>
	</div>
	<Card title="开发环境依赖">
		<Descriptions :data="packageJson.devDependencies"></Descriptions>
	</Card>
</section>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
import Descriptions from 'components/description'
import packageJson from 'main/packageJson';
export default defineComponent({
    name: 'About',
    components: {Card, Descriptions},
    setup() {
		const projectData = {
			version: packageJson.version,
			author: "barry",
			description: ""
		};

        return {
			projectData,
            packageJson
        };
    }
})

</script>

<style scoped>

</style>