import { createStore } from 'vuex'
import {importAll} from 'utils'

export async function setupStore(app) {
    const modules = await importAll(require.context('./modules', true, /\.js$/))
    const store = createStore({modules});
    app.use(store);
}
