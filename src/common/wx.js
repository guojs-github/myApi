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
		} // scan
		
	};
	
	return obj;
})();


