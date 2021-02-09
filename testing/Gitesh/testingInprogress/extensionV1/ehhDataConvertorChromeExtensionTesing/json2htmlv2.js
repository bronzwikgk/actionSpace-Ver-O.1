class JSON2HTML {
  static get selfCloseTags() {
    return [
      'area', 'base', 'br', 'col', 'embed', 'hr',
      'img', 'input', 'link', 'meta', 'param', 'source',
      'track', 'wbr', 'command', 'keygen', 'menuitem',
    ];
  }

  static build(json) {
   // console.log("here");
  //  if (!json || !json.tag) return '';
    const attributes = JSON2HTMLBuilder.attributes(json);
  
    if (JSON2HTMLBuilder.isSelfCloseTag(json)) {
      return `<${json.tag}${attributes}/>`;
    }
    const children = JSON2HTMLBuilder.children(json);
    return `<${json.tag}${attributes}>${children}</${json.tag}>`;
  }

  static unbuild(html) {
   // console.log(html);
   
   // const el = document.createElement('html');
   // el.innerHTML = html;
  //  const body = el.querySelector('body');
   // if (!body) return {};
  //  const [first] = body.children;
   // if (!first) return {};
    //console.log(html);
    if (!html) return {};
    return JSON2HTMLUnbuilder.node2json(html);
  }
}

class JSON2HTMLBuilder {
  static attributes(json) {
    if (!json.attributes) return '';
    let html = '';
    const keys = Object.keys(json.attributes);
  //  console.log(keys);
    for (const index in keys) {
      if ({}.hasOwnProperty.call(keys, index)) {
        html += ` ${keys[index]}="${json.attributes[keys[index]]}"`;
      }
    }
    console.log(html);
    return html;
  }

  static children(json) {
    if (!json.children) return '';
    let html = '';
    for (const index in json.children) {
      if ({}.hasOwnProperty.call(json.children, index)) {
        if (typeof json.children[index] == 'object') {
          html += JSON2HTML.build(json.children[index]);
        } else {
          html +=json.children[index];
        }
      }
    }
    return html;
  }

  static isSelfCloseTag(json) {
    return (JSON2HTML.selfCloseTags.indexOf(json.tag)>-1);
  }
};


var element = document.getElementsByTagName("body")[0];
var jsonOutput = getNode(element);
console.log(jsonOutput);

var htmlOutput = JSON2HTML.build(jsonOutput);
console.log(htmlOutput);

//returns all the key : Value Pair inside an object as JSON Object
//Options to be added
function getObj(entity) { 
  if (!getKeyResponse) { var getKeyResponse = {}; }
  for (var key in entity) { 

    if(entity[key]){getKeyResponse[entity[key].name] = entity[key].value};
    //console.log(getKeyResponse);
  }
 // console.log("getKey Response",JSON.stringify(getKeyResponse));
  return getKeyResponse;
}

function getArray(entity) { 
 // console.log(entity);
  if (!arrayResponse) { var arrayResponse = []; }

  entity.forEach(function (element, index) {
   // console.log(entity[index], entity[index].nodeType);
    if (entity[index].nodeType === Node.ELEMENT_NODE ) {
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
    return {
      tag: nodeEl.tagName,
      name: nodeEl.name,
      value: nodeEl.value,
      attributes: getObj(nodeEl.attributes),
      childNodes: getArray(nodeEl.childNodes),
      parent: nodeEl.parentNode.tagName,
      nodeType: nodeEl.nodeType
    };


}



/**
* Create a node based on a given nodeType
* @param {number} type The type of DOM Node (only the integers 1, 3, 7, 8, 9, 10, 11 are valid, see https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType); currently, only nodeTypes 1,3, and 11 have been tested and are officially supported
* @param {DocumentFragment} doc The document fragment to which this newly created DOM Node will be added
* @param {Object} data The saved DOM properties that are part of the JSON representation of this DOM Node
* @private
* @ignore
*/
var createNode = function (type, doc, data) {
  if (doc instanceof DocumentFragment) {
    doc = doc.ownerDocument;
  }
  switch (type) {
    case 1: //HTMLElement
      if (typeof data.tagName === 'string') {
        return doc.createElement(data.tagName);
      }
      return false;

    case 3: //Text Node
      if (typeof data.nodeValue === 'string' && data.nodeValue.length) {
        return doc.createTextNode(data.nodeValue);
      }
      return doc.createTextNode('');

    case 7: //Processing Instruction
      if (data.hasOwnProperty('target') && data.hasOwnProperty('data')) {
        return doc.createProcessingInstruction(data.target, data.data);
      }
      return false;

    case 8: //Comment Node
      if (typeof data.nodeValue === 'string') {
        return doc.createComment(data.nodeValue);
      }
      return doc.createComment('');

    case 9: //HTML Document
      return doc.implementation.createHTMLDocument(data);

    case 11: //Document Fragment
      return doc;

    default: //Failed
      return false;
  }
};

