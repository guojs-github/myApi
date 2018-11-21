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
