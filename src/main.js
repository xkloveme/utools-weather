import Vue from "vue";
import App from "./App.vue";
import "mdui/dist/css/mdui.css";
import "mdui/dist/js/mdui.js";
import { utools } from "./utils/utools.js";
import Api from './utils/index'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  window.utools = window.utools || utools;
}

Vue.config.productionTip = false;
Vue.prototype.utools = window.utools;
Vue.prototype.$api = Api
new Vue({
  render: (h) => h(App),
}).$mount("#app");
