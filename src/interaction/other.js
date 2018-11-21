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

