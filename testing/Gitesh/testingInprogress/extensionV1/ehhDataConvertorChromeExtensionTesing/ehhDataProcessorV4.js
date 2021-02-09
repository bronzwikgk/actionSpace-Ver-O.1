//referance Code https://github.com/azaslavsky/domJSON/blob/master/src/domJSON.js

var element = document.getElementsByTagName("html")[0];
var jsonOutput = getNode(element);
console.log(jsonOutput);


//This function set's a key from the subject to entity
function set(entity, subject, key) {
    entity[subject[key].name] = subject[key].value;
    return entity;

}

//returns all the key : Value Pair inside an object as JSON Object
//Options to be added
function iterarateObj(entity) {
    if (!getKeyResponse) { var getKeyResponse = {}; }
    for (var key in entity) {
        if (entity[key] && entity[key].value !== undefined) {
           // getKeyResponse[entity[key].name] = entity[key].value;
            getKeyResponse = set(getKeyResponse, entity,key);
        };
        //console.log(getKeyResponse);
    }
   //  console.log("getKey Response",JSON.stringify(getKeyResponse));
    return getKeyResponse;
}

function getArray(entity) {
    // console.log(entity);
    if (!arrayResponse) { var arrayResponse = []; }

    entity.forEach(function (element, index) {
        // console.log(entity[index], entity[index].nodeType);
        if (entity[index].nodeType === Node.ELEMENT_NODE) {
            arrayResponse.push(getNode(entity[index]));
        }
        if (entity[index].nodeType === Node.TEXT_NODE) {
            arrayResponse.push(getNode(entity[index]));
        }
    });
    return arrayResponse;
}

function getNode(nodeEl) {
    // console.log(nodeEl.tagName.toLowerCase());
    var node = {
        tagName: nodeEl.tagName,
        name: nodeEl.name,
        attributes: iterarateObj(nodeEl.attributes),
        childNodes: getArray(nodeEl.childNodes),
        parent: nodeEl.parentNode.tagName,
        nodeType: nodeEl.nodeType,
        nodeValue: nodeEl.nodeValue
    }
    return node;
}

function getJson2Html(entity) {
//console.log(entity);
    if (entity.nodeType === 1) { 
        var htmlResponse = document.createElement(entity.tagName);
     //   htmlResponse.setAttribute(entity.parent, entity.parent.value)
        setAttributes(htmlResponse, entity.attributes);
       // console.log("HTML Attributes",htmlResponse);
        if (entity.childNodes) { 

          getChildNodes(entity.childNodes, htmlResponse);
         // console.log(temp);
           // htmlResponse.appendChild(temp);
        }
    }
    if (entity.nodeType === 3) {
      //  console.log(entity);
        var htmlResponse = document.createTextNode(entity.nodeValue);    
    }
  
    return htmlResponse;
}

function setAttributes(element, attributesObj) { 
   // console.log(element);
    for (var key in attributesObj) { 
        
     //   if (attributesObj[key]) {

            if (key === 'href' || key === 'src') {

                if (isValidUrl(attributesObj[key]) === false) {
                   console.log("link found", element, key);
                    var absoluteUrl = toAbsolute(attributesObj[key]);
                    //console.log(absoluteUrl);
                    element.setAttribute(key, absoluteUrl);
                    //element.removeAttribute(key);
                 //console.log(element);
                }
            } else {
                element.setAttribute(key, attributesObj[key]);
            }
        
        //console.log(element.key);
      //  }
    }
    return element;
}

function getChildNodes(entityChildNodes, response) {
    // console.log(entity);
    
    entityChildNodes.forEach(function (element, index) {
        response.appendChild(getJson2Html(entityChildNodes[index]));
      //  console.log("ChildNodes",response);
    });
    return response;
}

function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }

    return true;
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}
//this function takes an relative path and returns with an absolute path.
function toAbsolute(relativePath) { 
    //const url = new URL(url[, base])
    var absoluteURL = new URL(relativePath, document.baseURI).href
 // console.log(absoluteURL);
    return absoluteURL;
//=> "https://stackoverflow.com/questions/mypath"
}

var htmlOutput = getJson2Html(jsonOutput);
console.log(htmlOutput);
var windowFeatures = "menubar=no,location=no,toolbar=no,resizable=yes,scrollbars=yes,status=no";
var myWindow = window.open("", windowFeatures);

var tempHtml = myWindow.document.getElementsByTagName("html")[0];
myWindow.document.replaceChild(htmlOutput, tempHtml);