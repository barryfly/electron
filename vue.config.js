module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'components': '@/components',
                'views': '@/views',
                'utils': '@/utils',
                'apis': '@/apis',
                'assets': '@/assets',
                'locales': '@/locales',
                'router': '@/router',
                'store': '@/store',
                'hooks': '@/hooks',
                'main': '@/main'
            }
        }
    },

    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
        }
    },

    productionSourceMap: false,
}