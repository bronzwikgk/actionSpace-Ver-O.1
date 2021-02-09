

var client = {serverNodeRequest : {
    serverActionRequest: 'create',
    entity: ["spreadsheet", "sheet", "namedRange", "range"],
    requestType : "localApi",
    requestOrigin : window.location.href,
    resourceID : '1mBZJ01Ddhl9fByyJ5K-JEsruO7XV51i7ctdnRJ6-hGk'
//resourceUrl = "https://docs.google.com/spreadsheets/d/1mBZJ01Ddhl9fByyJ5K-JEsruO7XV51i7ctdnRJ6-hGk/edit#gid=1449573075";
}
}

var messageRequest = {
    'message' : "welcome"
}


window.onload = OnLoad();

function OnLoad(e) {
    console.log("ehhApp is Running is up");
    sendMessage(messageRequest);
   // var listeners = createEhhlisteners(this);
}


  chrome.runtime.onMessage.addListener(gotMessage);


function create(entity) {
    window[entity] = onEvent;
}


// // In ContentScript.js
// chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.content) {
//         sendResponse({ content: "response message" });
//         return true; // This is required by a Chrome Extension
//     }
// })


// function createEhhlisteners(events, searchKey) {
//   //  console.log("listernes created & Saved to local storagea at ", new Date().toLocaleString().replace(',', ''), this.constructor.name);
//     var eventsArr = find(events, searchKey);
//     //console.log(eventsArr);
//     eventsArr.forEach(createListeners, event);
//  //   save(eventsArr, this.constructor.name);
//     console.log("listernes created & Saved to local storagea at ", new Date().toLocaleString().replace(',', ''), this.constructor.name);

// }

// //need to get each Listerner as an Object, Need memory and performance assesment as well.
// function createListeners(event) {
//     mD = false;
//     mM = false;
//     mU = true;
//     document[event] = onEvent;
//     //var ehhEvent = window.addEventListener(event, onEvent);
//     //console.log("event Created",ehhEvent);
//     //window[entity] = onEvent;
// }



