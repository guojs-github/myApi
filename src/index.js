$(function() {
	window.onpageshow = function(event) {
		// 老的刷新机制，未有用
		if (event.persisted) {
			window.location.reload()
		}		
	};
});
