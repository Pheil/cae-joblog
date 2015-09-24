function saveNotetoFile(theid) {
    var note = document.getElementById(theid).value;
    var ewsnum = "EWS" + theid.replace(/\D/g, '');
    var datapackage = new Array(ewsnum, note);
    sendAsyncMessage("SaveNote", datapackage);
}

function clearAll() {
    var array = new Array("paul", "");
    var sizearray = new Array("paul", "");
    sendAsyncMessage("deleteNotes", array);
    sendAsyncMessage("SaveSizes", sizearray);
}

function clearSizes() {
    //Sends empty string to 'clear' sizes
    var sizearray = new Array("paul", "");
    sendAsyncMessage("SaveSizes", sizearray);
}

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

var gridster;

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
                var sizearray = new Array("paul", s2);
                sendAsyncMessage("SaveSizes", sizearray);
            }
        }
    }).data('gridster');

    $('.gridster').on('click', function() {
        var s = gridster.serialize();
        var s2 = JSON.stringify(s);
        try {
            //Save sizes
            var sizearray = new Array("paul", s2);
            sendAsyncMessage("SaveSizes", sizearray);
        } catch (e) {
            console.error(e + " Error");
        }
    });
});

function init() {
    gridster.remove_all_widgets();
    addMessageListener("SetNote", function(msg) {
        var notearray = msg.data;
        var ews = notearray[1];
        var message = notearray[0];
        var note = document.getElementById(ews + '_note');
        note.value = message;
    });
    sendAsyncMessage("rtn_logged", "paul");
    addMessageListener("userLog", function(msg) {
        var theArray = msg.data;
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
                clearSizes("_p");
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
                        txt.setAttribute('onload', 'getNote(this.id);');
                        txt.setAttribute('oninput', 'saveNotetoFile(this.id);');
                        
                    if (serArray) {
                        var c = serArray[h].col;
                        var r = serArray[h].row;
                        var x = serArray[h].size_x;
                        var y = serArray[h].size_y;
                        gridster.add_widget('<li></li>', x, y, c, r);
                        var widget = document.getElementsByTagName('li')[h];
                        widget.appendChild(a);
                        widget.appendChild(txt);
                        //Request note and add
                        sendAsyncMessage("GetNote", thewidgets[h]);
                    } else {
                        gridster.add_widget('<li></li>', 2, 2);
                        var widget = document.getElementsByTagName('li')[h];
                        widget.appendChild(a);
                        widget.appendChild(txt);
                        //Request note and add
                        sendAsyncMessage("GetNote", thewidgets[h]);
                    }
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
                    txt.setAttribute('onload', 'getNote(this.id);');
                    txt.setAttribute('oninput', 'saveNotetoFile(this.id);');
                gridster.add_widget('<li></li>', 2, 2);
                var widget = document.getElementsByTagName('li')[i];
                widget.appendChild(a);
                widget.appendChild(txt);
                //Request note and add
                sendAsyncMessage("GetNote", thewidgets[i]);
            }
        }
        });
}
//Reload when button pressed
var works = document.getElementById("reload");
works.addEventListener("click", function() {
    location.reload();
}, false);

//Delete when button pressed
var clearSS = document.getElementById("delete");
clearSS.addEventListener("click", function() {
    clearAll();
    location.reload()
}, false);

//Reset sizes when button pressed
var clearSize = document.getElementById("clearSize");
clearSize.addEventListener("click", function() {
    clearSizes();
    location.reload()
}, false);

$(window).load(function() {
    $(init);
});