function saveNote(id) {
    var note = document.getElementById(id).value;
    var ewsnum = "EWS" + id.replace(/\D/g,'');
    var datapackage = new Array(ewsnum, note);
    sendAsyncMessage("SaveNote", datapackage);
}

function clearAllSS() {
    //localStorage.clear();
    console.log("Stored data reset.");
    location.reload();
}

function clearSizes(user) {
    //localStorage.removeItem('Widget_serial' + user);
    console.log("Widget size and positions reset.");
    location.reload();
}
