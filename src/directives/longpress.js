const longpress = {
  //  beforeMount(el) {},

  mounted(el, { value }) {
    if (typeof value !== "function") {
      throw "callback must be a function";
    }
    // 定义变量
    let timer = null;
    // 创建计时器（ 2秒后执行函数 ）
    let start = (e) => {
      if (e.type === "click" && e.button !== 0) {
        return;
      }
      if (timer === null) {
        timer = setTimeout(() => {
          handler();
        }, 2000);
      }
    };
    // 取消计时器
    let cancel = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    // 运行函数
    const handler = (e) => {
      value(e);
    };
    // 添加事件监听器
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  },

  //  beforeUpdate(el) {},

  updated(el, { value }) {
    el.$value = value;
  },

  //  beforeUnmount(el) {
  //  },

  unmounted(el) {
    el.removeEventListener("click", el.handler);
  },
};

export default longpress;
