import Vue from "vue";
import Vuex from "vuex";
import examples from "./examples";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { examples },
    actions: {},
    mutations: {}
});

export default store;
