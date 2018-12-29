/*
	Test Entry
	2017.4.25 GuoJS
*/
$(function () {
	console.log('On load event');
	init();
})

function init() { // initialize
	console.log("init");
	
	bind(); // Bind events
}

function bind() {
	console.log("bind");

	bindBrowserType();
	bindIsIE();
	bindAvailHeight();	
	bindLanguage();	
	bindIsChinese();	

	bindQueryString();
	bindCheckMobile();
	bindBubble();
	bindStopBubble();

	bindCookieSet();
	bindCookieGet();
	bindCookieRemove();
	bindCookieClear();
	
	bindFormatAmount();

	bindRequestGet();
	bindRequestPost();

	bindStorageSet();
	bindStorageGet();
	bindStorageRemove();
	bindStorageClear();

	bindStringTrim();

	bindFormatDuration();
	bindFormatDate();
	bindFormatTime();
	bindFormatDateString();
	bindAddSeconds();
	bindAddDays();

	bindFileExists();

	bindLoading();
	bindToast();
	bindCalendar();
	
	/*
	bindGisLocate();
	bindGisPathByAddresses();
	bindGisPathByPoints();
	bindGisShowPath();
	*/
}

// browser ////////////////////////////////////////

function bindBrowserType() {
	console.log("Bind browser type event.");

	var el = $("#browser-type");
	el.click(function () {
		console.log("Browser type.");
		
		alert(myApi.browser.type());
	});
}

function bindIsIE() {
	console.log("Bind is ie event.");

	var el = $("#is-ie");
	el.click(function () {
		console.log("Is ie type.");
		
		alert(myApi.browser.isIE());
	});
}

function bindAvailHeight() {
	console.log("Bind available height event.");

	var el = $("#avail-height");
	el.click(function () {
		console.log("Available height type.");
		
		alert(myApi.browser.availHeight());
	});
}

function bindLanguage() {
	console.log("Bind browser language event.");

	var el = $("#language");
	el.click(function () {
		console.log("Get browser language.");
		
		alert(myApi.browser.language());
	});
}

function bindIsChinese() {
	console.log("Bind browser language is chinese event.");

	var el = $("#is-chinese");
	el.click(function () {
		console.log("Browser language is chinese?");
		
		alert(myApi.browser.isChinese());
	});
}

// common //////////////////////////////////////

function bindQueryString() {
	console.log("Bind query string event.");

	var el = $("#query-string");
	el.click(function () {
		console.log("Get value of parameter a.");
		var a = myApi.common.queryString('a');

		console.log("a:" + decodeURI(a));
		alert("【a】:" + decodeURI(a));
	});
}

function bindCheckMobile() {
	console.log("Bind check mobile event.");

	var el = $("#check-mobile");
	el.click(function () {
		console.log("Check mobile.");

		var number = "12345678901"; 
		var result = myApi.common.checkMobile(number);
		var message = "number " + number + ( true == result? " is a legal number" : " is an illegal number");
		console.log(message);
		alert(message);

		number = "13601825555"; 
		result = myApi.common.checkMobile(number);
		message = "number " + number + ( true == result? " is a legal number" : " is an illegal number");
		console.log(message);
		alert(message);
	});
}

function bindBubble() {
	console.log('Click event bubble demo');

	var outter = $("#bubble");
	outter.click(function () {
		console.log('On outter click.');

		alert('外层点击事件');
	});
	var inner = $("#bubble > div");
	inner.click(function () {
		console.log('On inner click.');
		
		alert('内层点击事件');
	});	
}

function bindStopBubble() {
	console.log('Click event stop bubble demo');

	var outter = $("#stop-bubble");
	outter.click(function () {
		console.log('On outter click.');

		alert('外层点击事件');
	});
	var inner = $("#stop-bubble > div");
	inner.click(function () {
		console.log('On inner click.');
		
		alert('内层点击事件');
		myApi.common.stopBubble(inner);
	});	
}

// cookie ////////////////////////////////////

function bindCookieSet() {
	console.log("Bind cookie set event.");

	var el = $("#cookie-set");
	el.click(function () {
		console.log("Cookie set.");
		
		myApi.cookie.setItem("姓名", "小郭");
		var now = new Date();
		myApi.cookie.setItem("now", now);

		alert("成功添加Cookie 姓名和now");
	});
}

function bindCookieGet() {
	console.log("Bind cookie get event.");

	var el = $("#cookie-get");
	el.click(function () {
		console.log("Cookie get.");
		var prompt = '';
		
		var name = myApi.cookie.getItem("姓名");
		prompt = '姓名:' + name;
		var now = myApi.cookie.getItem("now");
		prompt += '\nnow:' + now;

		console.log(prompt);
		alert(prompt);
	});
}

function bindCookieRemove() {
	console.log("Bind cookie remove event.");

	var el = $("#cookie-remove");
	el.click(function () {
		console.log("Cookie remove.");
		
		myApi.cookie.removeItem("now");
		alert("成功移除Cookie now");
	});
}

function bindCookieClear() {
	console.log("Bind cookie clear event.");

	var el = $("#cookie-clear");
	el.click(function () {
		console.log("Cookie clear.");
		
		myApi.cookie.clear();
		alert("成功清空Cookie");
	});
}

// number /////////////////////////////////////

function bindFormatAmount() {
	console.log('Bind format amount event.');

	var el = $("#format-amount");
	el.click(function () {
		console.log("Format amount.");
		var result = '';
		
		var number = 0;
		result = number + '转换为' + myApi.number.formatAmount(number);

		number = 9;
		result += '\n' + number + '转换为' + myApi.number.formatAmount(number);

		number = 999999999;
		result += '\n' + number + '转换为' + myApi.number.formatAmount(number);

		number = -0.1;
		result += '\n' + number + '转换为' + myApi.number.formatAmount(number);

		alert(result);
	});
}

// request ///////////////////////////////////////

function bindRequestGet() {
	console.log("Bind request get event.");

	var el = $("#request-get");
	el.click(function () {
		console.log("Request get.");
		var url = "./jsp/userInfo.jsp";
		myApi.request.get(				
			url
			, function (data) {
				console.log("Request get success.");
				console.log("Request get data:" + JSON.stringify(data));
				
				alert('Request get success.\n' + JSON.stringify(data));
			}
			, function (request, status, err) {
				console.log("Request get fail.");

				alert('Request get fail.');
			}
			, 3000
		);
	});
}

function bindRequestPost() {
	console.log("Bind request post event.");

	var el = $("#request-post");
	el.click(function () {
		console.log("Request post.");
		
		var url = "./jsp/userInfo.jsp";
		myApi.request.post(				
			url
			, {}
			, function (data) {
				console.log("Request post success.");
				console.log("Request post data:" + JSON.stringify(data));
				
				alert('Request post success.\n' + JSON.stringify(data));
			}
			, function (request, status, err) {
				console.log("Request post fail.");

				alert('Request post fail.');
			}
			, 3000
		);
	});
}

// storage ///////////////////////////////////

function bindStorageSet() {
	console.log("Bind storage set event.");

	var el = $("#storage-set");
	el.click(function () {
		console.log("Storage set.");
		
		myApi.storage.setItem("姓名", "小郭");
		var now = new Date();
		myApi.storage.setItem("now", now);

		alert("成功添加 姓名和now");
	});
}


function bindStorageGet() {
	console.log("Bind storage get event.");

	var el = $("#storage-get");
	el.click(function () {
		console.log("Storage get.");
		
		var prompt = '';
		
		var name = myApi.storage.getItem("姓名");
		prompt = '姓名:' + name;
		var now = myApi.storage.getItem("now");
		prompt += '\nnow:' + now;

		console.log(prompt);
		alert(prompt);
	});
}

function bindStorageRemove() {
	console.log("Bind storage remove event.");

	var el = $("#storage-remove");
	el.click(function () {
		console.log("Storage remove.");
		
		myApi.storage.removeItem("now");
		alert("成功移除 now");
	});
}

function bindStorageClear() {
	console.log("Bind storage clear event.");

	var el = $("#storage-clear");
	el.click(function () {
		console.log("Storage clear.");
		
		myApi.storage.clear();
		alert("成功清空本地存储");
	});
}

function bindStringTrim() {
	console.log("Bind string trim event.");

	var el = $("#string-trim");
	el.click(function () {
		console.log("String trim.");
		var temp = '  演示字符串  ';
		var prompt = '';
		
		prompt = 'trim("' + temp + '") = "' + temp.trim() + '"';
		prompt += '\nltrim("' + temp + '") = "' + temp.ltrim() + '"';
		prompt += '\nrtrim("' + temp + '") = "' + temp.rtrim() + '"';
		
		alert(prompt);
	});
}


// time //////////////////////////////////////////////////

function bindFormatDuration() {
	console.log("Bind format duration event.");

	var el = $("#format-duration");
	el.click(function () {
		console.log("Format duration.");
		
		var duration = 4567;
		var prompt = duration + '秒转换为' + myApi.time.formatDuration(duration);
		console.log(prompt);
		alert(prompt);
	});
}

function bindFormatDate() {
	console.log("Bind format date event.");

	var el = $("#format-date");
	el.click(function () {
		console.log("Format date.");
		
		var now = new Date();
		alert('当前日期' + myApi.time.formatDate(now));
	});
}

function bindFormatTime() {
	console.log("Bind format time event.");

	var el = $("#format-time");
	el.click(function () {
		console.log("Format time.");
		
		var now = new Date();
		alert('当前时间' + myApi.time.formatTime(now));
	});
}

function bindFormatDateString() {
	console.log("Bind format date string event.");

	var el = $("#format-date-string");
	el.click(function () {
		console.log("Format date string.");
		
		var date = "20180814";
		var prompt = '日期字符串' + date + '转换为' + myApi.time.formatDateString(date);
		console.log(prompt);
		alert(prompt);
	});
}

function bindAddSeconds() {
	console.log("Bind add seconds event.");

	var el = $("#add-seconds");
	el.click(function () {
		console.log("Add seconds.");
		
		var now = new Date();
		var seconds = 1800;
		var prompt = seconds + '秒后时间是' + myApi.time.formatTime(myApi.time.addSeconds(now, seconds));		
		seconds = -10;
		prompt += '\n' + seconds + '秒后时间是' + myApi.time.formatTime(myApi.time.addSeconds(now, seconds));
		seconds = -(24 * 3600);
		prompt += '\n' + seconds + '秒后时间是' + myApi.time.formatTime(myApi.time.addSeconds(now, seconds));

		alert(prompt);
	});
}

function bindAddDays() {
	console.log("Bind add days event.");

	var el = $("#add-days");
	el.click(function () {
		console.log("Add days.");
		
		var now = new Date();
		var days = 1;
		var prompt = days + '天后时间是' + myApi.time.formatTime(myApi.time.addDays(now, days));		
		days = 10;
		prompt += '\n' + days + '天后时间是' + myApi.time.formatTime(myApi.time.addDays(now, days));
		days = -1;
		prompt += '\n' + days + '天后时间是' + myApi.time.formatTime(myApi.time.addDays(now, days));
		days = -31;
		prompt += '\n' + days + '天后时间是' + myApi.time.formatTime(myApi.time.addDays(now, days));

		alert(prompt);
	});
}

// file //////////////////////////////////////////////////

function bindFileExists() {
	console.log("Bind file exists.");

	var el = $("#file-exists");
	el.click(function () {
		console.log("file exists.");
		
		var urls = ['./image/logo.png', './image/logo1.png']
		for (var i = 0; i < urls.length; i ++) {
			var exists = myApi.file.exists(urls[i])
			alert('文件 "' + urls[i] + '" ' + (exists? '存在': '未找到'));
		}
	});
}

// 控件展示 ////////////////////////////////
function bindLoading () {
	console.log("Bind loading event.");

	var el = $("#loading");
	el.click(function () {
		console.log("Loading.");
		
		myApi.display.loading.show();
		setTimeout(
			function () {
				myApi.display.loading.hide();
			}
			, 3000
		);
	});
}

function bindToast() {
	console.log("Bind toast event.");

	var el = $("#toast");
	el.click(function () {
		console.log("Toast.");
		
		myApi.display.toast.show({
			message: '你好！这是一条演示消息。你能看到么？',
			complete: function () {
				console.log('Toast complete');
			}
		});
	});
}

function bindCalendar () {
	console.log('Bind calendar control');

	var calendarPicker = $('.calendar-sample');
	calendarPicker.dcalendarpicker({
		format:'yyyy-mm-dd'
	});
}


/*
function bindGisLocate() { // Bind locate position on map event
	var el = null;
	try {
		el = $("#gis-locate");
		if (0 < el.length)
			el.click(onGisLocate);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onGisLocate() { // Locate position on map event
	// alert("onGisLocate");
	lib.gis.baidu.locate(["江苏省苏州市苏州工业园红枫路35号","江苏省苏州市吴中区亭和路86号", "江苏省苏州工业园区同胜路90号"], onGisLocateDone);
	// lib.gis.baidu.locate(["江苏省苏州市苏州工业园红枫路35号","江苏省苏州市吴中区亭和路86号", "江苏省苏州工业园区同胜路90号","121klfadskl"], onGisLocateDone);
}

function onGisLocateDone(success, message) { // Locate position call back
	// alert('onGisLocateDone');
	var el = $("#gis-message");
	
	if (0 < el.length) {
		if (success)
			el.html("定位成功");
		else 
			el.html("发生错误：" + message);
	}
}

function bindGisPathByAddresses() { // Bind paint path by address list on map event
	var el = null;
	try {
		el = $("#gis-path-by-addresses");
		if (0 < el.length)
			el.click(onGisPathByAddresses);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onGisPathByAddresses() { // Locate position on map event
	//alert("onGisPathByAddresses");
	var el = $("#gis-message");
	if (0 < el.length) 
		el.html("");
	lib.gis.baidu.pathByAddresses("天安门","百度大厦", ["北京科技大学","北京国际会议中心"], 0, onGisPathByAddressesFail);
	// lib.gis.baidu.pathByAddresses("xxxxxxxx","百度大厦", ["北京科技大学","北京国际会议中心"], 0, onGisPathByAddressesFail);
}

function onGisPathByAddressesFail(message) { // Paint path by address list on map fail event
	// alert('onGisPathByAddressFail');
	var el = $("#gis-message");
	
	if (0 < el.length) {
			el.html(el.html() + message);
	}
}

function bindGisPathByPoints() { // Bind paint path by gps point list on map event
	var el = null;
	try {
		el = $("#gis-path-by-points");
		if (0 < el.length)
			el.click(onGisPathByPoints);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onGisPathByPoints() { // Paint path by gps points on map event
	// alert("onGisPathByPoints");
	var el = $("#gis-message");
	if (0 < el.length) 
		el.html("");
	lib.gis.baidu.pathByPoints(
		{address:"江苏省苏州新区淮海街1号", lng:120.569285, lat:31.291723}
		, {address:"江苏省苏州市吴中区胥口镇孙武路86号", lng:120.500013, lat:31.251257}
		, [
			{address:"江苏省苏州市苏州新区马运路266号", lng:120.549671, lat:31.324053}
			, {address:"江苏省苏州新区珠江路521号", lng:120.538221, lat:31.331304}
		]
		, 0
		, onGisPathByPointsComplete
	);
}

function onGisPathByPointsComplete(success, message) { // Paint path by gps points on map complete event
	// alert('onGisPathByPointsComplete');
	var el = $("#gis-message");
	
	if (0 < el.length) {
		if (success) {
			// alert(message);			
			lib.services.post(
				'./jsp/savePath.jsp'
				, {'id':10000, 'path':escape(message)}
				, function(data) { // success
					if ("true" != $.trim(data))
						alert('无法保存规划路径:' + data); 
				}
				, function() { // fail
					alert('无法保存规划路径'); 
				}
				, 2000
			);
		} else {
			el.html(message);
		}
	}
}

function bindGisShowPath() { // Bind show saved path on map event
	var el = null;
	try {
		el = $("#gis-show-path");
		if (0 < el.length)
			el.click(onGisShowPath);
	} catch(e) {
		throw e;
	} finally {
		e = null;
	}
}

function onGisShowPath() { // Show saved path on map event
	// alert("onGisShowPath");
	var el = $("#gis-message");
	if (0 < el.length) 
		el.html("");

	lib.services.post(
		'./jsp/loadPath.jsp'
		, {'id':10000}
		, function(data) { // success
			// alert(unescape(data));
			if (typeof data == 'string') {
				var path = unescape(data); // alert(path);		
				lib.gis.baidu.showPath(path, onGisShowPathComplete);
			} else {
				alert('无法加载保存路径');
			}
		}
		, function() { // fail
			alert('无法加载保存路径'); 
		}
	);
}

function onGisShowPathComplete(success, message) { // Gis show path complete event
	// alert('onGisShowPathComplete');
	var el = $("#gis-message");
	
	if (0 < el.length) {
		if (success) {
			el.html('绘制路径完成');
		} else {
			el.html('绘制路径失败：' +message);
		}
	}
}
*/