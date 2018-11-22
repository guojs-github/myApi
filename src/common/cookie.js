/*
	Cookie
	2018.11.22 GuoJS
*/

var myApi = myApi || {};
myApi.cookie = (new (function () {
	var maxage = 60*60*24*1000;
    var path = '/';
 
    var cookie = getCookie();
 
    function getCookie(){
        var cookie = {};
        var all = document.cookie; console.log("cookie:" + all);
        if(all === "")
            return cookie;
        var list = all.split("; ");
        for(var i=0; i < list.length; i++){
            var cookies = list[i];
            var p = cookies.indexOf("=");
            var name = cookies.substring(0,p);
            var value = cookies.substring(p+1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    }
 
    var keys = [];
    for(var key in cookie)
        keys.push(key);
 
    this.length = keys.length;
 
    this.key = function(n){
		console.log("Get specified cookie;");
		console.log("n:" + n);

        if(n<0 || n >= keys.length)
            return null;
        return keys[n];
    };
 
    this.setItem = function(key, value){
		console.log("Set cookie.");
		console.log("key:" + key);
		console.log("value:" + value);
		
        if(! (key in cookie)){
            keys.push(key);
            this.length++;
        }
 
        cookie[key] = value;
        var cookies = key + "=" +encodeURIComponent(value);
        if(maxage)
            cookies += "; max-age=" + maxage;
        if(path)
            cookies += "; path=" + path;
 
        document.cookie = cookies;
    };
 
    this.getItem = function(key){
		console.log("Get cookie.");
		console.log("key:" + key);

        return "undefined" == typeof(cookie[key]) || null == cookie[key] ? "": cookie[key];
    };
 
    this.removeItem = function(key){
		console.log("Remove cookie.");
		console.log("key:" + key);

        if(!(key in cookie))
            return;
 
        delete cookie[key];
 
        for(var i=0; i<keys.length; i++){
            if(keys[i] === key){
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;
 
        document.cookie = key + "=; max-age=0" + "; path=" + path;;
    };
 
    this.clear = function(){
		console.log("Clear cookie.");

		for (var i=0; i<keys.length; i++)
            document.cookie = keys[i] + "=; max-age=0" + "; path=" + path;
        cookie = {};
        keys = [];
        this.length = 0;
    };
})());

