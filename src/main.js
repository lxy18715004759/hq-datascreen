import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"

import '@/styles/reset.scss'
import '@/styles/common.scss'

import G2 from "@antv/g2"

const {Global} = G2;
Global.setTheme('dark');

import DataSet from '@antv/data-set';

window.DataSet = DataSet

import datav from '@jiaminghi/data-view'

Vue.use(datav)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)


Vue.config.productionTip = false

let host = "";
let resourceHost = ""
switch (process.env.NODE_ENV) {

    case "development":
        host = "http://localhost:3000"
        resourceHost = "http://localhost:80"
        break;
    case "production":
        host = "http://39.100.94.39:8082"                    // 后台服务接口的地址
        resourceHost = "http://39.100.94.39:8083"              // 视频资源加载地址
        break;
    default:
        host = "http://localhost:3000";
        resourceHost = "http://localhost:80"
        break;
}
axios.defaults.baseURL = host;
Vue.prototype.$axios = axios
Vue.prototype.$resourceHost = resourceHost;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
