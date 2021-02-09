//https://github.com/mdn/webextensions-examples/blob/master/http-response/background.js
//https://developer.chrome.com/docs/extensions/reference/events/

console.log("background is up");

const defaultFilters = [
    // "<all_urls>",
    "*://*.doubleclick.net/*",
    "*://partner.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.google-analytics.com/*",
    "*://creative.ak.fbcdn.net/*",
    "*://*.adbrite.com/*",
    "*://*.exponential.com/*",
    "*://*.quantserve.com/*",
    "*://*.scorecardresearch.com/*",
    "*://*.zedo.com/*",
   //  "*://*.youtube.com/*"   
]

var filters = { urls: defaultFilters};


chrome.webRequest.onBeforeRequest.addListener(listener, filters, ["blocking"]);

function cancel(details) { //console.log("Canceling: " + requestDetails.url);
    return { cancel: true };
}

function listener(e) { 
    console.log(e);
   return cancel(e);
}


class bgService { 

    static init() { 
       
        chrome.runtime.onMessage.addListener(gotMessage);

    }
    static gotMessage(message, sender, sendResponse) {
        console.log("message recived", message, sender.tab.id)
        
        sendMessage(sender.tab.id, "message Recived")
        }

    static sendMessage(recipient, message) {
        chrome.tabs.sendMessage(recipient, message, function (response) {console.log(response.farewell);});
    }


}

