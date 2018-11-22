/*
	Browser storage routine.
	2018.8.6 By GuoJS
*/
var myApi = myApi || {};
myApi.storage = (new (function (){
	var storage;
	
	if (window.localStorage) {
		storage = window.localStorage;
	} else {
		storage = require('./cookie.js')();
	}
	
    this.setItem = function(key, value){
		storage.setItem(key, value);
	}
	
	this.getItem = function(key) {
		var value = storage.getItem(key); 
		return "undefined" == typeof(value) || null == value ? "" : value;
	}
	
	this.removeItem = function(key) {
		storage.removeItem(key);
	}

	this.clear = function() {
		storage.clear();
	}
})());

