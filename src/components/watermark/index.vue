<template>
    <canvas ref="watermarkRef"></canvas>
</template>

<script>
import { defineComponent, getCurrentInstance , reactive, onMounted  } from 'vue';

export default defineComponent({
    name: 'Watermark',
    props: {
        imgUrl: {
            type: String
        },

        options: {
            type: Object,
            default: ()=> {
                return {}
            }
        }
    },
    setup(props) {
        const currentInstance = getCurrentInstance()
        let defaultOptions = reactive({
            text: '水印',
            font: '16px sans-serif',
            fillStyle: '#e91e63',
            textAlign: 'start',
            textBaseline: 'alphabetic',
            direction: 'ltr',
            rotate: -20,
            placement: {x: 0, y: 0}        
        });

        const mergeOptions = (img) => {
            let mergeObject = Object.assign({}, defaultOptions, props.options)
            mergeObject.placement.x = mergeObject.placement.x === 0 ? img.width / 10 : mergeObject.placement.x;
            mergeObject.placement.y = mergeObject.placement.y === 0 ? img.height / 2 : mergeObject.placement.y;
            return mergeObject
        };

        const drawImage = (canvas, img)=> {
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0);
        };

        const drawText = (canvas, opts)=> {
            let ctx = canvas.getContext('2d');
            let {text, font, fillStyle, textAlign, textBaseline, rotate, placement} = opts;
            // 字号和字体
            ctx.font = font
            // 颜色
            ctx.fillStyle = fillStyle
            // 对齐
            ctx.textAlign = textAlign
            ctx.textBaseline = textBaseline;
            // 角度
            ctx.rotate((rotate * Math.PI) / 180)
            // 位置
            ctx.fillText(text, placement.x, placement.y)
        };

		const initCanvas = (url) => {
            let img = new Image();
            img.src = url;
            let canvas = currentInstance.refs.watermarkRef;
            canvas.width = img.width
            canvas.height = img.height
            img.onload = function() {
                drawImage(canvas, img);
                let opt = mergeOptions(img);
                drawText(canvas, opt)
            }
		};

		onMounted(() => {
			initCanvas(props.imgUrl);
        });

		return {
            defaultOptions,
            initCanvas,
            mergeOptions,
            drawImage,
            drawText
		};
    }
})

</script>

<style scoped></style>