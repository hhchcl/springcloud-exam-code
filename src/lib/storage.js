export default {
	     get:function(name,save){
			   var storageName="storage"+name;
			   var value=sessionStorage[storageName];
			   //var reg=/[^\{][\}$]|[^\[][\]$]/;
			   var reg=/(^\{.*\}$)|(^\[.*\]$)/;
			   if(reg.test(value)){
				    value=JSON.parse(value);
			   }
			   if(save!="save"){
				 sessionStorage.removeItem(storageName); 
			   }
			   return value;			   
		   },
		   set:function(name,value){
			   var valueType=$.type(value);
			   if(!valueType) return;
			   var storageName="storage"+name;
			   if(valueType=="string"){
				    sessionStorage[storageName]=value;
			   }else{
				  sessionStorage[storageName]=JSON.stringify(value);   
			   }
		   }   
   }