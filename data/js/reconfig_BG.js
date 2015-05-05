var paulTotal = 0;
var scottTotal = 0;
var guyTotal = 0;
var suzhouTotal = 0;
var ews_array = [];

function UpdateMaster(ews_array, owner_array) {
    var all_array = JSON.stringify({
        ews: ews_array,
        owner: owner_array
    });
    self.port.emit("save", all_array);
}

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
            tables.rows[i].insertCell(5);
            tables.rows[i].cells[5].innerHTML = "None";  
        }
        var cae = tables.rows[i].cells[4].innerHTML;
        var ews = tables.rows[i].cells[0].textContent;
        //Add attributes
            tables.rows[i].id=ews;
        var classname;

        //If there is a date then disable row
        if (/[0-9]+-[A-Z]+-[0-9]+/.test(cae)) {
            tables.rows[i].cells[5].innerHTML = "N/A"; 
        }
        //If heading disable row
        if (/EWS #/.test(ews)) {
            tables.rows[i].className='disabled';
        }
    }

//Move table to DIV
    var center = document.createElement('center');
    var div_Table = document.createElement('div');
    div_Table.setAttribute('id', 'otherContent');
    var theTABLE = document.getElementsByTagName('table')[0];
    div_Table.appendChild(theTABLE);
    center.appendChild(div_Table);
    document.body.appendChild(center);
    var tables = document.getElementById('thetable');
    
//Send values to update button
//var assignTotal = paulTotal + guyTotal + scottTotal + suzhouTotal;
var allTotal = tables.rows.length-1;
var unassignTotal = allTotal;
self.port.emit("badge", unassignTotal);

//Send data to index.js
var tabledata = document.getElementById('otherContent').innerHTML;
self.port.emit('loaded', tabledata);