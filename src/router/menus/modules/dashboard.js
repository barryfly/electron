import { DashboardOutlined} from '@ant-design/icons-vue'
const menu = {
    orderNo: 1,
    menu: {
        path: '/dashboard/index',
        name: 'Dashboard',
        icon: DashboardOutlined,
        // tag: { dot: true},
        children: [
            { path: 'analysis', name: '分析页'},
            { path: 'monitor', name: '监控页'},
            { path: 'workplace', name: '工作台'},
        ]
    }
}

export default menu