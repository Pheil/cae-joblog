function DBinit() { 
// create an instance of a db object for us to store the IDB data in
var db;

// create a blank instance of the object that is used to transfer data into the IDB. This is mainly for reference
var newItem = [
      { name: "", value: "" }
    ];

  // Let us open our database
  var DBOpenRequest = window.indexedDB.open("CAEjoblog", 1);

  // these two event handlers act on the database being opened successfully, or not
  DBOpenRequest.onerror = function(event) {
    console.error("Error loading database.");
  };

  DBOpenRequest.onsuccess = function(event) {
    console.log("Database initialised.");
    
    // store the result of opening the database in the db variable. This is used a lot below
    db = DBOpenRequest.result;
    
    // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
    //displayData();
  };
  
  // This event handles the event whereby a new version of the database needs to be created
  // Either one has not been created before, or a new version number has been submitted via the
  // window.indexedDB.open line above
  //it is only implemented in recent browsers
  DBOpenRequest.onupgradeneeded = function(event) { 
    var db = event.target.result;
    
    db.onerror = function(event) {
      console.error("Error loading database.");
    };

    // Create an objectStore for this database
    var objectStore = db.createObjectStore("CAEjoblog", { keyPath: "taskTitle" });
    
    // define what data items the objectStore will contain
    objectStore.createIndex("Keyname", "Keyname", { unique: true });
    objectStore.createIndex("note", "note", { unique: false });
    console.log("Object store created.");
  };
}

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

  
function getNote(ews) {
    // Grab the textarea
    var widget_note = document.getElementById(ews);
  
    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
    var objectStore = db.transaction('CAEjoblog').objectStore('CAEjoblog');
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
        // if there is still another cursor to go, keep runing this code
        if(cursor) {
            
            if(cursor.value.Keyname == ews) {
                widget_note.value = cursor.value.note;
                var ews_num = ews.replace(/\D/g,'');
                console.log("Stored note (" + ews_num + "): '" + cursor.value.note + "' retrieved.");
            }
            //cursor.value.Keyname
            //cursor.value.note
          
            // continue on to the next item in the cursor
            cursor.continue();
        
        // if there are no more cursor items to iterate through, say so, and exit the function 
        } else {
          console.log("Entries all checked.");
        }
      };
    }
    
function getSerial(e) {
    DBinit();
    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
    var objectStore = db.transaction('CAEjoblog').objectStore('CAEjoblog');
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
        // if there is still another cursor to go, keep runing this code
        if(cursor) {
            
            if(cursor.value.Keyname == e) {
                console.log("Serial (" + e + ") retrieved.");
                return;
            }         
            // continue on to the next item in the cursor
            cursor.continue();
        
        // if there are no more cursor items to iterate through, say so, and exit the function 
        } else {
          //console.log("Entries all checked.");
        }
      };
    }
    
    
function saveNote(e) {
      var widget_note = document.getElementById(e);
      // grab the values entered into the form fields and store them in an object ready for being inserted into the IDB
      var newItem = [
        { Keyname: e, note: widget_note.value }
      ];

      // open a read/write db transaction, ready for adding the data
      var transaction = db.transaction(["CAEjoblog"], "readwrite");
    
      // report on the success of opening the transaction
      transaction.oncomplete = function() {
          console.log("Transaction completed: database modification finished.");

      };

      transaction.onerror = function() {
        console.log("Transaction not opened due to error: " + transaction.error);
      };

      // call an object store that's already been added to the database
      var objectStore = transaction.objectStore("CAEjoblog");
      console.log(objectStore.indexNames);
      console.log(objectStore.keyPath);
      console.log(objectStore.name);
      console.log(objectStore.transaction);
      console.log(objectStore.autoIncrement);

      // add our newItem object to the object store
      var objectStoreRequest = objectStore.add(newItem[0]);        
        objectStoreRequest.onsuccess = function(event) {
          
          // report the success of our new item going into the database
          console.log("New item added to database.");
        };
    }
  
  
function saveSizes(e,payload) {
    DBinit();
      // grab the values entered into the form fields and store them in an object ready for being inserted into the IDB
      var newItem = [
        { Keyname: e, note: payload }
      ];

      // open a read/write db transaction, ready for adding the data
      var transaction = db.transaction(["CAEjoblog"], "readwrite");
    
      // report on the success of opening the transaction
      transaction.oncomplete = function() {
          console.log("Transaction completed: database modification finished.");

      };

      transaction.onerror = function() {
        console.log("Transaction not opened due to error: " + transaction.error);
      };

      // call an object store that's already been added to the database
      var objectStore = transaction.objectStore("CAEjoblog");
      console.log(objectStore.indexNames);
      console.log(objectStore.keyPath);
      console.log(objectStore.name);
      console.log(objectStore.transaction);
      console.log(objectStore.autoIncrement);

      // add our newItem object to the object store
      var objectStoreRequest = objectStore.add(newItem[0]);        
        objectStoreRequest.onsuccess = function(event) {
          
          // report the success of our new item going into the database
          console.log("New item added to database.");
        };
    }
  
  

function clearAllSS() {
    //localStorage.clear();
    console.log("Stored data reset.");
    location.reload();
}
function clearSizes(user) {
    // open a database transaction and delete the item, finding it by the user passed
    var transaction = db.transaction(["CAEjoblog"], "readwrite");
    var request = transaction.objectStore("CAEjoblog").delete('Widget_serial' + user);

    // report that the data item has been deleted
    transaction.oncomplete = function() {
      console.log("Widget size and positions of " + user + " reset.");
    };
    location.reload();
}
