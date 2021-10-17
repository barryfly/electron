<template>
    <a-tabs :activeKey="componentName" @change="changeActive" tab-position="left">
        <a-tab-pane key="Copy" tab="复制粘贴">
            <button v-copy="copyText">复制</button>
        </a-tab-pane>
        <a-tab-pane key="Longpress" tab="长按">
            <button v-longpress="handleLongpress">长按</button>
        </a-tab-pane>
        <a-tab-pane key="Debounce" tab="防抖">
            <button v-debounce="handleDebounce">防抖</button>
        </a-tab-pane>
        <a-tab-pane key="Emoji" tab="表情">
            <input type="text" v-model="emojiText" v-emoji />
        </a-tab-pane>
        <a-tab-pane key="LazyLoad" tab="图片懒加载">
            <img v-LazyLoad />
        </a-tab-pane>
        <a-tab-pane key="Permission" tab="权限校验">
            <button v-permission="'1'">有权限按钮1</button>
            <button v-permission="'10'">无权限按钮10</button>
        </a-tab-pane>
        <a-tab-pane key="WaterMarker" tab="水印">
            <div
                class="watermarker"
                v-waterMarker="{text:'barry版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"
            ></div>
        </a-tab-pane>
        <a-tab-pane key="Draggable" tab="拖拽">
            <div v-draggable>draggable</div>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                copyText: '复制',
                emojiText: '',
                componentName: '',
            }
        },
        computed: {
            hash() {
                return this.$route.query.hash
            },
        },
        watch: {
            hash(newVal) {
                this.setComponent(newVal)
            },
        },
        methods: {
            setComponent(newVal = this.hash) {
                if (newVal) {
                    this.componentName = newVal
                }
            },
            handleLongpress() {
                alert('长按指令生效')
            },
            handleDebounce() {
                console.log('只触发一次')
            },
            changeActive(activeKey) {
                this.setComponent(activeKey)
            },
        },
        created() {
            this.setComponent()
        },
        mounted() {},
    }
</script>

<style scoped>
    .watermarker {
        width: 100vh;
        height: 80vh;
    }
</style>