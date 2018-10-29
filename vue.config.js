const webpack = require('webpack');
const path = require('path');

module.exports = {
    baseUrl: undefined,
    outputDir: undefined,
    assetsDir: 'sys',
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,

    configureWebpack: {
        module: {
            rules: [
                // {
                //     test: require.resolve('quill'),
                //     use: [
                //         {
                //             loader: 'expose-loader',
                //             options: 'Quill',
                //         },
                //     ],
                // },
            ],
        },
        devServer: {
            disableHostCheck: true,
        },
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill',
                Quill: 'quill',
            }),
        ],
    },

    transpileDependencies: ['quill/blots', 'quill/formats'],

    pluginOptions: {
        i18n: {
            locale: 'ru',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true,
        },
    },
};
