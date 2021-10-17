import {
  CircleNodeModel,
  CircleNode,
  RectNode,
  RectNodeModel,
  PolygonNode,
  PolygonNodeModel,
  PolylineEdge,
  PolylineEdgeModel,
  h,
} from "@logicflow/core";

export default function RegisteNode(flowInstance) {
  // 自定义申请节点
  class ApplyModel extends CircleNodeModel { 
    constructor(data, graphModel) {
      super(data, graphModel);
      // this.stroke = statusColor[data.property.status];
    }
  }

  flowInstance.register({
    type: 'apply',
    model: ApplyModel,
    view: CircleNode, 
  })

  // 自定义审核节点
  class ApproverNode extends RectNode {
    static extendKey = 'UserTaskNode';
    getLabelShape() {
      const attributes = super.getAttributes();
      const {
        x,
        y,
        width,
        height,
        properties,
      } = attributes;
      const { labelColor, approveTypeLabel } = properties;
      return h(
        'text',
        {
          fill: labelColor,
          fontSize: 12,
          x: x - width / 2 + 5,
          y: y - height / 2 + 15,
          width: 50,
          height: 25
        },
        approveTypeLabel,
      );
    }
    getShape() {
      const attributes = super.getAttributes();
      const {
        x,
        y,
        width,
        height,
        fill,
        stroke,
        strokeWidth,
        radius,
      } = attributes;
      return h(
        'g',
        {
        },
        [
          h(
            'rect',
            {
              x: x - width / 2,
              y: y - height / 2,
              rx: radius,
              ry: radius,
              fill,
              stroke,
              strokeWidth,
              width,
              height,
            },
          ),
          this.getLabelShape(),
        ],
      );
    }
  }

  class ApproverModel extends RectNodeModel { 
    constructor(data, graphModel) {
      super(data, graphModel);
      // this.stroke = statusColor[data.property.status];
    }
  }

  flowInstance.register({
    type: 'approver',
    view: ApproverNode,
    model: ApproverModel,
  })

  // 自定义判断节点
  class JugementModel extends PolygonNodeModel { 
    constructor(data, graphModel) {
      super(data, graphModel);
      this.points= [
        [35, 0],
        [70, 35],
        [35, 70],
        [0, 35],
      ];
      // this.stroke = statusColor[data.property.status];
      this.properties = {
        api: '',
      }
    }
  }

  flowInstance.register({
    type: 'jugement',
    view: PolygonNode,
    model: JugementModel,
  })

  // 自定义完成节点
  class FinshModel extends CircleNodeModel { 
    constructor(data, graphModel) {
      super(data, graphModel);
      // this.stroke = statusColor[data.property.status];
    }
  }

  flowInstance.register({
    type: 'finsh',
    view: CircleNode,
    model: FinshModel,
  })

  // 交互模型
  class ActionModel extends PolylineEdgeModel { 
    constructor(data, graphModel) {
      super(data, graphModel);
      // this.stroke = statusColor[data.property.status];
      // this.hoverStroke = statusColor[data.property.status];
      // this.selectedStroke = statusColor[data.property.status];
    }
  }

  flowInstance.register({
    type: 'action',
    view: PolylineEdge,
    model: ActionModel,
  })

}