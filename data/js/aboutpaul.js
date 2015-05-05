//const {Cc,Ci,Cu,components} = require("chrome");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
const self = require("sdk/self");
const Cc = Components.classes;
const Ci = Components.interfaces;

function AboutPaul() { }
AboutPaul.prototype = {
  classDescription: "about:paul",
  contractID: "@mozilla.org/network/protocol/about;1?what=paul",
  classID: Components.ID("b0b3af10-d3b3-11e4-8830-0800200c9a66"),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),
  
  getURIFlags: function(aURI) {
    return Ci.nsIAboutModule.ALLOW_SCRIPT;
  },
  
  newChannel: function(aURI) {
    let ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    let channel = ios.newChannel("resource://CAEJobLog-at-tenneco-dot-com/data/paul.html", null, null);
    channel.originalURI = aURI;
    return channel;
  }
};
const NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutPaul]);