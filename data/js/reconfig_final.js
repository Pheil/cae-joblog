var paulTotal = 0;
var scottTotal = 0;
var guyTotal = 0;
var suzhouTotal = 0;
var ews_array = [];
var mytable = document.getElementsByTagName('table')[0];

//function modA() {
    //var html = document.createElement('html');
    //var head = document.createElement('head');
    //html.appendChild(head);
    //var body = document.createElement('body');
    //html.appendChild(body);
    
    // Change page title
    document.title = "CAE job manager";
    var link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', 

    // Defines the picture to use for icon
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH3ggGEhYM%2B3dNAAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAOjSURBVHjadVNbTFt1HP6fc3rO6Wkp5%2FSy0pZTesNy6ezsWGSYpcIwhstsXJqpcXswJhr1YbpoNEMS9UUT4ovxxRdfJEBCx3SyoRkgc1sqAx20YCl2VFbaQW%2Bn9%2Fb0epQlS%2BbU7%2BGX%2FJLv%2B%2BVLft8HgUdQLpcx5y%2Brg9Pfb75RqR6A4gxffmOVMwz2CDc%2BGjK9IJcLth%2FmQw8vbvfm8wsLK7bZuUw3KWvmxny4%2FnAzEaOlaEJNwmFDAxKwD6i%2B1KhFi%2F864PFsdQ0NffPV5h9yDS4%2FyOsbbHChFB8y6etXWtT4DVqOLU5cS7%2Fn9jKWd%2B0Hhtseoxb2dbz9EY%2BnZJOTV0%2Fw%2BXK8%2FbA5VlFKqsZDylune%2BqHcBRi9zlMgdNfrknsuJSffv3rkGM3nLMqG4QeOB5P0lNTc8NLS%2F5nr9wkjVNR3FCWkcirIdHZmbvg4wcO77LgyasKoCjTAgKhlYVFT9Z%2B38HIyNiozxdpLBQworNDFY6o%2BIKqRIKABgg5mQUffBdJgyOo%2F9qlYvYUkNSBHwFQ21R1d1zBvMXjSwwg7e09rzFMXup0QvShjpYdVEEW1ymZWqCCIbkYVK5jPEut4G7dwBS0BiGyRyAQFZVBwURwS6trYSuPINAkw7Amra4%2Bp6Fxv5bGAU2BPCYERQgDIIUidQbq6Tl9FcY%2BK4K38BqAyDJg21hO4Q0VW3lKpTis1abCmSwkSCVZqUBcztyqVAwhEuEzOID3%2F%2FQhwTkVGOS%2BWAZnHHlAv1wFoZ0o29zfIfoBtlrNl1i2is5cCajj0aTU5UmbLXDOx0T%2FFicAOF8BSxoMvi5Gsd1hCryDMaBMpEpsKpGhzEZyGm5r07m7uvS%2FWixoGubC3Lwzo2DvRYhTuZwP%2BAHoR8HYenjm%2FPSdzy9T8FplVFYZ2QtEJVSxUGhUCNdhiYTabmqSRzo7VWu1yi5PkPwTTP6UNIoiofybbGIVrt2U%2FRa9%2BMoOQzR%2Buxw%2FlwoFJdXtGPTcU%2BJRkQjL3A%2FS0aOPO1wuv44kieSLolgBICRXCiBonxkf9Xqw1hXP%2B3lXkK%2FjF6vF3G7UeO4l8fgzvY1f%2FCPKW1uB7omJ2bMOx1qXy1VS9PUfvEeJ1elCRYSifLx6YT5jtFu59ZMnZBfOnO745D%2FLVCyWhMvLv9vGx%2BffzmRZ3OvN6HlIHafTkcFjx%2FQ%2F9%2Faax1pampz%2F28YH2NuLaW%2Ff3hjwegMmrzf4xPHj5lmbrftTgYAoPcr9C7rgizYSoXp%2FAAAAAElFTkSuQmCC');

    // Sets dimensions of icon. 16px x 16px is standard
    link.setAttribute('height', '16px');
    link.setAttribute('width', '16px');

    // Retrieves the <head> tag
    var head = document.getElementsByTagName('head')[0];

    // Appends the html from the link variable into the head  
    head.appendChild(link);
    
    for (var i = mytable.rows.length - 1; i >= 0; i--) {
        //Add cell for assigned name
        //if (i !== 0) {
        //    //console.log(i);
        //    tables.rows[i].insertCell(5);
        //    tables.rows[i].cells[5].innerHTML = "None";  
        //}
        var cae = mytable.rows[i].cells[4].innerHTML;
        var ews = mytable.rows[i].cells[0].textContent;
        //Add attributes
            mytable.rows[i].className+='dnd border-fade wobble-horizontal';
            mytable.rows[i].draggable='true';
            mytable.rows[i].id=ews;
        var classname;

        //If there is a date then disable row
        if (/[0-9]+-[A-Z]+-[0-9]+/.test(cae)) {
            mytable.rows[i].setAttribute('draggable', 'false');
            mytable.rows[i].className='disabled';
            //tables.rows[i].cells[5].innerHTML = "N/A"; 
        }
        //If heading disable row
        if (/EWS #/.test(ews)) {
            mytable.rows[i].setAttribute('draggable', 'false');
            mytable.rows[i].className='disabled';
        }
    }

    // Add EWS values from new trimmed table to array
    var owner_array = [];
    for (var n = mytable.rows.length - 1; n >= 0; n--) {
        var ews = mytable.rows[n].cells[0].textContent;
        var ews_entry = ews;
        ews_array.push(ews_entry.toString());
        owner_array.push("NoOne");
    }
    //Remove first entry to delete heading
    ews_array.splice(ews_array.length-1, 1);
    owner_array.splice(owner_array.length-1, 1);
    UpdateMaster(ews_array, owner_array);
//}

function modB(){
//Move table to DIV
    var center = document.createElement('center');
    var div_Table = document.createElement('div');
    div_Table.setAttribute('id', 'otherContent');
    div_Table.appendChild(mytable);
    center.appendChild(div_Table);
    document.body.appendChild(center);
    
    //jQuery(document.getElementsByTagName('center')[0]).remove();

//Add people icons html
// Creates an html element 
    var div = document.createElement('div');    
    div.setAttribute('id', 'container');
    
    var div_gi = document.createElement('div');
        div_gi.setAttribute('class', 'ui-state-highlight ui-corner-all floatinguser_note guy_note bubble-float-right');
        div_gi.setAttribute('id', 'guy_div');
    var div_gib = document.createElement('p');
        div_gib.setAttribute('id', 'guy_note');
        div_gib.setAttribute('style', 'margin-top: auto; height: 0.1em; float: right;');
    var div_gic = document.createElement('span');
        div_gic.setAttribute('class', 'ui-icon ui-icon-info');
        div_gic.setAttribute('style', 'float: left; margin-right: .1em;');
    var div_g = document.createElement('div');
        div_g.setAttribute('class', 'floatinguser_guy floatinguser hover-shadow');
        div_g.setAttribute('id', 'guy');
        div_g.setAttribute('title', 'Guy');
    div_gi.appendChild(div_gic);
    div_gi.appendChild(div_gib);
    div.appendChild(div_g);
    
    var div_si = document.createElement('div');
        div_si.setAttribute('class', 'ui-state-highlight ui-corner-all floatinguser_note scott_note bubble-float-right');
        div_si.setAttribute('id', 'scott_div');
    var div_sib = document.createElement('p');
        div_sib.setAttribute('id', 'scott_note');
        div_sib.setAttribute('style', 'margin-top: auto; height: 0.1em; float: right;');
    var div_sic = document.createElement('span');
        div_sic.setAttribute('class', 'ui-icon ui-icon-info');
        div_sic.setAttribute('style', 'float: left; margin-right: .1em;');
    var div_s = document.createElement('div');
        div_s.setAttribute('class', 'floatinguser_scott floatinguser hover-shadow');
        div_s.setAttribute('id', 'scott');
        div_s.setAttribute('title', 'Scott');
    div_si.appendChild(div_sic);
    div_si.appendChild(div_sib);
    div.appendChild(div_s);
    
    var div_pi = document.createElement('div');
        div_pi.setAttribute('class', 'ui-state-highlight ui-corner-all floatinguser_note paul_note bubble-float-right');
        div_pi.setAttribute('id', 'paul_div');
    var div_pib = document.createElement('p');
        div_pib.setAttribute('id', 'paul_note');
        div_pib.setAttribute('style', 'margin-top: auto; height: 0.1em; float: right;');
    var div_pic = document.createElement('span');
        div_pic.setAttribute('class', 'ui-icon ui-icon-info');
        div_pic.setAttribute('style', 'float: left; margin-right: .1em;');
    var div_p = document.createElement('div');
        div_p.setAttribute('class', 'floatinguser_paul floatinguser hover-shadow');
        div_p.setAttribute('id', 'paul');
        div_p.setAttribute('title', 'Paul');
    div_pi.appendChild(div_pic);
    div_pi.appendChild(div_pib);
    div.appendChild(div_p);
    
    var div_hi = document.createElement('div');
        div_hi.setAttribute('class', 'ui-state-highlight ui-corner-all floatinguser_note suzhou_note bubble-float-right');
        div_hi.setAttribute('id', 'suzhou_div');
    var div_hib = document.createElement('p');
        div_hib.setAttribute('id', 'suzhou_note');
        div_hib.setAttribute('style', 'margin-top: auto; height: 0.1em; float: right;');
    var div_hic = document.createElement('span');
        div_hic.setAttribute('class', 'ui-icon ui-icon-info');
        div_hic.setAttribute('style', 'float: left; margin-right: .1em;');
    var div_h = document.createElement('div');
        div_h.setAttribute('class', 'floatinguser_suzhou floatinguser hover-shadow');
        div_h.setAttribute('id', 'suzhou');
        div_h.setAttribute('title', 'Suzhou');
    div_hi.appendChild(div_hic);
    div_hi.appendChild(div_hib);
    div.appendChild(div_h);
    
    //Create total div
    var div_sum = document.createElement('div');
        div_sum.setAttribute('class', 'ui-state-highlight ui-corner-all total_note grow');
        div_sum.setAttribute('id', 'ews_totala');
        div_sum.innerHTML = "0";
    
    //Create reload button div
    var div_reload = document.createElement('div');
        div_reload.setAttribute('class', 'container2');
        var siteurl = "about:caejobs";
        div_reload.innerHTML = "<a href='javascript:history.go(0)' class='rel_but ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' id='button' target='_top'><span class='ui-button-icon-primary ui-icon ui-icon-arrowrefresh-1-w relo'></span><span class='ui-button-text'>Update</span></a>"; 

// Appends all of the divs into the body  
    div.appendChild(div_gi);
    div.appendChild(div_si);
    div.appendChild(div_pi);
    div.appendChild(div_hi);
    div.appendChild(div_sum);
    div.appendChild(div_reload);
    document.body.appendChild(div);

//Assignment scripts
    // Get the draggable elements.
    var dragElements = document.querySelectorAll('#thetable .dnd');

    var elementDragged = null;
    var draggable;
    for (var i = 0; i < dragElements.length; i++) {
        draggable = this;
    }

    draggable.addEventListener('dragstart', dragStart, false);
    draggable.addEventListener('dragend'  , dragEnd  , false);

    var guy = document.getElementById("guy");
        guy.addEventListener('dragenter', dragEnter  , false);
        guy.addEventListener('dragover' , dragOver   , false);
        guy.addEventListener('dragleave', dragLeave  , false);
        guy.addEventListener('drop'     , drop       , false);
    
    var scott = document.getElementById("scott");    
        scott.addEventListener('dragenter', dragEnter  , false);
        scott.addEventListener('dragover' , dragOver   , false);
        scott.addEventListener('dragleave', dragLeave  , false);
        scott.addEventListener('drop'     , drop       , false);
    
    var paul = document.getElementById("paul");    
        paul.addEventListener('dragenter', dragEnter  , false);
        paul.addEventListener('dragover' , dragOver   , false);
        paul.addEventListener('dragleave', dragLeave  , false);
        paul.addEventListener('drop'     , drop       , false);
    
    var suzhou = document.getElementById("suzhou");    
        suzhou.addEventListener('dragenter', dragEnter  , false);
        suzhou.addEventListener('dragover' , dragOver   , false);
        suzhou.addEventListener('dragleave', dragLeave  , false);
        suzhou.addEventListener('drop'     , drop       , false);

    /* Draggable event handlers */
    function dragStart(event) {
        event.dataTransfer.setData('xcd', event.target.id);
        event.dataTransfer.setData('text/html', "You dragged the EWS!");
        event.target.style.color = "#0000FF";
    }

    function dragEnd(event) {
        event.target.style.opacity = 0.4;
    }

    /* Drop target event handlers */
    function dragEnter(event) {
        event.target.style.width = "60px";
        event.target.style.height = "60px";
        event.target.style.border = "2px solid #ff0000";
    }

    function dragOver(event) {
        event.preventDefault();
        return false;
    }

    function dragLeave(event) {
        event.target.style.width = "50px";
        event.target.style.height = "50px";
        event.target.style.border = "solid 1px black";
    }

    function drop(event) {
        var data = event.dataTransfer.getData('text/html');
        var owner = event.target.id.toLowerCase();
        event.target.style.width = "50px";
        event.target.style.height = "50px";
        event.target.style.border = "solid 1px black";
        var ews_value = event.dataTransfer.getData('xcd');
        var row = document.getElementById(ews_value);
        var count;
        var count2;
        var count_value;
        var count2_value;
        //If currently assigned to someone but not owner drop target
        var old_owner = row.cells[5].innerHTML.toLowerCase();
        if (old_owner != "none" && old_owner != owner) {
            //var upChange = JSON.stringify({
            //    ews: ews_value,
            //    owner: old_owner
            //});
            ews = new Array(ews);
            old_owner = new Array(old_owner);
            var upChange = new Array(ews, old_owner);
            unassign(upChange);
            count2 = document.getElementById(old_owner + '_note');
            count2_value =  parseInt(count2.innerHTML) - 1;
            count2.innerHTML = count2_value;
            if (owner == "guy") {
                row.setAttribute('style', 'background:#0000FF;color:#008000;');
                row.cells[5].innerHTML = "Guy";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            if (owner == "suzhou") {
                row.setAttribute('style', 'background:yellow;color:#008000;');
                row.cells[5].innerHTML = "Suzhou";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            if (owner == "paul") {
                row.setAttribute('style', 'background:#FF9900;color:#008000;');
                row.cells[5].innerHTML = "Paul";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            if (owner == "scott") {
                row.setAttribute('style', 'background:#33CC99;color:#008000;');
                row.cells[5].innerHTML = "Scott";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            //Fix total box value
            count = document.getElementById(owner + '_note');
            count_value =  parseInt(count.innerHTML) + 1;
            count.innerHTML = count_value;
            //Fix title for user box
            var newTitle = document.getElementById(owner + '_div');
            newTitle.setAttribute('title', count_value + ' Jobs Assigned');
            saveData(ews_value,owner);
            console.log("Job reassignment complete");
        }
        //If not yet assigned
        if (old_owner == "none") {
            if (owner == "guy") {
                row.setAttribute('style', 'background:#0000FF;color:#008000;');
                row.cells[5].innerHTML = "Guy";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            if (owner == "suzhou") {
                row.setAttribute('style', 'background:yellow;color:#008000;');
                row.cells[5].innerHTML = "Suzhou";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            if (owner == "paul") {
                row.setAttribute('style', 'background:#FF9900;color:#008000;');
                row.cells[5].innerHTML = "Paul";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            if (owner == "scott") {
                row.setAttribute('style', 'background:#33CC99;color:#008000;');
                row.cells[5].innerHTML = "Scott";
                //count = document.getElementById(owner + '_note');
                //count_value =  parseInt(count.innerHTML) + 1;
                //count.innerHTML = count_value;
            }
            //Fix total box value
            count = document.getElementById(owner + '_note');
            count_value =  parseInt(count.innerHTML) + 1;
            count.innerHTML = count_value;
            //Fix title for user box
            var newTitle = document.getElementById(owner + '_div');
            newTitle.setAttribute('title', count_value + ' Jobs Assigned');
            //Fix sum values - BROKEN
            //var theSum = document.getElementById("ews_totala");
            //theSum.innerHTML = theSum.innerHTML+1;
            saveData(ews_value,owner);  
        }
        //If already assigned to same owner as drop target
        if (old_owner == owner) {
            console.log("Error, job already assigned to " + owner);
        }
        event.preventDefault(); // don't forget this!
        return false;
    }
    
    var tables = document.getElementById('thetable');
// Compare current EWS list to user logged list and highlight if already assigned
// Unassigns if dCHK is equal to non-breaking space (IE the job is marked as complete)
    sendAsyncMessage("rtn_logged_g", "guy");
    addMessageListener("userLog_g", function(msg) {
        var all_logged_ews = msg.data;
        if (all_logged_ews[0] !== "") {
            guyTotal = all_logged_ews.length;
        }
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent;
            var dCHK = tables.rows[g].cells[4].textContent;
            for (var h=0; h < all_logged_ews.length; h++) {
                if (all_logged_ews[h] == ews) {
                    if (dCHK == String.fromCharCode(160)) {
                        tables.rows[g].className+= " guy";
                        tables.rows[g].cells[5].innerHTML = "Guy";
                    }
                    else { //Job has completed date so unassign
                        //var upChange = JSON.stringify({
                        //    ews: ews,
                        //    owner: 'guy'
                        //});
                        ews = new Array(ews);
                        var upChange = new Array(ews, 'guy');
                        unassign(upChange);
                    } 
                }
            }
        }
        div_g = document.getElementById('guy_note');
        div_g.innerHTML = guyTotal;
        var div_gx = document.getElementById('guy_div');
        div_gx.setAttribute('title', guyTotal + ' Jobs Assigned');
        
    });
    sendAsyncMessage("rtn_logged_s", "scott");
    addMessageListener("userLog_s", function(msg) {
        var all_logged_ews = msg.data;
        if (all_logged_ews[0] !== "") {
            scottTotal = all_logged_ews.length;
        }
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent; 
            var dCHK = tables.rows[g].cells[4].textContent;
            for (var h=0; h < all_logged_ews.length; h++) {
                if (all_logged_ews[h] == ews) {
                    if (dCHK == String.fromCharCode(160)) {
                        tables.rows[g].className+= " scott";
                        tables.rows[g].cells[5].innerHTML = "Scott";
                    }
                    else { //Job has completed date so unassign
                        //var upChange = JSON.stringify({
                        //    ews: ews,
                        //    owner: 'scott'
                        //});
                        ews = new Array(ews);
                        var upChange = new Array(ews, 'scott');
                        unassign(upChange);
                    } 
                }
            }
        }
        div_s = document.getElementById('scott_note'); 
        div_s.innerHTML = scottTotal;
        var div_sx = document.getElementById('scott_div');
        div_sx.setAttribute('title', scottTotal + ' Jobs Assigned');
    });
    sendAsyncMessage("rtn_logged_p", "paul");
    addMessageListener("userLog_p", function(msg) {
        var all_logged_ews = msg.data;
        if (all_logged_ews[0] !== "") {
            paulTotal = all_logged_ews.length;
        }
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent; 
            var dCHK = tables.rows[g].cells[4].textContent;
            for (var h=0; h < all_logged_ews.length; h++) {
                if (all_logged_ews[h] == ews) {
                    if (dCHK == String.fromCharCode(160)) {
                        tables.rows[g].className+= " paul";
                        tables.rows[g].cells[5].innerHTML = "Paul";
                    }
                    else { //Job has completed date so unassign
                        //var upChange = JSON.stringify({
                        //    ews: ews,
                        //    owner: 'paul'
                        //});
                        ews = new Array(ews);
                        var upChange = new Array(ews, 'paul');
                        unassign(upChange);
                    } 
                }
            }
        }
        div_p = document.getElementById('paul_note');  
        div_p.innerHTML = paulTotal;
        var div_px = document.getElementById('paul_div');
        div_px.setAttribute('title', paulTotal + ' Jobs Assigned');
    });
    sendAsyncMessage("rtn_logged_h", "suzhou");
    addMessageListener("userLog_h", function(msg) {
        var all_logged_ews = msg.data;
        if (all_logged_ews[0] !== "") {
            suzhouTotal = all_logged_ews.length;
        }
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent;
            var dCHK = tables.rows[g].cells[4].textContent;
            for (var h=0; h < all_logged_ews.length; h++) { //Loop through and compare to logged values
                if (all_logged_ews[h] == ews) {
                    if (dCHK == String.fromCharCode(160)) {
                        tables.rows[g].className+= " suzhou";
                        tables.rows[g].cells[5].innerHTML = "Suzhou";
                    }
                    else { //Job has completed date so unassign
                        //var upChange = JSON.stringify({
                        //    ews: ews,
                        //    owner: 'suzhou'
                        //});
                        ews = new Array(ews);
                        var upChange = new Array(ews, 'suzhou');
                        unassign(upChange);
                    } 
                }
            } 
        }
        div_h = document.getElementById('suzhou_note');  
        div_h.innerHTML = suzhouTotal;
        var div_sum = document.getElementById('ews_totala');
        var div_sum2 = document.createElement('span');
        div_sum2.setAttribute('id', 'ews_totalb');
        var div_suma = parseInt(document.getElementById('guy_note').innerHTML);
        var div_sumb = parseInt(document.getElementById('scott_note').innerHTML);
        var div_sumc = parseInt(document.getElementById('paul_note').innerHTML);
        var div_sumd = parseInt(document.getElementById('suzhou_note').innerHTML);
        div_sum.innerHTML = div_suma + div_sumb + div_sumc + div_sumd + " / ";
        div_sum2.innerHTML = tables.rows.length-1;
        
        //Send values to update button
            var assignTotal = div_suma + div_sumb + div_sumc + div_sumd;
            var allTotal = tables.rows.length-1;
            var unassignTotal = allTotal - assignTotal;
            sendAsyncMessage("badge", unassignTotal);
        
        div_sum.appendChild(div_sum2);
        var div_hx = document.getElementById('suzhou_div');
        div_hx.setAttribute('title', suzhouTotal + ' Jobs Assigned');
    });
    
}    
function saveData(ews_value, owner) {
    //var upChange = JSON.stringify({
    //    ews: ews_value,
    //    owner: owner
    //});
    var upChange = new Array(ews_value, owner);
    sendAsyncMessage("update", upChange);
}
function unassign(upChange) {
    sendAsyncMessage("unassign", upChange);
}
function UpdateMaster(ews_array, owner_array) {
    //var all_array = JSON.stringify({
    //    ews: ews_array,
    //    owner: owner_array
    //});
    var upChange = new Array(ews_array, owner_array);
    sendAsyncMessage("save", upChange);
}
    
//modA();
modB();
 

// add parser through the tablesorter addParser method 
    $.tablesorter.addParser({ 
        // set a unique id 
        id: 'ten_date', 
        is: function(s) { 
            // return false so this parser is not auto detected 
            return false; 
        }, 
        format: function(s) { 
            // format your data for normalization 
            var Months = {JAN: 10, FEB: 20, MAR: 30, APR: 40, MAY: 50, JUN: 60, JUL: 70, AUG: 80, SEP: 90, OCT: 91, NOV: 92, DEC: 93};
            var yr = s.substr(7,2);
            var mt = s.substr(3,3);
            var mt2 = Months[mt];
            var dt1 = yr+mt2+s.substr(0,2);

            return dt1; 
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    }); 
    
    $.tablesorter.addParser({ 
        // set a unique id 
        id: 'eng', 
        is: function(s) { 
            // return false so this parser is not auto detected 
            return false; 
        }, 
        format: function(s) { 
            // format your data for normalization 
            return s.toLowerCase().replace(/guy/,6).replace(/scott/,5).replace(/paul/,4).replace(/suzhou/,3).replace(/none/,2).replace(/n\/a/,1);  
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    }); 
    
    $(function() { 
        $("#thetable").tablesorter({ 
            headers: { 
                3: { 
                    sorter:'ten_date' 
                },
                5: { 
                    sorter:'eng' 
                }
            },
            sortList: [[3,1]],
            debug: false
        }); 
    });
    

    addMessageListener("unassignNum", function(owner) {
        var username = owner.data;
    //self.port.on("unassignNum", function (owner) {
        console.log(username + " (-1)");
        var count = document.getElementById(username.toLowerCase() + '_note');
        count_value =  parseInt(count.innerHTML) - 1;
        count.innerHTML = count_value;
        var newTitle = document.getElementById(username.toLowerCase() + '_div');
        newTitle.setAttribute('title', count_value + ' Jobs Assigned');
    });