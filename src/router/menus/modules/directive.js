import { MacCommandOutlined } from '@ant-design/icons-vue'
const menu = {
    orderNo: 9994,
    menu: {
        path: '/directive',
        name: '自定义指令',
        icon: MacCommandOutlined,
        tag: { dot: true},
        children: [
            { path: 'copy', name: '复制', tag: {content: 'new'}},
            { path: 'longpress', name: '长按', tag: {content: 'new'}},
            { path: 'watermark', name: '水印', tag: {content: 'new'}},
            { path: 'debounce', name: '防抖', tag: {content: 'new'}},
            { path: 'permission', name: '权限', tag: {content: 'new'}},
            { path: 'draggable', name: '拖拽', tag: {content: 'new'}},
            { path: 'lazyload', name: '懒加载', tag: {content: 'new'}},
        ]
    }
}

export default menu