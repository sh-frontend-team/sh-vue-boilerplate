const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConfig, {
    devtool: "source-map",
    entry: {
        main: "./src/main.js"
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        publicPath: "/lib/",
        filename: "sh-vue-boilerplate.js",
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), "lib")]
        }),
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
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        })
    ]
});
