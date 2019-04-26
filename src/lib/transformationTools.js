let currencyOption = {
        MONEY_NUMS : new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"),
        MONEY_DIGITS: new Array("", "拾", "佰", "仟"),
        MONEY_BIGUNITS: new Array("", "万", "亿", "万亿", "仟兆"),
        MONEY_SHOWNAME: new Array("分", "角", "元"),
        MONEY_POSTFIX: "整"
    }
import validator from './validatorTools'
import storage from './storage'
export default {
	        mask (value,config) {  //打码
				 if(!config){
					 return value.substring(0,4) + " **** " + value.substring(value.length - 4)
				 }
				 else if(config.beforeIndex){
					 return value.substring(0,config.beforeIndex) + " **** " + value.substring(value.length - config.behindIndex);
				 }else if(config.behindIndex){
					 return "**** " + value.substring(value.length - config.behindIndex)
				 }		 
			 },
             accNoMask(value,config){
                 let user=storage.get("user","save")
                 if(user && user.protect=="Y"){
                     if(config){
                         return value.substring(0,config.beforeIndex) + " **** " + value.substring(value.length - config.behindIndex)
                     }else{
                         return value.substring(0,7) + " **** " + value.substring(value.length - 11)
                     }
                 }else{
                     return value
                 }
             },
			 lastIndexOf (value,config) { //截取尾数
                 if(!config) return value.substring(value.length - 4)
				 return value.substring(value.length - config.behindIndex)
			 },           
             accountFormat (value) { // 账号格式化，变成每4位加空格分隔的形式。
                var result = [];
                value = (value || "").toString().replace(new RegExp(/\s/g), "");
                if (value && value.length) {
                    for (var i = 0; i < value.length; i += 4) {
                        if (value.length < i + 4) {
                            result.push(value.substring(i))
                        }
                        else {
                            result.push(value.substring(i, i + 4))
                        }
                    }
                }
                return result.join(' ')
             },
             formatDate (date,config){  
                 if(config){
                    if(config.removeFormat){ //removeFormat参数是移除格式：如2017-06-09转成20170609
                        return date.replace(/(\-)|(\s)|(\:)/g,'')
                    }
                    if(config.todayAll){ //todayAll参数是获取今天日期时间格式：如2017-06-09 09:50:06
                        let y = date.getFullYear()
                        let m = date.getMonth()+1
                        let d = date.getDate()
                        let hh = date.getHours()
                        let mm = date.getMinutes()
                        let ss = date.getSeconds()
                        return this.formatDateSymbol(y+(m<10?'0'+m:''+m)+(d<10?'0'+d:''+d)+(hh<10?'0'+hh:''+hh)+(mm<10?'0'+mm:''+mm)+(ss<10?'0'+ss:''+ss),"YYYY-MM-DD HH:mm:ss")
                    }
                    if(config.today){ //today参数是获取今天日期格式：如2017-06-09
                        let y = date.getFullYear()
                        let m = date.getMonth()+1
                        let d = date.getDate()
                        return this.formatDateSymbol(y+this.leftAddZero(m)+this.leftAddZero(d),"YYYY-MM-DD")
                    }
                    if(config.todayAllCN){ //todayAll参数是获取今天日期时间格式：如2017年06月09日 09时50分06秒
                        let y = date.getFullYear()
                        let m = date.getMonth()+1
                        let d = date.getDate()
                        let hh = date.getHours()
                        let mm = date.getMinutes()
                        let ss = date.getSeconds()
                        return this.formatDateCN(y+this.leftAddZero(m)+this.leftAddZero(d)+this.leftAddZero(hh)+this.leftAddZero(mm)+this.leftAddZero(ss),config.todayAllTextCN)
                    }
                    if(config.symbol){ //YYYYMMDD转成YYYY-MM-DD
                        return this.formatDateSymbol(date,config.symbol)
                    }
                 }
                 if(date){ //日期201766转成20170606,
                     if(date.getTime){
                        let y = date.getFullYear()
                        let m = date.getMonth()+1
                        let d = date.getDate()
                        return y+(m<10?'0'+m:''+m)+(d<10?'0'+d:''+d);
                     }else{
                         return date.replace(/(\-)|(\s)|(\:)/g,'')
                     }
                }else {
                    return '';
                }
             },
             leftAddZero(number){
                 if(!number) return
                 return number<10?'0'+number:''+number
             },
             formatDateCN(date,format){              
                 let CN=date.substring(0,4)+"年"+date.substring(4,6)+"月"+date.substring(6,8)+"日"+date.substring(8,10)+"时"+date.substring(10,12)+"分"+date.substring(12,14)+"秒"
                 if(!format) return CN
                 return CN.substring(0,CN.indexOf(format)+1)
             },
             formatDateSymbol (date,format){ //日期20170608转成2017-06-08
                 if(format=="YYYY-MM-DD"|| !format) return date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8)
                 if(format=="YYYY-MM-DD HH:mm:ss") return date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8)+" "+date.substring(8,10)+":"+date.substring(10,12)+":"+date.substring(12,14)
                 if(format=="HH:mm:ss") return date.substring(0,2)+"："+date.substring(2,4)+"："+date.substring(4,6)
             },
             apartDays(starDate,endDate){  //返回相差天数
                 if(!starDate.getTime){
                     starDate=new Date(this.formatDateSymbol(starDate))
                 }
                 if(!endDate.getTime){
                     endDate=new Date(this.formatDateSymbol(endDate))
                 }
                 return parseInt( ( endDate.getTime()-starDate.getTime() )/(3600 * 1000 * 24) )
                 //return [this.formatDateSymbol(this.formatDate(start)),this.formatDateSymbol(this.formatDate(end))]
             },
             differDate(days){  //返回相差日期格式（数组类型）
                 const end = new Date()
                 const start = new Date()
                 start.setTime(start.getTime() - 3600 * 1000 * 24 * days)
                 return [start,end]
             },
			 compareDate(startDate,endDate,compareNum){  // 日期对比大小，相差的月数
				 let monthObj={"01":"31","02":"28","03":"31","04":"30","05":"31","06":"30","07":"31","08":"31","09":"30","10":"31","11":"30","12":"31"}
				 startDate = startDate.replace(/\-/g,'')
				 endDate = endDate.replace(/\-/g,'')
				 let startYear = startDate.substring(0, 4)
                 let startMonth = startDate.substring(4, 6)
                 let startDay = startDate.substring(6,8)
                 let endYear = endDate.substring(0, 4)
                 let endMonth = endDate.substring(4, 6)
                 let endDay = endDate.substring(6,8)
				 let betweenMonth = (endYear - startYear) * 12 + (endMonth - startMonth)
				 if(betweenMonth<compareNum) return true
				 if(betweenMonth>compareNum) return false
                 if(Math.floor(startYear/4) === startYear/4) monthObj["02"]="29"  //闰年判断
				 if(betweenMonth==compareNum){
					 if(monthObj[startMonth]==startDay){ //判断是否月末
						 return true
					 }
					 else if(startDay>=endDay){
						 return true
					 }else{
						 return false
					 }
				 }
			 },
             currencyReg(value) { // 金额转换去逗号
                if((/^\d{14}/).test(value)){
                    let $input=$(event.target)
                    $input.val(value.substring(0,value.length-1))
                }
                if(isNaN(value) || (/\.(\d{3,})$/).test(value)){ //正则只能输入两个小数      
                    value=value.replace(/[^\d.]/g,"") //清除"数字"和"."以外的字符
                    value=value.replace(/^\./g,"") //验证第一个字符是数字
                    value=value.replace(/\.{2,}/g,".") //只保留第一个, 清除多余的小数点
                    value=value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
                    value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3') //只能输入两个小数       
                }
                return value
			 },
			 currencyParse(value) { // 金额去逗号
                 if($.trim(value) === ""||value === undefined || value === null || value === false) return ""
				 return value.replace(/\,/g,'')
			 },
			 currencyFormat(value) { // 金额转换
                 if($.trim(value) === ""||value === undefined || value === null || value === false) return ""
                 value=String(value)
                 value = value.replace(/\,/g,'')
                 return this.toDecimalString(value, true, 2)
             },
			 toDecimalString(value, addComma, digits) {  //金额转换加逗号
                var str = '' + value;
                //	if (str.length == 0) str = '0';
                if (str.length == 0) str = "";
                str = str.replace(/\,/g, '');
                var reg = /^[+-]?((\d{1,3}(\,\d{3})*)|\d*)?(\.\d*)?$/;

                if (reg.test(str)) {
                    if ($.trim(str) == '')
                        return '';
                    //解析符号、整数部分和小数部分
                    var sign = str.charAt(0);
                    if (sign == '+' || sign == '-') {
                        str = str.substring(1);
                    } else {
                        sign = null;
                    }
                    var pointPos = str.indexOf('.');
                    var integer = str;
                    var decimal = '';
                    if (pointPos >= 0) {
                        integer = str.substring(0, pointPos);
                        decimal = str.substring(pointPos + 1);
                    }
                    while (integer.charAt(0) == '0') {
                        integer = integer.substring(1);
                    }
                    if ((!typeof digits == 'number' && digits >= 0) && (pointPos < 0 || pointPos + 1 == str.length)) {
                        digits = 0;
                    }
                    if (integer.length == 0) integer = '0';
                    if (decimal.length == 0) decimal = '0';
                    digits = digits || 2;//默认保留两位
                    //小数和四舍五入
                    if (digits && typeof digits == 'number' && digits >= 0) {
                        while (decimal.length < digits) {
                            decimal += '0';
                        }
                        var nextNumber = decimal.charAt(digits);
                        decimal = decimal.substr(0, digits);
                        if (parseInt(nextNumber) >= 5) {
                            var tmp = Math.pow(10, digits);
                            var newValue = (sign ? sign : '') + (parseInt(integer, 10) * tmp + parseInt(decimal, 10) + 1) / tmp;
                            return this.toDecimalString(newValue, addComma, digits);
                        }
                    }
                    //加逗号
                    if (addComma) {
                        var sb = '';
                        for (var i = 0, len = integer.length; i < len; i++) {
                            sb += integer.charAt(i);
                            if ((i + 1) % 3 == len % 3 && (i + 1) != len) {
                                sb += ',';
                            }
                        }
                        integer = sb;
                    }
                    //拼合
                    var res = '';
                    if (sign) res += sign;
                    res += integer;
                    if (decimal) res += '.' + decimal;
                    return res;
                }
			 },
             toChinese(value) {
                var reg = /^[+-]?((\d{1,3}(\,\d{3})*)|\d*)?(\.\d*)?$/;

                if (reg.test(value)) {
                    if (value == null || value == '') {
                        return '';
                    }
                    var noCommaCash = this.toDecimalString(value);

                    var dotIndex = noCommaCash.indexOf('.');
                    var integer, decimal;
                    if (dotIndex == -1) {
                        integer = noCommaCash;
                        decimal = '00';
                    } else {
                        integer = noCommaCash.substring(0, dotIndex);
                        decimal = noCommaCash.substring(dotIndex + 1);
                    }
                    var result = "";
                    if (integer == '0') {
                        if (decimal == '00') {
                            result = currencyOption.MONEY_NUMS[0] + currencyOption.MONEY_SHOWNAME[2] +currencyOption. MONEY_POSTFIX;
                        } else {
                            result = this.convertDecimalToChineseCash(decimal);
                        }
                        return result;
                    }
                    else {
                        result += this.convertIntegerToChineseCash(integer);
                        result += this.convertDecimalToChineseCash(decimal);
                        return result;
                    }
                } else {
                    return '';
                }
            },
            convertDecimalToChineseCash(cash) {
                var returnCash = "";
                if (cash == "00") {
                    returnCash = currencyOption.MONEY_POSTFIX;
                } else if (cash.charAt(1) == '0') {
                    var intValue = parseInt(cash.charAt(0));
                    returnCash = currencyOption.MONEY_NUMS[intValue] + currencyOption.MONEY_SHOWNAME[1] + currencyOption.MONEY_POSTFIX;
                } else {
                    for (var i = 0; i < cash.length; i++) {
                        if (i >= 2) { break; }
                        var intValue = parseInt(cash.charAt(i));
                        switch (i) {
                            case 0: {
                                if (intValue != 0) {
                                    returnCash += currencyOption.MONEY_NUMS[intValue] + currencyOption.MONEY_SHOWNAME[1];
                                } else {
                                    returnCash +="";
                                    //returnCash += currencyOption.MONEY_NUMS[intValue];
                                }
                                break;
                            }
                            case 1: {
                                if (intValue != 0) {
                                    returnCash += currencyOption.MONEY_NUMS[intValue] + currencyOption.MONEY_SHOWNAME[0];
                                }
                                break;
                            }
                            default:
                                break;
                        }
                    }
                }
                return returnCash;
            },
            convertIntegerToChineseCash (cash) {
                if (cash == "0") return "";
                //		return LUI_format.MONEY_NUMS[0]+LUI_format.MONEY_SHOWNAME[2];
                var S = ""; //返回值
                var p = 0; //字符位置指针
                var m = cash.length % 4; //取模

                // 四位一组得到组数
                var k = (m > 0 ? Math.floor(cash.length / 4) + 1 : Math.floor(cash.length / 4));
                // 外层循环在所有组中循环
                // 从左到右 高位到低位 四位一组 逐组处理
                // 每组最后加上一个单位: "[万亿]","[亿]","[万]"
                for (var i = k; i > 0; i--) {
                    var L = 4;
                    if (i == k && m != 0) {
                        L = m;
                    }
                    // 得到一组四位数 最高位组有可能不足四位
                    var s = cash.substring(p, p + L);
                    var l = s.length;

                    // 内层循环在该组中的每一位数上循环 从左到右 高位到低位
                    for (var j = 0; j < l; j++) {
                        var n = parseInt(s.substring(j, j + 1));
                        if (n == 0) {
                            if ((j < l - 1) && (parseInt(s.substring(j + 1, j + 1 + 1)) > 0) //后一位(右低)
                                && S.substring(S.length - 1, S.length) != currencyOption.MONEY_NUMS[n]) {
                                S += currencyOption.MONEY_NUMS[n];
                            }
                        }
                        else {
                            //处理 1013 一千零"十三", 1113 一千一百"一十三"
                            //if (!(n == 1 && (S.substring(S.length-1,S.length) == LUI_format.MONEY_NUMS[0] | S.length == 0) && j == l - 2))
                            // {

                            S += currencyOption.MONEY_NUMS[n];
                            //}
                            S += currencyOption.MONEY_DIGITS[l - j - 1];
                        }
                    }
                    p += L;
                    // 每组最后加上一个单位: [万],[亿] 等
                    if (i < k) {
                        //不是最高位的一组
                        if (parseInt(s) != 0) {
                            //如果所有 4 位不全是 0 则加上单位 [万],[亿] 等
                            S += currencyOption.MONEY_BIGUNITS[i - 1];
                        }
                    } else {
                        //处理最高位的一组,最后必须加上单位
                        S += currencyOption.MONEY_BIGUNITS[i - 1];
                    }
                }
                return S + currencyOption.MONEY_SHOWNAME[2];
            },
            ToChinese(number){
                if(!validator.isNumber(number)) return "不是Number类型"
                let numberArray=number.split("")
                let chineseString=""
                for(let i=0;i<numberArray.length;i++){
                    chineseString+=currencyOption.MONEY_NUMS[numberArray[i]]
                }
                return chineseString
            }
            
}