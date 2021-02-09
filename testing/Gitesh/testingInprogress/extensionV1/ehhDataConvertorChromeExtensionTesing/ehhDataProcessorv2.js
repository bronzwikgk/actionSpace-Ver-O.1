var elementCollection = document.getElementsByTagName("ul");
//console.log(getEntityType(elementCollection),"type of", typeof elementCollection, "items.length",elementCollection.length);
var node = elementCollection.item(0);
//console.log("node",node,"type of", typeof node, getEntityType(node));
//console.log(node.attributes.length);
//console.log(node.nodeName,node.nodeType,node.dataset,node.nodeValue,node.childNodes,node.hasAttributes());
output = {};
var request = {
    'request': {
        'nodeName': "get",
        "nodeValue": "get",
        'nodeType': "get",
        'id': "get",
        "attributes": "get",
        "childNodes": "get",
        "parentNode": "get"
    }
 }


 
var processedEntity = iterationConductor2(elementCollection, output, "json");

console.log("output is >>>>",processedEntity);

function iterationConductor2(entity, output, outputType){
    //sw = arguments.callee.name;
     if (!response) { var response = {}; } 
      //console.log(sw, entity, getEntityType(entity),typeof entity, entity.nodeType,entity.length);
    if (entity) {
        if (typeof entity === 'object' && !entity.length) {
           // console.log("Object here >>",entity);
            var response = iterateObject(entity);
        } else if (entity.length) {
           //console.log("Arrayhere", entity);
            var response = iterateArr(entity);
        } else {
            console.log("unknownEntity",entity);
        }
    }
    //console.log("conductors Response",response);
   return (output) ? JSON.stringify(response) : response;
   // return response;
}

//This function iteratorates an object and calls back a function with the passing parameter.
function iterateObject(entity, options, callback,buffer1) {
    if (!response) { var response = {}; } 
   // sw = arguments.callee.name;
    //console.log(i, sw, entity, getEntityType(entity), entity.nodeType); i++;
    for (let key in entity) {
        if (entity[key]) {
            //console.log(entity[key]);
            if(typeof entity[key] === 'object'){
            //console.log("obj found >>", key, entity[key], getEntityType(entity[key]), entity[key].nodeType, typeof entity[key]);
               // iterateObject(entity[key],buffer1)
            }else if(entity[key].length && typeof entity[key] != 'function'){
               // console.log("Array Found >>", key, entity[key]);
            } else if(typeof entity[key] === 'function'){
               // console.log("function Found >>", key, entity[key]);
            }else if (entity.hasOwnProperty(key) || typeof entity[key] != 'function') {//In case we need to recurse
                response[key] = entity[key];
                //console.log("value found",key, response[key]);
            }
        }
//     
    }
   // console.log("response Returned from Iterate Object",response);
    return response;
}

function iterateArr(entity, output) {
    if (!response) { var response = {} }
    sw = arguments.callee.name;
   // console.log(i, sw, entity, getEntityType(entity), typeof entity, entity.nodeType, entity.length); i++;
    for (i = 0; i <= entity.length; i++) {
        if (entity[i]) {
           // response.set(entity[i]);
            if (typeof entity[i] === 'object') {
                console.log("object found in Array", typeof entity[i], entity[i]);
                // response[i] = entity[i]; 
                //var response = iterationConductor(entity[i]);
            } else if(typeof entity[i] === 'string'){
                response[i] = entity[i]; 
                console.log("ArrayIteration",response[i]);            
            
            }
        }
    }
   console.log("responsefrom Arr",response);
return response;
}

function executeOnEntity(entity,callbackParameter,output){


    
}

function processEntity(entity,output,process) {
   
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



function getEntityType(entity) {
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}


function checkObject(obj){
    return Object.prototype.toString.call(obj) !== '[object Object]';
}


