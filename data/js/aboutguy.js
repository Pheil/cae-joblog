//const {Cc,Ci,Cu,components} = require("chrome");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
const self = require("sdk/self");
const Cc = Components.classes;
const Ci = Components.interfaces;

//b4c22650-df83-11e4-8830-0800200c9a66 (guy)
//b4c22651-df83-11e4-8830-0800200c9a66 (scott)
//b4c22652-df83-11e4-8830-0800200c9a66 (suz)

function AboutGuy() { }
AboutGuy.prototype = {
  classDescription: "about:guy",
  contractID: "@mozilla.org/network/protocol/about;1?what=guy",
  classID: Components.ID("b4c22650-df83-11e4-8830-0800200c9a66"),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),
  
  getURIFlags: function(aURI) {
    return Ci.nsIAboutModule.ALLOW_SCRIPT;
  },
  
  newChannel: function(aURI) {
    let ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    let channel = ios.newChannel("resource://CAEJobLog-at-tenneco-dot-com/data/guy.html", null, null);
    channel.originalURI = aURI;
    return channel;
  }
};
const NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutGuy]);