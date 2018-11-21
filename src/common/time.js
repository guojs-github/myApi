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

