import "babel-polyfill";
import "lib-flexible";
import Vue from "vue";
import VueRouter from "vue-router";
import { UpdateAuth } from "@freshservice/bridge";
import router from "./router";
import store from "./store";
import App from "./app.vue";
// import ShVueBoilerplate from 'sh-vue-boilerplate'
import ShVueBoilerplate from "../src/index";
import { Row, Col, Overlay, Icon } from "vant";

UpdateAuth.prototype.execute = function() {
    if (!this.needUpdate()) return;
    if (
        this.query.from.indexOf("wechat") > -1 ||
        this.query.from.indexOf("wxmini") > -1
    ) {
        this.wechat();
    } else {
        this.app();
    }
    this.updateLocal(this.tokenMap, this.TOKEN_NAME);
    this.updateLocal(this.cityMap, this.CITY_NAME);
};
UpdateAuth.init().execute();

Vue.use(VueRouter)
    .use(ShVueBoilerplate)
    .use(Row)
    .use(Col)
    .use(Icon)
    .use(Overlay);

// 开启debug模式
Vue.config.debug = true;
Vue.config.errorHandler = err => {
    console.log(err);
};

const app = new Vue({
    store,
    router,
    render: h => h(App),
    renderError(h, err) {
        return h(
            "pre",
            { style: { width: "100%", color: "red", overflow: "auto" } },
            err.stack
        );
    }
}).$mount("#app");
