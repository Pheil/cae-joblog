function refreshInformation(output) {
  //function infoReceived()
  //{
    //var output = httpRequest.responseText;
    //if (output) {
      
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
    
    //Add thead tag for column sorting
    var theTABLE = output.getElementsByTagName('table')[0];
    var thead = theTABLE.createTHead();
    var row = theTABLE.rows[0];
    thead.appendChild(row);
    //var parentDiv = heading.parentNode;
    //console.log(thead);
    //parentDiv.replaceChild(thead, heading);
    

    //Move table to DIV
    var center = output.createElement('center');
    var div_Table = output.createElement('div');
    div_Table.setAttribute('id', 'otherContent');
    div_Table.appendChild(theTABLE);
    center.appendChild(div_Table);
    output.body.appendChild(center);
    var tables = output.getElementById('thetable');
    
    //Add basic tags, add css & meta tags, reconfig_final
    var html = output.createElement('html');
    var head = output.createElement('head');
    var link1 = output.createElement('link');
        link1.setAttribute('rel', 'stylesheet');
        link1.setAttribute('type', 'text/css');
        link1.setAttribute('href', 'resource://CAEJobLog-at-tenneco-dot-com/data/css/jquery-ui.css');
    var link2 = output.createElement('link');
        link2.setAttribute('rel', 'stylesheet');
        link2.setAttribute('type', 'text/css');
        link2.setAttribute('href', 'resource://CAEJobLog-at-tenneco-dot-com/data/css/style.css');
    var meta = output.createElement('meta');
        meta.setAttribute('http-equiv', 'Content-Type');
        meta.setAttribute('content', 'text/html; charset=ISO-8859-1');
    var scr1 = output.createElement('script'); 
        scr1.setAttribute('type', 'text/javascript');
        scr1.setAttribute('src', 'resource://CAEJobLog-at-tenneco-dot-com/data/js/jquery-2.1.3.js');
    var scr2 = output.createElement('script');
        scr2.setAttribute('type', 'text/javascript');
        scr2.setAttribute('src', 'resource://CAEJobLog-at-tenneco-dot-com/data/js/jquery.tablesorter.js');
    head.appendChild(link1);
    head.appendChild(link2);
    head.appendChild(meta);
    head.appendChild(scr1);
    head.appendChild(scr2);
    html.appendChild(head);
    var body = output.createElement('body');
    //var datatable = output.getElementById('otherContent').innerHTML;
        body.appendChild(tables);
    var scr3 = output.createElement('script');
        scr3.setAttribute('language', 'JavaScript');
        scr3.setAttribute('src', 'resource://CAEJobLog-at-tenneco-dot-com/data/js/reconfig_final.js');
    body.appendChild(scr3);
    html.appendChild(body);

    //Send data to index.js
    //var tabledata = output.getElementById('otherContent').innerHTML;
    //var tabledata = output.getElementsByTagName('html').innerHTML;
    var tabledata = output.getElementsByTagName('html')[0].innerHTML
    //console.log(html.innerHTML);
    //self.port.emit('loaded', tabledata);
    return html.innerHTML;
      
}