import axios from 'axios';
import storage from './storage'
let qs = require('qs');
let headers = { // 自定义发送，和params一起
    headers: {
        'versionNo': '1.0',
        'systemID': 'NPB',
        'srcSystemID': 'IM',
        'transFlow': '09876543210987654321098765432109',
        'transGlobalFlow': '12345678901234567890123',
        'channel': 'CIP'
    }
}
let requestDemo = false // 设置请求本地报文
let jqXhrRegistry = [] // 记录发送请求的个数
let requestTimmer = undefined // 最后一次发送请求倒计时
let logoutTimmer = undefined // 无操作倒计时
let countdown = 60
let requestCallBackDone = (vm, resultData) => { // 请求回调做一些公共的事情
    if (!vm.closeLoading) {
        jqXhrRegistry.splice(0, 1)
        if (!jqXhrRegistry.length) vm.$loading().close()
    }
    if (requestTimmer) clearTimeout(requestTimmer)
    requestTimmer = setTimeout(function () { // 记录19分钟有没有发送.do请求
        let currentRouter = location.hash
        const loginReg = /login|register|forgot|test|template|addLoginModule/ //addLoginModule用来扩展登录页面的模块。
        const loginModule = loginReg.test(currentRouter)
        if (loginModule) return '登录模块，不用计时器'
        $(".el-message-box__close").trigger("click")
        vm.$alert(" ", "Session Timeout Notice:", { //倒计时提醒弹窗 
            confirmButtonText: "Stay Signed in",
            customClass: "requestTimmer",
            callback: action => {
                if (countdown == 0) { //操作超时    
                    request(vm, "IM000104.do")
                    //vm.$alert("Logon timeout，please login again")
                    countdown = 60
                } else if (countdown > 0) { //继续操作
                    request(vm, "IM000105.do")
                    // requestCallBackDone(vm, res)
                }
                clearInterval(logoutTimmer)
                $(".requestTimmer .el-message-box__message .countdownWarn").remove()
                countdown = 60
            }
        })
        setTimeout(function () { //因为弹窗用了CSS3特效
            // $(".requestTimmer .el-message-box__message").append("<div class='countdownWarn'>You haven't done it for thirty nimutes，Log out after <span class='countdown'>" + countdown + "</span> /S </div>")
            // $(".requestTimmer .el-message-box__message").append("<div class='countdownWarn'>Your session will be expired in 30 minutes.You will be automatically logoff in <span class='countdown'>" + countdown + "</span> seconds. </div>")
            //  countdown -= 1;
            if(countdown > 0) {
                $(".requestTimmer .el-message-box__message").append("<div class='countdownWarn'>Your session will be expired in 30 minutes.You will be automatically logoff in <span class='countdown'>" + countdown + "</span> seconds. </div>")
                countdown -= 1;
            }
        }, 0)
        logoutTimmer = setInterval(function () { // 60秒倒计时
            if (countdown <= 0) {
                clearInterval(logoutTimmer)
                vm.$router.push('/login/loginMain')
                $(".requestTimmer .el-message-box__close").trigger("click")
            } else {
                $(".requestTimmer .el-message-box__message .countdownWarn .countdown").html(countdown)
                countdown -= 1;
            }
        }, 1000);
    }, 29 * 60 * 1000)
}
let defaultConfig = { "closeLoading": false }
export const
    request = (vm, url, params) => {
        // vm参数是VUE的实例
        if (params && params.closeLoading) vm.closeLoading = params.closeLoading
        else vm.closeLoading = defaultConfig.closeLoading
        //vm=$.extend({},vm,defaultConfig,params)
        if (!vm.closeLoading) {
            jqXhrRegistry.push(url)
            vm.$loading()
        }
        let currentHash = vm.$route.path.substr(1)
        let menuGround = vm.$tools.storage.get("menuGround", "save")
        if (menuGround && menuGround[currentHash]) {
            //console.log("id",menuGround[currentHash].id)
        }
        if (requestDemo) { //demo
            let demoUrl = "/mock/" + url + ".json"
            return axios.get(demoUrl).then(
                res => { // 成功回调方法
                    requestCallBackDone(vm, res)
                    return res.data
                }).catch(
                    error => {
                        requestCallBackDone(vm, error)
                        return error
                    }
                )
        } else { //生产
            let user = storage.get("user", "save")
            if (user && user.iCIFID) {
                params = $.extend({}, params, { "iCIFID": user.iCIFID });
                let jsonParams = JSON.stringify(params)
                params.jsonParams = jsonParams
            }  
         //return axios.post(url, qs.stringify(params), headers).then(
           return axios.post('/api/' + url, qs.stringify(params), headers).then(
                res => { // 成功回调方法
                    if(res.data.body.errorCode == 'EBLN99999'){
                        vm.$alert(res.data.body.errorMsg, "session time out", {
                            confirmButtonText: "OK",//按钮上显示的自
                            customClass: "requestTimmer",
                            callback: action => {//这是点击按钮后的回调方法
                                vm.$router.push('/login/loginMain')
                            }
                        })
                    }
                    requestCallBackDone(vm, res)
                    return res.data
                }).catch(
                    error => {
                        requestCallBackDone(vm, error)
                        return error
                    }
                )
        }
    }
    