// import Vue from 'vue'
// import App from './App.vue'
// import ElementUI from 'element-ui';
// import {Row,Button} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// import router  from './router';
// Vue.use(ElementUI)


// // 按需引入
// Vue.use(Row);
// Vue.use(Button);


// // Vue.use(ElementUI);
// // 全局注入

// Vue.config.productionTip = false
// // 关闭生产提示

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import {Row,Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router  from './router';
import store  from './store';
import './api/mock'

// 全局注入
Vue.use(ElementUI);

// 按需引入
// Vue.use(Row);
// Vue.use(Button);

Vue.config.productionTip = false
// 关闭生产提示

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
