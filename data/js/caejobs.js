//Reload button
var works = document.getElementById("button");
    works.addEventListener("click", function() {
        self.port.emit("CAEJobLog-at-tenneco-dot-com:reloadx");
    }, false);

self.port.on("CAEJobLog-at-tenneco-dot-com:pageprep", function() {
    //
    // Need to check if only first row needs removed or all old data too
    //
    //Remove update note row
    var table = document.getElementsByTagName('table')[0];
    table.deleteRow(1);
});

self.port.on("CAEJobLog-at-tenneco-dot-com:pageUpdate", function(data) {
    //
    // Load new JSON file into table
    // TODO: Figure out how to only add updated records
    //var table = document.getElementsByTagName('table')[0];
    //var str = '';
    
    //var array = JSON.parse(data);
    //for (var i = 0; i < array.length; i++) {
    //    str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
    //    for (var index in array[i]) {
    //        str += '<td>' + array[i][index] + '</td>';
    //    }
    //    str += '</tr>';
    //    $('#thetable').append(str).fadeIn();
    //}
    
    $('#thetable').append(data).fadeIn();
});

