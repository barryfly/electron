export const basicProps = {
  value: {
    type: Boolean ,
    default: false,
  },

  isSlot: {
    type: Boolean ,
    default: false,
  },

  text: {
    type: [String],
    default: '拖动文字',
  },
  successText: {
    type: [String],
    default: '验证成功',
  },
  height: {
    type: [Number, String],
    default: 40,
  },

  width: {
    type: [Number, String],
    default: 220,
  },

  circle: {
    type: Boolean ,
    default: false,
  },

  wrapStyle: {
    type: Object,
    default: {},
  },
  contentStyle: {
    type: Object,
    default: {},
  },
  barStyle: {
    type: Object,
    default: {},
  },
  actionStyle: {
    type: Object,
    default: {},
  },
};

export const rotateProps = {
  ...basicProps,
  src: {
    type: String,
  },

  imgWidth: {
    type: Number,
    default: 260,
  },

  imgWrapStyle: {
    type: Object,
    default: {},
  },

  minDegree: {
    type: Number,
    default: 90,
  },

  maxDegree: {
    type: Number,
    default: 270,
  },

  diffDegree: {
    type: Number,
    default: 20,
  },
};
