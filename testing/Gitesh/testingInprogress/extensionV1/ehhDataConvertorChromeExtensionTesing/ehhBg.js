// This is the background script for the extension

console.log("background is running!");

window.onload = load;

function load() {
    console.log("BGload event detected");
    loadHomeLocation();
    
    //to be used to update Manifest at runTime.
    var manifest = chrome.runtime.getManifest(); 
    var manifestJson = JSON.stringify(manifest) : manifest;
    console.log("manifest",manifest);
    console.log("manifest",manifestJson);

chrome.management.getSelf (self => {
  if (self.installType === 'development') {
    console.log("Development Mode")
      }
    })

  }
//Displays the directory Info of the current Installed Version.
  function loadHomeLocation(){
    var gettingEntry = chrome.runtime.getPackageDirectoryEntry(gotDirectoryEntry);
    console.log("HomeLocation",gettingEntry);
    //getPlatformInfo
    //getPackageDirectoryEntry
    }
  function gotDirectoryEntry(directoryEntry) {
        console.log("here",directoryEntry);
        return directoryEntry;
  }
    
chrome.runtime.onMessage.addListener(function(message, sender) {
    if(!message.myPopupIsOpen) return;

    // Do your stuff
});