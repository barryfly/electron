<template>
    <section class="m-y-15">
        <Card title="引导页">
            <a-button type="primary" @click="handleStart">开始</a-button>
        </Card>
    </section>
</template>
<script>
import { defineComponent } from 'vue';
import Card from 'components/card'
import intro from 'intro.js';
import 'intro.js/introjs.css';

export default defineComponent({
    components: { Card },
    setup() {
        function handleStart() {
            intro()
                .setOptions({
                    steps: [{
                            title: '引导页',
                            intro: '欢迎使用引导页👋',
                        },
                        {
                            title: '侧边栏',
                            element: document.querySelector(`.layout-menu`),
                            intro: 'This is the aside menu.',
                        },
                        {
                            title: '页头',
                            element: document.querySelector(`.layout-header`),
                            intro: 'This is the page header.',
                        },
                        {
                            title: '主体内容',
                            element: document.querySelector(`.layout-main`),
                            intro: 'This is the page main.',
                        },
                    ],
                    showButtons: false
                })
                .start();
        }
        return { handleStart };
    },
});
</script>