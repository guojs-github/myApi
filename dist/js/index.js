/*
	Test Entry
	2017.4.25 GuoJS
*/
var grass = window.grass;
$(document).ready(function(){
	console.log('ready');
	init();
});

function init() { // initialize
	console.log("init");
	bind(); // Bind events
	// lib.gis.baidu.init(); // Show map
}

function bind() {
	console.log("bind");

	bindQueryString();
	bindExtend();
	bindCheckMobile();
	bindFormatDuration();
	bindFormatDate();
	bindToast();
	bindRequest();
	bindBrowserType();
	bindIsIE();
	bindAvailHeight();	
	bindFormatTime();
	bindAddSeconds();
	bindCookieSet();
	bindCookieGet();
	bindCookieRemove();
	bindCookieClear();
	bindStorageSet();
	bindStorageGet();
	bindStorageRemove();
	bindStorageClear();
	/*
	bindGisLocate();
	bindGisPathByAddresses();
	bindGisPathByPoints();
	bindGisShowPath();
	*/
}

function bindQueryString() { // Get ? parameter
	console.log("Bind query string event.");

	var el = $("#query-string");
	el.click(function () {
		console.log("Query string.");
		var a = grass.common.queryString('a');

		console.log("a:" + decodeURI(a));
		alert("a:" + decodeURI(a));
	});
}

function bindExtend() { // Extend json object
	console.log("Bind extend event.");

	var el = $("#extend");
	el.click(function () {
		console.log("Extend json object.");
		var a = {
			value: "It's a value",
		};
		console.log("a:" + JSON.stringify(a));
		alert("a:" + JSON.stringify(a));
		var b = {
			key: "It's a key",
		};
		console.log("b:" + JSON.stringify(b));
		alert("b:" + JSON.stringify(b));

		var c = grass.common.extend([a, b]);
		console.log("c:" + JSON.stringify(c));
		alert("c:" + JSON.stringify(c));
	});
}

function bindCheckMobile() { // Check the mobile number is available
	console.log("Bind check mobile event.");

	var el = $("#check-mobile");
	el.click(function () {
		console.log("Check mobile.");

		var number = "12345678901"; 
		var result = grass.common.checkMobile(number);
		console.log("number " + number + ( true == result? " is a legal number" : " is a illegal number") );
		alert("number " + number + ( true == result? " is a legal number" : " is a illegal number") );

		number = "13601825555"; 
		result = grass.common.checkMobile(number);
		console.log("number " + number + ( true == result? " is a legal number" : " is a illegal number") );
		alert("number " + number + ( true == result? " is a legal number" : " is a illegal number") );
	});
}

function bindFormatDuration() { // format duration
	console.log("Bind format duration event.");

	var el = $("#format-duration");
	el.click(function () {
		console.log("Format duration.");
		
		var duration = 4567;
		var prompt = grass.time.formatDuration(duration);
		console.log(prompt);
		alert(prompt);
	});
}

function bindFormatDate() { // format date
	console.log("Bind format date event.");

	var el = $("#format-date");
	el.click(function () {
		console.log("Format date.");
		
		var date = "20180814";
		var prompt = grass.time.formatDateString(date);
		console.log(prompt);
		alert(prompt);
	});
}

function bindToast() { // toast
	console.log("Bind toast event.");

	var el = $("#toast");
	el.click(function () {
		console.log("Toast.");
		
		grass.mobile.toast.show("测试消息", 5000);
	});
}

function bindRequest() { // send request 2 server
	console.log("Bind request event.");

	var el = $("#request");
	el.click(function () {
		console.log("request.");
		
		// var url = "/grass/jsp/userInfo.jsp";
		var url = "https://www.mdero.com/esplatform/restlet/wxapprs/wx/bindUserDynamic";
		var params = {
			phoneNumber: '13601825776',
		};
		grass.mobile.loading.show("/grass/images/loading.gif");	
		if (!grass.browser.isIE()) {
			grass.request.post(url, params).then(
				function(data) {
					grass.mobile.loading.hide();
					console.log("Request test success.");
					console.log("data:" + data);
				},
				function(message) {
					grass.mobile.loading.hide();
					console.log("Request test fail.");
					console.log("message:" + message);
				}
			);
		} else {
			grass.request.requestOld(
				url,
				'POST',
				{},
				function(data) {
					grass.mobile.loading.hide();
					console.log("Request test success.");
					console.log("Request test data:" + JSON.stringify(data));
				},
				function(request, status, err) {
					grass.mobile.loading.hide();
					console.log("Request test fail.");
				}
			);
		}
		
	});
}

function bindBrowserType() {
	console.log("Bind browser type event.");

	var el = $("#browser-type");
	el.click(function () {
		console.log("Browser type.");
		
		alert(grass.browser.type());
	});
}

function bindIsIE() {
	console.log("Bind is ie event.");

	var el = $("#is-ie");
	el.click(function () {
		console.log("Is ie type.");
		
		alert(grass.browser.isIE());
	});
}


function bindAvailHeight() {
	console.log("Bind available height event.");

	var el = $("#avail-height");
	el.click(function () {
		console.log("Available height type.");
		
		alert(grass.browser.availHeight());
	});
}

function bindFormatTime() {
	console.log("Bind format time event.");

	var el = $("#format-time");
	el.click(function () {
		console.log("Format time.");
		
		var now = new Date();
		alert(grass.time.formatTime(now));
	});
}

function bindAddSeconds() {
	console.log("Bind add seconds event.");

	var el = $("#add-seconds");
	el.click(function () {
		console.log("Add seconds.");
		
		var now = new Date();
		alert(grass.time.formatTime(grass.time.addSeconds(now, 1800)));
	});
}

function bindCookieSet() {
	console.log("Bind cookie set event.");

	var el = $("#cookie-set");
	el.click(function () {
		console.log("Cookie set.");
		
		grass.cookie.setItem("姓名", "小郭");
		var now = new Date();
		grass.cookie.setItem("now", now);

		alert("Cookie set");
	});
}

function bindCookieGet() {
	console.log("Bind cookie get event.");

	var el = $("#cookie-get");
	el.click(function () {
		console.log("Cookie get.");
		
		let name = grass.cookie.getItem("姓名");
		console.log("姓名:" + name);
		let now = grass.cookie.getItem("now");
		console.log("now:" + now);

		alert("Cookie get");
	});
}

function bindStorageSet() {
	console.log("Bind storage set event.");

	var el = $("#storage-set");
	el.click(function () {
		console.log("Storage set.");
		
		grass.storage.setItem("姓名", "小郭");
		var now = new Date();
		grass.storage.setItem("now", now);

		alert("Storage set");
	});
}

function bindCookieRemove() {
	console.log("Bind cookie remove event.");

	var el = $("#cookie-remove");
	el.click(function () {
		console.log("Cookie remove.");
		
		grass.cookie.removeItem("now");
		alert("Cookie removed");
	});
}

function bindCookieClear() {
	console.log("Bind cookie clear event.");

	var el = $("#cookie-clear");
	el.click(function () {
		console.log("Cookie clear.");
		
		grass.cookie.clear();
		alert("Cookie cleared");
	});
}

function bindStorageGet() {
	console.log("Bind storage get event.");

	var el = $("#storage-get");
	el.click(function () {
		console.log("Storage get.");
		
		let name = grass.storage.getItem("姓名");
		console.log("姓名:" + name);
		let now = grass.storage.getItem("now");
		console.log("now:" + now);

		alert("Storage get");
	});
}

function bindStorageRemove() {
	console.log("Bind storage remove event.");

	var el = $("#storage-remove");
	el.click(function () {
		console.log("Storage remove.");
		
		grass.storage.removeItem("now");
		alert("Storage removed");
	});
}

function bindStorageClear() {
	console.log("Bind storage clear event.");

	var el = $("#storage-clear");
	el.click(function () {
		console.log("Storage clear.");
		
		grass.storage.clear();
		alert("Storage cleared");
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