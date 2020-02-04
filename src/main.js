import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
// vant框架里的Toast轻提示中间件
import {
  Toast,
  Icon,
  Uploader,
  Dialog,
  Field,
  Picker,
  Tab,
  Tabs,
  List,
  PullRefresh,
  SwipeCell,
  Button,
  Search
} from "vant";
// 引入全局样式
import "@/styles/reset.css";
//Toast轻提示
Vue.use(Toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(Picker)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(SwipeCell)
  .use(Button)
  .use(Search);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
