<template>
    <div class="loading">
        <h1 :data-text="text">{{text}}</h1>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        text: {
            type: String,
            default: 'Loading......',
        },
    },
    setup() {

        return {

        };
    }
})
</script>

<style scoped>
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #000;
    }
    h1 {
        position: relative;
        font-size: 4em;
        color: #222;
        border-bottom: 16px solid #222;
        letter-spacing: 0.05em;
    }
    h1::before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        color: #03a9f4;
        overflow: hidden;
        border-bottom: 16px solid #03a9f4;
        animation: animate 10s linear infinite;
    }

    @keyframes animate {
        0% {
            width: 0;
        }

        100% {
            width: 100%;
        }
    }
</style>