/*
	Critical message.
	2018.8.22 By GuoJS
*/

var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.critical = (function(){
	var obj = {
		show: function(message) {
			console.log("Show critical message.");
			console.log("message:" + message);

			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.critical-message'));
			} catch (e) {
			}

			// Create element
			var mask = document.createElement('div');
			mask.classList.add('critical-message');
			mask.classList.add('mask'); 
			mask.classList.add('flex-column'); 

			var dialog = document.createElement('div');
			dialog.classList.add('dialog'); 
			dialog.classList.add('flex-column'); 

			var titleBar = document.createElement('div');
			titleBar.classList.add('dialog-title'); 
			titleBar.innerText = "提示";
			dialog.appendChild(titleBar);

			var content = document.createElement('div');
			content.classList.add('dialog-content'); 
			content.innerText = "这是样例信息";
			if (("string" == typeof(message)) && (0 < message.trim().length))
				content.innerText = message;
			dialog.appendChild(content);
			
			mask.appendChild(dialog);
			document.body.appendChild(mask);			
		},
	};
	return obj;
})();

