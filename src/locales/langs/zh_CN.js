import {importAll} from 'utils'

export default importAll(require.context('./zh_CN/', true, /\.js$/))
    