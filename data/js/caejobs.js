//Reload button
var works = document.getElementById("button");
    works.addEventListener("click", function() {
        self.port.emit("CAEJobLog-at-tenneco-dot-com:reloadx");
    }, false);
    
//user buttons
document.getElementById("guy").addEventListener("click", function() {
    self.port.emit("CAEJobLog-at-tenneco-dot-com:aboutOpen", "guy");
}, false);
document.getElementById("scott").addEventListener("click", function() {
    self.port.emit("CAEJobLog-at-tenneco-dot-com:aboutOpen", "scott");
}, false);
document.getElementById("paul").addEventListener("click", function() {
    self.port.emit("CAEJobLog-at-tenneco-dot-com:aboutOpen", "paul");
}, false);
document.getElementById("suzhou").addEventListener("click", function() {
    self.port.emit("CAEJobLog-at-tenneco-dot-com:aboutOpen", "suzhou");
}, false);
        
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
            var yr = s.substr(7,2),
                mt = s.substr(3,3),
                mt2 = Months[mt],
                dt1 = yr+mt2+s.substr(0,2);

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
            var g = /guy/i,
                sc = /scott/i,
                p = /paul/i,
                h = /suzhou/i,
                n = /none/i,
                nn = /n\/a/i,
                str = s.toString().toLowerCase(),
                users = str.replace(g,1).replace(sc,2).replace(p,3).replace(h,4).replace(n,5).replace(nn,6); 
            return users;
 
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
                4: { 
                    sorter:'eng' 
                }
            },
            sortList: [[3,1]],
            debug: false
        }); 
    });

self.port.on("CAEJobLog-at-tenneco-dot-com:pageprep", function() {
    // Remove blank row / old data
    var table = document.getElementsByTagName('table')[0];
    if (table.rows.length > 2) {
        $("#thetable > tbody").html("");
    } else {
        table.deleteRow(1); 
    }
    var div_info = document.getElementById('info');
    div_info.style.display = 'none';
    
    // Reset assigned job totals
    document.getElementById('guy_note').textContent = "0";
    document.getElementById('guy_div').setAttribute('title', '0 Jobs Assigned');
    document.getElementById('scott_note').textContent = "0";
    document.getElementById('scott_div').setAttribute('title', '0 Jobs Assigned');
    document.getElementById('paul_note').textContent = "0";
    document.getElementById('paul_div').setAttribute('title', '0 Jobs Assigned');
    document.getElementById('suzhou_note').textContent = "0";
    document.getElementById('suzhou_div').setAttribute('title', '0 Jobs Assigned');
    document.getElementById("ews_totalb").textContent = "0";
    document.getElementById("ews_totala").textContent = "0";
});

self.port.on("CAEJobLog-at-tenneco-dot-com:rowUpdate", function(data) {
    //
    // Load str for each row into table
    // TODO: Figure out how to only add updated records
    $('#thetable').append(data).fadeIn( "slow" );
    $("#thetable").trigger("update");

});

self.port.on("CAEJobLog-at-tenneco-dot-com:countUpdate", function(user) {
    //
    // Update assigned job totals
    var div_note = document.getElementById(user + '_note');
    div_note.textContent = parseInt(div_note.textContent) + 1;
    var div_total = document.getElementById(user + '_div');
    div_total.setAttribute('title', parseInt(div_note.textContent) + ' Jobs Assigned');
    
    // Update assigned job number
    var assignedSum = document.getElementById("ews_totala");
    assignedSum.textContent = parseInt(assignedSum.textContent) + 1;
});

self.port.on("CAEJobLog-at-tenneco-dot-com:totalUpdate", function(total) {
    //
    // Update total job number
    var theSum = document.getElementById("ews_totalb");
    theSum.textContent = total;
});

self.port.on("CAEJobLog-at-tenneco-dot-com:finalUpdate", function(total) {
    //
    // Add dragging handlers, update sort, send request to clear closed
    tableDrag();
    
    setTimeout(function() { 
        /* e.g. sort by the second column in descending order */
        var sorting = [[3, 1]];
        $("#thetable").trigger("sorton", [sorting]);
    }, 30);
    self.port.emit("CAEJobLog-at-tenneco-dot-com:clearCompleted");
});


function tableDrag() {
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
        var ews_value = event.dataTransfer.getData('xcd'),
            row = document.getElementById(ews_value),
            count,
            count2,
            count_value,
            count2_value;
        //If currently assigned to someone but not owner drop target
        var old_owner = row.cells[4].textContent.toLowerCase();
        if (old_owner != "none" && old_owner != owner) {
            ews = new Array(ews_value);
            old_owner = new Array(old_owner);
            var ewsChange = new Array(ews, old_owner);
            self.port.emit("CAEJobLog-at-tenneco-dot-com:unassign", ewsChange);
            count2 = document.getElementById(old_owner + '_note');
            count2_value =  parseInt(count2.textContent) - 1;
            count2.textContent = count2_value;
            if (owner == "guy") {
                row.setAttribute('style', 'background:#0000FF;color:#008000;');
                row.cells[4].textContent = "guy";
            }
            if (owner == "suzhou") {
                row.setAttribute('style', 'background:yellow;color:#008000;');
                row.cells[4].textContent = "suzhou";
            }
            if (owner == "paul") {
                row.setAttribute('style', 'background:#FF9900;color:#008000;');
                row.cells[4].textContent = "paul";
            }
            if (owner == "scott") {
                row.setAttribute('style', 'background:#33CC99;color:#008000;');
                row.cells[4].textContent = "scott";
            }
            //Fix total box value
            count = document.getElementById(owner + '_note');
            count_value =  parseInt(count.textContent) + 1;
            count.textContent = count_value;
            //Fix title for user box
            document.getElementById(owner + '_div').setAttribute('title', count_value + ' Jobs Assigned');
            var upChange = new Array(ews_value, owner);
            self.port.emit("CAEJobLog-at-tenneco-dot-com:update", upChange);
            console.log("Job reassignment complete");
        }
        //If not yet assigned
        if (old_owner == "none") {
            if (owner == "guy") {
                row.setAttribute('style', 'background:#0000FF;color:#008000;');
                row.cells[4].textContent = "guy";
            }
            if (owner == "suzhou") {
                row.setAttribute('style', 'background:yellow;color:#008000;');
                row.cells[4].textContent = "suzhou";
            }
            if (owner == "paul") {
                row.setAttribute('style', 'background:#FF9900;color:#008000;');
                row.cells[4].textContent = "paul";
            }
            if (owner == "scott") {
                row.setAttribute('style', 'background:#33CC99;color:#008000;');
                row.cells[4].textContent = "scott";
            }
            //Fix total box value
            count = document.getElementById(owner + '_note');
            count_value =  parseInt(count.textContent) + 1;
            count.textContent = count_value;
            //Fix title for user box
            document.getElementById(owner + '_div').setAttribute('title', count_value + ' Jobs Assigned');
            var upChange = new Array(ews_value, owner);
            self.port.emit("CAEJobLog-at-tenneco-dot-com:update", upChange); 
        }
        //If already assigned to same owner as drop target
        if (old_owner == owner) {
            console.error(ews_value + " is already assigned to " + owner);
        }
        event.preventDefault(); // don't forget this!
        return false;
    }
} 

