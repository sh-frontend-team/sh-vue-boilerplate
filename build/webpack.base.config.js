/**
 * 公共配置
 */
const path = require("path");
const { join, dirname } = path;
const webpack = require("webpack");
const sass = require("sass");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const pkg = require("../package.json");
const rootDir = getRootDir(process.cwd());
const cacheDir = join(rootDir, "node_modules/.cache");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

function getRootDir(dir) {
    if (dir === "/") {
        return "/";
    }
    return dirname(dir);
}

const cacheLoader = {
    loader: "cache-loader",
    options: {
        cacheDirectory: cacheDir
    }
};

const cssLoader = [
    "style-loader",
    "css-loader",
    {
        loader: "postcss-loader",
        options: {
            ident: "postcss",
            plugins: loader => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-cssnext")(),
                require("precss")(),
                require("postcss-calc")(),
                require("postcss-flexbugs-fixes")(),
                require("css-mqpacker")(),
                require("cssnano")(),
                require("postcss-pxtorem")({
                    rootValue: 75,
                    unitPrecision: 5,
                    propList: ["*"],
                    selectorBlackList: [".van-"],
                    replace: true,
                    mediaQuery: false,
                    minPixeValue: 1
                })
            ]
        }
    }
];

module.exports = {
    // 加载器
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    cacheLoader,
                    {
                        loader: "vue-loader",
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: cssLoader
            },
            {
                test: /\.less$/,
                use: [...cssLoader, "less-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    ...cssLoader,
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: sass
                        }
                    }
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            fallback: require.resolve("responsive-loader")
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".vue"],
        alias: {
            vue: "vue/dist/vue.esm.js",
            // vue: 'vue/dist/vue.runtime.js'
            "@": resolve("src")
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            "process.env.VERSION": `'${pkg.version}'`
        })
    ]
};
