// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import router from "./router";
import axiosInstance from "./axios";
import App from "./App";
import Multiselect from 'vue-multiselect'

require("../public/resources/css/bootstrap.min.css");
require("../public/resources/css/style.css");
require("../public/resources/css/responsive.css");

/****************************************
 ****************** App *****************
 ****************************************/

Vue.component('multiselect', Multiselect)

Vue.prototype.$http = axiosInstance;

new Vue({
  el: "#app",
  template: "<App/>",
  components: { App },
  router: router,
  data: {},
});

