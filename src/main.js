import './style/index.css'
import { createApp } from 'vue'
import App from './App.vue'

import { setupI18n } from './locales'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupHttp } from './utils/http'
import { setupAntd } from './antd'
import Directives from './directives'

(async() => {
    const app = createApp(App);
    await setupI18n(app);
    setupRouter(app)
    setupStore(app)
    setupHttp(app)
    setupAntd(app)
    app.use(Directives)
    app.mount('#app')
})();