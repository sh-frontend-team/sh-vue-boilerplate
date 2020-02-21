/**
 * 本地预览
 */

const path = require("path");
const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = merge(webpackBaseConfig, {
    devtool: "eval-source-map",

    // 入口
    entry: {
        main: "./examples/main",
        vendors: ["vue", "vue-router", "vuex"]
    },
    // 输出
    output: {
        path: path.join(__dirname, "../examples/dist"),
        publicPath: "",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    resolve: {
        alias: {
            "@demo": resolve("examples")
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendor.bundle.js"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, "../examples/dist/index.html"),
            template: path.join(__dirname, "../examples/index.html")
        }),
        new FriendlyErrorsPlugin()
    ]
});
