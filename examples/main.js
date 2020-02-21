import "babel-polyfill";
import "lib-flexible";
import Vue from "vue";
import VueRouter from "vue-router";
import { UpdateAuth } from "@freshservice/bridge";
import store from "./store";
import App from "./app.vue";
import ShVueBoilerplate from 'sh-vue-boilerplate'
// import ShVueBoilerplate from "../src/index";
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
// 路由配置
const router = new VueRouter({
    mode: "history",
    routes: [
        {
            name: "home",
            path: "/",
            component: resolve => require(["./routers/home.vue"], resolve),
            meta: {
                title: "食行组件库"
            }
        },
        {
            name: "do-task",
            path: "/do-task",
            component: resolve => require(["./routers/do-task.vue"], resolve),
            meta: {
                title: "做任务"
            }
        },
        {
            name: "loading",
            path: "/loading",
            component: resolve => require(["./routers/loading.vue"], resolve),
            meta: {
                title: "Loading"
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name !== "home") {
        window.document.title = `食行组件库 - ${to.meta.title} - sh-vue-boilerplate`;
    } else {
        window.document.title = `食行组件库 - sh-vue-boilerplate`;
    }
    next();
});

const app = new Vue({
    store,
    router: router,
    render: h => h(App),
    renderError(h, err) {
        return h(
            "pre",
            { style: { width: "100%", color: "red", overflow: "auto" } },
            err.stack
        );
    }
}).$mount("#app");
