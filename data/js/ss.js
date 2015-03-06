//Loop through textarea elements and retrieve saved notes if available
function getNoteStart() { 
    var tareas = document.getElementsByTagName("textarea");
    for (var g=0; g < tareas.length; g++) {
        var tarea = tareas.item(g);
        //console.log(tarea);
        var ews = tareas.item(g).id; 
        //console.log(ews + " ID");
        getNote(ews);
    }    
}

//Simple storage for EWS notes
function saveNote(ews) {
  // Grab the textarea
  var demo = document.getElementById(ews);
  
    // Try this
    try {
        localStorage.setItem(ews, demo.value);
        //console.log(demo.value + " Saved");
    } catch (e) {
    
      // If any errors, catch and alert the user
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Simple storage quota exceeded!');
      }
    }
}

function getNote(ews) {
  // Grab the textarea
  var demo = document.getElementById(ews);
  
    // Try this
    try {
        // If there is data available
        if (localStorage.getItem(ews)) {
        
          // Retrieve the item
          demo.value = localStorage.getItem(ews);
          var ews_num = ews.replace(/\D/g,'');
          console.log("Stored note (" + ews_num + "): '" + demo.value + "' retrieved.");
        }
    } catch (e) {
    
      // If any errors, catch and alert the user
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Simple storage quota exceeded!');
      }
      console.error(e + " Error");
    }
}

function clearAllSS() {
    localStorage.clear();
    console.log("Stored data reset.");
    location.reload();
}
function clearSizes(user) {
    localStorage.removeItem('Widget_serial' + user);
    console.log("Widget size and positions reset.");
    location.reload();
}
