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
				result += hour + "时";
			if ((0 < minute) || (0 < hour))
				result += minute + "分";
			result+= second + "秒";
			
			return result;
		},		
		
		formatTime: function(time) { // 格式化时钟显示
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
		
		formatDateString: function(dateString, sep) { // 格式化日期字符串，从yyyyMMdd到yyyy-MM-dd
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

		addSeconds: function(time, seconds) { // 在现有时间上添加秒数
			if (null == time) return null;
			if (isNaN(time)) return null;
			if (null == seconds) return null;
			if (isNaN(seconds)) return null;
			
			var ms = time.getTime(); // 转为时间戳
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

