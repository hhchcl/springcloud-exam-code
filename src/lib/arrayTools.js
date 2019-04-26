export default {
	     equalDivision:function(array,num){ // 将数组分成若干份数组
			   let result = [];
         for(let i=0;i<array.length;i+=num){
           result.push(array.slice(i,i+num));
         }
         return result
		   }  
   }