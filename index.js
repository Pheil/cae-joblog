// Import the APIs needed
const pageMod = require("sdk/page-mod");
const Request = require("sdk/request").Request;
const tabs = require("sdk/tabs");
const panels = require("sdk/panel");
const self = require("sdk/self");
const ss = require("sdk/simple-storage");
const file = require("sdk/io/file");
const path = require('sdk/fs/path');
const cm = require("sdk/context-menu");
const { ToggleButton } = require("sdk/ui/button/toggle");
const buttons = require('sdk/ui/button/action');
//const pageWorker = require("sdk/page-worker");
var workers = require("sdk/content/worker");
var users = [];
users.push("guy", "scott", "paul", "suzhou");
const utils = require('sdk/window/utils');
const {Cc,Ci,Cm,Cu,components} = require("chrome");
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);
Cu.import("resource://gre/modules/Services.jsm", this);
Cu.import("resource://gre/modules/NetUtil.jsm"); 
Cu.import("resource://gre/modules/FileUtils.jsm"); 
const {Task} = Cu.import("resource://gre/modules/Task.jsm", {});
const { XMLHttpRequest } = require("sdk/net/xhr");
const { OS, TextEncoder, TextDecoder } = Cu.import("resource://gre/modules/osfile.jsm", {});

const pathBase = "J:\\DEPT\\Core Engineering\\CAE\\JL\\Get out\\stop it\\";
const UproFile = OS.Path.join(OS.Constants.Path.profileDir, "CAEwidgets");

//Page worker test (need to run with multiprocess FF version to prevent freeze of main process)
// This content script sends header titles from the page to the add-on:
//var getFirstParagraph = "var paras = document.getElementsByTagName('tr');" +
//                        "console.log(paras[0].textContent);" +
//                        "self.port.emit('loaded', paras);"

//const pageWorker = require("sdk/page-worker").Page({
//    //contentScript: getFirstParagraph,
//    //contentScriptFile: './js/reconfig_BG.js',
//    contentScriptFile: [
//        "./js/jquery-3.0.0.pre.js",
//        "./js/reconfig_BG.js"
//    ],
//    contentURL: "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_metric_report?p_ewo_no2=&p_pso_no=&p_author_id=All&p_pso_engr_id=All&p_drstart_date=&p_drend_date=&p_part_no=All&p_project_no2=&p_wo_phase=OPEN+ALL&p_phase_flag=No"
    //REMOVE  TESTING ONLY (FIX ME)
//});

// pageWorker.port.on("loaded", function(data) {
    // console.log("Job Total Updated: " + Date());
    // var filepath = OS.Path.join(UproFile, "CAEJobManager.html");
    // Write_data(filepath, data);
    // //pageWorker.contentURL = "http://en.wikipedia.org/wiki/Cheese"
    // //Update Badge (TEMP CODE)
    // //var curtotal = 0;
    // //cae_button.badge = curtotal+1;
    // //cae_button.badgeColor = "#00aa00";
// });
// pageWorker.port.on("badge", function(data) {
    // //Update Badge (TEMP CODE)
    // cae_button.badge = data;
    // cae_button.badgeColor = "#00aa00";
// });
//END Page worker test

//FF39 required
Cu.import("resource://gre/modules/RemotePageManager.jsm");
let Gmanager = new RemotePages("about:guy");
let Smanager = new RemotePages("about:scott");
let Pmanager = new RemotePages("about:paul");
let Hmanager = new RemotePages("about:suzhou");

// Communication with about:guy
Gmanager.addMessageListener("GetNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile = myFile.path + "\\" + msg.data + ".txt";
    if (file.exists(myFile) === true ) {
        var notedata = readText(myFile)
        var notearray = new Array(notedata, msg.data);
        Gmanager.sendAsyncMessage("SetNote", notearray);
    }
});
Gmanager.addMessageListener("SaveNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});
Gmanager.addMessageListener("SaveSizes", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});
// Communication with about:scott
Smanager.addMessageListener("GetNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile = myFile.path + "\\" + msg.data + ".txt";
    if (file.exists(myFile) === true ) {
        var notedata = readText(myFile)
        var notearray = new Array(notedata, msg.data);
        Smanager.sendAsyncMessage("SetNote", notearray);
    }
});
Smanager.addMessageListener("SaveNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});
Smanager.addMessageListener("SaveSizes", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});
// Communication with about:paul
Pmanager.addMessageListener("GetNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile = myFile.path + "\\" + msg.data + ".txt";
    if (file.exists(myFile) === true ) {
        var notedata = readText(myFile)
        var notearray = new Array(notedata, msg.data);
        Pmanager.sendAsyncMessage("SetNote", notearray);
    }
});
Pmanager.addMessageListener("SaveNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});
Pmanager.addMessageListener("SaveSizes", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});
// Communication with about:suzhou
Hmanager.addMessageListener("GetNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile = myFile.path + "\\" + msg.data + ".txt";
    if (file.exists(myFile) === true ) {
        var notedata = readText(myFile)
        var notearray = new Array(notedata, msg.data);
        Hmanager.sendAsyncMessage("SetNote", notearray);
    }
});
Hmanager.addMessageListener("SaveNote", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});
Hmanager.addMessageListener("SaveSizes", function(msg) {
    let myFile = getLocalDirectory();
    myFile.append(msg.data[0] + ".txt"); 
    if ( myFile.exists() === false ) 
         myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, parseInt("0774", 8)); 
    var ostream = FileUtils.openSafeFileOutputStream(myFile);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"]. 
    createInstance(Ci.nsIScriptableUnicodeConverter); 
    converter.charset = "UTF-8"; 
    var istream = converter.convertToInputStream(msg.data[1]); 
    NetUtil.asyncCopy(istream, ostream, function(status) { 
        if (!components.isSuccessCode(status))  
            return; 
    });
});

// Preferences
var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);

//Create empty logfiles if they do not exist
dfCHK(OS.Path.join(UproFile, "scott.txt"));
dfCHK(OS.Path.join(UproFile, "paul.txt"));
dfCHK(OS.Path.join(UproFile, "suzhou.txt"));
dfCHK(OS.Path.join(UproFile, "guy.txt"));


var cae_button = ToggleButton({
  id: "cae-Jobs",
  label: "CAE Job Log",
  badge: "",
  badgeColor: "#00AAAA",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  //onClick: handleClick
  onChange: handleChange
});

var myScript = "window.addEventListener('click', function(event) {" +
               "  var t = event.target;" +
               "  var clicky = t.id;" +
               "  if (t.nodeName == 'BUTTON')" +
               "    self.port.emit('click_link', clicky);" +
               "}, false);";
               
var cae_panel = panels.Panel({
    width: 230,
    height: 245,
    contentURL: "./panel.html",
    onHide: handleHide,
    contentScript: myScript
});

function checkTabs(text) {
    var g;
    for (g=0;g<tabs.length;g++) {
        var meHere = String(tabs[g].url);
        if (meHere.contains(text, 0) == true) {
            console.log("User tab already open");
            return g;
        } else {
            var theReturn = -1;
        }
        }
     return theReturn;
}

cae_panel.port.on("click_link", function (text) {
    //tabs.open(self.data.url(text));
    //console.log(text);
    if (text == "oracle") {
        var clipboard = require("sdk/clipboard");
        clipboard.set("<script>var fileref=document.createElement('script');fileref.setAttribute('type','text/javascript');fileref.setAttribute('src', 'http://tamilan.na.ten/cae/EWS/ews.js');document.getElementsByTagName('head')[0].appendChild(fileref);</script><p><a class='iframe' id='caer' href='http://tamilan.na.ten/cae/EWS/viewer.htm'>View Results</a></p>");
    }
    else if (text == "assign") {
        tabs.open({
            url: "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_metric_report?p_ewo_no2=&p_pso_no=&p_author_id=All&p_pso_engr_id=All&p_drstart_date=&p_drend_date=&p_part_no=All&p_project_no2=&p_wo_phase=OPEN+ALL&p_phase_flag=No?CAEJL",
            isPinned: true,
            inNewWindow: false,
            inBackground: false
        });
    }
    else if (text == "upload") {
        tabs.open({
            url: "http://tamilan.na.ten/cae/EWS/",
            isPinned: true,
            inNewWindow: false,
            inBackground: false
        });
    }
    else if (text == "admin") {
        tabs.open({
            url: "http://tamilan.na.ten/cae/EWS/CAEadmin.php",
            isPinned: true,
            inNewWindow: false,
            inBackground: false
        });
    }
    else {
            var isTab = checkTabs("about:" + text);
            //let url = tabs.activeTab.url;
            if (isTab == -1) {
                    tabs.open({
                        url: "about:" + text,
                        isPinned: true,
                        inNewWindow: false,
                        inBackground: false
                    });
            } else {
                tabs[isTab].activate();
                tabs[isTab].reload();
            }
    } 
    handleHide();
});

//Get previous EWS             '  console.log(node.previousElementSibling.id);' +
//Get next EWS                 '  console.log(node.nextElementSibling.id);' +

var theWorkers = [];

function detachWorker(worker, workerArray) {
  var index = workerArray.indexOf(worker);
  if(index != -1) {
    workerArray.splice(index, 1);
  }
}

function handleChange(state) {
  //cae_button.badge = state.badge + 1;
  if (state.checked) {
    cae_button.badgeColor = "#00AAAA";
    cae_panel.show({
      position: cae_button
    });
  }
  else {
    cae_button.badgeColor = "#AA00AA";
  }
}

function handleHide() {
  cae_button.state('window', {checked: false});
  cae_panel.hide();
}

//function handleClick(state) {
//  tabs.open("http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_metric_report?p_ewo_no2=&p_pso_no=&p_author_id=All&p_pso_engr_id=All&p_drstart_date=&p_drend_date=&p_part_no=All&p_project_no2=&p_wo_phase=OPEN+ALL&p_phase_flag=No?CAEJL");
//}

// Create a page mod
pageMod.PageMod({
    include: /http.*ece_ewo_web.ece_ewo_metric_report.*CAEJL.*/,
    contentScriptWhen: 'ready',
    contentScriptFile: [
        "./js/jquery-2.1.3.min.js",
        "./js/jquery-ui.min.js",
        "./js/button.js",
        "./js/reconfig.js"
    ],
    contentStyleFile: [
        "./css/jquery-ui.css",
        "./css/style.css"
    ],
    onAttach: function(worker) {
        theWorkers.push(worker);
        var browserWindow = utils.getMostRecentBrowserWindow();
        var window = browserWindow.content;
        var oldInnerHTML = window.document.body.innerHTML;
        //detach is broken
       // worker.on('detach', function() {
       //     detachWorker(this, theWorkers);
       //     window.document.body.innerHTML = oldInnerHTML;
       // });
        // Update master log
        worker.port.on("save", function(all_array) {
            var parsedall_array = JSON.parse(all_array);
            var ews_array = parsedall_array.ews;
            var owner_array = parsedall_array.owner;
                        
            // Save ews list
            var ews_path = pathBase + "ews_log.txt";
            Write_data(ews_path, ews_array);
            
            // Update owner log vs user logs (already logged EWS)
            var user;
            for (var j=0; j < users.length; j++) {
                user = users[j];
                window[user + '_path'] = pathBase + user + "_log.txt";
                window[user + '_log'] = [];
                window[user + '_log_str'] = readText(window[user + '_path']);
                if (window[user + '_log_str'] !== null || window[user + '_log_str'] !== "") {
                    window[user + '_log'] = window[user + '_log_str'].split(",");
                    var curArray = window[user + '_log'];
                    var old_length = curArray.length;
                    for (var i=0; i < window[user + '_log'].length; i++) {
                        window[user + '_chk'] = window[user + '_log'][i];
                        var location = ews_array.indexOf(window[user + '_chk']);        // Check for match in EWS list
                        if (location > -1) {
                            //console.log("RECORD FOUND " + location + " - " + window[user + '_chk']);
                            owner_array[location] = user;                               // Match found so assign
                        } else if (location == -1) {
                            console.error("User record not found: " + window[user + '_chk']);
                            window[user + '_log'].splice(window[user + '_log'].indexOf(window[user + '_chk']), 1);    // Not found so remove from User log
                        }
                    }
                    if (window[user + '_log'].length !== old_length) {
                        Write_data(window[user + '_path'], window[user + '_log']);      //Array changed so update file
                        console.log("User log updated [" + old_length + " -> " + window[user + '_log'].length + "]");
                    }
                }
            }
            //Non-loop version
                //var guy_path = pathBase + "guy_log.txt";
                //var guy_log = [];
                //var guy_log_str = readText(guy_path);
                //if (guy_log_str !== null) {
                //    guy_log = guy_log_str.split(",");
                //    for (var i=0; i < guy_log.length; i++) {
                //        var guy_chk = guy_log[i];
                //        var location = ews_array.indexOf(guy_chk);       // Check for match in EWS list
                //        if (location > -1) {
                //            //console.log("(" + location + ") Match at " + i + " value of " + guy_chk);
                //            owner_array[location] = "guy";                  // Match found so assign
                //        } else if (location == -1) {
                //            //console.log("No match " + i + " value of " + guy_chk);
                //            guy_log.splice(guy_log.indexOf(guy_chk), 1);    // Not found so remove from Guy log
                //        }
                //    }
                //}
            //Write_data(window[user + '_path'], window[user + '_log']);

            var owner_path = pathBase + "owner_log.txt";
            Write_data(owner_path, owner_array);
        });

        // Assign changed record
        worker.port.on("update", function(upChange) {
            var parsedupChange = JSON.parse(upChange);
            var ews = parsedupChange.ews;
            var owner = parsedupChange.owner;
            var path = pathBase + owner + "_log.txt";
            var log = [];
            // Read current log
            var log_str = readText(path);
            if (log_str !== null && log_str !== "") {
                log = log_str.split(",");
                // Add new record to log
                log.push(ews);
            }
            if (log_str === null || log_str === "") {
                // Add new record to log
                log[0] = ews;
            }

            Write_data(path, log);
            console.log(ews + " assigned to " + owner + ".");
            //Update Badge
            var curtotal = cae_button.badge
            cae_button.badge = curtotal-1;
            cae_button.badgeColor = "#00aa00";
        });
        // Unassign changed record
        worker.port.on("unassign", function(upChange) {
            //var parsedupChange = JSON.parse(upChange);
            //var ews = parsedupChange.ews;
            //var owner = parsedupChange.owner;
            //var path = pathBase + owner + "_log.txt";
            //var log = [];
            // Read current log
            //var log_str = readText(path);
            //if (log_str !== null && log_str !== "") {
            //    log = log_str.split(",");
                // Add new record to log
            //    log.push(ews);
            //}
            //if (log_str === null || log_str === "") {
                // Add new record to log
            //    log[0] = ews;
            //}
            unassign(upChange);
            //console.log(ews + " unassigned to " + owner + ".");
        });
        
        worker.port.on("badge", function(state) {
            cae_button.badge = state;
            cae_button.badgeColor = "#AA00AA";
        });

        // Send user log to content script when requested
        worker.port.once("rtn_logged_g", function(user) {
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            } else {
                window[user + '_log'] = "";
            }
            //Send user log array
            worker.port.emit("userLogEWS_g", window[user + '_log']);
        });
        worker.port.once("rtn_logged_s", function(user) {
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            } else {
                window[user + '_log'] = "";
            }
            //Send user log array
            worker.port.emit("userLogEWS_s", window[user + '_log']);
        });
        worker.port.once("rtn_logged_p", function(user) {
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            } else {
                window[user + '_log'] = "";
            }
            //Send user log array
            worker.port.emit("userLogEWS_p", window[user + '_log']);
        });
        worker.port.once("rtn_logged_h", function(user) {
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            } else {
                window[user + '_log'] = "";
            }
            //Send user log array
            worker.port.emit("userLogEWS_h", window[user + '_log']);
        });
        
        var cae_menuItem = cm.Item({
            label: "Unassign EWS",
            context: [cm.SelectorContext("tr"), cm.URLContext("http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_metric_report?p_ewo_no2=&p_pso_no=&p_author_id=All&p_pso_engr_id=All&p_drstart_date=&p_drend_date=&p_part_no=All&p_project_no2=&p_wo_phase=OPEN+ALL&p_phase_flag=No?CAEJL*")],
            image: self.data.url("./uEWS.png"),
            contentScript: 'self.on("click", function (node) {' +
                         '  console.log("Clicked: " + node.nodeName + " with ID: " + node.id);' +
                         '  var row = document.getElementById(node.id);' +
                         '  var owner = row.cells[5].innerHTML;' +
                         '  var ews = node.id;' +
                         '  var upChange = JSON.stringify({' +
                         '  ews: ews,' +
                         '  owner: owner' +
                         '  });' +
                         '  self.postMessage(upChange);' +
                         '  row.setAttribute("class", "dnd border-fade wobble-horizontal");' +
                         '  row.setAttribute("style", "background:#FFFFFF;color:#000000;");' +
                         '  row.cells[5].innerHTML = "None";' +
                         '});',
            onMessage: function (upChange) {
                unassign(upChange);
            }
        });

        function unassign(upChange) {
            var parsedupChange = JSON.parse(upChange);
            var ews = parsedupChange.ews;
            var owner = parsedupChange.owner;
            if (owner != "none") {
                //Retrieve log
                var user_path = pathBase + owner + "_log.txt";
                var user_log = readText(user_path);
                user_log = user_log.split(",");
                //Remove from log
                user_log.splice(user_log.indexOf(ews), 1);
                //Save new log
                Write_data(user_path, user_log);
                //Log change
                console.log(ews + " unassigned from " + owner + ".");
                
                //Send owner to remove value from;
                worker.port.emit("unassignNum", owner);
            //Update Badge
            var curtotal = cae_button.badge
            cae_button.badge = curtotal+1;
            cae_button.badgeColor = "#aa00aa";
            }
        }
    }
});

// Create a page mod - GUY
pageMod.PageMod({
    include: "about:guy",
    contentScriptWhen: 'start',
    contentScriptFile: './js/guy.js',
    onAttach: function(worker) {
        // Send user logs to content script when requested
        var browserWindow = utils.getMostRecentBrowserWindow();
        var window = browserWindow.content;
        var user;
        worker.port.once("rtnHTML_logged_g", function(user) {
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            window[user + '_path'] = filepath;
            window[user + 'ws_log'] = readText(window[user + '_path']);
            //Send user ews log array & widget array
            var array = new Array(window[user + 'ws_log'], window[user + '_log']);
            worker.port.emit("userLogHTML_g", array);
        });
    }
});
// Create a page mod - SCOTT
pageMod.PageMod({
    include: "about:scott",
    contentScriptWhen: 'start',
    contentScriptFile: './js/scott.js',
    onAttach: function(worker) {
        // Send user log to content script when requested
        var browserWindow = utils.getMostRecentBrowserWindow();
        var window = browserWindow.content;
        var user;
        worker.port.once("rtnHTML_logged_s", function(user) {
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            window[user + '_path'] = filepath;
            window[user + 'ws_log'] = readText(window[user + '_path']);
            //Send user ews log array & widget array
            var array = new Array(window[user + 'ws_log'], window[user + '_log']);
            worker.port.emit("userLogHTML_s", array);
        });
    }
});
// Create a page mod - PAUL
pageMod.PageMod({
    include: "about:paul",
    contentScriptWhen: 'start',
    contentScriptFile: './js/paul.js',
    onAttach: function(worker) {
        // Send user log to content script when requested
        var browserWindow = utils.getMostRecentBrowserWindow();
        var window = browserWindow.content;
        var user;
        worker.port.once("rtnHTML_logged_p", function(user) {
            //console.log(user + " recieved.");
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            window[user + '_path'] = filepath;
            window[user + 'ws_log'] = readText(window[user + '_path']);
            //Send user ews log array & widget array
            var array = new Array(window[user + 'ws_log'], window[user + '_log']);
            worker.port.emit("userLogHTML_p", array);
        });
    }
});
// Create a page mod - Suzhou
pageMod.PageMod({
    include: "about:suzhou",
    contentScriptWhen: 'start',
    contentScriptFile: './js/suzhou.js',
    onAttach: function(worker) {
        // Send user log to content script when requested
        var browserWindow = utils.getMostRecentBrowserWindow();
        var window = browserWindow.content;
        var user;
        worker.port.once("rtnHTML_logged_h", function(user) {
            window[user + '_path'] = pathBase + user + "_log.txt";
            window[user + '_log_str'] = readText(window[user + '_path']);
            window[user + '_log'] = "";
            if (window[user + '_log_str'] !== null) {
                window[user + '_log'] = window[user + '_log_str'].split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            window[user + '_path'] = filepath;
            window[user + 'ws_log'] = readText(window[user + '_path']);
            //Send user ews log array & widget array
            var array = new Array(window[user + 'ws_log'], window[user + '_log']);
            worker.port.emit("userLogHTML_h", array);
        });
    }
});

function dfCHK(thename){
    //Create CAE directory and empty file if they don't exist
    OS.File.makeDir(UproFile);
    var promiseA = OS.File.writeAtomic(thename, "", { tmpPath: thename + '.tmp' });
    promiseA.then(
        function(aVal) {
            console.log('successfully created file');
        },
        function(aReason) {
            console.log('writeAtomic failed for reason:', aReason);
        }
    );
}

function readText(thename){
    if(!file.exists(thename)){
        console.log("Log missing!");
        return null;
    }
    let promise = OS.File.stat(thename);
    try {
    promise.then(
      function onSuccess(info) {
        if (info.size === 0) {
           return null;
        } 
      },
      function onFailure(reason) {
        if (reason instanceof OS.File.Error && reason.becauseNoSuchFile) {
            // |somePath| does not represent anything
            console.log("Log missing");
        } else {
            // some other error
            console.log("Error opening log");
        }
       return null;
      }
    );
    } catch (ex) {
        console.warn('Promise failed with reason: ', ex);       //Not sure if this is needed
    }
    var textReader = file.open(thename, 'r');
    var str = [];
    str = textReader.read();
    textReader.close();
    return str;
}
function Write_data(name, data){
    let encoder = new TextEncoder();                                // This encoder can be reused for several writes
    if (data.length !== 0) {
        let array = encoder.encode(data);
        OS.File.writeAtomic(name, array, {tmpPath: name + ".tmp"});      // Write the array atomically to "file.txt", using as temporary buffer "file.txt.tmp".
    } else {
        OS.File.writeAtomic(name, "", {tmpPath: name + ".tmp"});      // Write the array atomically to "file.txt", using as temporary buffer "file.txt.tmp".
    }
    //var encoder = new TextEncoder();
    //var mydata = encoder.encode(data);
    //name = OS.Path.join(OS.Constants.Path.tmpDir, name);
    //Task.spawn(function() {
    //   let file = yield OS.File.open(name, {write: true, append: false});
    //   yield file.write(mydata);
    //   yield file.close(); 
    //   console.log("Data written to", name);
    //}).then(null, function(e) console.error(e));
}

function getLocalDirectory () { 
    let directoryService = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties); 
    let localDir = directoryService.get("ProfD", Ci.nsIFile); 
    localDir.append("CAEwidgets");
    //console.log(localDir.path);
    if (!localDir.exists() || !localDir.isDirectory())  
        localDir.create(Ci.nsIFile.DIRECTORY_TYPE, parseInt("0774", 8)); 
    return localDir; 
}


// about constants
const aboutPaulContract = "@mozilla.org/network/protocol/about;1?what=paul";
const aboutPaulDescription = "About Paul";
const aboutPaulUUID = components.ID("b0b3af10-d3b3-11e4-8830-0800200c9a66");

const aboutGuyContract = "@mozilla.org/network/protocol/about;1?what=guy";
const aboutGuyDescription = "About Guy";
const aboutGuyUUID = components.ID("b4c22650-df83-11e4-8830-0800200c9a66");

const aboutScottContract = "@mozilla.org/network/protocol/about;1?what=scott";
const aboutScottDescription = "About Scott";
const aboutScottUUID = components.ID("b4c22651-df83-11e4-8830-0800200c9a66");

const aboutSuzhouContract = "@mozilla.org/network/protocol/about;1?what=suzhou";
const aboutSuzhouDescription = "About Suzhou";
const aboutSuzhouUUID = components.ID("b4c22652-df83-11e4-8830-0800200c9a66");

// about:paul factory
let aboutPaulFactory = {
    createInstance: function(outer, iid) {
        if (outer != null)
            throw Cr.NS_ERROR_NO_AGGREGATION;

        return aboutPaul.QueryInterface(iid);
    }
};

// about:paul
let aboutPaul = {
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:paul")
            return;

        let uri = Services.io.newURI("resource://CAEJobLog-at-tenneco-dot-com/data/paul.html", null, null);
        return Services.io.newChannelFromURI(uri);
    }
};

Cm.QueryInterface(Ci.nsIComponentRegistrar).
registerFactory(aboutPaulUUID, aboutPaulDescription, aboutPaulContract, aboutPaulFactory);

// about:guy factory
let aboutGuyFactory = {
    createInstance: function(outer, iid) {
        if (outer != null)
            throw Cr.NS_ERROR_NO_AGGREGATION;

        return aboutGuy.QueryInterface(iid);
    }
};

// about:guy
let aboutGuy = {
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:guy")
            return;

        let uri = Services.io.newURI("resource://CAEJobLog-at-tenneco-dot-com/data/guy.html", null, null);
        return Services.io.newChannelFromURI(uri);
    }
};

Cm.QueryInterface(Ci.nsIComponentRegistrar).
registerFactory(aboutGuyUUID, aboutGuyDescription, aboutGuyContract, aboutGuyFactory);

// about:scott factory
let aboutScottFactory = {
    createInstance: function(outer, iid) {
        if (outer != null)
            throw Cr.NS_ERROR_NO_AGGREGATION;

        return aboutScott.QueryInterface(iid);
    }
};

// about:scott
let aboutScott = {
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:scott")
            return;

        let uri = Services.io.newURI("resource://CAEJobLog-at-tenneco-dot-com/data/scott.html", null, null);
        return Services.io.newChannelFromURI(uri);
    }
};

Cm.QueryInterface(Ci.nsIComponentRegistrar).
registerFactory(aboutScottUUID, aboutScottDescription, aboutScottContract, aboutScottFactory);

// about:suzhou factory
let aboutSuzhouFactory = {
    createInstance: function(outer, iid) {
        if (outer != null)
            throw Cr.NS_ERROR_NO_AGGREGATION;

        return aboutSuzhou.QueryInterface(iid);
    }
};

// about:suzhou
let aboutSuzhou = {
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:suzhou")
            return;

        let uri = Services.io.newURI("resource://CAEJobLog-at-tenneco-dot-com/data/suzhou.html", null, null);
        return Services.io.newChannelFromURI(uri);
    }
};

Cm.QueryInterface(Ci.nsIComponentRegistrar).
registerFactory(aboutSuzhouUUID, aboutSuzhouDescription, aboutSuzhouContract, aboutSuzhouFactory);