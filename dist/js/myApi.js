/*
	My api main entry
	2018.11.22 GuoJS
*/

if (typeof jQuery === 'undefined') { 
	throw new Error('myApi: This plugin requires jQuery'); 
}

$(function () {
	console.log('myApi loading.');
	
	myApi.string.init();
})


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
			var userAgent = navigator.userAgent; //»°µ√‰Ø¿¿∆˜µƒuserAgent◊÷∑˚¥Æ  
			var isOpera = userAgent.indexOf("Opera") > -1; //≈–∂œ «∑ÒOpera‰Ø¿¿∆˜  
			var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //≈–∂œ «∑ÒIE‰Ø¿¿∆˜  
			var isIE11 = -1 < userAgent.indexOf("Trident") &&  -1 < userAgent.indexOf("rv") > -1 && !isIE;
			var isEdge = userAgent.indexOf("Edge") > -1 && !isIE11; //≈–∂œ «∑ÒIEµƒEdge‰Ø¿¿∆˜  
			var isWeixin = userAgent.toLowerCase().indexOf("micromessenger") > -1; // ≈–∂œ «∑ÒŒ¢–≈‰Ø¿¿∆˜
			var isFF = userAgent.indexOf("Firefox") > -1; //≈–∂œ «∑ÒFirefox‰Ø¿¿∆˜  
			var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && !isWeixin; //≈–∂œ «∑ÒSafari‰Ø¿¿∆˜  
			var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isWeixin;; //≈–∂œChrome‰Ø¿¿∆˜  
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
		availHeight: function() { // º∆À„µ±«∞‰Ø¿¿∆˜◊Ó¥ÛªØ«Èøˆœ¬ø…”√∏ﬂ∂»,≤ªπˆ∂Øµƒ«Èøˆœ¬
			var type = '';
			var height = 0;
			var taskBarHeight = 40; // »ŒŒÒ¿∏∏ﬂ∂»
			var screenTop = 0;
			
			try {
				type = this.type();				
				// alert(type);
				// alert(this.isIE());
				if (this.isIE()) { // IE
					screenTop = 108; /* IE, window toolbar+ window menu∏ﬂ∂»*/
					return screen.availHeight/*∆¡ƒª∑÷±Ê¬ £¨»•µÙ»ŒŒÒ¿∏£¨»•µÙµ±«∞¥∞ø⁄±ÍÃ‚¿∏∏ﬂ∂»*/ - screenTop/* Chrome caption+toolbar+menu∏ﬂ∂»*/;
				} else if (this.BROWSER_TYPE.CHROME == type) { // Chrome
					screenTop = 90; /* Chrome, window caption+ window menu + window menu∏ﬂ∂»*/
					return screen.availHeight/*∆¡ƒª∑÷±Ê¬ */ - taskBarHeight - screenTop;
				} else { // Other
					screenTop = 90; /* Chrome, window caption+ window menu + window menu∏ﬂ∂»*/
					return screen.availHeight/*∆¡ƒª∑÷±Ê¬ */ - taskBarHeight - screenTop;
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
			var r = window.location.search.substr(1).match(reg);  //Ëé∑Âèñurl‰∏≠"?"Á¨¶ÂêéÁöÑÂ≠óÁ¨¶‰∏≤Âπ∂Ê≠£ÂàôÂåπÈÖç
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
				dataType: 'json', //Êé•ÂèóÊï∞ÊçÆÊ†ºÂºè (ËøôÈáåÊúâÂæàÂ§ö,Â∏∏Áî®ÁöÑÊúâhtml,xml,js,json) 
				error: function(request, status, err){ //Â§±Ë¥• 
					console.log("Request fail.");
					console.log("request:" + JSON.stringify(request));
					console.log("status:" + JSON.stringify(status));
					console.log("err:" + JSON.stringify(err));

					if ("function" == typeof(fail))
						fail(request, status, err);	
				}, 
				success: function(data){ //ÊàêÂäü 
					console.log("Request success");
					console.log("data:" + JSON.stringify(data));
					
					if ("function" == typeof(success))
						success(data);						
				}, 
				complete: function(XMLHttpRequest, status){ 
					myApi.display.loading.hide();
			„ÄÄ„ÄÄ„ÄÄ„ÄÄif ('timeout' == status){ //Ë∂ÖÊó∂,statusËøòÊúâsuccess,errorÁ≠âÂÄºÁöÑÊÉÖÂÜµ
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
				dataType: 'json', //Êé•ÂèóÊï∞ÊçÆÊ†ºÂºè (ËøôÈáåÊúâÂæàÂ§ö,Â∏∏Áî®ÁöÑÊúâhtml,xml,js,json) 
				error: function(request, status, err){ //Â§±Ë¥• 
					console.log("Request fail.");
					console.log("request:" + JSON.stringify(request));
					console.log("status:" + JSON.stringify(status));
					console.log("err:" + JSON.stringify(err));

					if ("function" == typeof(fail))
						fail(request, status, err);	
				}, 
				success: function(data){ //ÊàêÂäü 
					console.log("Request success");
					console.log("data:" + JSON.stringify(data));
					
					if ("function" == typeof(success))
						success(data);						
				}, 
				complete: function(XMLHttpRequest, status){ 
					myApi.display.loading.hide();
			„ÄÄ„ÄÄ„ÄÄ„ÄÄif ('timeout' == status){ //Ë∂ÖÊó∂,statusËøòÊúâsuccess,errorÁ≠âÂÄºÁöÑÊÉÖÂÜµ
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
				result += hour + "Êó∂";
			if ((0 < minute) || (0 < hour))
				result += minute + "ÂàÜ";
			result+= second + "Áßí";
			
			return result;
		},		
		
		formatTime: function(time) { // Ê†ºÂºèÂåñÊó∂ÈíüÊòæÁ§∫
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
		
		formatDateString: function(dateString, sep) { // Ê†ºÂºèÂåñÊó•ÊúüÂ≠óÁ¨¶‰∏≤Ôºå‰ªéyyyyMMddÂà∞yyyy-MM-dd
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

		addSeconds: function(time, seconds) { // Âú®Áé∞ÊúâÊó∂Èó¥‰∏äÊ∑ªÂä†ÁßíÊï∞
			if (null == time) return null;
			if (isNaN(time)) return null;
			if (null == seconds) return null;
			if (isNaN(seconds)) return null;
			
			var ms = time.getTime(); // ËΩ¨‰∏∫Êó∂Èó¥Êà≥
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
							fail("Êâ´ÊèèÂäüËÉΩÊ£ÄÊµãÂ§±Ë¥•");
						return;
					}
					
					if (true == res.checkResult['scanQRCode']) {
						console.log("Scan qr code allowed.")
						wx.scanQRCode({
							needResult: 1, // ÈªòËÆ§‰∏∫0ÔºåÊâ´ÊèèÁªìÊûúÁî±ÂæÆ‰ø°Â§ÑÁêÜÔºå1ÂàôÁõ¥Êé•ËøîÂõûÊâ´ÊèèÁªìÊûúÔºå
							scanType: ["qrCode","barCode"], // ÂèØ‰ª•ÊåáÂÆöÊâ´‰∫åÁª¥Á†ÅËøòÊòØ‰∏ÄÁª¥Á†ÅÔºåÈªòËÆ§‰∫åËÄÖÈÉΩÊúâ
							success: function (res) {
								console.log("scan res:" + JSON.stringify(res))
								
								if (0 > res.errMsg.indexOf("ok")) {
									console.log("Error occurred while scan:" + res.errMsg)
									if ("function" == typeof(fail))
										fail("Êâ´ÊèèÂäüËÉΩÊú™Ëé∑ÊéàÊùÉ");
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
							fail("Êâ´ÊèèÂäüËÉΩÊú™Ëé∑ÊéàÊùÉ");
					}
				}
			});			
		} // scan
		
	};
	
	return obj;
})();



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
