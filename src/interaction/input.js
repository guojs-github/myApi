/*
	Input dialog.
	2018.8.19 By GuoJS
*/

var myApi = myApi || {};
myApi.interaction = myApi.interaction || {};
myApi.interaction.input = (function(){
	var obj = {
		show: function(options, ok, cancel) {
			console.log("Show input dialog.");			
			var _this = this;

			// Remove element first
			try {
				document.body.removeChild(document.querySelector('div.input-dialog'));
			} catch (e) {
			}

			// Create element
			var mask = document.createElement('div');
			mask.classList.add('input-dialog');
			mask.classList.add('mask'); 
			mask.classList.add('flex-column'); 
			/*
			mask.onclick = function() {
				_this.hide();
				if ("function" == typeof(cancel)) 
					cancel();
			}
			*/

			var dialog = document.createElement('div');
			dialog.classList.add('dialog'); 
			dialog.classList.add('flex-column'); 

			var titleBar = document.createElement('div');
			titleBar.classList.add('dialog-title'); 
			if (("string" == typeof(options.title)) && (0 < options.title.trim().length))
				titleBar.innerText = options.title;
			else
				titleBar.innerText = "请输入";
			dialog.appendChild(titleBar);

			var textArea = document.createElement('textarea');
			textArea.classList.add('dialog-textarea'); 
			if (("number" == typeof(options.maxLength)) && (0 < options.maxLength))
				textArea.setAttribute("maxlength", options.maxLength);
			dialog.appendChild(textArea);	
			
			var buttonBar = document.createElement('div');
			buttonBar.classList.add('dialog-button-bar');
			
			var buttonCancel = document.createElement('div');
			buttonCancel.classList.add('dialog-button');
			buttonCancel.classList.add('dialog-button-cancel');
			buttonCancel.classList.add('dialog-button-left');
			buttonCancel.innerText = "取消";
			buttonCancel.style.width = "50%";
			buttonCancel.onclick = function() {
				_this.hide();
				if ("function" == typeof(cancel)) 
					cancel();
			}
			buttonBar.appendChild(buttonCancel);				

			var buttonOk = document.createElement('div');
			buttonOk.classList.add('dialog-button');
			buttonOk.classList.add('dialog-button-ok');
			buttonOk.classList.add('dialog-button-right');
			buttonOk.innerText = "确认";
			buttonOk.style.width = "50%";
			buttonOk.onclick = function() {
				_this.hide();
				var content = textArea.value;
				console.log("content:" + content);
				if ("function" == typeof(ok)) 
					ok(content);
			}
			buttonBar.appendChild(buttonOk);				
			
			dialog.appendChild(buttonBar);	
			
			mask.appendChild(dialog);
			document.body.appendChild(mask);			
		},
		hide: function() {
			console.log("Hide input dialog.");

			try {
				document.body.removeChild(document.querySelector('div.input-dialog'));
			} catch (e) {
			}
		},		
	};
	return obj;
})();

