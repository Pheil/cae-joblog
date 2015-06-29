    //Request EWS lists
    self.port.emit("rtn_logged");
    self.port.once("userLogs",
        function chk_vs_logged_ews(theArray) {
            var guy_ews = theArray[0];
            var scott_ews = theArray[1];
            var paul_ews = theArray[2];
            var suzhou_ews = theArray[3];
            
            var ewsnumber = document.evaluate(	
                "//p[contains(b,'EWS')]",	
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
                
            // Removes "Document #: EWS" from grabbed text
            var ewsnumber2 = String(ewsnumber).substring(20,12);
                                            
            //Compare array values to current EWS
            var assigned;
            if ( guy_ews.indexOf( ewsnumber2 ) > -1 ) {
                assigned = 'Guy.'
            } else if ( scott_ews.indexOf( ewsnumber2 ) > -1 ) {
                assigned = 'Scott.'
            } else if ( paul_ews.indexOf( ewsnumber2 ) > -1 ) {
                assigned = 'Paul.'
            } else if ( suzhou_ews.indexOf( ewsnumber2 ) > -1 ) {
                assigned = 'Suzhou.'
            } else {
                assigned = 'no one.'
            }
            
            console.log(ewsnumber2 + " is assigned to " + assigned);

            // Add assigned status
            var div = document.createElement('div');
            div.setAttribute('id', 'caeAssigned');

            if (assigned == 'Guy.') {
                var elmNewContent = document.createTextNode('CAE Job Log:  Assigned to Guy');
                div.setAttribute('style', 'position:absolute;top: 0;left: 0;right: 0;background:rgba(0, 0, 255, 0.5);margin: 0;width: 100%;height: 22px;text-align:center;border: 1px solid black;');
            } else if (assigned == 'Scott.') {
                var elmNewContent = document.createTextNode('CAE Job Log:  Assigned to Scott');
                div.setAttribute('style', 'position:absolute;top: 0;left: 0;right: 0;background:rgba(51, 204, 153, 0.5);margin: 0;width: 100%;height: 22px;text-align:center;border: 1px solid black;');
            } else if (assigned == 'Paul.') {
                var elmNewContent = document.createTextNode('CAE Job Log:  Assigned to Paul');
                div.setAttribute('style', 'position:absolute;top: 0;left: 0;right: 0;background:rgba(255, 153, 0, 0.5);margin: 0;width: 100%;height: 22px;text-align:center;border: 1px solid black;');
            } else if (assigned == 'Suzhou.') {
                var elmNewContent = document.createTextNode('CAE Job Log:  Assigned to Suzhou');
                div.setAttribute('style', 'position:absolute;top: 0;left: 0;right: 0;background:rgba(255, 255, 224, 0.5);margin: 0;width: 100%;height: 22px;text-align:center;border: 1px solid black;');
            } else {
                var elmNewContent = document.createTextNode('CAE Job Log:  Unassigned');
                div.setAttribute('style', 'position:absolute;top: 0;left: 0;right: 0;background:rgba(200, 54, 54, 0.5);margin: 0;width: 100%;height: 22px;text-align:center;border: 1px solid black;');
            }

            div.appendChild(elmNewContent);
            var elmFoo = document.getElementsByTagName('table')[0];
            elmFoo.parentNode.insertBefore(div, elmFoo);
            
            //Move table down
            var table = document.getElementsByTagName('table')[0];
            table.setAttribute('style', 'margin-top: 22px;top: 0;right: 0;bottom: 0;left: 0;');
        });
 
    
    
    