
//the data convertor works using an inputRequestObject and a output RequestObject.
//Both the objects and options along with the process to be applied. Eg, get, save

let entity2Search = "html";
let entityLocation = "document";
console.log("processing Entity =>", entity2Search);
let processingEntity = getEntity(entity2Search,entityLocation);
//console.log(processingEntity);
json ={};
html = document.createElement("html");
var outputJson = processEntity(processingEntity, "json");
console.log("outputJson",outputJson);

var request = {
    'request' : {
        'localName': "get",
        'tagName': "get",
        'nodeName': "get",
        "nodeValue":"get",
        'name': "get",
        'nodeType': "get",
        'id': "get",
        "attributes": "get",
        "childNodes": "get",
        "children": ""
        
 },
    'options': {
        'recurse': true,

    }
}
//var outputHtml = processEntity(outputJson, "html");
//console.log("outputHTML",outputHtml);

function hasChildren(node) {
    return (typeof node === 'object')
        && (typeof node.childNodes !== 'undefined')
        && (node.childNodes.length > 0);
}

//this function acts like a databaseDriver, with GetEntity/SetEntity from differant locations.
//it will call fetch service worker to call an extenal resource.
//or use get command for localStorage
function getEntity(entity, entityLocation) {
    sw = arguments.callee.name;
   // console.log(sw);
    var eip = document.getElementsByTagName(entity)[0];
    return eip;
}

function processEntity(eip,output){
    sw = arguments.callee.name; 
    console.log(sw);//console.log(sw,eip,output);
    if (!response) { var response = {}; } 
    if (eip) {
        if (typeof eip === 'object' && !eip.length) {
           // console.log("Object herehere",eip);
            var response = iterateObj(eip);
        } else if (eip.length) {
          //  console.log("Arrayhere",eip);
            var response = iterateArr(eip);

        } else {
          //  console.log("unknownEntity",eip);
        }
    }
  //  console.log("condustors Response",response);
    //return response;
    return (output) ? JSON.stringify(response) : response;
}

function iterateObj(obj, nodeOut, recurse, nextSw) {
    if (!response) { var response = {}; }
    sw = arguments.callee.name;
    //  console.log(i, sw, obj, getEntityType(obj), obj.nodeType); i++;
    for (let key in obj) {
        if (obj[key]) {
            // response[key] = obj[key];
            //console.log(i, key, obj[key]); i++;
            if (obj.hasOwnProperty(key) || typeof obj[key] != 'function' ) {//In case we need to recurse
                // console.log("obj found >>", key, obj[key], getEntityType(obj[key]), obj[key].nodeType,typeof obj[key]);
                //iterateEntity(obj, obj[key], nodeOut);
                response[key] = obj[key];
               // console.log( "key in Object",obj,key, obj[key]);
            }

            //to add an if the value/property is an object eg. Attributes. Child Nodes.
        }
    }
   //  console.log("responsefromIteratebj",response);
    return response;
}

function iterateArr(entity, output) { 
    if (!response) { var response = {} }
    sw = arguments.callee.name;
   // console.log(i, sw, entity, getEntityType(entity), typeof entity, entity.nodeType, entity.length); i++;
    for (i = 0; i <= entity.length; i++) {
        if (entity[i]) {
           // console.log("entity in array",entity[i], entity.length, hasChildren(entity), typeof entity);
            // response.set(entity[i]);
            response[i] = entity[i]; 
           // console.log(response);
        }
    }
 //  console.log("responsefrom Arr",response);
   return response;
}

function conductIteration(entity, output, input, sw, keytoFind, itemLength, iteratorResponse) {
    sw = arguments.callee.name;
    // console.log(i,sw, entity, getEntityType(entity), itemLength, entity.nodeType);i++
    if (entity) {
        if (getEntityType(entity).includes("Element")) {
            // console.log(i, "entity is ", getEntityType(entity)); i++;

            var response = iterateObj(entity, output, false, sw);


        } else if (getEntityType(entity).includes("List")) {
            console.log("Listentity is ", getEntityType(entity));
            iterateArr(entity);
        } else if (getEntityType(entity) === 'object') {
            console.log("Objectentity is ", getEntityType(entity));
            iterateObj(entity, output);
        } else if (getEntityType(entity) === 'function') {
            console.log("entity is ", getEntityType(key));
        } else if (isArray(entity)) {
            console.log("entity is ", getEntityType(entity));
            iterateArr();
        } else if (getEntityType(entity).includes("Collection")) {
            console.log("entity is ", entity.__proto__.constructor.name);
            iterateArr(entity);
        } else {
            console.log("Other type of entity", entity);
        }


    }
    return response;
}

function processEntitya(entity,output,process) {
   
    var treeObject = {};
    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(node, nodeObject) {
        nodeObject["name"] = node.nodeName;
        var nodeChildList = node.childNodes;
        var nodeChildren = node.children
        // console.log(node.nodeName,nodeChildList);
        // console.log(node.nodeName,"children",nodeChildren);
        // console.log(node.nodeName,"attributes",node.attributes);
        if (nodeChildList != null) {
            if (nodeChildList.length) {
                nodeObject["content"] = [];
                for (var i = 0; i < nodeChildList.length; i++) {
                    if (nodeChildList[i].nodeType == 3) {
                        nodeObject["content"].push(nodeChildList[i].nodeValue);
                    } else {
                        nodeObject["content"].push({});
                        treeHTML(nodeChildList[i], nodeObject["content"][nodeObject["content"].length -1]);
                    }
                }
            }
        }
        if (node.attributes != null) {
            if (node.attributes.length) {
                nodeObject["attributes"] = {};
                for (var i = 0; i < node.attributes.length; i++) {
                    nodeObject["attributes"][node.attributes[i].nodeName] = node.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(node, treeObject);
    console.log(treeObject);
    return (output) ? JSON.stringify(treeObject) : treeObject;
}
