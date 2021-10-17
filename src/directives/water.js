const watermark = {
   beforeMount(el, {value}) {
    // 文字
    let text = value.text || '水印';
    // 大小
    let font = value.font || '16px Microsoft JhengHei';
    // 颜色
    let color = value.color || 'rgba(180, 180, 180, 0.3)';
    const canvas = document.createElement('canvas')
    el.appendChild(canvas)
    canvas.width = 200
    canvas.height = 150
    canvas.style.display = 'none'
    const ctx = canvas.getContext('2d')
    ctx.rotate((-20 * Math.PI) / 180)
    ctx.font = font;
    ctx.fillStyle = color 
    ctx.textAlign = 'left'
    ctx.textBaseline = 'Middle'
    ctx.fillText(text, canvas.width / 10, canvas.height / 2)
    el.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')'
   },

  // mounted(el) {
  //   console.log('mounted',el)
  // },

  //  beforeUpdate(el) {},

  // updated(el) {
  //   console.log('updated', el)
  // },

  //  beforeUnmount(el) {
  //  },

  // unmounted(el) {
  //   console.log('unMounted', el)
  // },
};

export default watermark;
