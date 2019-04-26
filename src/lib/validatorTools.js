let self = {
    isPhone(value) { //校验手机格式
        if (!this.isNumber(value)) return false
        let clientRegex = /^(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
        return clientRegex.test(value);
    },
    isNumber(value) { //校验手机格式
        return !isNaN(value);
    },
    isIllegalr(value) { //校验非法字符
        //return /[!@#\$%\^&\*]+/g.test(value)
        //return /^[A-Za-z0-9(). \-\u2E80-\uFE4F\u3400-\u4DBF\uF900-\uFAD9\u3000-\u303F\u2000-\u206F\uFF00-\uFFEF]{1,60}$+/g.test(value)
        return /^[A-Za-z0-9(). \-\u2E80-\uFE4F\u3400-\u4DBF\uF900-\uFAD9\u3000-\u303F\u2000-\u206F\uFF00-\uFFEF\_\·]{1,60}$/.test(value)
    },
    isUnion(value) { //数字字母汉字
        return !/^([\u4e00-\u9fa5\a-zA-Z0-9]+)$/.test(value);
    },
    isNumEng(value) { //数字字母
        return !/^([a-zA-Z0-9]+)$/.test(value);
    },
    isEngNum(rule, value, callback) { //数字字母
        if (!/^([a-zA-Z0-9 ]+)$/.test(value) && $.trim(value) != "") {
            callback("require number or letter");
        } else {
            callback();
        }
    },
    newPasswordCompare(rule, value, callback) {
        let _form = rule.vm[rule.form];
        let compareValue1 = _form[rule.compareList[0]];
        let compareValue2 = _form[rule.compareList[1]];
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (compareValue1 != compareValue2) {
                callback("password1 and password2 do want not wait");
            } else {
                callback();
            }
        }
    },
    isInteger(rule, value, callback) {
        let valueReg = /(^[0])|(\.0*)$/.test(value)
        if (self.isEmpty(value) || valueReg || !Number.isInteger(Number(value))) {
            callback("require number");
        } else {
            callback();
        }
    },
    numberRange(rule, value, callback) {
        if (rule.rangeVal[0] <= value && value <= rule.rangeVal[1]) callback()
        else callback("arrange" + rule.rangeVal[0] + "to" + rule.rangeVal[1])
    },
    isEmpty(value) {
        if ($.trim(value) == "") return true;
        return false;
    },
    isLongNumber(value) { //数字字母汉字
        return /^([0-9]+)$/.test(value);
    },
    isNum(rule, value, callback) { //数字
        //return /^([0-9]+)$/.test(value)
        if (/^[0-9]*$/.test(value) && $.trim(value) != "") {
            callback();
        } else {
            callback("require number");
        }
    },
    isShowMenu(vm) { //菜单展示
        let CurrentHash = vm.$route.path
        const loginReg = /login|register|forgot|addLoginModule/; //addLoginModule用来扩展登录页面的模块。
        const loginModule = loginReg.test(CurrentHash);
        return !loginModule;
    },
    isShowEye(vm) { //账号眼睛按钮
        let user = vm.$tools.storage.get("user", "save")
        if (user && user.protect == "Y") {
            return "btnEye";
        } else {
            return "btnEye showEye";
        }
    },
    fieldsCollection(rule, value, callback) {
        let _this = rule.vm;
        let fieldVal = _this.form[rule.field].replace(/\n/g, '/').split("/");
        if (fieldVal.length == rule.fieldList.length) {
            for (let i = 0; i < rule.fieldList.length; i++) {
                _this.form[rule.fieldList[i]] = fieldVal[i]
            }
            callback();
        } else {
            callback("format error");
        }
    },
    amountCompare(rule, value, callback) {
        let _form = rule.vm[rule.formName]
        let compareValue1 = _form[rule.compareList[0]]
        let compareValue2 = _form[rule.compareList[1]]
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (Number(compareValue1) > Number(compareValue2)) {
                callback("min amout more than max amout");
            } else {
                callback();
            }
        } else {
            if (self.isEmpty(_form[rule.field])) {
                for (let index in rule.compareList) {
                    if (rule.field != rule.compareList[index]) {
                        callback();
                    }
                }
            }
            callback();
        }
    },
    amountCompareList(rule, value, callback) {
        let _formNode = rule.vm[rule.formName][
            [rule.formNode]
        ];
        let compareValue1 = _formNode[rule.compareIndex[0]][rule.compareName];
        let compareValue2 = _formNode[rule.compareIndex[1]][rule.compareName];
        if (Number(compareValue1) >= Number(compareValue2)) {
            callback("max amout less than min amout");
        } else {
            callback();
        }
    },
    dateCompare(rule, value, callback) {
        let _form = rule.vm[rule.formName];
        let compareValue1 = _form[rule.compareList[0]];
        let compareValue2 = _form[rule.compareList[1]];
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (compareValue1.getTime() > compareValue2.getTime()) {
                callback("startTime more than endTime");
            } else {
                callback();
            }
        } else {
            if (self.isEmpty(_form[rule.field])) {
                for (let index in rule.compareList) {
                    if (rule.field != rule.compareList[index]) {
                        if (!self.isEmpty(_form[rule.compareList[index]])) {
                            callback("required");
                        }
                        callback();
                    }
                }
            }
            callback()
        }
    },
    limitCompare(rule, value, callback) {
        let _form = rule.vm[rule.formName];
        let compareValue1 = _form[rule.compareList[0]];
        let compareValue2 = _form[rule.compareList[1]];
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (compareValue1 > compareValue2) {
                callback("Single Limit more than Daily amount Limit");
            } else {
                callback();
            }
        }
        callback()
    },
    limitMultCompare(rule, value, callback) {
        let _form = rule.vm[rule.formName];
        let compareValue1 = _form[rule.compareList[0]];
        let compareValue2 = _form[rule.compareList[1]];
        let compareValue3 = _form[rule.compareList[2]];
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2) && !self.isEmpty(compareValue3)) {
            if ((compareValue1 * compareValue2) > compareValue3) {
                callback("Single Limit multip Daily amount Limit result more than Daily Limit");
            } else {
                callback();
            }
        }
        callback()
    },
    dayAndYearlimitCompare(rule, value, callback) {
        let _form = rule.vm[rule.formName];
        let compareValue1 = _form[rule.compareList[0]];
        let compareValue2 = _form[rule.compareList[1]];
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (compareValue1 > compareValue2) {
                callback("Year Limit must be greater than Daily Limit");
            } else {
                callback();
            }
        }
        callback()
    },
    compareDate(rule, value, callback) {
        let _form = rule.vm[rule.formName]
        let compareValue1 = _form[rule.compareList[0]]
        let compareValue2 = _form[rule.compareList[1]]
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            if (compareValue1.getTime() > compareValue2.getTime()) {
                callback("startTime more than endTime")
            } else {
                callback()
            }
        } else {
            if (self.isEmpty(_form[rule.field])) {
                for (let index in rule.compareList) {
                    if (rule.field != rule.compareList[index]) {
                        if (!self.isEmpty(_form[rule.compareList[index]])) {
                            callback("required")
                        }
                        callback()
                    }
                }
            }
            callback()
        }
    },
    timeCompare(rule, value, callback) { //比较日期时间大于30分钟

        var myDate = new Date();
        let _form = rule.vm[rule.formName]
        let compareValue1 = _form[rule.compareList[0]]
        let compareValue2 = _form[rule.compareList[1]]
        if (self.isEmpty(value)) callback()
        if (!self.isEmpty(compareValue1) && !self.isEmpty(compareValue2)) {
            console.log("校验时间是否大于30分钟")
            if (compareValue1.getTime() >= compareValue2.getTime()) {
                callback("endTime more than startTime")
            } else {
                callback()
            }
        } else {
            if (self.isEmpty(_form[rule.field])) {
                for (let index in rule.compareList) {
                    if (rule.field != rule.compareList[index]) {
                        callback()
                    }
                }
            }
            callback()
        }
    },
    fileValidator(rule, value, callback) {
        let fileType = rule.fileType
        let _form = rule.vm[rule.configName]
        let _uploadConfig = rule.vm['uploadConfig']
        if (_uploadConfig.isShowBtnUoload && !self.isEmpty(_form.newFileName)) {
            if (_form.newFileName == "F") callback("file upload failed please reload")
            else callback()
        } else {
            if (self.isEmpty(value)) callback("select file")
            else if (value == "sizeIsBig") callback("file size >5M")
            else {
                let currentType = value.substring(value.lastIndexOf(".") + 1)
                let isFileType = false
                for (let i = 0; i < fileType.length; i++) {
                    if (currentType.toLowerCase() == fileType[i].toLowerCase()) {
                        isFileType = true
                    }
                }
                if (_uploadConfig.isShowBtnUoload && isFileType) {
                    _uploadConfig.isClickUpload = true
                    if (_uploadConfig.isClickUpload && !_uploadConfig.isUploading) callback()
                        // if (_uploadConfig.isClickUpload && !_uploadConfig.isUploading) callback("文件准备就绪，请点击按钮上传。")
                    else if (_uploadConfig.isUploading) callback("uploading，waiting...")
                    else callback()
                } else if (isFileType) callback()
                else callback("format:" + fileType)
            }
        }
    },

    isEmail(rule, value, callback) {
        //alert(!/^\S+@\w(.\w)+$/.test(value) && !$.trim(value)=="")
        if (!/^([A-Za-z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([A-Za-z0-9]{2,4})+$/.test(value) && $.trim(value) != "") {
            callback("请输入正确的邮箱格式!")
        } else {
            callback()
        }
    },
    isMobile(rule, value, callback) {
        if (!/^(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value) && $.trim(value) != "") {
            callback("format error")
        } else {
            callback()
        }
    },
    isZipCode(rule, value, callback) {
        if (value.length != 6 && $.trim(value) != "") {
            callback("length error")
        } else if (!/^[0-9]{6}$/.test(value) && $.trim(value) != "") {
            callback("format error")
        } else {
            callback()
        }
    },
    isMobileOrPhone(rule, value, callback) { //电话,手机 类型
        if (!/^(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value) && !/^0\d{2,3}-?\d{7,8}$/.test(value) && $.trim(value) != "") {
            callback("请输入正确的电话/手机格式!")
        } else {
            callback()
        }
    },
    isHKPhone(rule, value, callback) { //香港电话类型
        // if (!/^(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value) && !/^0\d{2,3}-?\d{7,8}$/.test(value) && $.trim(value) != "") {
        //     callback("format error")
        // } else 
        /*if(/^(0|1|999)/.test(value) && $.trim(value) != "") {
            callback("format error")
        }*/
        if (/^(?!999)\d{5}.*$/.test(value) && /^[2-9]\d{7}/.test(value) && $.trim(value) != "") {
            callback()
        } else {
            callback("format error")
        }
    },
    isAccNo(rule, value, callback) { //银行账号  数字 字母
        if (!/^([a-zA-Z0-9]+)$/.test(value) && $.trim(value) != "") {
            callback("format error")
        }
        callback()
    },
    isChEng(rule, value, callback) { //字母汉字
        // return !/^([\u4e00-\u9fa5\a-zA-Z]+)$/.test(value)
        if (!/^([\u4e00-\u9fa5\a-zA-Z]+)$/.test(value) && $.trim(value) != "") {
            callback("require letter or chinese")
        }
        callback()
    },
    isInt(rule, value, callback) { //正整数（不包括0）
        let valueReg = /^[1-9][0-9]\d*$/.test(value) ///[1-9][0-9]*$/
        if (!value) {
            callback()
        } else if (!valueReg) {
            callback("require number")
        } else {
            callback()
        }
    },
    isDigitalAndLetter(rule, value, callback) { //数字 字母
        if (!/^([a-zA-Z0-9]+)$/.test(value) && $.trim(value) != "") {
            callback("require letter or number")
        }
        callback()
    },
    compareNum(rule, value, callback) { //比较大小，入参：formName（form表单），mix（应该比当前数小的值），message（callback的值）
        let _mix = rule.vm[rule.formName][rule.mix]
        let _message = [rule.message]
        if (isNaN(value) || isNaN(_mix)) {
            callback('require number')
        } else if (Number(value) < Number(_mix)) {
            callback(_message)
        }
        callback()
    },
    isCnEngNum(rule, value, callback) { //数字字母汉字
        if (!/^([\u4e00-\u9fa5\(a-zA-Z)\s0-9]+)$/.test(value) && $.trim(value) != "") { // 20180727  !/^([\u4e00-\u9fa5\(a-zA-Z)0-9]+)$/.test(value) && $.trim(value) != ""
            callback("必须是数字或字母或中文!")
        }
        callback()
    },
    isCnEngNumAndNoSpace(rule, value, callback) { //数字字母，并且可以不允许有空格和中文
        if (!/^([a-zA-Z0-9]+)$/.test(value) && $.trim(value) != "") { // 20180727
            callback("由数字和字母组成，并且不允许有空格!")
        }
        callback()
    },
    isNumAndEng(rule, value, callback) { //银行账号  数字 字母
        if (!/^([a-zA-Z0-9]+)$/.test(value) && $.trim(value) != "") {
            callback("require letter or number")
        }
        callback()
    },
    validateUserStt(rule, value, callback) { //临柜授权员状态校验
        // debugger
        let isAuth = false
        let _this = rule.vm
        let userNameTemp = ''
        if (_this.isAuth && _this.userNameTemp == value) {
            callback()
        } else {
            let body = {}
            body.authUserNo = value
            _this.$tools.request(_this, "IM000106.do", body).then(data => {
                let operStt = data.body.operStt
                let errorMsg = "System Error Try again";
                if (operStt == '0') {
                    _this.isAuth = true
                    _this.userNameTemp = value
                    callback()
                } else {
                    let isAuth = false
                    callback(errorMsg)
                }
            })
        }
    },

}

export default self