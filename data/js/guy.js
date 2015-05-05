    // Load current logged EWS to array & widget serial
    self.port.emit("rtnHTML_logged_g", "guy");
    self.port.once("userLogHTML_g",
        function chk_vs_logged_ews(theArray) {
            var widget_info = theArray[0];
            var all_logged_ews = theArray[1];
            //Widget EWS checking
            var widgets = [];
            if (all_logged_ews.length > 0) {
                widgets = [];
                for (var h = 0; h < all_logged_ews.length; h++) {
                    var widget_entry = all_logged_ews[h];
                    widgets.push(widget_entry);
                }
            }
            if (all_logged_ews.length === 0 || all_logged_ews[0] === "") {
                // if log is empty add placeholders
                widgets = [None];
            }
            //Widget serial checking
            var serial;
            if (widget_info.length > 0) {
                serial = widget_info;
            }
            if (widget_info.length === 0 || widget_info[0] === "" || widget_info[0] === null) { 
                // if log is empty
                serial = "";
            }

            //console.log("EWS log & Widget Serial loaded");
            var contentScriptObject = {
                "thewidgets": widgets,
                "theserial": serial
            };
            unsafeWindow.clonedContentScriptObject = cloneInto(contentScriptObject, unsafeWindow);
        });