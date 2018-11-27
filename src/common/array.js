/*
	Array routines
	2018.11.27 GuoJS
*/
var myApi = myApi || {};
myApi.array = ( function() {
	var obj = {
		init: function() {
			console.log("Initialize myapi array library.");
			
			this.isArray();
		},

		isArray: function() {
			console.log("Add isArray routines.");
			
			if ('function' != typeof(Array.isArray)) {
				Array.isArray = function (arg) {
					return Object.prototype.toString.call(arg) === '[object Array]';
				}
			}
		}		
	};

	return obj;
})();

