import { Toast } from "vant";
import DoTask from "./do-task";
import Loading from "./loading";
import HelloWord from "./helloword/HelloWorld.vue";

const components = {
    DoTask,
    DoTaskItem: DoTask.Item,
    Loading,
    HelloWord: HelloWord
};

const install = function(Vue, opts = {}) {
    console.log(opts);
    if (install.installed) return;
    Vue.prototype.$toast = Toast;
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
        const componentExtend = Vue.extend(components[key]);
        const instance = new componentExtend();

        switch (key) {
            case "Loading":
                instance.$mount(document.createElement("div"));
                document.body.appendChild(instance.$el);
                Vue.prototype.$loading = instance;
                break;
            default:
        }
    });
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

const APIList = {
    install,
    ...components
};

module.exports.default = module.exports = APIList;
