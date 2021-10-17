<template>
<div class="h-full flow-chart">
    <Toolbar v-if="toolbar" :flowInstance="flowInstance" :historyData="historyData" />
    <HoverPanel v-if="hover&&showHoverPanel" :style="panelStyle" :data="nodeData" />
    <PropPanel v-if="showPropPanel" :visible="showPropPanel" :nodeData="nodeData" @cancel="setShowPropPanel" />
    <div id="flowChart" class="h-full" ref="flowChartRef"></div>
</div>
</template>

<script>
import { defineComponent, unref, reactive, toRefs, computed, onMounted, onUnmounted } from 'vue';
import { LogicFlow } from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';

import RegisterExtension from './extension';
import RegisteNode from './node';
import RegistePattern from './pattern';
import RegisteTheme from './theme';
import RegisteListener from './listener';
import HoverPanel from './hover-panel.vue';
import PropPanel from './prop-panel.vue';
import Toolbar from './toolbar.vue';

export default defineComponent({
    name: 'FlowChart',
    props: {
        data: {
            type: Object,
            default: ()=> {
                return {}
            }
        },

        flowOptions: {
            type: Object,
            default: ()=> {
                return {}
            }
        },

        toolbar: {
            type: Boolean,
            default: true
        },

        hover: {
            type: Boolean,
            default: false
        }
    },
    components: {HoverPanel, PropPanel, Toolbar},
    setup(props) {
        let flowInstance = null;
        // 创建实例
        const createInstance = () => {
            flowInstance = new LogicFlow({
                container: document.querySelector('#flowChart'),
                ...unref(getFlowOptions)
            });
            state.flowInstance = flowInstance
        };

        // 获取属性配置
        const getFlowOptions = computed(() => {
            const { flowOptions } = props;

            const defaultOptions = {
                grid: true,
                keyboard: {
                    enabled: true,
                },
                ...flowOptions,
            };
            return defaultOptions
        });

        const state = reactive({
            flowInstance: null,
            showHoverPanel: false,
            showPropPanel: false,
            panelStyle: {},
            nodeData: {},
            historyData: {}
        });

        const setNodeData = (data) => {
            state.nodeData = data;
        };

        const setShowPropPanel = (isShow) => {
            state.showPropPanel = isShow
        };

        const setIsShowHoverPanel = (data) => {
            state.showHoverPanel = data
        };

        const setHoverStyle = (data) => {
            state.panelStyle = data;
        };

        const setHistoryData = (data) => {
            state.historyData = data;
        };

        // 处理事件
        const handlerEvent = ({data, e}, type) => {
            // console.log('数据：', data)
            // console.log('事件：', e)
            // console.log('类型：', type)
            switch(type) {
                case 'node:click': if (!props.hover){setNodeData(data); setShowPropPanel(true);} break;
                case 'node:mouseenter': setNodeData(data); setIsShowHoverPanel(true); data.id ? setHoverStyle({ top: e.clientY + 'px', left: e.clientX + 'px'}) : setHoverStyle({ display: 'none' }); break;
                case 'node:mouseleave': setIsShowHoverPanel(false); setNodeData({}); break;
                case 'history:change': setHistoryData(data); break;
                default: break;
            }
        };

        // 初始化
        const initFlow = () => {
            RegisterExtension(LogicFlow);
            createInstance();
            RegisteNode(flowInstance);
            RegistePattern(flowInstance);
            RegisteTheme(flowInstance);
            flowInstance.render(props.data);
            RegisteListener(flowInstance,({data, e}, type) => {
                handlerEvent({data, e}, type);
            },props.hover);
        };

        // 挂载
        onMounted(() => {
            initFlow();
        })

        // 卸载
        onUnmounted(() => {
            console.log('卸载')
            flowInstance = null;
        })

        return {
            ...toRefs(state),
            setShowPropPanel
        };
    }
})

</script>

<style lang="less">
.flow-chart {
    min-height: 300px;
    .lf-dnd-text {
        font-size: 12px;
        margin-top: 5px;
    }
    .node-apply {
        .lf-dnd-shape {
            width: 30px;
            height: 30px;
            border-radius: 15px;
            border: 2px solid #ff6347;
        }
    }

    .node-approve {
        .lf-dnd-shape {
            width: 50px;
            height: 40px;
            border-radius: 4px;
            border: 2px solid #3cb371;
        }
    }

    .node-judge {
        .lf-dnd-shape {
            width: 30px;
            height: 30px;
            border: 2px solid #6495ed;
            transform: rotate(45deg);
        }    
    }
}
</style>