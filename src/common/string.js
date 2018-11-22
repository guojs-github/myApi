/*
	String routines
	2018.11.22 GuoJS
*/
var myApi = myApi || {};
myApi.string = ( function() {
	var obj = {
		init: function() {
			console.log("Initialize myapi string library.");
			
			this.trim();
		},

		trim: function() {
			console.log("Add trim routines.");
			
			if ('function' != typeof(String.trim)) {
				String.prototype.trim = function () {
					return this.replace(/(^\s*)|(\s*$)/g, "");
				}
			}

			if ('function' != typeof(String.ltrim)) {
				String.prototype.ltrim = function () {
					return this.replace(/(^\s*)/g, "");
				}
			}

			if ('function' != typeof(String.rtrim)) {
				String.prototype.rtrim = function () {
					return this.replace(/(\s*$)/g, "");
				}
			}
		}		
	};

	return obj;
})();

