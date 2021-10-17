import {importAll} from 'utils'

export default importAll(require.context('./en_US/', true, /\.js$/))
    