// Import the APIs needed
const pageMod = require("sdk/page-mod");
const Request = require("sdk/request").Request;
const tabs = require("sdk/tabs");
const tab_utils = require("sdk/tabs/utils");
const panels = require("sdk/panel");
const self = require("sdk/self");
const data = require('sdk/self').data;
//const ss = require("sdk/simple-storage");
const file = require("sdk/io/file");
const path = require('sdk/fs/path');
const cm = require("sdk/context-menu");
var array = require('sdk/util/array');
const { ToggleButton } = require("sdk/ui/button/toggle");
const buttons = require('sdk/ui/button/action');
//const pageWorker = require("sdk/page-worker");
var workers = require("sdk/content/worker");
var preferences = require("sdk/simple-prefs").prefs;
var notifications = require("sdk/notifications");
var users = [];
users.push("guy", "scott", "paul", "suzhou");
//           0       1       2        3
const utils = require('sdk/window/utils');
const {Cc,Ci,Cm,Cu,components} = require("chrome");
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);
Cu.import("resource://gre/modules/Services.jsm", this);
Cu.import("resource://gre/modules/NetUtil.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");
const { defer } = require('sdk/core/promise');
const { setTimeout } = require("sdk/timers");
const {Task} = Cu.import("resource://gre/modules/Task.jsm", {});
//const { XMLHttpRequest } = require("sdk/net/xhr");
const { OS, TextEncoder, TextDecoder } = Cu.import("resource://gre/modules/osfile.jsm", {});
Cu.import("resource://gre/modules/RemotePageManager.jsm");

const pathBase = "J:\\DEPT\\Core Engineering\\CAE\\JL\\Get out\\stop it\\";
//const pathBase = "J:\\DEPT\\Core Engineering\\CAE\\JL\\test\\"; //TEST DATA
const UproFile = OS.Path.join(OS.Constants.Path.profileDir, "CAEwidgets");
var myIconURL = self.data.url("./icon-64.png");
var fileURL = require("./data/lib/fileURL.js");

exports.main = function(options, callbacks) {
    if (options.loadReason == "install" || options.loadReason == "startup") {
        factory = new Factory(AboutCAEJobs);
        factory = new Factory(About0Viewer);
        factory = new Factory(About1Viewer);
        factory = new Factory(About2Viewer);
        factory = new Factory(About3Viewer);
        registerRemotePages();
        //Check if pages are open and reload
        for each (var tab in tabs) {
          if (tab.url == "about:caejobs" || tab.url == "about:" + users[0] || tab.url == "about:" + users[1] || tab.url == "about:" + users[2] || tab.url == "about:" + users[3]) {
            tab.reload();
          }
        }
    } 

};

exports.onUnload = function (reason) {
    if (reason == "shutdown") {
        factory.unregister();
        RemotePageManager.removeRemotePageListener("about:caejobs");
        RemotePageManager.removeRemotePageListener("about:" + users[0]);
        RemotePageManager.removeRemotePageListener("about:" + users[1]);
        RemotePageManager.removeRemotePageListener("about:" + users[2]);
        RemotePageManager.removeRemotePageListener("about:" + users[3]);
    }
};

function registerRemotePages(){
    new RemotePages("about:caejobs");
    new RemotePages("about:" + users[0]);
    new RemotePages("about:" + users[1]);
    new RemotePages("about:" + users[2]);
    new RemotePages("about:" + users[3]);
}

//Create empty note log files if they do not exist, writeatomic error without if statements
function createBlank(user) {
    if (file.exists(UproFile, user + ".txt") === false ) {
        dfCHK(OS.Path.join(UproFile, user + ".txt"));
    }
}
createBlank(users[0]);
createBlank(users[1]);
createBlank(users[2]);
createBlank(users[3]);

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

function openAndReuseOneTabPerURL(url) {
  var wm = Cc["@mozilla.org/appshell/window-mediator;1"]
                     .getService(Ci.nsIWindowMediator);
  var browserEnumerator = wm.getEnumerator("navigator:browser");

  // Check each browser instance for our URL
  var found = false;
  while (!found && browserEnumerator.hasMoreElements()) {
    var browserWin = browserEnumerator.getNext();
    var tabbrowser = browserWin.gBrowser;

    // Check each tab of this browser instance
    var numTabs = tabbrowser.browsers.length;
    for (var index = 0; index < numTabs; index++) {
      var currentBrowser = tabbrowser.getBrowserAtIndex(index);
      if (url == currentBrowser.currentURI.spec) {

        // The URL is already opened. Select this tab.
        tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];

        // Focus *this* browser-window
        browserWin.focus();

        found = true;
        break;
      }
    }
  }

  // Our URL isn't open. Open it now.
  if (!found) {
    tabs.open({
        url: url,
        isPinned: true,
        inNewWindow: false,
        inBackground: false
    });
  }
}

cae_panel.port.on("click_link", function (text) {
    if (text == "oracle") {
        var clipboard = require("sdk/clipboard");
        clipboard.set("<script>var fileref=document.createElement('script');fileref.setAttribute('type','text/javascript');fileref.setAttribute('src', 'http://tamilan.na.ten/cae/EWS/ews.js');document.getElementsByTagName('head')[0].appendChild(fileref);</script><p><a class='iframe' id='caer' href='http://tamilan.na.ten/cae/EWS/viewer.htm'>View Results</a></p>" + preferences.userID);
        notifications.notify({
            title: "CAE Job Log",
            text: "Oracle code copied to clipboard.",
            iconURL: myIconURL
        });
    }

    else if (text == "assign") {
        openAndReuseOneTabPerURL("about:caejobs");
    }
    else if (text == "upload") {
        openAndReuseOneTabPerURL("http://tamilan.na.ten/cae/EWS/");
    }
    else if (text == "admin") {
        openAndReuseOneTabPerURL("http://tamilan.na.ten/cae/EWS/CAEadmin.php");
    }
    else {
        openAndReuseOneTabPerURL("about:" + text);
    } 
    handleHide();
});

//Get previous EWS             '  console.log(node.previousElementSibling.id);' +
//Get next EWS                 '  console.log(node.nextElementSibling.id);' +

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

// Page mod for EWS pages
pageMod.PageMod({
    include: "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_page?in_ewr_no=EWS*",
    contentScriptWhen: 'end',
    contentScriptFile: './js/ews_user.js',
    onAttach: function(worker) {
        // Send user logs to content script when requested
        worker.port.once("rtn_logged", function() {
            var g_path = pathBase + users[0] + "_log.txt";
            var g_log_str = readText(g_path);
            var g_log = "";
            if (g_log_str !== null) {
                g_log = g_log_str.split(",");
            }
            var s_path = pathBase + users[1] + "_log.txt";
            var s_log_str = readText(s_path);
            var s_log = "";
            if (s_log_str !== null) {
                s_log = s_log_str.split(",");
            }
            var p_path = pathBase + users[2] + "_log.txt";
            var p_log_str = readText(p_path);
            var p_log = "";
            if (p_log_str !== null) {
                p_log = p_log_str.split(",");
            }
            var h_path = pathBase + users[3] + "_log.txt";
            var h_log_str = readText(h_path);
            var h_log = "";
            if (h_log_str !== null) {
                h_log = h_log_str.split(",");
            }
            //Send user ews logs as arrays
            var array = new Array(g_log, s_log, p_log, h_log);
            worker.port.emit("userLogs", array);
        });
        //Restore original page
        worker.on('detach', function () {
            //Need multiprocess code
        });
    }
});

// Page mod for CAEJobs page
pageMod.PageMod({
    include: "about:caejobs",
    contentScriptWhen: 'end',
    contentScriptFile: ["./lib/jquery-2.1.4.js",
                      "./lib/jquery.tablesorter.js",
                      "./js/caejobs.js"],
    onAttach: function(worker) {
        var cae_menuItem = cm.Item({
            label: "Unassign EWS",
            context: [cm.SelectorContext("tr"), cm.URLContext("about:caejobs")],
            image: self.data.url("./uEWS.png"),
            contentScript: 'self.on("click", function (node) {' +
                         '  var row = document.getElementById(node.id);' +
                         '  var owner = row.cells[4].textContent;' +
                         '  var ews = node.id;' +
                         '  var upChange = JSON.stringify({' +
                         '  ews: ews,' +
                         '  owner: owner' +
                         '  });' +
                         '  self.postMessage(upChange);' +
                         '  row.setAttribute("class", "dnd border-fade wobble-horizontal");' +
                         '  row.setAttribute("style", "background-color:#E6EEEE;");' +
                         '  row.cells[4].textContent = "None";' +
                         '});',
            onMessage: function (upChange) {
                unassign(upChange);
            }
        });
        
        worker.on('detach', function () {
            cae_menuItem.destroy();
        });
        
        worker.port.on('CAEJobLog-at-tenneco-dot-com:reloadx', function () {
            notifications.notify({
                title: "CAE Job Log",
                text: "Updated request submitted.",
                iconURL: myIconURL
            });
            updateJobs();            //Start update process
        });
        
        worker.port.on('CAEJobLog-at-tenneco-dot-com:aboutOpen', function (user) {
            openAndReuseOneTabPerURL("about:" + user);
        });
        
        worker.port.on('CAEJobLog-at-tenneco-dot-com:update', function (upChange) {
            var ews = upChange[0];
            var owner = upChange[1];
            var log_path = pathBase + owner + "_log.txt";
            var log = [];
            // Read current log
            var log_str = readText(log_path);
            if (log_str !== null && log_str !== "") {
                log = log_str.split(",");
                // Check if record already exists in log
                var location = log.indexOf(ews);        // Check for match in user EWS list
                if (location > -1) {
                    console.error(ews + " is already assigned to " + owner);
                } else if (location == -1) {
                    log.push(ews);               // Add new record to log array
                    console.log(ews + " assigned to " + owner + ".");
                }

            }
            if (log_str === null || log_str === "") {
                // Add new record to log
                log[0] = ews;
                console.log(ews + " assigned to " + owner + ".");
            }

            Write_data(log_path, log);      //Save data to file locally J:
            // Save user ews log to server
            Request({
                url: "http://tamilan.na.ten/cae/Joblog-backend/handler.php",
                content: { 
                    Username: owner,
                    EWSArray: log,
                    },
                onComplete: function (response) {
                    console.log( response.text );
                }
            }).post();    

            //Update Badge
            var curtotal = cae_button.badge;
            if (curtotal !== "") {
                cae_button.badge = curtotal-1;
                cae_button.badgeColor = "#00aa00";
            } else {
                cae_button.badge = -1;
                cae_button.badgeColor = "#00aa00";
            }
        });
        
        worker.port.on('CAEJobLog-at-tenneco-dot-com:unassign', function (upChange) {
            // Unassign changed record
            var ews = upChange[0];
            var owner = upChange[1];
            
            console.log(ews + " unassigned from " + owner + ".");
            if (owner != "none") {
                //Retrieve log
                var user_path = pathBase + owner + "_log.txt";
                var user_log = readText(user_path);
                user_log = user_log.split(",");
                //Remove from log
                arrdestroy(user_log,String(ews));
                //Save new log
                Write_data(user_path, user_log);
                
                //Send owner to remove value from
                worker.port.emit("CAEJobLog-at-tenneco-dot-com:unassignNum", owner);
                // Save user ews log to server
                Request({
                    url: "http://tamilan.na.ten/cae/Joblog-backend/handler.php",
                    content: { 
                        Username: owner,
                        EWSArray: user_log,
                        },
                    onComplete: function (response) {
                        console.log( response.text );
                    }
                }).post(); 
                //Update Badge
                var curtotal = cae_button.badge;
                cae_button.badge = curtotal+1;
                cae_button.badgeColor = "#aa00aa";
            }
            function arrdestroy(arr, val) {
                for (var i = 0; i < arr.length; i++) if (arr[i] === val) arr.splice(i, 1);
                return arr;
            }
        });
        
        worker.port.on("CAEJobLog-at-tenneco-dot-com:clearCompleted", function() {
            // Update user logs for completed/closed jobs (jobs not in ews_array)
            var user;
            for (var j=0; j < users.length; j++) {
                user = users[j];
                var del_array = [],
                    old_length,
                    user_log = [],
                    user_path = pathBase + user + "_log.txt",
                    user_log_str = readText(user_path),
                    ews_path = pathBase + "ews_log.txt",
                    ews_log_str = readText(ews_path),
                    ews_array = ews_log_str.split(",");
                if (user_log_str !== null || user_log_str !== "") {
                    user_log = user_log_str.split(",");
                    var curArray = user_log;
                    old_length = curArray.length;
                    for (var i=0; i < user_log.length; i++) {
                        var user_chk = user_log[i];
                        var location = ews_array.indexOf(user_chk);        // Check for match in EWS list
                        if (location == -1) {
                        console.error(user_chk + " not found in active EWS list. [" + users[j] + "]");
                            del_array.push(user_chk);
                        }
                    }
                }
                //Remove completed jobs
                for (var h=0; h < del_array.length; h++) {
                    user_log.splice(user_log.indexOf(del_array[h]), 1);
                }
                if (user_log.length != old_length) {//Array changed so update users log file
                    Write_data(user_path, user_log);  
                    console.log(user + "'s EWS log updated from " + old_length + " to " + user_log.length + " records.  [-" + del_array + "]");
                } 
            } 
        });
                
        function updateJobs() {
            var hiddenFrames = require("sdk/frame/hidden-frame");
            var instance = Cc["@mozilla.org/moz/jssubscript-loader;1"];
            var loader = instance.getService(Ci.mozIJSSubScriptLoader);

            function loadScript(url) {
                loader.loadSubScript(url);
            }
            loadScript("resource://CAEJobLog-at-tenneco-dot-com/data/js/retrieveTable.js");
            
            let hiddenFrame = hiddenFrames.add(hiddenFrames.HiddenFrame({
              onReady: function() {
                this.element.contentWindow.location = "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_metric_report?p_ewo_no2=&p_pso_no=&p_author_id=All&p_pso_engr_id=All&p_drstart_date=&p_drend_date=&p_part_no=All&p_project_no2=&p_wo_phase=OPEN+ALL&p_phase_flag=No";
                let self = this;
                this.element.addEventListener("DOMContentLoaded", function() {
                    var datadump = refreshInformation(self.element.contentDocument);

                    hiddenFrames.remove(hiddenFrame);
                    worker.port.emit("CAEJobLog-at-tenneco-dot-com:pageprep");
                    
                    //Check assigned status before sending to caejobs by loading user logs to arrays
                    var user_arrays = [];
                    for (var j=0; j < users.length; j++) {
                        var user = users[j];
                        var user_path = pathBase + user + "_log.txt";
                        var user_log_str = readText(user_path);
                        if (user_log_str !== null) {
                            //var user_log = user_log_str.split(",");
                            user_arrays.push(user_log_str.split(","));
                        }
                    }
                    
                    var array = JSON.parse(datadump),
                        ews_array = [],
                        assigned = '';
                    worker.port.emit("CAEJobLog-at-tenneco-dot-com:totalUpdate", array.length);
                    cae_button.badge = array.length;
                    cae_button.badgeColor = "#aa00aa";
                    for (var i = 0; i < array.length; i++) {
                        var str = '',
                            ews = array[i].EWS,
                            bu = array[i].BU,
                            pn = array[i].PartNo,
                            sub = array[i].Submit,
                            pnCHK = fileURL.FSdisplay(pn);
                        assigned = 'None';
                        ews_array.push(ews);
                        for (var r=0; r < user_arrays.length; r++) { //for each user log array
                            for (var p=0; p < user_arrays[r].length; p++) { //for each ews from each user
                                if (user_arrays[r][p] == ews) { 
                                    assigned = users[r];
                                }
                            } 
                        }
                        if (assigned == 'None') {
                            str += '<tr id="'+ ews + '" class="dnd border-fade wobble-horizontal" draggable="true">';
                            str += '<td><a href="http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_page?in_ewr_no=' + ews + '">' + ews + '</a></td>';
                            str += '<td>' + bu + '</td>';
                            if (pnCHK != "unknown") {
                                str += '<td><a href="' + pnCHK + '">' + pn + '</a></td>';
                            } else {
                                str += '<td>' + pn + '</td>';
                            }
                            str += '<td>' + sub + '</td>';
                            str += '<td>' + assigned + '</td>';
                            str += '</tr>';
                        } else {
                            str += '<tr id="'+ ews + '" class="dnd border-fade wobble-horizontal ' + assigned +'" draggable="true">';
                            str += '<td><a href="http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_page?in_ewr_no=' + ews + '">' + ews + '</a></td>';
                            str += '<td>' + bu + '</td>';
                            if (pnCHK != "unknown") {
                                str += '<td><a href="' + pnCHK + '">' + pn + '</a></td>';
                            } else {
                                str += '<td>' + pn + '</td>';
                            }
                            str += '<td>' + sub + '</td>';
                            str += '<td>' + assigned + '</td>';
                            str += '</tr>';
                            var curtotal = cae_button.badge;
                            cae_button.badge = curtotal-1;
                            worker.port.emit("CAEJobLog-at-tenneco-dot-com:countUpdate", assigned);
                        }
                        worker.port.emit("CAEJobLog-at-tenneco-dot-com:rowUpdate", str);
                    }
                    notifications.notify({
                        title: "CAE Job Log",
                        text: "Updated request completed.",
                        iconURL: myIconURL
                    });
                    worker.port.emit("CAEJobLog-at-tenneco-dot-com:finalUpdate");
                    saveEWSRecords(ews_array);
                }, true, true);
              }
            })); 
            
        }
        
        function saveEWSRecords(arrayData) {
            var ews_path = pathBase + "ews_log.txt";
            Write_data(ews_path, arrayData);        // Save ews list locally   
            // Save ews log to server (For website display)
            Request({
                url: "http://tamilan.na.ten/cae/FFX_ewsLog_handler.php",
                content: { EWSArray: arrayData },
                onComplete: function (response) {
                    console.log( response.text );
                }
            }).post();
        }

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
                arrdestroy(user_log,String(ews));
                //Save new log
                Write_data(user_path, user_log);
                //Log change
                console.log(ews + " unassigned from " + owner + ".");
                
                //Send owner to remove value from;
                worker.port.emit("CAEJobLog-at-tenneco-dot-com:unassignNum", owner);
                //Update Badge
                var curtotal = cae_button.badge;
                if (curtotal !== "") {
                    cae_button.badge = curtotal+1;
                    cae_button.badgeColor = "#aa00aa";
                } else {
                    cae_button.badge = 1;
                    cae_button.badgeColor = "#aa00aa";
                }
            }
            function arrdestroy(arr, val) {
                for (var i = 0; i < arr.length; i++) if (arr[i] === val) arr.splice(i, 1);
                return arr;
            }
            //Update user log on server
            Request({
                url: "http://tamilan.na.ten/cae/Joblog-backend/handler.php",
                content: { 
                    Username: owner,
                    EWSArray: user_log,
                    },
                onComplete: function (response) {
                    console.log( response.text );
                }
            }).post(); 
        }
    }
});

function unassignUSER(upChange) {
    var parsedupChange = JSON.parse(upChange),
        ews = parsedupChange.ews,
        owner = parsedupChange.owner;
    if (owner != "none") {
        var user_path = pathBase + owner + "_log.txt",
            user_log = readText(user_path);        //Retrieve log
        user_log = user_log.split(",");
        arrdestroy(user_log,String(ews));        //Remove from log
        Write_data(user_path, user_log);        //Save new log
        console.log(ews + " unassigned from " + owner + ".");
    }
    function arrdestroy(arr, val) {
        for (var i = 0; i < arr.length; i++) if (arr[i] === val) arr.splice(i, 1);
        return arr;
    }
}

pageMod.PageMod({
    include: "about:" + users[0],
    contentScriptWhen: 'end',
    contentScriptFile: ["./lib/jquery-2.1.4.js",
                      "./lib/jquery-ui.min.js",
                      "./lib/jquery.gridster.js",
                      "./js/joblog_" + users[0] + ".js"],
    onAttach: function(worker) {
        var cae_menuItem = cm.Item({
            label: "Unassign EWS",
            context: [cm.SelectorContext("a"), cm.URLContext("about:" + users[0])],
            image: self.data.url("./uEWS.png"),
            contentScript: 'self.on("click", function (node) {' +
                         '  var owner = "' + users[0] + '",' +
                         '      ews = node.textContent,' +
                         '      upChange = JSON.stringify({' +
                         '  ews: ews,' +
                         '  owner: owner' +
                         '  });' +
                         '  self.postMessage(upChange);' +
                         '  location.reload();' +
                         '});',
            onMessage: function (upChange) {
                unassignUSER(upChange);
            }
        });
        
        worker.port.on('detach', function () {
            cae_menuItem.destroy();
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:rtn_logged', function (message) {
            // Send user log to content script when requested
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_log_str = readText(user_path);
            var user_log = "";
            if (user_log_str !== null) {
                user_log = user_log_str.split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            var u0_path2 = filepath;
            var u0ws_log = readText(u0_path2);
            //Send user ews log & widget arrays
            var array = new Array(u0ws_log, user_log);
            var userIndex = users.indexOf(user);
            worker.port.emit("CAEJobLog-at-tenneco-dot-com:userLog_" + userIndex, array);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:GetNote', function (msg) {
            var myFile = OS.Path.join(UproFile, msg + ".txt");
            if (file.exists(myFile) === true ) {
                var notedata = readText(myFile);
                var notearray = new Array(notedata, msg);
                worker.port.emit("CAEJobLog-at-tenneco-dot-com:SetNote", notearray);
            }
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveSizes', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:deleteNotes', function (message) {
            //Get array of EWS #s then loop through deleting them all
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_ws_log = readText(user_path);
            var user_log = "";
            if (user_ws_log !== null) {
                user_log = user_ws_log.split(",");
            }
            for (var h=0; h < user_log.length; h++) {
                var ewsfile = OS.Path.join(UproFile, user_log[h] + ".txt");
                OS.File.remove(ewsfile);
            }
            console.log("Stored EWS notes removed.");
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveNote', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
    }
});

pageMod.PageMod({
    include: "about:" + users[1],
    contentScriptWhen: 'end',
    contentScriptFile: ["./lib/jquery-2.1.4.js",
                      "./lib/jquery-ui.min.js",
                      "./lib/jquery.gridster.js",
                      "./js/joblog_" + users[1] + ".js"],
    onAttach: function(worker) {
        var cae_menuItem = cm.Item({
            label: "Unassign EWS",
            context: [cm.SelectorContext("a"), cm.URLContext("about:" + users[1])],
            image: self.data.url("./uEWS.png"),
            contentScript: 'self.on("click", function (node) {' +
                         '  var owner = "' + users[1] + '",' +
                         '      ews = node.textContent,' +
                         '      upChange = JSON.stringify({' +
                         '  ews: ews,' +
                         '  owner: owner' +
                         '  });' +
                         '  self.postMessage(upChange);' +
                         '  location.reload();' +
                         '});',
            onMessage: function (upChange) {
                unassignUSER(upChange);
            }
        });
        
        worker.port.on('detach', function () {
            cae_menuItem.destroy();
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:rtn_logged', function (message) {
            // Send user log to content script when requested
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_log_str = readText(user_path);
            var user_log = "";
            if (user_log_str !== null) {
                user_log = user_log_str.split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            var u1_path2 = filepath;
            var u1ws_log = readText(u1_path2);
            //Send user ews log & widget arrays
            var array = new Array(u1ws_log, user_log);
            var userIndex = users.indexOf(user);
            worker.port.emit("CAEJobLog-at-tenneco-dot-com:userLog_" + userIndex, array);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:GetNote', function (msg) {
            var myFile = OS.Path.join(UproFile, msg + ".txt");
            if (file.exists(myFile) === true ) {
                var notedata = readText(myFile);
                var notearray = new Array(notedata, msg);
                worker.port.emit("CAEJobLog-at-tenneco-dot-com:SetNote", notearray);
            }
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveSizes', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:deleteNotes', function (message) {
            //Get array of EWS #s then loop through deleting them all
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_ws_log = readText(user_path);
            var user_log = "";
            if (user_ws_log !== null) {
                user_log = user_ws_log.split(",");
            }
            for (var h=0; h < user_log.length; h++) {
                var ewsfile = OS.Path.join(UproFile, user_log[h] + ".txt");
                OS.File.remove(ewsfile);
            }
            console.log("Stored EWS notes removed.");
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveNote', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
    }
});

pageMod.PageMod({
    include: "about:" + users[2],
    contentScriptWhen: 'end',
    contentScriptFile: ["./lib/jquery-2.1.4.js",
                      "./lib/jquery-ui.min.js",
                      "./lib/jquery.gridster.js",
                      "./js/joblog_" + users[2] + ".js"],
    onAttach: function(worker) {
        var cae_menuItem = cm.Item({
            label: "Unassign EWS",
            context: [cm.SelectorContext("a"), cm.URLContext("about:" + users[2])],
            image: self.data.url("./uEWS.png"),
            contentScript: 'self.on("click", function (node) {' +
                         '  var owner = "' + users[2] + '",' +
                         '      ews = node.textContent,' +
                         '      upChange = JSON.stringify({' +
                         '  ews: ews,' +
                         '  owner: owner' +
                         '  });' +
                         '  self.postMessage(upChange);' +
                         '  location.reload();' +
                         '});',
            onMessage: function (upChange) {
                unassignUSER(upChange);
            }
        });
        
        worker.port.on('detach', function () {
            cae_menuItem.destroy();
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:rtn_logged', function (message) {
            // Send user log to content script when requested
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_log_str = readText(user_path);
            var user_log = "";
            if (user_log_str !== null) {
                user_log = user_log_str.split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            var u2_path2 = filepath;
            var u2ws_log = readText(u2_path2);
            //Send user ews log & widget arrays
            var array = new Array(u2ws_log, user_log);
            var userIndex = users.indexOf(user);
            worker.port.emit("CAEJobLog-at-tenneco-dot-com:userLog_" + userIndex, array);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:GetNote', function (msg) {
            var myFile = OS.Path.join(UproFile, msg + ".txt");
            if (file.exists(myFile) === true ) {
                var notedata = readText(myFile);
                var notearray = new Array(notedata, msg);
                worker.port.emit("CAEJobLog-at-tenneco-dot-com:SetNote", notearray);
            }
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveSizes', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:deleteNotes', function (message) {
            //Get array of EWS #s then loop through deleting them all
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_ws_log = readText(user_path);
            var user_log = "";
            if (user_ws_log !== null) {
                user_log = user_ws_log.split(",");
            }
            for (var h=0; h < user_log.length; h++) {
                var ewsfile = OS.Path.join(UproFile, user_log[h] + ".txt");
                OS.File.remove(ewsfile);
            }
            console.log("Stored EWS notes removed.");
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveNote', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
    }
});

pageMod.PageMod({
    include: "about:" + users[3],
    contentScriptWhen: 'end',
    contentScriptFile: ["./lib/jquery-2.1.4.js",
                      "./lib/jquery-ui.min.js",
                      "./lib/jquery.gridster.js",
                      "./js/joblog_" + users[3] + ".js"],
    onAttach: function(worker) {
        var cae_menuItem = cm.Item({
            label: "Unassign EWS",
            context: [cm.SelectorContext("a"), cm.URLContext("about:" + users[3])],
            image: self.data.url("./uEWS.png"),
            contentScript: 'self.on("click", function (node) {' +
                         '  var owner = "' + users[3] + '",' +
                         '      ews = node.textContent,' +
                         '      upChange = JSON.stringify({' +
                         '  ews: ews,' +
                         '  owner: owner' +
                         '  });' +
                         '  self.postMessage(upChange);' +
                         '  location.reload();' +
                         '});',
            onMessage: function (upChange) {
                unassignUSER(upChange);
            }
        });
        
        worker.port.on('detach', function () {
            cae_menuItem.destroy();
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:rtn_logged', function (message) {
            // Send user log to content script when requested
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_log_str = readText(user_path);
            var user_log = "";
            if (user_log_str !== null) {
                user_log = user_log_str.split(",");
            }
            // For widgets
            var filepath = OS.Path.join(UproFile, user + ".txt");
            var u3_path2 = filepath;
            var u3ws_log = readText(u3_path2);
            //Send user ews log & widget arrays
            var array = new Array(u3ws_log, user_log);
            var userIndex = users.indexOf(user);
            worker.port.emit("CAEJobLog-at-tenneco-dot-com:userLog_" + userIndex, array);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:GetNote', function (msg) {
            var myFile = OS.Path.join(UproFile, msg + ".txt");
            if (file.exists(myFile) === true ) {
                var notedata = readText(myFile);
                var notearray = new Array(notedata, msg);
                worker.port.emit("CAEJobLog-at-tenneco-dot-com:SetNote", notearray);
            }
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveSizes', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:deleteNotes', function (message) {
            //Get array of EWS #s then loop through deleting them all
            var user = message;
            var user_path = pathBase + user + "_log.txt";
            var user_ws_log = readText(user_path);
            var user_log = "";
            if (user_ws_log !== null) {
                user_log = user_ws_log.split(",");
            }
            for (var h=0; h < user_log.length; h++) {
                var ewsfile = OS.Path.join(UproFile, user_log[h] + ".txt");
                OS.File.remove(ewsfile);
            }
            console.log("Stored EWS notes removed.");
        });
        worker.port.on('CAEJobLog-at-tenneco-dot-com:SaveNote', function (message) {
            var myFile = OS.Path.join(UproFile, message[0] + ".txt");
            Write_data(myFile, message[1]);
        });
    }
});

function dfCHK(thename){
    //Create CAE directory and empty files if they don't exist
    OS.File.makeDir(UproFile);
    var promiseA = OS.File.writeAtomic(thename, "", { tmpPath: thename + '.tmp', noOverwrite: true });
    promiseA.then(
        function(aVal) {
            //console.log('Write Sucessful');
        },
        function(aReason) {
            console.log('WriteAtomic failed for reason: ', aReason);
        }
    );
}

function readText(thename){
    if(!file.exists(thename)){
        console.error("Log missing! (" + thename + ")");
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
            console.error("Log missing");
        } else {
            // some other error
            console.error("Error opening log");
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
    var deferred = defer();
    let encoder = new TextEncoder();                                // This encoder can be reused for several writes
    if (data.length !== 0) {
        let array = encoder.encode(data);
        OS.File.writeAtomic(name, array, {tmpPath: name + ".tmp"});      // Write the array atomically to "file.txt", using as temporary buffer "file.txt.tmp".
    } else {
        OS.File.writeAtomic(name, "", {tmpPath: name + ".tmp"});      // Write the array atomically to "file.txt", using as temporary buffer "file.txt.tmp".
    }
    return deferred.promise;
}

Cm.QueryInterface(Ci.nsIComponentRegistrar);

// globals
var factory;
const aboutCAEJobsDescription = 'About CAE Jobs';
const aboutCAEJobsUUID = 'bf031960-0ac3-11e5-b939-0800200c9a66';
const aboutCAEJobs_word = 'caejobs';
const aboutCAEJobs_page = "resource://CAEJobLog-at-tenneco-dot-com/data/caejobs.html";

const about0Description = "About " + users[0];
const about0UUID = "b4c22650-df83-11e4-8830-0800200c9a66";
const about0_word = users[0];
const about0_page = "resource://CAEJobLog-at-tenneco-dot-com/data/" + users[0] + ".html";

const about1Description = "About " + users[1];
const about1UUID = "b4c22651-df83-11e4-8830-0800200c9a66";
const about1_word = users[1];
const about1_page = "resource://CAEJobLog-at-tenneco-dot-com/data/" + users[1] + ".html";

const about2Description = "About " + users[2];
const about2UUID = "b0b3af10-d3b3-11e4-8830-0800200c9a66";
const about2_word = users[2];
const about2_page = "resource://CAEJobLog-at-tenneco-dot-com/data/" + users[2] + ".html";

const about3Description = "About " + users[3];
const about3UUID = "b4c22652-df83-11e4-8830-0800200c9a66";
const about3_word = users[3];
const about3_page = "resource://CAEJobLog-at-tenneco-dot-com/data/" + users[3] + ".html";

function AboutCAEJobs() {}
AboutCAEJobs.prototype = Object.freeze({
    classDescription: aboutCAEJobsDescription,
    contractID: '@mozilla.org/network/protocol/about;1?what=' + aboutCAEJobs_word,
    classID: components.ID('{' + aboutCAEJobsUUID + '}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:" + aboutCAEJobs_word)
            return;

        let uri = Services.io.newURI(aboutCAEJobs_page, null, null);
        return Services.io.newChannelFromURI(uri);
    }
});

function About0Viewer() {}
About0Viewer.prototype = Object.freeze({
    classDescription: about0Description,
    contractID: '@mozilla.org/network/protocol/about;1?what=' + about0_word,
    classID: components.ID('{' + about0UUID + '}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:" + about0_word)
            return;

        let uri = Services.io.newURI(about0_page, null, null);
        return Services.io.newChannelFromURI(uri);
    }
});

function About1Viewer() {}
About1Viewer.prototype = Object.freeze({
    classDescription: about1Description,
    contractID: '@mozilla.org/network/protocol/about;1?what=' + about1_word,
    classID: components.ID('{' + about1UUID + '}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:" + about1_word)
            return;

        let uri = Services.io.newURI(about1_page, null, null);
        return Services.io.newChannelFromURI(uri);
    }
});

function About2Viewer() {}
About2Viewer.prototype = Object.freeze({
    classDescription: about2Description,
    contractID: '@mozilla.org/network/protocol/about;1?what=' + about2_word,
    classID: components.ID('{' + about2UUID + '}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:" + about2_word)
            return;

        let uri = Services.io.newURI(about2_page, null, null);
        return Services.io.newChannelFromURI(uri);
    }
});

function About3Viewer() {}
About3Viewer.prototype = Object.freeze({
    classDescription: about3Description,
    contractID: '@mozilla.org/network/protocol/about;1?what=' + about3_word,
    classID: components.ID('{' + about3UUID + '}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

    getURIFlags: function(aURI) {
        return Ci.nsIAboutModule.ALLOW_SCRIPT;
    },

    newChannel: function(aURI) {
        if (aURI.spec != "about:" + about3_word)
            return;

        let uri = Services.io.newURI(about3_page, null, null);
        return Services.io.newChannelFromURI(uri);
    }
});

function Factory(component) {
    this.createInstance = function(outer, iid) {
        if (outer) {
            throw Cr.NS_ERROR_NO_AGGREGATION;
        }
        return new component();
    };
    this.register = function() {
        Cm.registerFactory(component.prototype.classID, component.prototype.classDescription, component.prototype.contractID, this);
    };
    this.unregister = function() {
        Cm.unregisterFactory(component.prototype.classID, this);
    };
    Object.freeze(this);
    this.register();
}