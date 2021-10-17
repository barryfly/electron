import { LoadingOutlined  } from '@ant-design/icons-vue'
const menu = {
    orderNo: 9994,
    menu: {
        path: '/lock',
        name: '锁屏',
        icon: LoadingOutlined,
        tag: { dot: true},
        children: [
            { path: 'lamp', name: '跑马灯', tag: {content: 'new'}},
            { path: 'tea', name: '茶', tag: {content: 'new'}},
            { path: 'loading', name: '加载', tag: {content: 'new'}},
        ]
    }
}

export default menu