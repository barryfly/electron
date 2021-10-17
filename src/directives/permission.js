const permission = {
  //  beforeMount(el) {},

  mounted(el, { value }) {
        // 权限集合1=>view, 2=>read, 4=>write, 8=>manager
        function checkPermission(key) {
            let arr = [1, 2, 4, 8]
            return arr.includes(+key);
        }

        if (value) {
            let hasPermission = checkPermission(value)
            if (!hasPermission) {
                // 没有权限 移除Dom元素
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
  },

  //  beforeUpdate(el) {},

    // updated(el, { value }) {
    //     el.$value = value;
    // },

//  beforeUnmount(el) {
//  },

//   unmounted(el) {
//   },
};

export default permission;
