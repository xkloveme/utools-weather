import Vue from "vue";
import App from "./App.vue";
// import "mdui/dist/css/mdui.css";
// import "mdui/dist/js/mdui.js";
import Api from "./utils/index";
import store from "./store";
import Vant from './vant.js'

import 'vuesax/dist/vuesax.min.css'

Vue.use(Vant)
// Vue.use(vsButton)
// Vue.use(vsInput)
// Vue.use(vsDialog)
Vue.config.productionTip = false;
Vue.prototype.utools = window.utools;
Vue.prototype.$api = Api;
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production") {
  window.utools.onPluginReady(() => {
    console.log("插件装配完成，已准备好");
    new Vue({
      render: (h) => h(App),
      store: store,
    }).$mount("#app");
  });
} else {
  new Vue({
    render: (h) => h(App),
    store: store,
  }).$mount("#app");
}
