<template>
    <component :is="tag" ref="wrapRef" />
</template>
<script>
import { defineComponent, watchEffect, ref, unref } from 'vue';
import { toCanvas } from './toCanvas';
import { toDataURL } from 'qrcode';
import { downloadByUrl } from 'utils/file/download';

export default defineComponent({
    name: 'QrCode',
    props: {
        value: {
            type: [String, Array],
            default: null,
        },
        // 参数
        options: {
            type: Object,
            default: null,
        },
        // 宽度
        width: {
            type: Number,
            default: 200,
        },
        // logo图标
        logo: {
            type: [String, Object],
            default: '',
        },
        // img
        tag: {
            type: String,
            default: 'canvas',
            validator: (val) => ['canvas', 'img'].includes(val),
        },
    },
    emits: { done: (data) => !!data, error: (error) => !!error },
    setup(props, { emit }) {
        const wrapRef = ref(null);
        async function createQrcode() {
            try {
                const { tag, value, options = {}, width, logo } = props;
                const renderValue = String(value);
                const wrapEl = unref(wrapRef);

                if (!wrapEl) return;

                if (tag === 'canvas') {
                    const url = await toCanvas({
                        canvas: wrapEl,
                        width,
                        logo: logo,
                        content: renderValue,
                        options: options || {},
                    });
                    emit('done', { url, ctx: (wrapEl).getContext('2d') });
                    return;
                }

                if (tag === 'img') {
                    const url = await toDataURL(renderValue, {
                        errorCorrectionLevel: 'H',
                        width,
                        ...options,
                    });
                    (unref(wrapRef)).src = url;
                    emit('done', { url });
                }
            } catch (error) {
                emit('error', error);
            }
        }
        /**
         * file download
         */
        function download(fileName) {
            let url = '';
            const wrapEl = unref(wrapRef);
            if (wrapEl instanceof HTMLCanvasElement) {
                url = wrapEl.toDataURL();
            } else if (wrapEl instanceof HTMLImageElement) {
                url = wrapEl.src;
            }
            if (!url) return;
            downloadByUrl({
                url,
                fileName,
            });
        }

        watchEffect(() => {
            setTimeout(() => {
                createQrcode();
            }, 30);
        });

        return { wrapRef, download };
    },
});
</script>