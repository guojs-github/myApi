/*
	Browser storage routine.
	2018.8.6 By GuoJS
*/
var myApi = myApi || {};
myApi.storage = (function(){
	var obj = {
		setItem: function(key, value){
			console.log("Local storage set item.");
			console.log("key:" + key);
			console.log("value:" + value);
			var storage = window.localStorage;
			if (('object' != typeof(storage)) || (null == storage))
				return false;
			
			storage.setItem(key, value);
			return true;
		},
		
		getItem: function(key) {
			console.log("Local storage get item.");
			console.log("key:" + key);
			var storage = window.localStorage;
			if (('object' != typeof(storage)) || (null == storage))
				return null;

			var value = storage.getItem(key); 
			return "undefined" == typeof(value) || null == value ? "" : value;
		},		
	};
	
	return obj;
})();

