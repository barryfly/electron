import { AppstoreOutlined } from '@ant-design/icons-vue'
const menu = {
    orderNo: 30,
    menu: {
        path: '/comp',
        name: '组件',
        icon: AppstoreOutlined,
        tag: { dot: true},
        children: [
            { path: 'form', name: '表单'},
            { path: 'qrcode', name: '二维码', tag: {content: 'new'}},
            { path: 'verify', name: '验证',tag: {dot: true}, children:[
                {path: 'drag', name: '拖动',tag: {content: 'new'}},
                {path: 'rotate', name: '旋转',tag: {content: 'new'}},
            ]},
            { path: 'strength', name: '密码强度', tag: {content: 'new'}},
            { path: 'cropper', name: '图片裁剪', tag: {content: 'new'}},
            { path: 'modal', name: '弹框扩展', tag: {content: 'new'}},
        ]
    }
}

export default menu