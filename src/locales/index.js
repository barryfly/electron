import { getLocal } from "utils/storage";

async function createI18n() {
    const locale = getLocal("locale") || 'zh_CN';
    const i18nFile = await import(`./langs/${locale}.js`)
    const lang = i18nFile.default || {};

    return lang;
}

export async function setupI18n(app) {
    const I18n = await createI18n();
    app.config.globalProperties.i18n = I18n;
}
