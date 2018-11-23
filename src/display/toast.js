/*
	Toast control
	2018.11.23 GuoJS
*/
var myApi = myApi || {};
myApi.display = myApi.display || {};
myApi.display.toast = ( function() {
	var obj = {
		show: function (param) {
			console.log("Show toast.");
			
			// Check
			if (typeof param != 'object') {
				console.log("Invalid param.");
				return;
			}
			if ((typeof param.message != 'string') || (param.message.trim().length <= 0)) {
				console.log("Invalid message.");
				return;
			}
			console.log("message:" + param.message);
			
			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.myApi-toast'));
			} catch (e) {
			}

			// Create element
			var delay = param.delay || 3000;
			console.log("delay:" + delay);
			var toastEl = document.createElement('div');
			toastEl.setAttribute('class', 'myApi-toast'); // Add style class
			// toastEl.style['z-index'] = 10000; // top most z order

			var toastMaskEl = document.createElement('div');
			toastMaskEl.setAttribute('class', 'myApi-toast-mask'); // Add style class
			toastEl.appendChild(toastMaskEl);
			
			var toastDialogEl = document.createElement('div');
			toastDialogEl.setAttribute('class', 'myApi-toast-dialog'); // Add style class

			var contentEl = document.createElement('div'); 
			contentEl.setAttribute('class', 'myApi-toast-content'); // Add style class

			var messageEl = document.createTextNode(param.message);
			contentEl.appendChild(messageEl);
			toastDialogEl.appendChild(contentEl);
			
			toastEl.appendChild(toastDialogEl);
			document.body.appendChild(toastEl);
			
			// Hide after delay
			setTimeout(
				function () {
					try {
						document.body.removeChild(toastEl); // remove element
						
						if ("function" == typeof(param.complete))
							param.complete();
					} catch (e) {
					}
				}, 
				delay
			);
		},
	};
	
	return obj;
})(); 
