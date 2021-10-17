import { BarChartOutlined } from '@ant-design/icons-vue'
const menu = {
    orderNo: 9997,
    menu: {
        path: '/chart/index',
        name: '图表',
        icon: BarChartOutlined,
        // tag: { dot: true},
        children: [
            { path: 'line', name: '折线图'},
            { path: 'bar', name: '柱状图'},
            { path: 'pie', name: '饼图'},
        ]
    }
}

export default menu