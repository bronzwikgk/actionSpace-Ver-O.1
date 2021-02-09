
//helper Function to get the name protoNameof an entity
function getEntityType(entity) {
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}

var elementCollection = document.getElementsByTagName("html");

//Returns and ArrayObject
function iterateHTMLCollection(elementCollect, json) {
    console.log("HTMLCollection")
    var ArrayObject = []
    for (var i = 0; i < elementCollect.length; i++) {
        var element = elementCollect[i]

        var treeObject = {};

        function treeHTML(element, object) {
            object["type"] = element.nodeName;
            var nodeList = element.childNodes;
            if (nodeList != null) {
                if (nodeList.length) {
                    object["content"] = [];
                    for (var i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].nodeType == 3) {
                            object["content"].push(nodeList[i].nodeValue);
                        } else {
                            object["content"].push({});
                            treeHTML(nodeList[i], object["content"][object["content"].length - 1]);
                        }
                    }
                }
            }
            if (element.attributes != null) {
                if (element.attributes.length) {
                    object["attributes"] = {};
                    for (var i = 0; i < element.attributes.length; i++) {
                        object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                    }
                }
            }
        }

        treeHTML(element, treeObject);

        ArrayObject.push((json) ? JSON.stringify(treeObject) : treeObject);


    }
    console.log(JSON.stringify(ArrayObject));
    return ArrayObject;

}



const isObject = function (val) {
    if (val === null) {
        return false;
    }
    return (typeof val === 'object');
};

function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}


function transverseEntity(entity, iteratorResponse, all) {
   
    //console.log("response req",responseTypeRequested);
    //console.log(getEntityType(entity));
    //console.log(entity.hasChildNodes());

    if (entity) {  

            for (var key in entity) {
                
                if (entity[key]) { //  console.log(key, entity[key], typeof entity[key], getEntityType(entity[key]), entity[key].__proto__.constructor.name);
                     
                   // console.log(entity, getEntityType(entity));
                    if (getEntityType(entity[key]).includes("HTML")){
                        
                        if (!getEntityType(entity[key]).includes("Collection")) {//filtering Collection, later to be sent to array.
                        
                        console.log("Caught Html in child", key, entity[key], getEntityType(entity[key]), typeof entity[key]);
                        
                         tranverseHtml(entity[key],key);

                    }

                    }else{
                        if (isObject(entity[key])){
                         // console.log("Object entity is ",key, entity[key],isObject(entity[key]),typeof entity[key]);
                          if(key ==='style' && entity[key]){
                          //  console.log("style Key Found",key,entity[key]);
                              traverseObject(entity[key], key);
                            }                         

                        }
                    }
                    if (isArray(entity[key]) || getEntityType(entity[key]).includes("Collection")) {
                          // console.log("Found Array Entity,Sending For Iteration", key, entity[key], isObject(entity[key]), typeof entity[key],getEntityType(entity[key]));
                            traverseArray(entity[key],key);
                        }
                    
                 
                }     
            }
       // console.log("current entity", entity);
    }

}


function traverseObject(obj, level) {
   
   
    for (var key in obj) {

       // console.log("Found Object ", key, obj[key], isObject(obj[key]), typeof obj[key]);
        if (obj[key] && isObject(obj[key]) && typeof obj[key] !== 'function' ) {
        // console.log("Found Object ", key, obj[key], isObject(obj[key]), typeof obj[key]);
            traverseObject(obj[key]);

        } else {

           

        }

    }
}


function traverseArray(arr, key) {
  //  console.log("transversing Array", arr, arr.length);
    if(arr.length){
    for(i=0;i<arr.length;i++){
     //   console.log("found Array ",arr[i],key);
        transverseEntity(arr[i]);
        }
    }
}

