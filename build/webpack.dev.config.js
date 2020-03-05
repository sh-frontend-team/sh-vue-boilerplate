/**
 * 本地预览
 */

const path = require("path");
const pkg = require("../package.json");
const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

function getVersion() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() +
        1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} v${
        pkg.version
    }`;
}

module.exports = merge(webpackBaseConfig, {
    devtool: "eval-source-map",
    // devtool: "inline-source-map",

    // 入口
    entry: {
        main: "./examples/main",
        vendors: ["vue", "vue-router", "vuex"]
        // moment: ["moment"]
    },
    // 输出
    output: {
        filename: "static/[name]-[hash:8].bundle.js",
        path: path.join(__dirname, "../dist"),
        publicPath: ""
    },
    resolve: {
        alias: {
            "@demo": resolve("examples")
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.join(process.cwd(), ".", "dist/*")
            ]
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        /**
         * webpack 4 已经移除该插件
         * 链接地址：https://webpack.docschina.org/plugins/commons-chunk-plugin/#src/components/Sidebar/Sidebar.jsx
         */
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendors"],
            filename: "[name].[hash:8].bundle.js",
            minChunks: Infinity,
            chunks: ["main"]
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
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, "../dist/index.html"),
            template: path.join(__dirname, "../examples/public/index.html"),
            version: getVersion()
        }),
        new FriendlyErrorsPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false // 是否在打包完成之后自动打开分析界面
        })
    ]
});
