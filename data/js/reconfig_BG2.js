function refreshInformation(output) {
//var paulTotal = 0;
//var scottTotal = 0;
//var guyTotal = 0;
//var suzhouTotal = 0;
//var ews_array = [];
  //function infoReceived()
  //{
    //var output = httpRequest.responseText;
    //if (output) {
      //ORIG Reconfig code
      
      
    // Remove date picker script
    var script = output.getElementsByTagName('script')[0];
    if (script) {
    script.parentNode.removeChild(script);
    }
    
    // Remove top table
    var table = output.getElementsByTagName('table')[0];
    if (table) {
    table.parentNode.removeChild(table);
    }

	// Remove HR Line (Bottom & Top)
	var hr = output.getElementsByTagName('HR')[1];
	if (hr) {
	hr.parentNode.removeChild(hr);
	}
	hr = output.getElementsByTagName('HR')[0];
	if (hr) {
	hr.parentNode.removeChild(hr);
	}
    
    //Remove close and previous buttons
	var input = output.getElementsByTagName('input')[1];
	if (input) {
	input.parentNode.removeChild(input);
	}
	input = output.getElementsByTagName('input')[0];
	if (input) {
	input.parentNode.removeChild(input);
	}
    
    //Remove all BR (Bottom & Top)
    var br = output.body.getElementsByTagName('BR');
    while(br.length > 0) {
        br[0].parentNode.removeChild(br[0]);
    }
    
    //Remove total found
	output.body.innerHTML = output.body.innerHTML.replace(/Total Metric Records Found: [0-9]+/ig,"");

    // Remove "EWS Metric Results" text
    var h1 = output.getElementsByTagName('H1')[0];
    if (h1) {
    h1.parentNode.removeChild(h1);
    }    

	// Remove print and rev dates
    var b = output.body.getElementsByTagName('b');
    while(b.length > 0) {
        b[0].parentNode.removeChild(b[0]);
    }
     
    // Removes empty links
    var links = output.getElementsByTagName("a");
    for (var ti=0;ti<links.length;ti++) {
       var thislinks = links[ti];
       var test = thislinks.getAttribute("href");
       if (test == "ece_webquery.part_no_drawings?p_part_id=") {
       thislinks.removeAttribute("href");
       }
    }
   
    // Sets tag info so that columns can be sorted
    var table_b = output.getElementsByTagName('table')[0];
    table_b.setAttribute('class', 'sortable');
    table_b.setAttribute('id', 'thetable');
    
    //Delete projects row
    for (var row=0; row<table_b.rows.length;row++) {
        if(table_b.rows[row].cells[0].textContent == ""){
            table_b.deleteRow(row); 
        }
    }
    

    //Delete column
    function del_column(col_no) {
        for (var row=0; row<table_b.rows.length;row++) {
            table_b.rows[row].deleteCell(col_no); 
         }
    }
    for (var j = 19; j >= 7; j--) {
        del_column(j);
    }
    del_column(5);
    del_column(1);
    
    //var row=table_b.rows.length-1; row >= 0; row--
    //var row=0; row<table_b.rows.length;row++
    //Delete if Cell = "NA"
    for (var row=table_b.rows.length-1; row >= 0; row--) {
        if(table_b.rows[row].cells[4].innerHTML == "NA"){
            //test = table_b.rows[row].cells[0].textContent
            //console.log("deleted " + test + " row: " + row);
            table_b.deleteRow (row);
        }
    }
    
    // Add header cell for column 6
    var th = output.createElement('th');
    th.innerHTML = "ENG";
    table_b.rows[0].appendChild(th);

    for (var i = table_b.rows.length - 1; i >= 0; i--) {
        //Add cell for assigned name
        if (i !== 0) {
            if(!table_b.rows[i].cells[0].textContent == ""){
                table_b.rows[i].insertCell(5);
                table_b.rows[i].cells[5].innerHTML = "None"; 

                var cae = table_b.rows[i].cells[4].innerHTML;
                var ews = table_b.rows[i].cells[0].textContent;
                //Add attributes
                    table_b.rows[i].id=ews;
                var classname; 
                
                //If there is a date then disable row
                if (/[0-9]+-[A-Z]+-[0-9]+/.test(cae)) {
                    table_b.rows[i].cells[5].innerHTML = "N/A"; 
                }
                //If heading disable row
                if (/EWS #/.test(ews)) {
                    table_b.rows[i].className='disabled';
                }
            }
        }
    }

    //Move table to DIV
    var center = output.createElement('center');
    var div_Table = output.createElement('div');
    div_Table.setAttribute('id', 'otherContent');
    var theTABLE = output.getElementsByTagName('table')[0];
    div_Table.appendChild(theTABLE);
    center.appendChild(div_Table);
    output.body.appendChild(center);
    var tables = output.getElementById('thetable');
    
//Send values to update button
//var assignTotal = paulTotal + guyTotal + scottTotal + suzhouTotal;
var allTotal = tables.rows.length-1;
var unassignTotal = allTotal;
//self.port.emit("badge", unassignTotal);

//Send data to index.js
var tabledata = output.getElementById('otherContent').innerHTML;
//self.port.emit('loaded', tabledata);
return tabledata;
      
      
      //orig reconfig code
      //postMessage(output.trim());
    //}
    //httpRequest = null;
  //}

  //var httpRequest = new XMLHttpRequest();
  //httpRequest.open("GET", fullUrl, true);
  //httpRequest.onload = infoReceived;
  //httpRequest.send(null);
}

//setInterval(function() {
//  refreshInformation();
//}, 30*60*1000); //30 minutes

//onmessage = function(event) {
//  refreshInformation();
//}

//Not called anywhere, yet?
//function UpdateMaster(ews_array, owner_array) {
//    var all_array = JSON.stringify({
//        ews: ews_array,
//        owner: owner_array
//    });
//    self.port.emit("save", all_array);
//}

