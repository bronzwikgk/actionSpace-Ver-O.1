
//Major componenet being
// Process entity, to handle the Input Request nested Json Object, with key as the requested Key and values being the function to be called at the end
//of each node. These function can be rules
//iteration Condutor, which simply sends an enity to it's current iterator.
//iterate Array and Iterate Obj [ needs to be build with recuse and depth argument]
//on Each Node kind of a function which calls the function /sw passed to it from the request Object


var i = 0;
nodeOut = {};
console.log(i, nodeOut); i++;
output = {};
var entity2Search = "body";
console.log("processing Entity =>", entity2Search);

var request = {
    'request' : {
        'localName': "get",
        'tagName': "get",
        'nodeName': "get",
        "nodeValue":"",
        'nodeType': "get",
        'id': "get",
        "attributes": "get",
        "childNodes": "get",
        "CSSRuleSelector": "",
        "children": ""
        
 },
    'options': {
        'values': true,
        'ignore': ['function'],
        'rules': {
            "get&ApplyRule1": 'getNameKey',
            "getNonEmptyValues": 'ifvaluenotblank'
        }
    }
}

var entity2Process = getElement(entity2Search);
console.log("entity 2 process",entity2Process);
var tmpo = Object.entries(entity2Process);
console.log("tmpo>>",tmpo);
//console.log("temp",entity2Process.nodeName,entity2Process.nodeType, entity2Process);
var output = processRequest(entity2Process, request, output, true);
console.log("Output",output);


//this function takes a request [ entity | string ], and for each key in request processes it.
function processRequest(entity2Process, request, output, values) { //Entity to be part of Request Json
    if (!response) { var response = {};}
    //var eip = document.getElementsByTagName(entity)[0];
    console.log("processing Entity",entity2Process);
    console.log("processing Request",request);
    var eip = entity2Process;
   // console.log(eip);
    for (key in request.request) {
        console.log(key);
        if (eip[key]) {
            if (values === true) {
                if ( typeof eip[key] === 'object' || typeof eip[key] != 'string') {
                    console.log("found Object/Array in value", key, eip[key],eip[key].length, typeof eip[key]);
                    var temp = iterationConductor(eip[key], "entries");
                    console.log(response);
                    console.log(temp);
                    response[key] = temp;
                } else {
                    console.log("found Something", key, eip[key]);
                    response[key] = eip[key]; 
                }
            } else {
               console.log("found Something here as well", key, eip[key]);
                 response[key] = eip[key];
            }

        }
    }
    //return response;
    console.log("response from Process : >>>", response);
    return (output) ? JSON.stringify(response) : response;

}

function iterationConductor(entity, request, output, values, iteratorResponse) {
    sw = arguments.callee.name;
    if (!response) { var response = {}; } 
 //  console.log(i, sw, entity, getEntityType(entity),typeof entity, entity.nodeType,entity.length); i++;
    if (entity) {
        if (typeof entity === 'object' && !entity.length) {
           // console.log("Object herehere",entity);
            var response = iterateObject(entity);
        } else if (entity.length) {
            //console.log("Arrayhere");
            var response = iterateArr(entity,"entries");
        } else {
            //console.log("unknownEntity",entity);
        }

    }
    //console.log("condustors Response",response);
    return response;
}



function iterateObject(entity, options, callback) {
    if (!response) { var response = {}; } 
    sw = arguments.callee.name;
   // console.log(i, sw, entity, getEntityType(entity), entity.nodeType); i++;

    for (let key in entity) { 
        if (entity[key]) {

            if (entity.hasOwnProperty(key) || typeof entity[key] != 'function') {//In case we need to recurse
                //console.log("obj found >>", key, entity[key], getEntityType(entity[key]), entity[key].nodeType, typeof entity[key]);
    
                response[key] = entity[key];
                //console.log(JSON.stringify(response));
                // console.log(i, key, obj[key]); i++;
            }
        }
//     
    }
    //console.log("response Returned from Iterate Object",response);
    return response;
}


function getElement(entity, output) {
    var eip = document.getElementsByTagName(entity)[0];
   // var element = iterationConductor(eip, output, entity, "find");
   // console.log(i,"element", element); i++
   console.log("element from get",eip, typeof eip);
    return eip;

}
//this is like a callback function to be called for Each element or Key
//Get||Set||Update||Delete||Match|Find||
function exeOnEachEntity() { 

}

function getEntityType(entity) {
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}

function iterateObj(obj, nodeOut, recurse, nextSw) {
    if (!response) { var response = {}; }
    sw = arguments.callee.name;
     // console.log(i, sw, obj, getEntityType(obj), obj.nodeType); i++;
    for (let key in obj) {
        if (obj[key]) {
            // response[key] = obj[key];
            //console.log(i, key, obj[key]); i++;
            if (obj.hasOwnProperty(key) || typeof obj[key] != 'function' ) {//In case we need to recurse
                 //console.log("obj found >>", key, obj[key], getEntityType(obj[key]), obj[key].nodeType,typeof obj[key]);
                //iterateEntity(obj, obj[key], nodeOut);
                response[key] = obj[key];
               //console.log("IterateObj",key, obj[key]);
            }
        }
    }
    //  console.log(response);
    return response;
}


function iterateArr(entity, output) { 

    if (!response) { var response = {} }
    sw = arguments.callee.name;
   // console.log(i, sw, entity, getEntityType(entity), typeof entity, entity.nodeType, entity.length); i++;
    for (i = 0; i <= entity.length; i++) {
        if (entity[i]) {
           // response.set(entity[i]);
            response[i] = entity[i]; 
           // console.log(response);
        }
    }
   //console.log("responsefrom Arr",response);
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