<template>
<div :class="`${prefixCls} flex align-center`">
    <Tooltip placement="bottom" v-for="item in toolbarList"  :key="item.type" >
        <template #title>{{ item.tooltip }}</template>
        <span :class="[`${prefixCls}-icon inline-block`, {disabled: item.disabled}]" v-if="item.icon" @click="onControl(item)">
          <component :is="item.icon" />
        </span>
    </Tooltip>
</div>
</template>

<script>
import { ZoomInOutlined, ZoomOutOutlined, FullscreenExitOutlined,DownloadOutlined, ForwardOutlined, BackwardOutlined} from '@ant-design/icons-vue'
import { defineComponent, ref, unref, nextTick, watchEffect } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { useDesign } from 'hooks/useDesign';

export default defineComponent({
    name: 'FlowChartToolbar',
    components: {Tooltip},
    props: ['flowInstance', 'historyData'],
    setup(props) {
        const { prefixCls } = useDesign('flow-chart-toolbar');

        const toolbarList = ref([
            {type: "zoomOut", icon: ZoomInOutlined, tooltip: "放大"},
            {type: "zoomIn", icon: ZoomOutOutlined, tooltip: "缩小"},
            {type: "resetZoom", icon: FullscreenExitOutlined, tooltip: "重置"},
            {type: "undo", icon: BackwardOutlined, tooltip: "上一步", disabled: true},
            {type: "redo", icon: ForwardOutlined, tooltip: "下一步", disabled: true},
            {type: "snapshot", icon: DownloadOutlined, tooltip: "下载"},
        ]);

        const updateToolbar = ({undoAble, redoAble}) => {
            const itemsList = unref(toolbarList);
            const undoIndex = itemsList.findIndex((item) => item.type === 'undo');
            const redoIndex = itemsList.findIndex((item) => item.type === 'redo');
            if (undoIndex !== -1) {
                unref(toolbarList)[undoIndex].disabled = !undoAble;
            }
            if (redoIndex !== -1) {
                unref(toolbarList)[redoIndex].disabled = !redoAble;
            }
        };

        watchEffect(async () => {
            if (props.flowInstance) {
                updateToolbar(props.historyData)
                await nextTick();
            }
        });

        const onControl = ({type, disabled}) => {
            if (!props.flowInstance || disabled) return
            switch (type) {
                case 'zoomIn':
                    props.flowInstance.zoom();
                    break;
                case 'zoomOut':
                    props.flowInstance.zoom(true);
                    break;
                case 'resetZoom':
                    props.flowInstance.resetZoom();
                    break;
                case 'undo':
                    props.flowInstance.undo();
                    break;
                case 'redo':
                    props.flowInstance.redo();
                    break;
                case 'snapshot':
                    props.flowInstance.getSnapshot();
                    break;
                default: break;
            }
        };

        return {
            prefixCls,
            toolbarList,
            onControl
        };
    }
})

</script>

<style lang="less" scoped>
  @prefix-cls: ~'barry-flow-chart-toolbar';
  .@{prefix-cls} {
    height: 36px;
    background-color: #fafafa;
    border-bottom: 1px solid #eee;

    &-icon {
      margin-left: 10px;

      &:not([class *= 'disabled']):hover {
        color: #187dff;
      }

      &[class*=disabled]:hover {
        color: #e4e4e7;
      }
    }

    .disabled {
      color: #e4e4e7;
    }
  }
</style>