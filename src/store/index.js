import Vue from "vue";
import Vuex from 'vuex';
import tab from './tab';
Vue.use(Vuex)

// 创建一个vuex实例
export default new Vuex.Store({
    //对外暴露
    modules:{
        tab
    }
})