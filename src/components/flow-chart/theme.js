export default function RegisteTheme(flowInstance) {
if (!flowInstance) return
flowInstance.setTheme({
    apply: {
        r: 30,
        stroke: '#ff6347',
    },
    finsh: {
        r: 30,
        stroke: '#ff6347',
    },
    circle: {
        r: 30,
        stroke: '#ff6347',
    },
    rect: {
        width: 100,
        height: 80,
        stroke: '#3cb371',
        radius: 4,
    },
    diamond: {
        rx: 35,
        ry: 35,
        stroke: '#6495ed',
    }
})
}