import Vue from "vue"
import VueRouter from "vue-router"
import Home from '../views/home.vue'
import User from '../views/user.vue'
import Main from '../views/main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/pageone.vue'
import  PageTwo from '../views/pagetwo.vue'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: Main,
        redirect:'/home',//重定向
        children: [
            { path: '/home', component: Home },
            { path: '/user', component: User },
            { path: '/mall', component: Mall },//商品管理
            { path: '/page1', component: PageOne },//其他1
            { path: '/page2', component: PageTwo },//其他2
        ]
    },
    
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router
