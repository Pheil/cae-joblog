var username = "scott";
var userid = "1";

function saveNotetoFile(e) {
    var ewsnum = "EWS" + e.target.id.replace(/\D/g, '');
    var datapackage = new Array(ewsnum, e.target.value);
    self.port.emit("CAEJobLog-at-tenneco-dot-com:SaveNote", datapackage);
}

function clearAll() {
    var sizearray = new Array(username, "");
    self.port.emit("CAEJobLog-at-tenneco-dot-com:SaveSizes", sizearray);
    self.port.emit("CAEJobLog-at-tenneco-dot-com:deleteNotes", username);
    location.reload();
}

function clearSizes() {
    var sizearray = new Array(username, "");    //Sends empty string
    self.port.emit("CAEJobLog-at-tenneco-dot-com:SaveSizes", sizearray);
    location.reload();
}

self.port.on("CAEJobLog-at-tenneco-dot-com:SetNote", function(msg) {
    var notearray = msg;
    var ews = notearray[1];
    var message = notearray[0];
    var note = document.getElementById(ews + '_note');
    note.value = message;
});
self.port.emit("CAEJobLog-at-tenneco-dot-com:rtn_logged", username);
self.port.on("CAEJobLog-at-tenneco-dot-com:userLog_" + userid, function(msg) {
    var theArray = msg;
    var widget_info = theArray[0];
    var all_logged_ews = theArray[1];
    //Widget EWS checking
    var widgets = [];
    if (all_logged_ews.length > 0) {
        widgets = [];
        for (var h = 0; h < all_logged_ews.length; h++) {
            var widget_entry = all_logged_ews[h];
            widgets.push(widget_entry);
        }
    }
    if (all_logged_ews.length === 0 || all_logged_ews[0] === "") {
        // if log is empty add placeholders
        widgets = [None];
    }
    //Widget serial checking
    var serial;
    if (widget_info.length > 0) {
        serial = widget_info;
    }
    if (widget_info.length === 0 || widget_info[0] === "" || widget_info[0] === null) { 
        // if log is empty
        serial = "";
    }

    var thewidgets = widgets;
    var serArray = serial;  

    //Check if assigned job qty has changed 
    //First check if it's ever been set
    if (serArray !== "") {
        serArray = JSON.parse(serArray);
        //Then check if the length has changed
        if (thewidgets.length != serArray.length) {
            //Qty changed so clear widget location data
            clearSizes("_g");
        }
        //Qty not changed
        else {
            for (var h = 0; h < thewidgets.length; h++) {
                var a = document.createElement('a');
                    a.setAttribute('href', 'http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_page?in_ewr_no=' + thewidgets[h]);
                    a.textContent = thewidgets[h];
                var txt = document.createElement('textarea');
                    txt.setAttribute('id', thewidgets[h] + '_note');
                    txt.setAttribute('placeholder', 'Notes:');
                    txt.setAttribute('autocomplete', 'off');
                    txt.setAttribute('spellcheck', 'true');
                    txt.setAttribute('rows', '6');
                    txt.setAttribute('cols', '23');

                if (serArray) {
                    var c = serArray[h].col;
                    var r = serArray[h].row;
                    var x = serArray[h].size_x;
                    var y = serArray[h].size_y;
                    gridster.add_widget('<li></li>', x, y, c, r);
                } else {
                    gridster.add_widget('<li></li>', 2, 2);
                }
                var widget = document.getElementsByTagName('li')[h];
                widget.appendChild(a);
                widget.appendChild(txt);
                self.port.emit("CAEJobLog-at-tenneco-dot-com:GetNote", thewidgets[h]);
            }
        }
    }
    //Not set so just add widgets
    else {
        for (var i = 0; i < thewidgets.length; i++) {
            var a = document.createElement('a');
                a.setAttribute('href', 'http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_page?in_ewr_no=' + thewidgets[i]);
                a.textContent = thewidgets[i];
            var txt = document.createElement('textarea');
                txt.setAttribute('id', thewidgets[i] + '_note');
                txt.setAttribute('placeholder', 'Notes:');
                txt.setAttribute('autocomplete', 'off');
                txt.setAttribute('spellcheck', 'true');
                txt.setAttribute('rows', '6');
                txt.setAttribute('cols', '23');
            gridster.add_widget('<li></li>', 2, 2);
            var widget = document.getElementsByTagName('li')[i];
            widget.appendChild(a);
            widget.appendChild(txt);
            
            //Request note and add
            self.port.emit("CAEJobLog-at-tenneco-dot-com:GetNote", thewidgets[i]);
        }
    }
});

window.addEventListener('input', saveNotetoFile, false);

$(".rel_but").button({
    icons: {
        primary: 'ui-icon-arrowrefresh-1-w'
    }
});
$(".del_but").button({
    icons: {
        primary: 'ui-icon-trash'
    },
    text: false
});
$(".cs_but").button({
    icons: {
        primary: 'ui-icon-transferthick-e-w'
    }
});

$(function() {

    gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [100, 55],
        helper: 'clone',
        resize: {
            enabled: true,
            stop: function(e, ui, $widget) {
                var s = gridster.serialize();
                var s2 = JSON.stringify(s);
                //Save sizes
                var sizearray = new Array(username, s2);
                self.port.emit("CAEJobLog-at-tenneco-dot-com:SaveSizes", sizearray);
            }
        }
    }).data('gridster');

    $('.gridster').on('click', function() {
        var s = gridster.serialize();
        var s2 = JSON.stringify(s);
        try {
            //Save sizes
            var sizearray = new Array(username, s2);
            self.port.emit("CAEJobLog-at-tenneco-dot-com:SaveSizes", sizearray);
        } catch (e) {
            console.error(e + " Error");
        }
    });
});


//Reload when button pressed
var works = document.getElementById("reload");
works.addEventListener("click", function() {
    location.reload();
}, false);

//Delete when button pressed
var clearSS = document.getElementById("delete");
clearSS.addEventListener("click", function() {
    clearAll();
}, false);

//Reset sizes when button pressed
var clearSize = document.getElementById("clearSize");
clearSize.addEventListener("click", function() {
    clearSizes();
}, false);