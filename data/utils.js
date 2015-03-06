// Define common tools that may need to be accessed.
var CAEUtils = {};

CAEUtils.reader = function(file) {
        var masterarray = [];
        if (file.exists(file)) {
            masterarray = file.read(file, "r");
        }
        //var uri = Cc["@mozilla.org/network/io-service;1"]
	    //                  .getService(Components.interfaces.nsIIOService)
	    //                  .newFileURI(file);
	//
        //var masterarray = [];
        //var request6 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
        //request6.open('GET', uri, true);
        //request6.onreadystatechange = function (oEvent) {
        //  if (request6.readyState === 4) {
        //    if (request6.status === 200) {masterarray = eval(request6.responseText);} 
        //  } else {
        //    //ERRoR;
        //    }
        //};
        //request6.send(null);
        
        console.log(masterarray);
        return masterarray;
};
CAEUtils.fadeElementOut = function(obj, speed, callback) {
	if (obj.getAttribute('isfading') === 'in') {
		return false;
	}
	obj.setAttribute('isfading', 'out');
	speed = speed || 0.1;
	if (obj.style.opacity === '') obj.style.opacity = '1';
	if (obj.style.opacity <= 0) {
		obj.style.display = 'none';
		obj.setAttribute('isfading', false);
		if (callback) callback();
		return true;
	} else {
		var newOpacity = parseFloat(obj.style.opacity) - speed;
		if (newOpacity < speed) newOpacity = 0;
		obj.style.opacity = newOpacity;
		setTimeout(function() {
			CAEUtils.fadeElementOut(obj, speed, callback);
		}, 100);
	}
};
CAEUtils.fadeElementIn = function(obj, speed, finalOpacity) {
	finalOpacity = finalOpacity || 1;
	if (obj.getAttribute('isfading') === 'out') {
		return false;
	}
	obj.setAttribute('isfading', 'in');
	speed = speed || 0.1;
	if ((obj.style.display === 'none') || (obj.style.display === '')) {
		obj.style.opacity = 0;
		obj.style.display = 'block';
	}
	if (obj.style.opacity >= finalOpacity) {
		obj.setAttribute('isfading', false);
		obj.style.opacity = finalOpacity;
		return true;
	} else {
		var newOpacity = parseFloat(obj.style.opacity) + parseFloat(speed);
		if (newOpacity > finalOpacity) newOpacity = finalOpacity;
		obj.style.opacity = newOpacity;
		setTimeout(function() {
			CAEUtils.fadeElementIn(obj, speed, finalOpacity);
		}, 100);
	}
};
CAEUtils.niceDate = function(d, usformat) {
	d = d || new Date();
	var year = d.getFullYear();
	var month = (d.getMonth() + 1);
	month = (month < 10) ? '0' + month : month;
	var day = d.getDate();
	day = (day < 10) ? '0' + day : day;
	var fullString = year + '-' + month + '-' + day;
	if (usformat) {
		fullString = month + '-' + day + '-' + year;
	}
	return fullString;
};