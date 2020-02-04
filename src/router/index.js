import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 引入路由所映射的组件
import Login from "@/views/Login.vue";
import Personal from "@/views/personal.vue";
import EdutPersonal from "@/views/edutPersonal.vue";

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
      path: "/personal/:id",
      component: Personal
    },
    {
      name:'EdutPersonal',
      path:'/edutPersonal/:id',
      component: EdutPersonal
    }
  ]
});

// 添加导航守卫:前置守卫：在跳转之前进行调用
//所有路由跳转请求都会经过这个导航守卫
// to:目标路由
// from:源路由
// next:下一步的操作，就是用户当前需要进行的操作
router.beforeEach((to, from, next) => {
  // 并不是每个页面的访问都需要先登陆
  if (to.path.indexOf("/personal") === 0) {
    // 这里说明你要访问个人中心页
    // 如果用户登陆过，则进行路由的跳转，否则重定向到登陆页
    let token = localStorage.getItem("toutiao_token");
    if (token) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
// 暴露
export default router;
