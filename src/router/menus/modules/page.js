import { ChromeOutlined } from '@ant-design/icons-vue'
const menu = {
    orderNo: 30,
    menu: {
        path: '/page',
        name: '页面',
        icon: ChromeOutlined,
        // tag: { dot: true},
        children: [
            { path: 'form', name: '表单页'},
            { path: 'profile', name: '详情页'},
            { path: 'result', name: '结果页'},
            { path: 'exception', name: '异常页'},
            { path: 'list', name: '列表页'},
            { path: 'account', name: '个人页'},
            { path: '/capture/index', name: '截屏'},
        ]
    }
}

export default menu