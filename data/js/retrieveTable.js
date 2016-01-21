function refreshInformation(output) {
    // Remove top table
    var table = output.getElementsByTagName('table')[0];
    if (table) {
    table.parentNode.removeChild(table);
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
    //table_b.setAttribute('class', 'sortable');
    //table_b.setAttribute('id', 'thetable');
    
    //Delete projects row
    for (var row=0; row<table_b.rows.length;row++) {
        if(table_b.rows[row].cells[0].textContent == "Projects:"){ //DO NOT CHANGE TO ===
            table_b.deleteRow(row); 
        }
    }
    
    //Delete if CAE Cell = "NA"
    for (var row=table_b.rows.length-1; row >= 0; row--) {
        var cae = table_b.rows[row].cells[6].textContent;
        if(cae == "NA"){
            //test = table_b.rows[row].cells[0].textContent
            //console.log("deleted " + test + " row: " + row);
            table_b.deleteRow (row);
        } else if(/[0-9]+-[A-Z]+-[0-9]+/.test(cae)) {
            table_b.deleteRow (row);
        }
    }

    //Delete columns not needed
    function del_column(col_no) {
        for (var row=0; row<table_b.rows.length;row++) {
            table_b.rows[row].deleteCell(col_no); 
        }
    }
    for (var j = 19; j >= 7; j--) {
        del_column(j);
    }
    del_column(1);
    
    //Delete header row
    table_b.deleteRow(0);
    
    var myRows = [];
    var headersText = ["EWS", "BU", "PartNo", "Submit", "ENG"];

    for (var row=0; row<table_b.rows.length;row++) {
        myRows[row] = {};
        for (var cell=0; cell<table_b.rows[row].cells.length;cell++) {
            //if (cell==2) {
            //    myRows[row][headersText[cell]] = table_b.rows[row].cells[cell].innerHTML;
            //} else {
                myRows[row][headersText[cell]] = table_b.rows[row].cells[cell].textContent;
            //}
        }
    }
    
    //Send data to index.js
    return JSON.stringify(myRows);
}