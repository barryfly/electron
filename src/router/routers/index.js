import {importAll} from 'utils'

const RouteList = importAll(require.context('./modules', true, /\.js$/), true)

export default  RouteList