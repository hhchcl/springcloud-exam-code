export default {
	backSpace:function(e){
		let ev = e || window.event;//获取event对象 
		let obj = ev.target || ev.srcElement;//获取事件源 
		let t = obj.type || obj.getAttribute('type');//获取事件源类型   	

		//获取作为判断条件的事件类型   
		let vReadOnly = obj.getAttribute('readonly'); //ie为true，chrome 为'readonly'
		let vEnabled = obj.getAttribute('enabled'); 

		//处理null值情况   
		vReadOnly = (vReadOnly == null) ? false : vReadOnly;   
		vEnabled = (vEnabled == null) ? true : vEnabled;  
		//当敲Backspace,enter键时，事件源类型为密码或单行、多行文本的，   
		//并且readonly属性为true或enabled属性为false的，则阻止backspace  
		let flag1=((ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea") || (ev.keyCode == 13 && t=="textarea")) &&(vReadOnly==true || vEnabled!=true))?true:false;    
		//当敲Backspace,enter键时，事件源类型非密码或单行、多行文本的，则退格键失效   
		let flag2=((ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") || (ev.keyCode == 13 && t!="textarea"))?true:false;     
		
		//判断   
		if(flag1||flag2){
			event.returnValue = false;
		}
	}
}