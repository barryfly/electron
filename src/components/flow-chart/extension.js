import { Control, Menu, DndPanel, Snapshot, MiniMap, SelectionSelect, BpmnElement,  } from '@logicflow/extension';
export default function registerExtension(LogicFlow) {
    if (!LogicFlow) return
    LogicFlow.use(Control); // 控制面板
    LogicFlow.use(Menu); // 右键菜单
    LogicFlow.use(DndPanel); // 拖拽面板
    LogicFlow.use(Snapshot); // 导出图片
    LogicFlow.use(SelectionSelect ); // 框选
    LogicFlow.use(MiniMap); // 缩略图
    LogicFlow.use(BpmnElement); // Bpmn
    // LogicFlow.use(BpmnXmlAdapter); // Bpmn
}