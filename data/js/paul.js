    // Load current logged EWS to array for page display
    self.port.emit("rtnHTML_logged_p", "paul");
    self.port.once("userLogHTML_p", 
    function chk_vs_logged_ews(all_logged_ews) {
            var widgets = [];
            if (all_logged_ews.length > 0) {
                widgets = [];
                for (var h=0; h < all_logged_ews.length; h++) {
                    //var widget_entry = "<li>" + all_logged_ews[h] + "</li>";
                    var widget_entry = all_logged_ews[h];
                    widgets.push(widget_entry);
                }
                //var datasum = [];  //OLD METHOD
                //for (var i in widgets) { datasum.push([widgets[i], 2, 2]);}
                //widgets = datasum;
            }
            if (all_logged_ews.length === 0 || all_logged_ews[0] === "") {      // if log is empty add placeholders
               // widgets = [
                //    ['<li>None</li>',2,2],
               //     ['<li>None</li>',2,2],
               //     ['<li>None</li>',2,2]
               // ];
               widgets = [None]
            }
            var contentScriptObject = {"thewidgets" : widgets};
            unsafeWindow.clonedContentScriptObject = cloneInto(contentScriptObject, unsafeWindow);
            //unsafeWindow.assignedContentScriptObject = contentScriptObject;
            console.log("Widgets variable set.");
    });