export const basicProps = {
  model: {
    type: Object ,
    default: {},
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String],
    default: 0,
  },
  fieldMapToTime: {
    type: Array,
    default: () => [],
  },
  compact: true,
  // 表单配置规则
  schemas: {
    type: [Array],
    default: () => [],
  },
  mergeDynamicData: {
    type: Object,
    default: null,
  },
  baseRowStyle: {
    type: Object,
  },
  baseColProps: {
    type: Object,
  },
  autoSetPlaceHolder: true,
  // 在INPUT组件上单击回车时，是否自动提交
  autoSubmitOnEnter: false,
  submitOnReset: false,
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'small', 'large'].includes(value),
  },
  // 禁用表单
  disabled: false,
  emptySpan: {
    type: [Number, Object],
    default: 0,
  },
  // 是否显示收起展开按钮
  showAdvancedButton: false,
  // 转化时间
  transformDateFunc: {
    type: Function,
    default: (date) => {
      return date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date;
    },
  },
  rulesMessageJoinLabel: true,
  // 超过3行自动折叠
  autoAdvancedLine: 3,

  // 是否显示操作按钮
  showActionButtonGroup: true,
  // 操作列Col配置
  actionColOptions: Object,
  // 显示重置按钮
  showResetButton: true,
  // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
  autoFocusFirstItem: true,
  // 重置按钮配置
  resetButtonOptions: Object,

  // 显示确认按钮
  showSubmitButton: true,
  // 确认按钮配置
  submitButtonOptions: Object,

  // 自定义重置函数
  resetFunc: Function,
  submitFunc: Function,

  // 以下为默认props
  hideRequiredMark: false,

  labelCol: Object,

  layout: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical', 'inline'].includes(value),
  },
  tableAction: {
    type: Object,
  },

  wrapperCol: Object,

  colon: false,

  labelAlign: String,

  rowProps: Object,
};
