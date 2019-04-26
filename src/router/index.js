/*import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/components/index'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }]
})*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers' // routes名称要与routers.js暴露的名称一样，不然会报错
import storage from '@/lib/storage'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    const loginReg = /login|register|forgot|test|template|addLoginModule/
    const loginModule = loginReg.test(to.path)
    if (loginModule) {
        sessionStorage.clear()
    }
    if (to.fullPath == "/") {
        next("/components/index")
    }
    let bd = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    bd.animate({ scrollTop: 0 }, 200);
})
export default router;