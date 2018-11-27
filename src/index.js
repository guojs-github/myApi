/*
	My api main entry
	2018.11.22 GuoJS
*/

if (typeof jQuery === 'undefined') { 
	throw new Error('myApi: This plugin requires jQuery'); 
}

if (typeof (window.console) != 'object') {
	window.console = {
		log: function () {}
	};
}


$(function () {	
	console.log('myApi loading.');
	
	myApi.string.init();
	myApi.array.init();
})

