/*
	file related routines.
	2018.12.29 GuoJS
*/
var myApi = myApi || {};
myApi.file = ( function() {
	var obj = {
		exists: function (url) {
			console.log('Check if the file online exists?');
			console.log('url:' + url)

			// create request object
			var xmlHttp
			if (window.ActiveXObject)  {  
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
			} else if (window.XMLHttpRequest) {  
				xmlHttp = new XMLHttpRequest();  
			}
			
			// request
			xmlHttp.open('get', url, false/* wait for the request done */)
			xmlHttp.send() // execute the request
			
			// analyze response
			if (xmlHttp.readyState == 4){
				if (xmlHttp.status == 200) { // OK
					return true
				} else if (xmlHttp.status == 404) {// Not found
					return false
				} else { // Other status
					return false
				}
			}
			
			return false
		}
	};
	
	return obj;
})();

