<template>
    <div class="download-item-container relative">
        <div class="download-item-progress" :style="{width: `${getProgressBar(data.progress)}%`}"></div>
        <div class="download-item relative flex align-center">
            <div class="download-item-icon">
                <FileZipOutlined />
            </div>
            <div class="download-item-info flex-1">
                <div class="file-name">{{data.fileName}}</div>
                <div class="file-desc flex">
                    <div class="file-size flex-1">
                        <span>{{getFileSize(data.receivedBytes, false)}}/</span>
                        <span>{{getFileSize(data.totalBytes)}}</span>
                    </div>
                    <div class="file-speed flex-1">{{getFileSize(data.speed)}}</div>
                </div>
            </div>

            <div class="download-item-action">
                <PauseOutlined />
                <CaretRightOutlined />
                <CloseOutlined />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { PauseOutlined, CloseOutlined, CaretRightOutlined, FileZipOutlined } from '@ant-design/icons-vue';
import { getFileSize } from 'main/download/helper/util';
export default defineComponent({
    components: {
        PauseOutlined,
        CloseOutlined,
        CaretRightOutlined,
        FileZipOutlined 
    },
    emits: [],
    props: { data: {
        type: Object,
        default: ()=> {
            return {}
        }
    }},
    setup () {
        function getProgressBar(progress, num = 2) {
            return (progress * 100).toFixed(num)
        }

        return {
            getProgressBar,
            getFileSize
        }
    }
})

</script>

<style lang="less" scoped>
.download-item-container {
    padding: 10px 15px;
    border-top: 1px solid var(--grey);
    .download-item-progress {
        position: absolute;
        left: 0;
        top: 0;
        max-width: 100%;
        height: 100%;
        background-color: #e6f7ff;
        transition: width .3s linear;
    }
    .download-item {
        z-index: 1;
        .download-item-info {
            padding: 0 10px;
            .file-name { font-size: 16px; font-weight: 700;}
            .file-desc {color: #999;}
        }
    }
}

</style>