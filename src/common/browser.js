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

