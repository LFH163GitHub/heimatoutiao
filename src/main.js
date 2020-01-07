import Vue from "vue";
import App from "./App.vue";

//使用vant框架的组件
import { Toast } from "vant";
Vue.use(Toast);


Vue.config.productionTip = false;
import router from "@/router/index.js";
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
