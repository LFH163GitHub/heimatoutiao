import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 引入路由所映射的组件
import Login from "@/views/Login.vue";
import Personal from "@/views/personal.vue";

// 创建路由对象
let router = new VueRouter({
  // 配置路由
  routes: [
    // 1.登陆
    {
      name: "Login",
      path: "/login",
      component: Login
    },
    //2.个人中心
    {
      name: "Personal",
      path: "/personal",
      component: Personal
    }
  ]
});

// 暴露
export default router;
