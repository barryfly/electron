export const modalProps = {
  title: { type: String, default: '' },
  visible: { type: Boolean, default: false },
  width: {type: [String, Number], default: 520},
  // open drag
  draggable: { type: Boolean, default: true },
  // open fullscreen
  canFullscreen: { type: Boolean, default: true },
  fullscreen: { type: Boolean, default: false },
  // Footer button
  showCancelBtn: { type: Boolean, default: true },
  cancelText: { type: String, default: '取消' },
  cancelButtonProps: {type: Object},
  showOkBtn: { type: Boolean, default: true },
  okText: { type: String, default: '确定' },
  okType: { type: String, default: 'primary' },
  okButtonProps: {type: Object},
  confirmLoading: {type: Boolean, default: false},
  // Mask
  maskClosable: { type: Boolean, default: false },
  maskStyle: {type: Object},
  zIndex: { type: Number, default: 1000 },
  centered: {type: Boolean, default: false },
  // Wrap
  wrapClassName: { type: String },
  dialogStyle: {type: Object},
};

export const props = Object.assign({}, modalProps)


