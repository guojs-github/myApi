/*
	Loading mask.
	2018.8.6 By GuoJS
*/

var myApi = myApi || {};
myApi.display = myApi.display || {};
myApi.display.loading = (function(){
	var obj = {
		show: function() {
			console.log("Show loading.");			
			
			// Remove first
			this.hide();

			// Create element
			var loading = document.createElement('div');
			loading.setAttribute('class', 'myApi-loading'); // Add style class
			document.body.appendChild(loading);			
		},
		
		hide: function() {
			console.log("Hide loading.");

			try {
				document.body.removeChild(document.querySelector('div.myApi-loading'));
			} catch (e) {
			}
		}		
	};
	return obj;
})();

