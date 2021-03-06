/*
	My api main entry
	2018.11.22 GuoJS
*/

if (typeof jQuery === 'undefined') { 
	throw new Error('myApi: This plugin requires jQuery'); 
}

if (typeof (window.console) != 'object') {
	window.console = {
		log: function () {}
	};
}


$(function () {	
	console.log('myApi loading.');
	
	myApi.string.init();
	myApi.array.init();
})


/*
	Array routines
	2018.11.27 GuoJS
*/
var myApi = myApi || {};
myApi.array = ( function() {
	var obj = {
		init: function() {
			console.log("Initialize myapi array library.");
			
			this.isArray();
		},

		isArray: function() {
			console.log("Add isArray routines.");
			
			if ('function' != typeof(Array.isArray)) {
				Array.isArray = function (arg) {
					return Object.prototype.toString.call(arg) === '[object Array]';
				}
			}
		}		
	};

	return obj;
})();


/*
	Browser related routines.
	2018.8.24 GuoJS
	
	Add BROWSER_TYPE, type, isIE, availHeight 
	2018.11.22 GuoJS
*/
var myApi = myApi || {};
myApi.browser = ( function() {
	var obj = {
		BROWSER_TYPE: {
			UNKNOWN: 'Unknown',
			OPERA: 'Opera',
			FIREFOX: 'Firefox',
			CHROME: 'Chrome',
			SAFARI: 'Safari',
			EDGE: 'Edge',
			WEIXIN: 'Weixin',
			IE: 'IE'
		},
		
		type: function() { // Return the type of browser
			console.log("Browser type");
			
			var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
			var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
			var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
			var isIE11 = -1 < userAgent.indexOf("Trident") &&  -1 < userAgent.indexOf("rv") > -1 && !isIE;
			var isEdge = userAgent.indexOf("Edge") > -1 && !isIE11; //判断是否IE的Edge浏览器  
			var isWeixin = userAgent.toLowerCase().indexOf("micromessenger") > -1; // 判断是否微信浏览器
			var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
			var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && !isWeixin; //判断是否Safari浏览器  
			var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isWeixin;; //判断Chrome浏览器  
			var reIE = null;
			var fIEVersion = null;
			
			try {
				if (isIE) { // IE
					 reIE = new RegExp("MSIE (\\d+\\.\\d+);");
					 reIE.test(userAgent);
					 fIEVersion = parseFloat(RegExp["$1"]);
					 if ((7 <= fIEVersion) && ( 11 >= fIEVersion)) return this.BROWSER_TYPE.IE + fIEVersion;
					 else return this.BROWSER_TYPE.IE;
				} else if (isIE11)
					return this.BROWSER_TYPE.IE + "11";			
				else if (isEdge) 
					return this.BROWSER_TYPE.EDGE;			
				else if (isOpera) 
					return this.BROWSER_TYPE.OPERA;			
				else if (isFF) 
					return this.BROWSER_TYPE.FIREFOX;			
				else if (isSafari) 
					return this.BROWSER_TYPE.SAFARI;			
				else if (isChrome) 
					return this.BROWSER_TYPE.CHROME;		
				else if (isWeixin)
					return this.BROWSER_TYPE.WEIXIN;		
				else
					return this.BROWSER_TYPE.UNKNOWN;				
			} catch(ex) {
				throw ex;
			} finally {
				userAgent = null;  
				isOpera = null;  
				isIE = null;
				isEdge = null;
				isFF = null;
				isSafari = null; 
				isChrome = null;
				reIE = null;
				fIEVersion = null;
			}		
		},
		
		isIE: function() { 
			console.log("Is ie browser?");
			var type = this.type();
			
			try {
				if (-1 < type.indexOf(this.BROWSER_TYPE.IE))
					return true;
				else
					return false;
			} catch(ex) {
				throw ex;
				return false;
			} finally {
				type = null
			}
		},
		
		availHeight: function() { // 计算当前浏览器最大化情况下可用高度,不滚动的情况下
			var type = '';
			var height = 0;
			var taskBarHeight = 40; // 任务栏高度
			var screenTop = 0;
			
			try {
				type = this.type();				
				// alert(type);
				// alert(this.isIE());
				if (this.isIE()) { // IE
					screenTop = 108; /* IE, window toolbar+ window menu高度*/
					return screen.availHeight/*屏幕分辨率，去掉任务栏，去掉当前窗口标题栏高度*/ - screenTop/* Chrome caption+toolbar+menu高度*/;
				} else if (this.BROWSER_TYPE.CHROME == type) { // Chrome
					screenTop = 90; /* Chrome, window caption+ window menu + window menu高度*/
					return screen.availHeight/*屏幕分辨率*/ - taskBarHeight - screenTop;
				} else { // Other
					screenTop = 90; /* Chrome, window caption+ window menu + window menu高度*/
					return screen.availHeight/*屏幕分辨率*/ - taskBarHeight - screenTop;
				}
			} catch(e) {
				throw e;
			} finally {
				type = null;
				height = null;
				taskBarHeight = null;
				screenTop = null;
			}
		},
		
		language: function() {
			console.log('Get browser language');
			var type = this.type();
			var DEFAULT_LANGUAGE = 'en';
			var result = DEFAULT_LANGUAGE;
			
			try {
				if (-1 < type.indexOf(this.BROWSER_TYPE.IE)) {
					result = window.navigator.userLanguage.toLowerCase();
				}
				else {
					result = window.navigator.language.toLowerCase();
				}
				
				return result;
			} catch(ex) {
				result = DEFAULT_LANGUAGE;
				return result;
			} finally {
				type = null;
				DEFAULT_LANGUAGE = null;
				result = null;
			}
		},
		
		isChinese: function() {
			console.log('The language is chinese?');
			
			if (this.language() == 'zh-cn')
				return true;
			else
				return false;
		}
	};
	
	return obj;
})();


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
			var r = window.location.search.substr(1).match(reg);  //鑾峰彇url涓�"?"绗﹀悗鐨勫瓧绗︿覆骞舵鍒欏尮閰�
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


/*
	Cookie
	2018.11.22 GuoJS
*/

var myApi = myApi || {};
myApi.cookie = (new (function () {
	var maxage = 60*60*24*1000;
    var path = '/';
 
    var cookie = getCookie();
 
    function getCookie(){
        var cookie = {};
        var all = document.cookie; console.log("cookie:" + all);
        if(all === "")
            return cookie;
        var list = all.split("; ");
        for(var i=0; i < list.length; i++){
            var cookies = list[i];
            var p = cookies.indexOf("=");
            var name = cookies.substring(0,p);
            var value = cookies.substring(p+1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    }
 
    var keys = [];
    for(var key in cookie)
        keys.push(key);
 
    this.length = keys.length;
 
    this.key = function(n){
		console.log("Get specified cookie;");
		console.log("n:" + n);

        if(n<0 || n >= keys.length)
            return null;
        return keys[n];
    };
 
    this.setItem = function(key, value){
		console.log("Set cookie.");
		console.log("key:" + key);
		console.log("value:" + value);
		
        if(! (key in cookie)){
            keys.push(key);
            this.length++;
        }
 
        cookie[key] = value;
        var cookies = key + "=" +encodeURIComponent(value);
        if(maxage)
            cookies += "; max-age=" + maxage;
        if(path)
            cookies += "; path=" + path;
 
        document.cookie = cookies;
    };
 
    this.getItem = function(key){
		console.log("Get cookie.");
		console.log("key:" + key);

        return "undefined" == typeof(cookie[key]) || null == cookie[key] ? "": cookie[key];
    };
 
    this.removeItem = function(key){
		console.log("Remove cookie.");
		console.log("key:" + key);

        if(!(key in cookie))
            return;
 
        delete cookie[key];
 
        for(var i=0; i<keys.length; i++){
            if(keys[i] === key){
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;
 
        document.cookie = key + "=; max-age=0" + "; path=" + path;;
    };
 
    this.clear = function(){
		console.log("Clear cookie.");

		for (var i=0; i<keys.length; i++)
            document.cookie = keys[i] + "=; max-age=0" + "; path=" + path;
        cookie = {};
        keys = [];
        this.length = 0;
    };
})());


/*
	file related routines.
	2018.12.29 GuoJS
*/
var myApi = myApi || {};
myApi.file = ( function() {
	var obj = {
		exists: function (url) {
			console.log('Check if the file online exists?');
			console.log('url:' + url)

			// create request object
			var xmlHttp
			if (window.ActiveXObject)  {  
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
			} else if (window.XMLHttpRequest) {  
				xmlHttp = new XMLHttpRequest();  
			}
			
			// request
			xmlHttp.open('get', url, false/* wait for the request done */)
			xmlHttp.send() // execute the request
			
			// analyze response
			if (xmlHttp.readyState == 4){
				if (xmlHttp.status == 200) { // OK
					return true
				} else if (xmlHttp.status == 404) {// Not found
					return false
				} else { // Other status
					return false
				}
			}
			
			return false
		}
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
		}
	};
	
	return obj;
})();


/*
	Ajax request.
	2018.8.6 By GuoJS
*/

var myApi = myApi || {};
myApi.request = (function() {
	var obj = {
		requestTimeout: 3000, // ms
		
		post: function(url, param, success, fail, timeout) {
			console.log("Send a post request.");
			console.log("url:" + url);
			console.log("param:" + JSON.stringify(param));
			
			// Check
			var requestTimeout = this.requestTimeout; // ms
			if (('number' == typeof(timeout)) && (0 < timeout))
				requestTimeout = timeout;
				
			// Request
			myApi.display.loading.show();
			var ajaxRequest = $.ajax({ 
				url: url, 
				type: "POST",
				data: JSON.stringify(param), 
				cache: false, 
				timeout: requestTimeout, // ms
				dataType: 'json', //鎺ュ彈鏁版嵁鏍煎紡 (杩欓噷鏈夊緢澶�,甯哥敤鐨勬湁html,xml,js,json) 
				error: function(request, status, err){ //澶辫触 
					console.log("Request fail.");
					console.log("request:" + JSON.stringify(request));
					console.log("status:" + JSON.stringify(status));
					console.log("err:" + JSON.stringify(err));

					if ("function" == typeof(fail))
						fail(request, status, err);	
				}, 
				success: function(data){ //鎴愬姛 
					console.log("Request success");
					console.log("data:" + JSON.stringify(data));
					
					if ("function" == typeof(success))
						success(data);						
				}, 
				complete: function(XMLHttpRequest, status){ 
					myApi.display.loading.hide();
			銆�銆�銆�銆�if ('timeout' == status){ //瓒呮椂,status杩樻湁success,error绛夊�肩殑鎯呭喌
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
			myApi.display.loading.show();
			var ajaxRequest = $.ajax({ 
				url: url, 
				type: "GET",
				cache: false, 
				timeout: requestTimeout, // ms
				dataType: 'json', //鎺ュ彈鏁版嵁鏍煎紡 (杩欓噷鏈夊緢澶�,甯哥敤鐨勬湁html,xml,js,json) 
				error: function(request, status, err){ //澶辫触 
					console.log("Request fail.");
					console.log("request:" + JSON.stringify(request));
					console.log("status:" + JSON.stringify(status));
					console.log("err:" + JSON.stringify(err));

					if ("function" == typeof(fail))
						fail(request, status, err);	
				}, 
				success: function(data){ //鎴愬姛 
					console.log("Request success");
					console.log("data:" + JSON.stringify(data));
					
					if ("function" == typeof(success))
						success(data);						
				}, 
				complete: function(XMLHttpRequest, status){ 
					myApi.display.loading.hide();
			銆�銆�銆�銆�if ('timeout' == status){ //瓒呮椂,status杩樻湁success,error绛夊�肩殑鎯呭喌
						ajaxRequest.abort();
					}
				}
			});  // ajax
		}
	};
	
	return obj;	
})();
/*
	Browser storage routine.
	2018.8.6 By GuoJS
*/
var myApi = myApi || {};
myApi.storage = (new (function (){
	var storage;
	
	if (window.localStorage) {
		storage = window.localStorage;
	} else {
		storage = require('./cookie.js')();
	}
	
    this.setItem = function(key, value){
		storage.setItem(key, value);
	}
	
	this.getItem = function(key) {
		var value = storage.getItem(key); 
		return "undefined" == typeof(value) || null == value ? "" : value;
	}
	
	this.removeItem = function(key) {
		storage.removeItem(key);
	}

	this.clear = function() {
		storage.clear();
	}
})());


/*
	String routines
	2018.11.22 GuoJS
*/
var myApi = myApi || {};
myApi.string = ( function() {
	var obj = {
		init: function() {
			console.log("Initialize myapi string library.");
			
			this.trim();
		},

		trim: function() {
			console.log("Add trim routines.");
			
			if ('function' != typeof(String.trim)) {
				String.prototype.trim = function () {
					return this.replace(/(^\s*)|(\s*$)/g, "");
				}
			}

			if ('function' != typeof(String.ltrim)) {
				String.prototype.ltrim = function () {
					return this.replace(/(^\s*)/g, "");
				}
			}

			if ('function' != typeof(String.rtrim)) {
				String.prototype.rtrim = function () {
					return this.replace(/(\s*$)/g, "");
				}
			}
		}		
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
		formatDuration: function(value) {
			console.log("Format duration:" + value);
			
			if ("number" != typeof(value))
				return "";
			if (0 > value)
				return "";
			
			// Calculate
			var temp = value;
			var hour = (temp - temp % 3600) / 3600;
			temp -= hour * 3600;
			var minute = (temp - temp % 60) / 60;
			temp -= minute * 60;
			var second = temp;
			
			// Format
			var result = ""
			if (0 < hour)
				result += hour + "鏃�";
			if ((0 < minute) || (0 < hour))
				result += minute + "鍒�";
			result+= second + "绉�";
			
			return result;
		},		
		
		formatTime: function(time) { // 鏍煎紡鍖栨椂閽熸樉绀�
			if (null == time) return "";
			if (isNaN(time)) return "";
			
			var result = "";
			result += time.getFullYear();
			result += "-";
			result += $.trim("" + (time.getMonth() + 1)).length < 2 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
			result += "-";
			result += $.trim("" + time.getDate()).length < 2 ? "0" + time.getDate() : time.getDate();
			result += " ";
			result += $.trim("" + time.getHours()).length < 2 ? "0" + time.getHours() : time.getHours();
			result += ":";
			result += $.trim("" + time.getMinutes()).length < 2 ? "0" + time.getMinutes() : time.getMinutes();

			return result;
		},
		
		formatDateString: function(dateString, sep) { // 鏍煎紡鍖栨棩鏈熷瓧绗︿覆锛屼粠yyyyMMdd鍒皔yyy-MM-dd
			console.log("Format date string");
			console.log("dateString:" + dateString);
			console.log("sep:" + sep);
			
			if (("string" != typeof(dateString)) || (8 != dateString.trim().length)) {
				return "";
			}
			var temp = dateString.trim();
			
			var seperator = "-";
			if (("string" == typeof(sep)) && (0 < sep.trim().length)) {
				seperator = sep.trim();
			}

			var result = "";
			result += temp.substring(0, 4);
			result += seperator + temp.substring(4, 6);
			result += seperator + temp.substring(6, 8);
			
			return result;
		},
		
		formatDate: function(date, sep) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var seperator = ("undefined" == typeof(sep)) ? "-" : sep; 

			return year + seperator + (10 > month ? "0" + month : month) + seperator + (10 > day ? "0" + day : day);  
		},

		addSeconds: function(time, seconds) { // 鍦ㄧ幇鏈夋椂闂翠笂娣诲姞绉掓暟
			if (null == time) return null;
			if (isNaN(time)) return null;
			if (null == seconds) return null;
			if (isNaN(seconds)) return null;
			
			var ms = time.getTime(); // 杞负鏃堕棿鎴�
			var timeAdded = new Date();
			timeAdded.setTime(ms + seconds * 1000);
			
			return timeAdded;
		},

		addDays: function(time, days) {
			return myApi.time.addSeconds(time, days * 24 * 3600);
		}
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
				jsApiList: ['chooseWXPay', 'chooseImage', 'uploadImage', 'scanQRCode']
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
							fail("鎵弿鍔熻兘妫�娴嬪け璐�");
						return;
					}
					
					if (true == res.checkResult['scanQRCode']) {
						console.log("Scan qr code allowed.")
						wx.scanQRCode({
							needResult: 1, // 榛樿涓�0锛屾壂鎻忕粨鏋滅敱寰俊澶勭悊锛�1鍒欑洿鎺ヨ繑鍥炴壂鎻忕粨鏋滐紝
							scanType: ["qrCode","barCode"], // 鍙互鎸囧畾鎵簩缁寸爜杩樻槸涓�缁寸爜锛岄粯璁や簩鑰呴兘鏈�
							success: function (res) {
								console.log("scan res:" + JSON.stringify(res))
								
								if (0 > res.errMsg.indexOf("ok")) {
									console.log("Error occurred while scan:" + res.errMsg)
									if ("function" == typeof(fail))
										fail("鎵弿鍔熻兘鏈幏鎺堟潈");
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
							fail("鎵弿鍔熻兘鏈幏鎺堟潈");
					}
				}
			});			
		} // scan
		
	};
	
	return obj;
})();



/* -- DO NOT REMOVE --
 * jQuery DCalendar 1.1 and DCalendar Picker 1.3 plugin
 * 
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 *
 * Date: Sat Mar 2 2013
 *
 * @requires jQuery
 * -- DO NOT REMOVE --
 
    2018.11.20 澶氳瑷�鏀寔鏀硅繘 GuoJS
	2018.11.26 寮曞叆myApi
 */
if (typeof jQuery === 'undefined') { throw new Error('DCalendar.Picker: This plugin requires jQuery'); }
 
+function ($) {
	// Is chinese?
	console.log('Is chinese?' + myApi.browser.isChinese());
	
	Date.prototype.getDays = function() { return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate(); };
	
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
		short_months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		daysofweek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	if (myApi.browser.isChinese()) {
		months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
		short_months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
		daysofweek = ['鍛ㄦ棩','鍛ㄤ竴','鍛ㄤ簩','鍛ㄤ笁','鍛ㄥ洓','鍛ㄤ簲','鍛ㄥ叚'];
	}

	DCalendar = function(elem, options) {
		this.calendar = $(elem);
		this.today = new Date();	//system date

		//current selected date, default is today if no value given
		if(this.calendar.prev().val() === '') {
			this.date = new Date();
		} else {
			var dateObj = this.reformatDate(this.calendar.prev().val());
			this.date = isNaN(parseInt(dateObj.m)) ? new Date(dateObj.m + " " + dateObj.d + ", " + dateObj.y) : new Date(dateObj.y, dateObj.m - 1, dateObj.d);
		}

		this.viewMode = 'days';
		this.options = options;
		this.selected = (this.date.getMonth() + 1) + "/" + this.date.getDate() + "/" + this.date.getFullYear();
		this.minDate = this.calendar.prev().data('mindate');
		this.maxDate = this.calendar.prev().data('maxdate');
		
		if(options.mode === 'calendar')
			this.tHead = $('<thead><tr><th id="prev">&lsaquo;</th><th colspan="5" id="currM"></th><th id="next">&rsaquo;</th></tr><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr></thead>');
		else if (options.mode === 'datepicker')
			this.tHead = $('<thead><tr><th id="prev">&lsaquo;</th><th colspan="5" id="currM"></th><th id="next">&rsaquo;</th></tr><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead>');
		this.tHead.find('#currM').text(months[this.today.getMonth()] +" " + this.today.getFullYear());
		this.calendar.prepend(this.tHead);
		var that = this;

		this.calendar.on('click', '#next', function() { initCreate('next'); })
			.on('click', '#prev', function() { initCreate('prev'); })
			.on('click', '#today', function() {
				that.viewMode = 'days';
				var curr = new Date(that.date),
					sys = new Date(that.today);
				if(curr.toString() != sys.toString()) { that.date = sys; }
				that.create('days');
			}).on('click', '.date, .pMDate, .nMDate', function() {
				var isPrev = $(this).hasClass('pMDate'),
					isNext = $(this).hasClass('nMDate'),
					sdate = $(this).text(),
					cmonth = that.date.getMonth(),
					cyear = that.date.getFullYear(),
					min = that.minDate === "today" ? new Date(that.today.getFullYear(), that.today.getMonth(), that.today.getDate()) : new Date(that.minDate),
					max = that.maxDate === "today" ? new Date(that.today.getFullYear(), that.today.getMonth(), that.today.getDate()) : new Date(that.maxDate);

				/* Calculate year */
				if(isPrev) { cyear = (cmonth === 0 ? cyear - 1 : cyear); }
				else if(isNext) { cyear = (cmonth + 2 === 13 ? cyear + 1 : cyear); }
				/* Calculate month */
				if(isPrev) { cmonth = (cmonth === 0 ? '12' : cmonth); }
				else if (isNext) { cmonth = (cmonth + 2 === 13 ? '1' : cmonth + 2); }
				else { cmonth = cmonth + 1; }

				// Selected date
				var selected = new Date(cyear, cmonth - 1, sdate);

				// console.log(cmonth);
				// console.log(selected);
				if ((that.minDate && selected < min) || (that.maxDate && selected > max)) return;

				that.selected = cmonth + '/' + sdate + '/' + cyear;

				if(that.options.mode === 'datepicker') {
					that.calendar.find('td').removeClass('selected');
					$(this).addClass('selected');
				}

				that.selectDate();
				return true;
			}).on('click', '#currM', function(){
				that.viewMode = 'months';
				that.create(that.viewMode);
			}).on('click', '.month', function(e){
				that.viewMode = 'days';
				var curr = new Date(that.date), y = that.calendar.find('#currM').text();
				curr.setMonth($(e.currentTarget).attr('num'));
				that.date = curr;
				that.create(that.viewMode);
			});

		function initCreate(o){
			var curr = new Date(that.date),
				currMonth = curr.getMonth(),
				currYear = curr.getFullYear();
			curr.setDate(1);
			if(that.viewMode === 'days') {
				curr.setMonth(currMonth + (o === 'next' ? 1 : -1));
			} else {
				curr.setFullYear(currYear + (o === 'next' ? 1 : - 1));
			}
			that.date = curr;
			that.create(that.viewMode);
		}

		this.create(this.viewMode);
	}

	DCalendar.prototype = {

		constructor : DCalendar, 

		setDate : function() {
			var that = this,
				dateObj = that.reformatDate(that.calendar.prev().val()),
				value = isNaN(parseInt(dateObj.m)) ? new Date(dateObj.m + " " + dateObj.d + ", " + dateObj.y) : new Date(dateObj.y, dateObj.m - 1, dateObj.d);

			that.selected = (value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear();
			that.selectDate();
			that.date = value;
			that.create(that.viewMode);
		},

		selectDate : function () {
			var that = this,
				newDate = that.formatDate(that.options.format),
				e = $.Event('selectdate', {date: newDate});

			that.calendar.trigger(e);
		},

		reformatDate : function (date) {
			var that = this,
				format = that.options.format;

			return {
					m: date.substring(format.indexOf('m'), format.lastIndexOf('m') + 1),
					d: date.substring(format.indexOf('d'), format.lastIndexOf('d') + 1),
					y: date.substring(format.indexOf('y'), format.lastIndexOf('y') + 1)
				};
		},

		formatDate : function (format) {
			var that = this;
			var d = new Date(that.selected), day = d.getDate(), m = d.getMonth(), y = d.getFullYear();
			
			return format.replace(/(yyyy|yy|mmmm|mmm|mm|m|dd|d)/gi, function (e) {
				switch(e.toLowerCase()){
					case 'd': return day;
					case 'dd': return (day < 10 ? "0"+day: day);
					case 'm': return m+1;
					case 'mm': return (m+1 < 10 ? "0"+(m+1): (m+1));
					case 'mmm': return short_months[m];
					case 'mmmm': return months[m];
					case 'yy': return y.toString().substr(2,2);
					case 'yyyy': return y;
				}
			});
		},

		create : function(mode){
			var that = this, cal = [], 
				tBody = $('<tbody></tbody>'), 
				d = new Date(that.date.getFullYear(), that.date.getMonth(), that.date.getDate()),
				days = that.date.getDays(),
				day = 1, nStartDate = 1,
				selDate = that.selected.split('/'),
				selected = new Date(selDate[2], selDate[0] -1, selDate[1]),
				today = new Date(that.today.getFullYear(), that.today.getMonth(), that.today.getDate()),
				min = that.minDate === "today" ? today : new Date(that.minDate),
                max = that.maxDate === "today" ? today : new Date(that.maxDate);

			that.calendar.empty();
			var sysDate = "Today: " + daysofweek[that.today.getDay()] + ", " + months[that.today.getMonth()] + " " + that.today.getDate() + ", " + that.today.getFullYear();
			if (myApi.browser.isChinese()) {
				sysDate = "浠婃棩: " + that.today.getFullYear() + '骞�' + months[that.today.getMonth()] + '鏈�' + that.today.getDate() + '鏃�, ' + daysofweek[that.today.getDay()] ;
			}
			if(mode === "days") {
				if(that.options.mode === 'calendar') {
					that.tHead = $('<thead><tr><th id="prev">&lsaquo;</th><th colspan="5" id="currM"></th><th id="next">&rsaquo;</th></tr><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr></thead>');
					if (myApi.browser.isChinese()) {
						that.tHead = $('<thead><tr><th id="prev">&lsaquo;</th><th colspan="5" id="currM"></th><th id="next">&rsaquo;</th></tr><tr><th>鏃�</th><th>涓�</th><th>浜�</th><th>涓�</th><th>鍥�</th><th>浜�</th><th>鍏�</th></tr></thead>');
					}
				} else if (that.options.mode === 'datepicker') {
					that.tHead = $('<thead><tr><th id="prev">&lsaquo;</th><th colspan="5" id="currM"></th><th id="next">&rsaquo;</th></tr><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead>');
					if (myApi.browser.isChinese()) {
						that.tHead = $('<thead><tr><th id="prev">&lsaquo;</th><th colspan="5" id="currM"></th><th id="next">&rsaquo;</th></tr><tr><th>鏃�</th><th>涓�</th><th>浜�</th><th>涓�</th><th>鍥�</th><th>浜�</th><th>鍏�</th></tr></thead>');
					}
				}
				that.tHead.find('#currM').text(months[that.date.getMonth()] +" " + that.date.getFullYear());
				if (myApi.browser.isChinese()) {
					that.tHead.find('#currM').text(that.date.getFullYear() + '骞�' + months[that.date.getMonth()] + '鏈�');
				}
				that.calendar.append(that.tHead);

				for(var i = 1; i <= 6; i++){
					var temp = [$('<td></td>'),$('<td></td>'),$('<td></td>'),$('<td></td>'),$('<td></td>'),$('<td></td>'),$('<td></td>')];

					while(day <= days){
						d.setDate(day);
						var dayOfWeek = d.getDay();

						if(d.getTime() == today.getTime()) temp[dayOfWeek].attr('id', 'currDay');

						if ((that.minDate && d < min) || (that.maxDate && d > max)) temp[dayOfWeek].addClass('disabled');

						if(that.options.mode === 'datepicker' && d.getTime() == selected.getTime()) temp[dayOfWeek].addClass('selected');

						if(i === 1 && dayOfWeek === 0) break; 
						else if(dayOfWeek < 6) temp[dayOfWeek].html('<span>'+(day++)+'</span>').addClass('date');
						else {
							temp[dayOfWeek].html('<span>'+(day++)+'</span>').addClass('date');
							break;
						}
					}
					/* For days of previous and next month */
					if (i === 1 || i > 4) {
						// First week
						if (i === 1) {
							var p = new Date(that.date.getFullYear(), that.date.getMonth() - 1, 1),
								pMonth = p.getMonth(), pDays = p.getDays();

							for (var a = 6; a >= 0; a--) {
								if (temp[a].text() === ''){
									
									p.setDate(pDays);

									temp[a].html('<span>' + (pDays--) + '</span>').addClass('pMDate');
									
									if ((that.minDate && p < min) || (that.maxDate && p > max)) temp[a].addClass('disabled');
									if (that.options.mode === 'datepicker' && p.getTime() == selected.getTime()) temp[a].addClass('selected');
								}
							}
						} 
						// Last week
						else if (i > 4) {
							var nextMonth = new Date(that.date.getFullYear(), that.date.getMonth() + 1, 1);
							for (var a = 0; a <= 6; a++) {
								if (temp[a].text() === ''){

									nextMonth.setDate(nStartDate);

									temp[a].html('<span>' + (nStartDate++) + '</span>').addClass('nMDate');
									
									if ((that.minDate && nextMonth < min) || (that.maxDate && nextMonth > max)) temp[a].addClass('disabled');
									if (that.options.mode === 'datepicker' && nextMonth.getTime() == selected.getTime()) temp[a].addClass('selected');
								}
							}
						}
					}
					cal.push(temp);
				}

				$.each(cal, function(i, v){
					var row = $('<tr></tr>'), l = v.length;
					for(var i = 0; i < l; i++) { row.append(v[i]); }
					tBody.append(row);
				});

				tBody.append('<tr><td colspan="7" id="today">' + sysDate + '</td></tr>').appendTo(that.calendar);
			} else {
				this.tHead = $('<thead><tr><th id="prev">&lsaquo;</th><th colspan="2" id="currM"></th><th id="next">&rsaquo;</th></tr>');
				that.tHead.find('#currM').text(that.date.getFullYear());
				that.tHead.appendTo(that.calendar);
				var currI = 0;
				for (var i = 0; i < 3; i++) {
					var row = $('<tr></tr>');
					for (var x = 0; x < 4; x++) {
						var col = $('<td align="center"></td>');
						var m = $('<span class="month" num="' + currI + '">' + short_months[currI] + '</span>');
						if (myApi.browser.isChinese()) {
							m = $('<span class="month" num="' + currI + '">' + short_months[currI] + '鏈�</span>');
						}
						col.append(m).appendTo(row);
						currI++;
					}
					tBody.append(row);
				}
				tBody.append('<tr><td colspan="4" id="today">' + sysDate + '</td></tr>').appendTo(that.calendar);
			}
		}		
	}

	/* DEFINITION FOR DCALENDAR */
	$.fn.dcalendar = function(opts){
		return $(this).each(function(index, elem){
			var that = this;
 			var $this = $(that),
 				data = $(that).data('dcalendar'),
 				options = $.extend({}, $.fn.dcalendar.defaults, $this.data(), typeof opts === 'object' && opts);
 			if(!data){
 				$this.data('dcalendar', (data = new DCalendar(this, options)));
 			}
 			if(typeof opts === 'string') data[opts]();
		});
	}

	$.fn.dcalendar.defaults = {
		mode : 'calendar',
		format: 'mm/dd/yyyy',
	};

	$.fn.dcalendar.Constructor = DCalendar;

	/* DEFINITION FOR DCALENDAR PICKER */
	$.fn.dcalendarpicker = function(opts){
		return $(this).each(function(){
			var that = $(this),
				hovered = false, selectedDate = false,
				cal = null;

			if(typeof opts === 'string') {
				var data = that.next('.myApi-calendar').data('dcalendar');
				data[opts]();
			} else {
				cal = $('<table class="myApi-calendar"></table>');
				that.wrap($('<div class="datepicker" style="display:inline-block;position:relative;"></div>'));
				cal.css({
					position:'absolute',
					left:0, display:'none',
					'box-shadow':'0 4px 6px 1px rgba(0, 0, 0, 0.14)',
					width:'230px',
					border: '1px solid #cbcbcb'
				}).appendTo(that.parent());
				if(opts){
					opts.mode = 'datepicker';
					cal.dcalendar(opts);
				} else{
					cal.dcalendar({mode: 'datepicker'});
				}
				cal.hover(function(){
					hovered = true;
				}, function(){
					hovered = false;
				}).on('click', function(){
					if(!selectedDate)
						that.focus();
					else {
						selectedDate = false;
						$(this).hide();
					}
				}).on('selectdate', function(e){
					that.val(e.date).trigger('onchange');
				    that.trigger($.Event('dateselected', {date: e.date, elem: that}));
					selectedDate = true;
				});
				that.on('keydown', function(e){ if(e.which) return false; })
					.on('focus', function(){
						$('.datepicker').find('.myApi-calendar').not(cal).hide();
						cal.show();
					})
					.on('blur', function(){ if(!hovered) cal.hide(); });
			}
		});
	}

}(jQuery);
/*
	Loading mask.
	2018.8.6 By GuoJS
*/

var myApi = myApi || {};
myApi.display = myApi.display || {};
myApi.display.loading = (function(){
	var obj = {
		show: function() {
			console.log("Show loading.");			
			
			// Remove first
			this.hide();

			// Create element
			var loading = document.createElement('div');
			loading.setAttribute('class', 'myApi-loading'); // Add style class
			document.body.appendChild(loading);			
		},
		
		hide: function() {
			console.log("Hide loading.");

			try {
				document.body.removeChild(document.querySelector('div.myApi-loading'));
			} catch (e) {
			}
		}		
	};
	return obj;
})();


/**
    婧愮爜鍚嶇О锛歱laceholder.js
	寮曞叆myApi
	2018.11.26 GuoJS
 */
 
(function() {
    //浠呭湪涓嶆敮鎸� placeholder 鐨勬椂鍊欐墽琛�
    if (!('placeholder' in document.createElement('input'))) {
 
        var listenerName = 'attachEvent';
        var listenerPrefix = 'on';
        if ('addEventListener' in window) {
            listenerName = 'addEventListener';
            listenerPrefix = '';
        }
 
        window[listenerName](listenerPrefix + 'load', function() {
            var placeholderListener = {
                //娣诲姞杈撳叆椤�
                add: function(tagName) {
					if (!Array.isArray(window.placeholderList))
						window.placeholderList = [];
					
                    var list = document.getElementsByTagName(tagName);
                    for (var i = 0; i < list.length; i++) {
                        this.render(list[i]);
                    }
                    return this;
                },

                //娓叉煋
                render: function(dom) {
                    var text = dom.getAttribute('placeholder');
                    if (!!text) {
						var div = this.getDiv(dom, text);
                        this.attachEvent(dom, div);
						window.placeholderList[window.placeholderList.length] = { 
							dom: dom
							, div: div
						};
                    }
                },

                //璁剧疆鏍峰紡
                getDiv: function(dom, text) {
                    var div = document.createElement('div');
 
                    div.style.position = 'absolute';
					this.position(dom, div);
                    div.style.color = '#757575';
                    div.style.textIndent = '5px';
                    div.style.zIndex = 999;
                    div.style.background = dom.style.background;
                    div.style.border = dom.style.border;
                    div.style.cursor = 'text';
                    div.innerHTML = text;
 
                    if ('TEXTAREA' == dom.tagName.toUpperCase()) {
                        div.style.lineHeight = '35px';
                    } else {
                        div.style.lineHeight = div.style.height;
                    }
                    document.getElementsByTagName('body')[0].appendChild(div);
                    return div;
                },
				
				// 瀹氫綅
				position: function(dom, div) {
                    div.style.width = this.getPosition(dom, 'Width') + 'px';
                    div.style.height = this.getPosition(dom, 'Height') + 'px';
                    div.style.left = this.getPosition(dom, 'Left') + 'px';
                    div.style.top = this.getPosition(dom, 'Top') + 'px';
				},
				
                //璁＄畻褰撳墠杈撳叆椤圭洰鐨勪綅缃�
                getPosition: function(dom, name, parentDepth) {
                    var offsetName = 'offset' + name;
                    var offsetVal = dom[offsetName];
                    var parentDepth = parentDepth || 0;
                    if (!offsetVal && parentDepth < 3) {
                        offsetVal = this.getPosition(dom.parentNode, name, ++parentDepth);
                    }
                    return offsetVal;
                },

                //娣诲姞浜嬩欢
                attachEvent: function(dom, div) {
 
                    //婵�娲绘椂锛岄殣钘� placeholder
                    dom[listenerName](listenerPrefix + 'focus', function() {
                        div.style.display = 'none';
                    });
 
                    //澶卞幓鐒︾偣鏃讹紝闅愯棌 placeholder
                    dom[listenerName](listenerPrefix + 'blur', function(e) {
                        if (e.srcElement.value == '') {
                            div.style.display = '';
                        }
                    });
 
                    //placeholder 鐐瑰嚮鏃讹紝瀵瑰簲鐨勮緭鍏ユ婵�娲�
                    div[listenerName](listenerPrefix + 'click', function(e) {
                        e.srcElement.style.display = 'none';
                        dom.focus();
                    });
                }
 
            };
 
            //闃叉鍦� respond.min.js鍜宧tml5shiv.min.js涔嬪墠鎵ц
            setTimeout(function() {
                placeholderListener.add('input').add('textarea');
            }, 50);
			
			$(window).resize(function () {
				console.log('On window resize');
				
				console.log('placeholderList length:' + window.placeholderList.length);
				for (var i = 0; i < window.placeholderList.length; i ++) {
					placeholderListener.position(
						window.placeholderList[i].dom
						, window.placeholderList[i].div
					);
				} // for
			});
        });
    }
})();
/*
	Toast control
	2018.11.23 GuoJS
*/
var myApi = myApi || {};
myApi.display = myApi.display || {};
myApi.display.toast = ( function() {
	var obj = {
		show: function (param) {
			console.log("Show toast.");
			
			// Check
			if (typeof param != 'object') {
				console.log("Invalid param.");
				return;
			}
			if ((typeof param.message != 'string') || (param.message.trim().length <= 0)) {
				console.log("Invalid message.");
				return;
			}
			console.log("message:" + param.message);
			
			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.myApi-toast'));
			} catch (e) {
			}

			// Create element
			var delay = param.delay || 3000;
			console.log("delay:" + delay);
			var toastEl = document.createElement('div');
			toastEl.setAttribute('class', 'myApi-toast'); // Add style class
			// toastEl.style['z-index'] = 10000; // top most z order

			var toastMaskEl = document.createElement('div');
			toastMaskEl.setAttribute('class', 'myApi-toast-mask'); // Add style class
			toastEl.appendChild(toastMaskEl);
			
			var toastDialogEl = document.createElement('div');
			toastDialogEl.setAttribute('class', 'myApi-toast-dialog'); // Add style class

			var contentEl = document.createElement('div'); 
			contentEl.setAttribute('class', 'myApi-toast-content'); // Add style class

			var messageEl = document.createTextNode(param.message);
			contentEl.appendChild(messageEl);
			toastDialogEl.appendChild(contentEl);
			
			toastEl.appendChild(toastDialogEl);
			document.body.appendChild(toastEl);
			
			// Hide after delay
			setTimeout(
				function () {
					try {
						document.body.removeChild(toastEl); // remove element
						
						if ("function" == typeof(param.complete))
							param.complete();
					} catch (e) {
					}
				}, 
				delay
			);
		},
	};
	
	return obj;
})(); 
