const debounce = {
  //  beforeMount(el) {},
  mounted(el, { value }) {
    let timer = null;
      el.addEventListener('click', () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          value();
        }, 1000)
      })
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

export default debounce;
