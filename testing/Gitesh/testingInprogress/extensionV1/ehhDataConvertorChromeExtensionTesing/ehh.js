

let event = {
    "origin": ["mouse", "window", "ehh", "HTTP", "keyBoard"],
}
window.onload = OnLoad();

function OnLoad(e) {
    //window storage == session storage
    console.log("ehh is running! on >>>", window.document.title, window.document.location.origin);
    var listeners = createListeners(this);
}
function createListeners(entity) {
  // console.log(entity);
    var events = find(entity, 'on');
  // console.log("events Found",events);
    var a = events.forEach(create);
   // console.log(a);
    save(events, this.constructor.name + "listeners");
    
    console.log("listernes created & Saved to local storagea at ", new Date().toLocaleString().replace(',', ''), this.constructor.name);

}
function initState(e) {
    var nodes = [];
    //currentState = e.type;
    document.documentElement.querySelectorAll('*').forEach(function (node) {
        node.setAttribute("currentstate", "inDom"); node.setAttribute("prevstate", "");
       //  console.log(node);
    });
    
}

function changeState(e) {
    //console.log("changing state for event");
    var targetElement = e.target;
   // console.log(targetElement);
    
    let currentState = targetElement.getAttribute('currentstate'); //console.log("current state", currentState);  //console.log("prev state",prevState);
    let prevState = targetElement.getAttribute('prevstate'); 
       if (prevState === currentState) {
        targetElement.setAttribute('currentstate', e.type); //console.log(prevState);
       // console.log("New State",targetElement);
        //console.log("samestate",targetElement);
    }else{
        targetElement.setAttribute('prevstate', currentState); //console.log(prevState);
        targetElement.setAttribute('currentstate', e.type); //console.log(prevState);
       // console.log("New State",targetElement);
    }
conductEvent(e);
    //console.log(targetElement.getAttributes(prevstate));

}

function conductEvent(e) {
    if (e.type === "mouseover") {
        mouseOver(e);
        // createElement(e); // onmousedown(e); // onmousedown(e); // console.log("body");
    } else
    if (e.type === "click") {
        // console.log(e.constructor.name, e.type, "captured", e.target.constructor.name);
        click(e);
         // createElement(e); // onmousedown(e); // onmousedown(e); // console.log("body");
     } else {
        if (e.type === "contextmenu") {
            // console.log(e.constructor.name, e.type, "captured", e.target.constructor.name);
             //createElement(e); // onmousedown(e); // onmousedown(e); // console.log("body");
             e.preventDefault();
             rightClick(e);    
         } 
     }
}

//this function acts like a event conductor, read it's event command mapp from a json file, which mapps 
//Ignore Events from Json to be implemented
//https://github.com/philipwalton/router/blob/master/index.js



function onEvent(e) {
   // console.log(e.constructor.name, e.type, "captured", e.target.tagName);
    if (e.type === "pageshow") {
        //console.log(e.constructor.name, e.type, "captured", e.target.tagName);
       initState(e);
        // createElement(e); // onmousedown(e); // onmousedown(e); // console.log("body");
    } if (e.constructor.name === "MouseEvent") {
        //console.log(e.constructor.name, e.type, "captured", e.target.tagName);
        changeState(e);
        // createElement(e); // onmousedown(e); // onmousedown(e); // console.log("body");
    }
}

function create(entity) {
    window[entity] = onEvent;
}

function rightClick(event) { 
    //console.log("contextClick", event);
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.clientY + "px";
    contextElement.style.left = event.clientX + "px";
    contextElement.style.display = 'block';
}

function click(e) { 
    var targetElement = e.target;
  //  console.log(getEntityType(targetElement));
    var contextElement = document.getElementById("context-menu");  
    if(contextElement.hasAttribute("currentState")){
        //console.log("clickedOn",targetElement);  
        contextElement.style.display = 'none';

    } if (getEntityType(targetElement).includes("Element") && targetElement!= contextElement) { 
       // console.log("foundclick", targetElement);
       
        var outputType = "json";
        var entity2Process = "CSSRuleList";
        var entity2Find = "CSSStyleRule";
        var values = "active";
        var request = "get";
        var element = document.getElementsByTagName("body")[0];
        var output = {};
        var nodeEntityInJson = {
            tagName: 'get',
            name: 'get',
            attributes: 'getAll',
            childNodes: 'getAll',
            nodeType: 'get',
            nodeValue: 'get'
        }


        var jsonOutput = createEntity(element, output, outputType, nodeEntityInJson);

       
        
      //  var jsonOutput = createJsonFromNode(element);
        console.log(JSON.stringify(jsonOutput));
        // var htmlOutput = createJson2Html(jsonOutput);
        // console.log(htmlOutput);
        // var windowFeatures = "menubar=no,location=no,toolbar=no,resizable=yes,scrollbars=yes,status=no";
        // var myWindow = window.open("", windowFeatures);

        // var tempHtml = myWindow.document.getElementsByTagName("html")[0];
        // myWindow.document.replaceChild(htmlOutput, tempHtml);
       // ehhProcessEntity(targetElement, entity2Process, entity2Find,values,output,outputType,request);     
    }


}



function mouseOver(e) {
    // console.log(e.constructor.name, e.type, "captured", e.target.constructor.name);
    
    // var targetElement = e.target;
    // console.log("foundclick", targetElement)
    // var contextElement = document.getElementById("context-menu");
    // if (contextElement.hasAttribute("currentState")) {
    //     //console.log("clickedOn",targetElement);  
    //     contextElement.style.display = 'none';

    // }

    
}





