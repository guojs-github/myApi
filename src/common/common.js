/*
	Common routines.
	2018.8.6 GuoJS
	
	Add 
	2018.11.22 GuoJS
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
		
		ref: function(type, file) {
			console.log('Add file reference to page');
			
			// Check
			if ((typeof type != 'string') || (type.trim().length <=0)) {
				console.log('Invalid reference type.');
				return;
			}
			console.log('type:' + type);
			if ((typeof file != 'string') || (file.trim().length <=0)) {
				console.log('Invalid reference file name.');
				return;
			}
			console.log('file:' + file);
			
			// Update
			var stamp = myApi.time.formatTime(new Date());
			if (type == 'css') {
				var link = document.createElement("link");
				link.setAttribute('type', 'text/css');
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('href', file + '?t=' + stamp);
				$("head")[0].appendChild(link);
			} else if (type == 'js') {
				var script = document.createElement("script");
				script.setAttribute('type', 'text/javascript');
				script.setAttribute('src', file + '?t=' + stamp);
				$("body")[0].appendChild(script);
			}
		}
	};
	
	return obj;
})();

