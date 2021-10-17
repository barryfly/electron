const draggable = {
    //  beforeMount(el) {},

    mounted(el) {
        el.style.cursor = 'move';

        function getDomStyle(dom, attr) {
            return getComputedStyle(dom)[attr];
        }

        el.onmousedown = (e) => {
            if (!e) return;
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX;
            const disY = e.clientY;
            const screenWidth = document.body.clientWidth;
            const screenHeight = document.documentElement.clientHeight;

            const dragDomWidth = el.offsetWidth; 
            const dragDomheight = el.offsetHeight;

            const minDragDomLeft = el.offsetLeft;
            const maxDragDomLeft = screenWidth - el.offsetLeft - dragDomWidth;
            const minDragDomTop = el.offsetTop;
            const maxDragDomTop = screenHeight - el.offsetTop - dragDomheight;

            const domLeft = getDomStyle(el, 'left');
            const domTop = getDomStyle(el, 'top');
            let styL = +domLeft;
            let styT = +domTop;

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (domLeft.includes('%')) {
                styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100);
                styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100);
            } else {
                styL = +domLeft.replace(/px/g, '');
                styT = +domTop.replace(/px/g, '');
            }

            document.onmousemove = function(e) {
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                // 边界处理
                if (-left > minDragDomLeft) {
                    left = -minDragDomLeft;
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft;
                }

                if (-top > minDragDomTop) {
                    top = -minDragDomTop;
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop;
                }

                // 移动当前元素
                el.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };

        }
    },

    //  beforeUpdate(el) {},

    // updated(el, { value }) {
    //   el.$value = value;
    // },

    //  beforeUnmount(el) {
    //  },

    // unmounted(el) {
    // },
};

export default draggable;