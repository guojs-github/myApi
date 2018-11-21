/*
	Request api.
	2018.8.6 By GuoJS
*/

var myApi = myApi || {};
myApi.request = (function() {
	var obj = {
		requestTimeout: 10000, // ms
		post: function(url, param, success, fail, timeout) {
			console.log("Send a post request.");
			console.log("url:" + url);
			console.log("param:" + JSON.stringify(param));
			
			// Check
			var requestTimeout = this.requestTimeout; // ms
			if (('number' == typeof(timeout)) && (0 < timeout))
				requestTimeout = timeout;
				
			// Request
			myApi.interaction.loading.show();
			var ajaxRequest = $.ajax({ 
				url: url, 
				type: "POST",
				data: JSON.stringify(param), 
				cache: false, 
				timeout: requestTimeout, // ms
				dataType: 'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
				error: function(request, status, err){ //失败 
					console.log("Request fail.");
					console.log("request:" + JSON.stringify(request));
					console.log("status:" + JSON.stringify(status));
					console.log("err:" + JSON.stringify(err));

					if ("function" == typeof(fail))
						fail(request, status, err);	
				}, 
				success: function(data){ //成功 
					console.log("Request success");
					console.log("data:" + JSON.stringify(data));
					
					if ("function" == typeof(success))
						success(data);						
				}, 
				complete: function(XMLHttpRequest, status){ 
					myApi.interaction.loading.hide();
			　　　　if ('timeout' == status){ //超时,status还有success,error等值的情况
						ajaxRequest.abort();
					}
				}
			});  // ajax
		},
		get: function(url, success, fail, timeout) {
			console.log("Send a get request.");
			console.log("url:" + url);
			
			// Check
			var requestTimeout = this.requestTimeout; // ms
			if (('number' == typeof(timeout)) && (0 < timeout))
				requestTimeout = timeout;
			
			// Request
			myApi.interaction.loading.show();
			var ajaxRequest = $.ajax({ 
				url: url, 
				type: "GET",
				cache: false, 
				timeout: requestTimeout, // ms
				dataType: 'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
				error: function(request, status, err){ //失败 
					console.log("Request fail.");
					console.log("request:" + JSON.stringify(request));
					console.log("status:" + JSON.stringify(status));
					console.log("err:" + JSON.stringify(err));

					if ("function" == typeof(fail))
						fail(request, status, err);	
				}, 
				success: function(data){ //成功 
					console.log("Request success");
					console.log("data:" + JSON.stringify(data));
					
					if ("function" == typeof(success))
						success(data);						
				}, 
				complete: function(XMLHttpRequest, status){ 
					myApi.interaction.loading.hide();
			　　　　if ('timeout' == status){ //超时,status还有success,error等值的情况
						ajaxRequest.abort();
					}
				}
			});  // ajax
		},
	};
	
	return obj;	
})();