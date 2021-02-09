//referance Code https://github.com/azaslavsky/domJSON/blob/master/src/domJSON.js

var element = document.getElementsByTagName("html")[0];
var jsonOutput = createJsonFromNode(element);
console.log(jsonOutput);

//This function set's a key from the subject to entity
function set(output, input, key) {

    if (!getEntityType(output).includes("HTML")) {
        output[input[key].name] = input[key].value;
    }

    //console.log(input, getEntityType(input),output);

    if (getEntityType(output).includes("HTML")) {
        // console.log(input, output);       
        if (key === 'href' || key === 'src') {

            if (isValidUrl(input[key]) === false) {
                //console.log("link found", element, key);
                var absoluteUrl = toAbsolute(input[key]);
                //  console.log(absoluteUrl);
                output.setAttribute(key, absoluteUrl);
                //element.removeAttribute(key);
                //console.log(element);
            }
        } else {
            output.setAttribute(key, input[key]);
        }

    }

    return output;
}
//iterates all the keys
//Options to be added
function iterarateObj(input, output, previousSW) {
    if (!output) { var output = {}; }
    for (var key in input) {
        if (input[key] && input[key].value !== undefined) {
            output = set(output, input, key);
        }
        if (previousSW === 'createJson2Html') {
            output = set(output, input, key);
        } 
    }
   
    return output;
}
function iterateArray(input, output, previousSW) {
    // console.log(entity);
    if (!output) { var output = []; }
    input.forEach(function (element, index) {
        // console.log(input[index]);
        if (previousSW === 'createJsonFromNode') {
            if (input[index].nodeType === Node.ELEMENT_NODE || input[index].nodeType === Node.TEXT_NODE) {
                output.push(createJsonFromNode(input[index]));
            }
        }

        if (previousSW === 'createJson2Html') {
            // console.log("fromCreateJson  inside", output, key,input[key]);
            output.appendChild(createJson2Html(input[index]));
            // output = set(output, input, key);
        }
    });
    return output;
}
function createJsonFromNode(nodeEl) {
    // console.log(nodeEl.tagName.toLowerCase());
    var node = {
        tagName: nodeEl.tagName,
        name: nodeEl.name,
        attributes: iterarateObj(nodeEl.attributes, node, arguments.callee.name),
        childNodes: iterateArray(nodeEl.childNodes, node, arguments.callee.name),
        //  parent: nodeEl.parentNode.tagName,
        nodeType: nodeEl.nodeType,
        nodeValue: nodeEl.nodeValue
    }
    return node;
}

function createJson2Html(input) {
    //console.log(entity);
    if (input.nodeType === 1) {
        var output = document.createElement(input.tagName);
        //   htmlResponse.setAttribute(entity.parent, entity.parent.value)
        // console.log("HTML Attributes",input.attributes, output);
        //  sw = arguments.callee.name;
        iterarateObj(input.attributes, output, arguments.callee.name);
        //
        if (input.childNodes) {

            iterateArray(input.childNodes, output, arguments.callee.name);
            // console.log(temp);
            // htmlResponse.appendChild(temp);
        }
    }
    if (input.nodeType === 3) {
        //  console.log(entity);
        var output = document.createTextNode(input.nodeValue);
    }

    return output;
}
//This function validates a valid Url, Returns True or false
function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }

    return true;
}
//This function validates a valid Url, Returns True or false
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
//helper Function to get the name protoNameof an entity
function getEntityType(entity) {
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}
var htmlOutput = createJson2Html(jsonOutput);
console.log(htmlOutput);




var windowFeatures = "menubar=no,location=no,toolbar=no,resizable=yes,scrollbars=yes,status=no";
var myWindow = window.open("", windowFeatures);

var tempHtml = myWindow.document.getElementsByTagName("html")[0];
myWindow.document.replaceChild(htmlOutput, tempHtml);


