/*
	Loading mask.
	2018.8.6 By GuoJS
*/

var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.loading = (function(){
	var obj = {
		show: function() {
			console.log("Show loading.");			
			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.loading'));
			} catch (e) {
			}

			// Create element
			var loading = document.createElement('div');
			loading.classList.add('loading'); // Add style class
			document.body.appendChild(loading);			
		},
		hide: function() {
			console.log("Hide loading.");

			try {
				document.body.removeChild(document.querySelector('div.loading'));
			} catch (e) {
			}
		},		
	};
	return obj;
})();

