    // Load current logged EWS to array
    self.port.emit("rtnHTML_logged_s", "scott");
    self.port.once("userLogHTML_s", 
    function chk_vs_logged_ews(all_logged_ews) {
            var widgets = [];
            if (all_logged_ews.length > 0) {
                widgets = [];
                for (var h=0; h < all_logged_ews.length; h++) {
                    var widget_entry = all_logged_ews[h];
                    widgets.push(widget_entry);
                }
            }
            if (all_logged_ews.length === 0 || all_logged_ews[0] === "") {      // if log is empty add placeholders
               widgets = ["None"]
            }
            var contentScriptObject = {"thewidgets" : widgets};
            unsafeWindow.clonedContentScriptObject = cloneInto(contentScriptObject, unsafeWindow);
    });