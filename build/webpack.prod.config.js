const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
    devtool: "source-map",
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        publicPath: "/lib/",
        filename: "index.js",
        library: "sh-vue-boilerplate",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: "Vue",
            commonjs: "vue",
            commonjs2: "vue",
            amd: "vue"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});
