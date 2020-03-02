module.exports = {
    env: {
        amd: true,
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2017,
        sourceType: "module"
    },
    plugins: ["vue", "prettier"],
    rules: {
        "prettier/prettier": "error"
    }
};
