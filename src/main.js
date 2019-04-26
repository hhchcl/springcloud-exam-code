// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
//import $ from 'jquery'
import router from './router/router'
import ElementUI from 'element-ui'
import Resource from 'vue-resource'
import Vuex from 'vuex'
import myPlugin from './components/myPlugin'
import store from './vuex/store'
import tools from './lib/tools'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './styles/common.scss'
import './styles/reset.scss'
import locale from 'element-ui/lib/locale/lang/en'
import { HappyScroll } from 'vue-happy-scroll'

Vue.component('happy-scroll', HappyScroll)
Vue.use(ElementUI, { locale })
Vue.use(router)
Vue.use(Resource)
Vue.use(Vuex)
    //Vue.use($)

Vue.prototype.$tools = tools

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
/*new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    store,
})*/
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')