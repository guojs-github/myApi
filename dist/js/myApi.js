$(function() {
	window.onpageshow = function(event) {
		// 老的刷新机制，未有用
		if (event.persisted) {
			window.location.reload()
		}		
	};
});

/*
	Browser related routines.
	2018.8.24 By GuoJS
*/
var myApi = myApi || {};
myApi.browser = (function() {
	var obj = {
		clientHeight: function() {
			console.log("Get browser height.");		
			
			return window.innerHeight;
		},
	};
	
	return obj;
})();


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


/*
	number routines.
	2018.8.27 By GuoJS
*/
var myApi = myApi || {};
myApi.number = (function(){
	var obj = {
		formatAmount: function(s, type) {
			var result = s;
			if (s < 0)
				s = 0 - s;
			if (/[^0-9\.]/.test(s))
				return "0.00";
			if (s == null || s == "null" || s == "")
				return "0.00";
			if (type > 0)
				s = new Number(s).toFixed(type);
			s = s.toString().replace(/^(\d*)$/, "$1.");
			s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
			s = s.replace(".", ",");
			var re = /(\d)(\d{3},)/;
			while (re.test(s))
				s = s.replace(re, "$1,$2");
			s = s.replace(/,(\d\d)$/, ".$1");
			
			if (type == 0) {
				var a = s.split(".");
				if (a[1] == "00") {
					s = a[0];
				}
			}
			
			if (result < 0)
				result = "(" + s + ")";
			else
				result = s;
			
			return result;
		},
	};
	
	return obj;
})();


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
/*
	Browser storage routine.
	2018.8.6 By GuoJS
*/
var myApi = myApi || {};
myApi.storage = (function(){
	var obj = {
		setItem: function(key, value){
			console.log("Local storage set item.");
			console.log("key:" + key);
			console.log("value:" + value);
			var storage = window.localStorage;
			if (('object' != typeof(storage)) || (null == storage))
				return false;
			
			storage.setItem(key, value);
			return true;
		},
		
		getItem: function(key) {
			console.log("Local storage get item.");
			console.log("key:" + key);
			var storage = window.localStorage;
			if (('object' != typeof(storage)) || (null == storage))
				return null;

			var value = storage.getItem(key); 
			return "undefined" == typeof(value) || null == value ? "" : value;
		},		
	};
	
	return obj;
})();


/*
	time routines.
	2018.8.20 By GuoJS
*/
var myApi = myApi || {};
myApi.time = (function(){
	var obj = {
		formatDate: function(date, sep) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var seperator = ("undefined" == typeof(sep)) ? "-" : sep; 

			return year + seperator + (10 > month ? "0" + month : month) + seperator + (10 > day ? "0" + day : day);  
		},
		formatDateString: function(dateString, sep) {
			var seperator = ("undefined" == typeof(sep)) ? "-" : sep; 
			
			if (8 != dateString.length)
				return "";

			return dateString.substr(0, 4)
					+ seperator + dateString.substr(4, 2)
					+ seperator + dateString.substr(6, 2);  
		},
		addDays: function(date, days) {
			var ms = date.getTime(); // 转为毫秒
			var result = new Date();
			result.setTime(ms + days * 24 * 3600 * 1000);
			
			return result;
		},
	};
	
	return obj;
})();


/*
	WX JSAPI
	2018.8.24 GuoJS
*/

var myApi = myApi || {};
myApi.wx = (function() {
	var obj = {
		init: function(param, success, fail) {
			console.log("Initialize wx api.");
			console.log("param:" + JSON.stringify(param));
			
			var error = false;
			wx.config({
				debug: false, 
				appId: param.appId,
				timestamp: param.timestamp,
				nonceStr: param.nonceStr, 
				signature: param.signature,
				jsApiList: ['chooseWXPay', 'chooseImage', 'uploadImage', 'scanQRCode'],
			});
			wx.ready(function(){
				console.log("JSAPI ready.");
				
				if (false == error) {
					if ("function" == typeof(success)) {
						success();
					}
				}
			});						
			wx.error(function(res){
				console.log("JSAPI initialize fail.");
				
				error = true;
				if ("function" == typeof(fail)) {
					fail();
				}
			});						
		}, // init

		scan: function(success, fail) {
			console.log("Scan");
			
			wx.checkJsApi({
				jsApiList: ['scanQRCode'],
				success: function(res) {
					console.log("res:" + JSON.stringify(res));
					
					if (0 > res.errMsg.indexOf("ok")) {
						console.log("Error occurred:" + res.errMsg)
						if ("function" == typeof(fail))
							fail("扫描功能检测失败");
						return;
					}
					
					if (true == res.checkResult['scanQRCode']) {
						console.log("Scan qr code allowed.")
						wx.scanQRCode({
							needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
							success: function (res) {
								console.log("scan res:" + JSON.stringify(res))
								
								if (0 > res.errMsg.indexOf("ok")) {
									console.log("Error occurred while scan:" + res.errMsg)
									if ("function" == typeof(fail))
										fail("扫描功能未获授权");
									return;
								}
								
								console.log("scan success");
								if ("function" == typeof(success))
									success(res.resultStr);
							}
						});						
					} else {
						console.log("Scan qr code no allowed.")
						if ("function" == typeof(fail))
							fail("扫描功能未获授权");
					}
				}
			});			
		}, // scan
		
	};
	
	return obj;
})();



/*
	bill form routines.
	2018.8.24 By GuoJS
*/
var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.bill = (function(){
	var obj = {
		init: function() {
			console.log("Initialize bill form.");

			// Adjust the bill form
			$(".weui-tab__bd.bill-body").css("height", (myApi.browser.clientHeight() - 60) + "px");
			$(".weui-tab__bd.bill-body .weui-tab__bd-item").css("height", (myApi.browser.clientHeight() - 60) + "px");	
			$(".weui-tab__bd.bill-body .weui-tab__bd-item.list").css("height", (myApi.browser.clientHeight() - 60 - 50) + "px");	
		},
	};
	
	return obj;
})();

$(function() {
	console.log("bill form ready!");
	
	myApi.interaction.bill.init();
});

/*
	Critical message.
	2018.8.22 By GuoJS
*/

var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.critical = (function(){
	var obj = {
		show: function(message) {
			console.log("Show critical message.");
			console.log("message:" + message);

			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.critical-message'));
			} catch (e) {
			}

			// Create element
			var mask = document.createElement('div');
			mask.classList.add('critical-message');
			mask.classList.add('mask'); 
			mask.classList.add('flex-column'); 

			var dialog = document.createElement('div');
			dialog.classList.add('dialog'); 
			dialog.classList.add('flex-column'); 

			var titleBar = document.createElement('div');
			titleBar.classList.add('dialog-title'); 
			titleBar.innerText = "提示";
			dialog.appendChild(titleBar);

			var content = document.createElement('div');
			content.classList.add('dialog-content'); 
			content.innerText = "这是样例信息";
			if (("string" == typeof(message)) && (0 < message.trim().length))
				content.innerText = message;
			dialog.appendChild(content);
			
			mask.appendChild(dialog);
			document.body.appendChild(mask);			
		},
	};
	return obj;
})();


/*
	Input dialog.
	2018.8.19 By GuoJS
*/

var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.input = (function(){
	var obj = {
		show: function(options, ok, cancel) {
			console.log("Show input dialog.");			
			var _this = this;

			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.input-dialog'));
			} catch (e) {
			}

			// Create element
			var mask = document.createElement('div');
			mask.classList.add('input-dialog');
			mask.classList.add('mask'); 
			mask.classList.add('flex-column'); 
			/*
			mask.onclick = function() {
				_this.hide();
				if ("function" == typeof(cancel)) 
					cancel();
			}
			*/

			var dialog = document.createElement('div');
			dialog.classList.add('dialog'); 
			dialog.classList.add('flex-column'); 

			var titleBar = document.createElement('div');
			titleBar.classList.add('dialog-title'); 
			if (("string" == typeof(options.title)) && (0 < options.title.trim().length))
				titleBar.innerText = options.title;
			else
				titleBar.innerText = "请输入";
			dialog.appendChild(titleBar);

			var textArea = document.createElement('textarea');
			textArea.classList.add('dialog-textarea'); 
			if (("number" == typeof(options.maxLength)) && (0 < options.maxLength))
				textArea.setAttribute("maxlength", options.maxLength);
			dialog.appendChild(textArea);	
			
			var buttonBar = document.createElement('div');
			buttonBar.classList.add('dialog-button-bar');
			
			var buttonCancel = document.createElement('div');
			buttonCancel.classList.add('dialog-button');
			buttonCancel.classList.add('dialog-button-cancel');
			buttonCancel.classList.add('dialog-button-left');
			buttonCancel.innerText = "取消";
			buttonCancel.style.width = "50%";
			buttonCancel.onclick = function() {
				_this.hide();
				if ("function" == typeof(cancel)) 
					cancel();
			}
			buttonBar.appendChild(buttonCancel);				

			var buttonOk = document.createElement('div');
			buttonOk.classList.add('dialog-button');
			buttonOk.classList.add('dialog-button-ok');
			buttonOk.classList.add('dialog-button-right');
			buttonOk.innerText = "确认";
			buttonOk.style.width = "50%";
			buttonOk.onclick = function() {
				_this.hide();
				var content = textArea.value;
				console.log("content:" + content);
				if ("function" == typeof(ok)) 
					ok(content);
			}
			buttonBar.appendChild(buttonOk);				
			
			dialog.appendChild(buttonBar);	
			
			mask.appendChild(dialog);
			document.body.appendChild(mask);			
		},
		hide: function() {
			console.log("Hide input dialog.");

			try {
				document.body.removeChild(document.querySelector('div.input-dialog'));
			} catch (e) {
			}
		},		
	};
	return obj;
})();


/*
	Loading mask.
	2018.8.6 By GuoJS
*/

var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.loading = (function(){
	var obj = {
		show: function() {
			console.log("Show loading.");			
			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.loading'));
			} catch (e) {
			}

			// Create element
			var loading = document.createElement('div');
			loading.classList.add('loading'); // Add style class
			document.body.appendChild(loading);			
		},
		hide: function() {
			console.log("Hide loading.");

			try {
				document.body.removeChild(document.querySelector('div.loading'));
			} catch (e) {
			}
		},		
	};
	return obj;
})();


/*
	Interaction other routines.
	2018.8.6 By GuoJS
*/

var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.other = (function(){
	var obj = {
		hintNoMore: function() {
			console.log("Show no more hint");
			
			$('.weui-loading').css("display", "none");
			$('.weui-loadmore__tips').text("-- 没有更多了 --");
		},
		hintLoading: function() {
			console.log("Show loading hint");
			
			$('.weui-loading').css("display", "");
			$('.weui-loadmore__tips').text("-- 拼命加载中 --");
		},
	};
	
	return obj;
})();

