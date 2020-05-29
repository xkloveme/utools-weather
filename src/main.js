import Vue from "vue";
import App from "./App.vue";
import "mdui/dist/css/mdui.css";
import "mdui/dist/js/mdui.js";
import Api from "./utils/index";
import Vuesax from "vuesax";
import store from "./store";

import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax, {
  // options here
});

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
