import VueRouter from "vue-router";

// 路由配置
const router = new VueRouter({
    mode: "history",
    routes: [
        {
            name: "home",
            path: "/",
            component: resolve => require(["../views/home.vue"], resolve),
            meta: {
                title: "食行组件库"
            }
        },
        {
            name: "do-task",
            path: "/do-task",
            component: resolve => require(["../views/do-task.vue"], resolve),
            meta: {
                title: "做任务"
            }
        },
        {
            name: "loading",
            path: "/loading",
            component: resolve => require(["../views/loading.vue"], resolve),
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

export default router;
