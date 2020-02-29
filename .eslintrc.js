module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        // "standard",
        // "eslint:recommended",
        // "plugin:vue/essential",
        // "plugin:@typescript-eslint/eslint-recommended",
        // "@vue/airbnb", eslint-plugin-vue 必须使用@vue/cli-service/webpack.config.js
        // "plugin:vue/essential",
        "plugin:prettier/recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        // ecmaVersion: 2018,
        // parser: "@typescript-eslint/parser",
        parser: "vue",
        sourceType: "module"
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error"
        // "no-unused-vars": "warn",
        // "no-var": "warn",
        // "no-eval": "warn",
        // "vue/prop-name-casing": ["error", "camelCase"], // prop名大小写：在声明 prop 的时候，其命名应该始终使用 camelCase
        // "vue/name-property-casing": ["error", "PascalCase"], // JS、JSX中的组件名应该始终是 PascalCase
        // "vue/require-prop-types": "error", // props定义尽量详细
        // "vue/require-v-for-key": "error", // v-for设置键值，与key结合使用
        // "vue/no-use-v-if-with-v-for": [
        //     "error",
        //     {
        //         allowUsingIterationVar: false
        //     }
        // ], //不要把 v-if 和 v-for 用在同一个元素上
        // "vue/max-attributes-per-line": [
        //     "error",
        //     {
        //         singleline: 1,
        //         multiline: {
        //             max: 1,
        //             allowFirstLine: false
        //         }
        //     }
        // ], //多个特性的元素应该分多行撰写，每个特性一行
    }
};
