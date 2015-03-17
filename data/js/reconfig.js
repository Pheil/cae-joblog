var paulTotal = 0;
var scottTotal = 0;
var guyTotal = 0;
var suzhouTotal = 0;
var ews_array = [];

function modA() {
    // Remove date picker script
    var script = document.getElementsByTagName('script')[0];
    if (script) {
    script.parentNode.removeChild(script);
    }
    
    // Remove top table
    var table = document.getElementsByTagName('table')[0];
    if (table) {
    table.parentNode.removeChild(table);
    }

	// Remove HR Line (Bottom & Top)
	var hr = document.getElementsByTagName('HR')[1];
	if (hr) {
	hr.parentNode.removeChild(hr);
	}
	hr = document.getElementsByTagName('HR')[0];
	if (hr) {
	hr.parentNode.removeChild(hr);
	}
    
    //Remove close and previous buttons
	var input = document.getElementsByTagName('input')[1];
	if (input) {
	input.parentNode.removeChild(input);
	}
	input = document.getElementsByTagName('input')[0];
	if (input) {
	input.parentNode.removeChild(input);
	}
    
    //Remove all BR (Bottom & Top)
    var br = document.body.getElementsByTagName('BR');
    while(br.length > 0) {
        br[0].parentNode.removeChild(br[0]);
    }
    
    //Remove total found
	document.body.innerHTML = document.body.innerHTML.replace(/Total Metric Records Found: [0-9]+/ig,"");

    // Remove "EWS Metric Results" text
    var h1 = document.getElementsByTagName('H1')[0];
    if (h1) {
    h1.parentNode.removeChild(h1);
    }    
    
    // Remove Projects row
    $('table td:first-child').each(function(index,Element){
        var tdValue=$(Element).text();
        if(tdValue == "Projects:"){
            $(Element).closest('tr').remove();
        }
    });

	// Remove print and rev dates
    var b = document.body.getElementsByTagName('b');
    while(b.length > 0) {
        b[0].parentNode.removeChild(b[0]);
    }
    
// Changes page title
    document.title = "CAE job manager";
    
// Creates an html element 
    var link = document.createElement('link');
    
// Sets attributes of element
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', 

// Defines the picture to use the icon
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH3ggGEhYM%2B3dNAAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAOjSURBVHjadVNbTFt1HP6fc3rO6Wkp5%2FSy0pZTesNy6ezsWGSYpcIwhstsXJqpcXswJhr1YbpoNEMS9UUT4ovxxRdfJEBCx3SyoRkgc1sqAx20YCl2VFbaQW%2Bn9%2Fb0epQlS%2BbU7%2BGX%2FJLv%2B%2BVLft8HgUdQLpcx5y%2Brg9Pfb75RqR6A4gxffmOVMwz2CDc%2BGjK9IJcLth%2FmQw8vbvfm8wsLK7bZuUw3KWvmxny4%2FnAzEaOlaEJNwmFDAxKwD6i%2B1KhFi%2F864PFsdQ0NffPV5h9yDS4%2FyOsbbHChFB8y6etXWtT4DVqOLU5cS7%2Fn9jKWd%2B0Hhtseoxb2dbz9EY%2BnZJOTV0%2Fw%2BXK8%2FbA5VlFKqsZDylune%2BqHcBRi9zlMgdNfrknsuJSffv3rkGM3nLMqG4QeOB5P0lNTc8NLS%2F5nr9wkjVNR3FCWkcirIdHZmbvg4wcO77LgyasKoCjTAgKhlYVFT9Z%2B38HIyNiozxdpLBQworNDFY6o%2BIKqRIKABgg5mQUffBdJgyOo%2F9qlYvYUkNSBHwFQ21R1d1zBvMXjSwwg7e09rzFMXup0QvShjpYdVEEW1ymZWqCCIbkYVK5jPEut4G7dwBS0BiGyRyAQFZVBwURwS6trYSuPINAkw7Amra4%2Bp6Fxv5bGAU2BPCYERQgDIIUidQbq6Tl9FcY%2BK4K38BqAyDJg21hO4Q0VW3lKpTis1abCmSwkSCVZqUBcztyqVAwhEuEzOID3%2F%2FQhwTkVGOS%2BWAZnHHlAv1wFoZ0o29zfIfoBtlrNl1i2is5cCajj0aTU5UmbLXDOx0T%2FFicAOF8BSxoMvi5Gsd1hCryDMaBMpEpsKpGhzEZyGm5r07m7uvS%2FWixoGubC3Lwzo2DvRYhTuZwP%2BAHoR8HYenjm%2FPSdzy9T8FplVFYZ2QtEJVSxUGhUCNdhiYTabmqSRzo7VWu1yi5PkPwTTP6UNIoiofybbGIVrt2U%2FRa9%2BMoOQzR%2Buxw%2FlwoFJdXtGPTcU%2BJRkQjL3A%2FS0aOPO1wuv44kieSLolgBICRXCiBonxkf9Xqw1hXP%2B3lXkK%2FjF6vF3G7UeO4l8fgzvY1f%2FCPKW1uB7omJ2bMOx1qXy1VS9PUfvEeJ1elCRYSifLx6YT5jtFu59ZMnZBfOnO745D%2FLVCyWhMvLv9vGx%2BffzmRZ3OvN6HlIHafTkcFjx%2FQ%2F9%2Faax1pampz%2F28YH2NuLaW%2Ff3hjwegMmrzf4xPHj5lmbrftTgYAoPcr9C7rgizYSoXp%2FAAAAAElFTkSuQmCC');

// Sets dimensions of icon. 16px x 16px is the standard size
    link.setAttribute('height', '16px');
    link.setAttribute('width', '16px');

// Retrieves the <head> tag
    var head = document.getElementsByTagName('head')[0];

// Appends the html from the link variable into the head  
    head.appendChild(link);
    
// Removes empty links
var links = document.getElementsByTagName("a");
  for (var ti=0;ti<links.length;ti++) {
       var thislinks = links[ti];
       var test = thislinks.getAttribute("href");
       if (test == "ece_webquery.part_no_drawings?p_part_id=") {
       thislinks.removeAttribute("href");
       }
   }
   
    // Sets tag info so that columns can be sorted
    var table_b = document.getElementsByTagName('table')[0];
    table_b.setAttribute('class', 'sortable');
    table_b.setAttribute('id', 'thetable');
    
    // Remove column 8-20
    var tables = document.getElementById('thetable');
    for (var j = 20; j >= 8; j--) {
        $("th").remove(":nth-child(" + j + ")");
        $("td").remove(":nth-child(" + j + ")");
    }
    
    // Remove column 6 (PDD)
    $('table tr td:nth-child(6)').remove();
    $('table tr th:nth-child(6)').remove();

    // Remove column 2 (PSO)
    $('table tr td:nth-child(2)').remove();
    $('table tr th:nth-child(2)').remove();
    
    // Add header cell for column 6
    var th = document.createElement('th');
    th.innerHTML = "ENG";
    tables.rows[0].appendChild(th);
    
    for (var i = tables.rows.length - 1; i >= 0; i--) {
        //If CAE Cell = "NA" delete whole row
        $('table td:nth-child(5)').each(function(index,Element){
            var tdValue=$(Element).text();
            if(tdValue == "NA"){
                $(Element).closest('tr').remove();
            }
        });
    }

    for (var i = tables.rows.length - 1; i >= 0; i--) {
        //Add cell for assigned name
        if (i !== 0) {
            //console.log(i);
            tables.rows[i].insertCell(5);
            tables.rows[i].cells[5].innerHTML = "None";  
        }
        var cae = tables.rows[i].cells[4].innerHTML;
        var ews = tables.rows[i].cells[0].textContent;
        //Add attributes
            tables.rows[i].className+='dnd border-fade wobble-horizontal';
            tables.rows[i].draggable='true';
            tables.rows[i].id=ews;
        var classname;

        //If there is a date then disable row
        if (/[0-9]+-[A-Z]+-[0-9]+/.test(cae)) {
            tables.rows[i].setAttribute('draggable', 'false');
            tables.rows[i].className='disabled';
            tables.rows[i].cells[5].innerHTML = "N/A"; 
        }
        //If heading disable row
        if (/EWS #/.test(ews)) {
            tables.rows[i].setAttribute('draggable', 'false');
            tables.rows[i].className='disabled';
        }
    }

    // Add EWS values from new trimmed table to array
    var owner_array = [];
    for (var n = tables.rows.length - 1; n >= 0; n--) {
        var ews = tables.rows[n].cells[0].textContent;
        var ews_entry = ews;
        ews_array.push(ews_entry.toString());
        owner_array.push("NoOne");
    }
    //Remove first entry to delete heading
    ews_array.splice(ews_array.length-1, 1);
    owner_array.splice(owner_array.length-1, 1);
    //console.log(ews_array);
    //console.table(ews_array);             //ACTIVE IN FF 34.0?
    UpdateMaster(ews_array, owner_array);

}

function sortTables() {
//Start of sort table code
//The first part is the easily-hackable bit.  Basically, for any table you'd like to be sortable, just call ts_makeSortable.
    if (!document.getElementsByTagName) return;
   var tbls = document.getElementsByTagName("table");
   
   for (var ti=0;ti<tbls.length;ti++) {
       var thisTbl = tbls[ti];
       // The following line is from the original sorttable.js
       // Any table to sort must have a class="sortable" and an unique ID - Frank Ralf
       if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
       ts_makeSortable(thisTbl);
       }
   }
}

function ts_makeSortable (table) {
//begin (c) Stuart Langridge:
//Code downloaded from the Browser Experiments section of kryogenix.org is licenced under the so-called MIT licence. The licence is below.
//Copyright (c) 1997-date Stuart Langridge
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    if (table.rows && table.rows.length > 0) {
        var firstRow = table.rows[0];
    }
    if (!firstRow) return;
    
    // We have a first row: assume it's the header, and make its contents clickable links
    for (var i=0;i<firstRow.cells.length;i++) {
        var cell = firstRow.cells[i];
        var txt = ts_getInnerText(cell);
        
        // From here on slight modifications to the original - Frank Ralf
        // "onclick" won't work with Greasemonkey.
        // The number of the column is safed as a custom attribute for later reference when calling the ts_resortTabel function.
        cell.innerHTML = '<a href="#" class="sortheader" column="'+i+'">'+txt+'<span class="sortarrow">&nbsp;&nbsp;&nbsp;</span></a>';
        // Get link as object and addEventListener
        var elmLinks = cell.getElementsByTagName("a");
        elmLinks[0].addEventListener(
        'click', 
        function(event){
            var lnk = event.target;
            var  col = lnk.getAttribute('column');
            ts_resortTable(lnk, col);        // the call to the original function
            }, 
        false);
    }
}

function ts_getInnerText(el) {
// The rest has been left unchanged - Frank Ralf
    if (typeof el == "string") return el;
    if (typeof el == "undefined") { return el; }
    if (el.innerText) return el.innerText;    //Not needed but it is faster
    var str = "";
    
    var cs = el.childNodes;
    var l = cs.length;
    for (var i = 0; i < l; i++) {
        switch (cs[i].nodeType) {
            case 1: //ELEMENT_NODE
                str += ts_getInnerText(cs[i]);
                break;
            case 3:    //TEXT_NODE
                str += cs[i].nodeValue;
                break;
        }
    }
    return str;
}
    var SORT_COLUMN_INDEX;
    var aa;
    var bb;
function ts_resortTable(lnk) {
    // get the span
    var span;

    for (var ci=0;ci<lnk.childNodes.length;ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
    }
    var spantext =  ts_getInnerText(span);
    var td = lnk.parentNode;
    var column = td.cellIndex;
    var table =  getParent(td,'TABLE');
    
    // Work out a type for the column
    if (table.rows.length <= 1) return;
    var itm = ts_getInnerText(table.rows[1].cells[column]);
    var sortfn = ts_sort_caseinsensitive;
    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)) sortfn = ts_sort_date;
    if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)) sortfn = ts_sort_date;
    if (itm.match(/^\d\d[\/-](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[\/-]\d\d$/i)) sortfn = ts_sort_date2;
    if (itm.match(/^[$]/)) sortfn = ts_sort_currency;
    if (itm.match(/^[\d\.]+$/)) sortfn = ts_sort_numeric;
    SORT_COLUMN_INDEX = column;
    var firstRow = [];
    var newRows = [];
    var i;
    var j;
    for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
    for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }

    newRows.sort(sortfn);

    if (span.getAttribute("sortdir") == 'down') {
        var ARROW = '&nbsp;&nbsp;&uarr;';
        newRows.reverse();
        span.setAttribute('sortdir','up');
    } else {
        var ARROW = '&nbsp;&nbsp;&darr;';
        span.setAttribute('sortdir','down');
    }
    
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (i=0;i<newRows.length;i++) { if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) table.tBodies[0].appendChild(newRows[i]);}
    // do sortbottom rows only
    for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) table.tBodies[0].appendChild(newRows[i]);}
    
    // Delete any other arrows there may be showing
    var allspans = document.getElementsByTagName("span");
    for (var ci=0;ci<allspans.length;ci++) {
        if (allspans[ci].className == 'sortarrow') {
            if ( getParent(allspans[ci],"table") ==  getParent(lnk,"table")) { // in the same table as us?
                allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
            }
        }
    }
        
    span.innerHTML = ARROW;
}

function getParent (el, pTagName) {
    if (el === null) return null;
    else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())    // Gecko bug, supposed to be uppercase
        return el;
    else
        return  getParent(el.parentNode, pTagName);
}
function ts_sort_date(a,b) {
    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa.length == 10) {
        dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
    } else {
        yr = aa.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
    }
    if (bb.length == 10) {
        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
    } else {
        yr = bb.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
    }
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
}
function ts_sort_date2(a,b) {
    //var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var Months = {JAN: 10, FEB: 20, MAR: 30, APR: 40, MAY: 50, JUN: 60, JUL: 70, AUG: 80, SEP: 90, OCT: 91, NOV: 92, DEC: 93};
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    var yr = aa.substr(7,2);
    var mt = aa.substr(3,3);
    var mt2 = Months[mt];
    var dt1 = yr+mt2+aa.substr(0,2);

    yr = bb.substr(7,2);
    mt = bb.substr(3,3);
    mt2 = Months[mt];
    var dt2 = yr+mt2+bb.substr(0,2);
//alert(dt2);
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
}
function ts_sort_currency(a,b) { 
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    return parseFloat(aa) - parseFloat(bb);
}

function ts_sort_numeric(a,b) { 
    aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX])); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
}

function ts_sort_caseinsensitive(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}

function ts_sort_default(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}


function addEvent(elm, evType, fn, useCapture) {
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
  //end (c) Stuart Langridge
} 

function modB(){
//Move table to DIV
    var center = document.createElement('center');
    var div_Table = document.createElement('div');
    div_Table.setAttribute('id', 'otherContent');
    var theTABLE = document.getElementsByTagName('table')[0];
    div_Table.appendChild(theTABLE);
    center.appendChild(div_Table);
    document.body.appendChild(center);

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
    //var div_sum2 = document.createElement('div');
    //    div_sum2.setAttribute('id', 'ews_totalb');
    //    div_sum2.innerHTML = "0"; 
    //div_sum.appendChild(div_sum2);
    
    //Create reload button div
    var div_reload = document.createElement('div');
        div_reload.setAttribute('class', 'container2');
        var siteurl = "http://pafoap01:8888/pls/prod/ece_ewo_web.ece_ewo_metric_report?p_ewo_no2=&p_pso_no=&p_author_id=All&p_pso_engr_id=All&p_drstart_date=&p_drend_date=&p_part_no=All&p_project_no2=&p_wo_phase=OPEN+ALL&p_phase_flag=No?CAEJL";
        div_reload.innerHTML = "<a href='javascript:history.go(0)' class='rel_but ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' id='button' target='_top'><span class='ui-button-icon-primary ui-icon ui-icon-arrowrefresh-1-w relo'></span><span class='ui-button-text'>Update</span></a>"; 
    //<div class="container"><button id="reload" class="rel_but">Update</button></div>

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

    //var draggable = document.getElementById("draggable1");

    draggable.addEventListener('dragstart', dragStart, false);
    draggable.addEventListener('dragend'  , dragEnd  , false);

    //var droptarget = document.getElementById("droptarget1");
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
        /*event.target.style.color = "#33CC99";
        event.target.style.background = "blue";
        var ews = event.target.id;
        row = document.getElementById(ews);
        row.setAttribute('style', 'background:blue;');
        if (owner == 'guy'){
            event.target.style.background = "#000000";
        }
        if (owner == 'scott'){
            event.target.style.background = "#ffffff";
        }*/
    }

    /* Drop target event handlers */
    function dragEnter(event) {
        event.target.style.width = "60px";
        event.target.style.height = "60px";
        event.target.style.border = "2px solid #ff0000";
        //this.classList.add('hover-shadow');
    }

    function dragOver(event) {
        event.preventDefault();
        return false;
    }

    function dragLeave(event) {
        event.target.style.width = "50px";
        event.target.style.height = "50px";
        event.target.style.border = "solid 1px black";
       // this.classList.remove('hover-shadow');
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
            var upChange = JSON.stringify({
                ews: ews_value,
                owner: old_owner
            });
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
    self.port.emit("rtn_logged_g", "guy");
    self.port.once("userLogEWS_g", 
    function chk_vs_logged_ews(all_logged_ews) {
        if (all_logged_ews[0] !== "") {
            guyTotal = all_logged_ews.length;
        }
        //for (var g = tables.rows.length - 1; g >= 0; g--) {
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent; 
            for (var h=0; h < all_logged_ews.length; h++) {
                //console.log(all_logged_ews[h]);
                if (all_logged_ews[h] == ews) {
                    tables.rows[g].className+= " guy";
                    tables.rows[g].cells[5].innerHTML = "Guy";            //Add assigned name
                }
            }
        }
        div_g = document.getElementById('guy_note');
        div_g.innerHTML = guyTotal;
        var div_gx = document.getElementById('guy_div');
        div_gx.setAttribute('title', guyTotal + ' Jobs Assigned');
        
        //Remove any closed values from user listing
        //console.log(ews_array);
    });
    self.port.emit("rtn_logged_s", "scott");
    self.port.once("userLogEWS_s", 
    function chk_vs_logged_ews(all_logged_ews) {
        if (all_logged_ews[0] !== "") {
            scottTotal = all_logged_ews.length;
        }
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent; 
            for (var h=0; h < all_logged_ews.length; h++) {
                if (all_logged_ews[h] == ews) {
                    tables.rows[g].className+= " scott";
                    tables.rows[g].cells[5].innerHTML = "Scott";
                }
            }
        }
        div_s = document.getElementById('scott_note'); 
        div_s.innerHTML = scottTotal;
        var div_sx = document.getElementById('scott_div');
        div_sx.setAttribute('title', scottTotal + ' Jobs Assigned');
    });
    self.port.emit("rtn_logged_p", "paul");
    self.port.once("userLogEWS_p", 
    function chk_vs_logged_ews(all_logged_ews) {
        if (all_logged_ews[0] !== "") {
            paulTotal = all_logged_ews.length;
        }
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent; 
            for (var h=0; h < all_logged_ews.length; h++) {
                if (all_logged_ews[h] == ews) {
                    tables.rows[g].className+= " paul";
                    tables.rows[g].cells[5].innerHTML = "Paul";
                }
            }
        }
        div_p = document.getElementById('paul_note');  
        div_p.innerHTML = paulTotal;
        var div_px = document.getElementById('paul_div');
        div_px.setAttribute('title', paulTotal + ' Jobs Assigned');
    });
    self.port.emit("rtn_logged_h", "suzhou");
    self.port.once("userLogEWS_h", 
    function chk_vs_logged_ews(all_logged_ews) {
        if (all_logged_ews[0] !== "") {
            suzhouTotal = all_logged_ews.length;
        }
        for (var g=0; g < tables.rows.length; g++) {
            var ews = tables.rows[g].cells[0].textContent; 
            for (var h=0; h < all_logged_ews.length; h++) {
                if (all_logged_ews[h] == ews) {
                    tables.rows[g].className+= " suzhou";
                    tables.rows[g].cells[5].innerHTML = "Suzhou";
                }
            }
        }
        div_h = document.getElementById('suzhou_note');  
        div_h.innerHTML = suzhouTotal;
        var div_sum = document.getElementById('ews_totala');
        //var div_sum2 = document.getElementById('ews_totalb');
        var div_sum2 = document.createElement('span');
        div_sum2.setAttribute('id', 'ews_totalb');
        var div_suma = parseInt(document.getElementById('guy_note').innerHTML);
        var div_sumb = parseInt(document.getElementById('scott_note').innerHTML);
        var div_sumc = parseInt(document.getElementById('paul_note').innerHTML);
        var div_sumd = parseInt(document.getElementById('suzhou_note').innerHTML);
        //var div_suma = parseInt(div_sum.innerHTML) + parseInt(suzhouTotal) + " / ";
        //var div_sumb = tables.rows.length-1;
        div_sum.innerHTML = div_suma + div_sumb + div_sumc + div_sumd + " / ";
        div_sum2.innerHTML = tables.rows.length-1;
        
        //Send values to update button
            var assignTotal = div_suma + div_sumb + div_sumc + div_sumd;
            var allTotal = tables.rows.length-1;
            var unassignTotal = allTotal - assignTotal;
            self.port.emit("badge", unassignTotal);
        
        div_sum.appendChild(div_sum2);
        var div_hx = document.getElementById('suzhou_div');
        div_hx.setAttribute('title', suzhouTotal + ' Jobs Assigned');
    });
    //self.port.on("unassignNum", function(owner) {
      //  console.log(owner + " Received!");
        //var parsedupChange = JSON.parse(upChange);
        //var ews = parsedupChange.ews;
        //var owner = parsedupChange.owner;
        //var count = document.getElementById(owner + '_note');
        //count_value =  parseInt(count.innerHTML) + 1;
        //count.innerHTML = count_value;
    //});
    
}    
    function saveData(ews_value, owner) {
        var upChange = JSON.stringify({
            ews: ews_value,
            owner: owner
        });
        self.port.emit("update", upChange);
    }
    function unassign(upChange) {
        self.port.emit("unassign", upChange);
    }
    function cur_user_log(user) {
        self.port.emit("rtn_logged", user);
    }
    function UpdateMaster(ews_array, owner_array) {
        var all_array = JSON.stringify({
            ews: ews_array,
            owner: owner_array
        });
        self.port.emit("save", all_array);
    }
    
modA();
sortTables();
modB();

    self.port.on("unassignNum", function (owner) {
        console.log(owner + " (-1)");
        var count = document.getElementById(owner.toLowerCase() + '_note');
        count_value =  parseInt(count.innerHTML) - 1;
        count.innerHTML = count_value;
        var newTitle = document.getElementById(owner.toLowerCase() + '_div');
        newTitle.setAttribute('title', count_value + ' Jobs Assigned');
    });