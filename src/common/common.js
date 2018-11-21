/*
	Common routines.
	2018.8.6 By GuoJS
*/
var myApi = myApi || {};
myApi.common = (function() {
	var obj = {
		queryString: function(key) {
			console.log("Get query string.");		
			console.log("key:" + key);

			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");  
			var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
			var context = "";  
			
			if (null != r)  
				context = r[2];  
			reg = null;  
			r = null;  
			
			return null == context || "" == context || "undefined" == context ? "" : context;  		
		},
		checkMobile: function(value) {
			console.log("Check mobile phone number.");		
			console.log("value:" + value);
			var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			
			return reg.test(value);
		},
		stopBubble: function(e) {
			console.log("Stop bubble");

			if (e && e.stopPropagation)  
				e.stopPropagation()  
			else  
				window.event.cancelBubble = true 
		},
	};
	
	return obj;
})();

