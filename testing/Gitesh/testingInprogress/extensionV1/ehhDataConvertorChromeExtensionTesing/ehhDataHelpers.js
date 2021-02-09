
    


    /**
	 * Do a boolean intersection between an array/object and a filter array
	 * @param {Object|string[]} item The object/array that will be intersected with the filter
	 * @param {boolean|string[]} filter Specifies which properties to select from the "item" (or element to keep, if "item is an array")
	 * @private
	 * @ignore
	*/
	var boolInter = function(item, filter) {
		var output;
		if (item instanceof Array) {
			output = unique(item.filter(function(val) { return filter.indexOf(val) > -1; }));
		} else {
			output = {};
			for (var f in filter) {
				if (item.hasOwnProperty(filter[f])) {
					output[filter[f]] = item[filter[f]];
				}
			}
		}
		return output;
    };
    


    /**
	 * Create a node based on a given nodeType
	 * @param {number} type The type of DOM Node (only the integers 1, 3, 7, 8, 9, 10, 11 are valid, see https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType); currently, only nodeTypes 1,3, and 11 have been tested and are officially supported
	 * @param {DocumentFragment} doc The document fragment to which this newly created DOM Node will be added
	 * @param {Object} data The saved DOM properties that are part of the JSON representation of this DOM Node
	 * @private
	 * @ignore
	*/
	var createNode = function(type, doc, data) {
		if (doc instanceof DocumentFragment) {
			doc = doc.ownerDocument;
		}
		switch(type) {
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




function addElement () { 
	// create a new div element 
	const newDiv = document.createElement("div"); 
	
	// and give it some content 
	const newContent = document.createTextNode("Hi there and greetings!"); 
	
	// add the text node to the newly created div
	newDiv.appendChild(newContent);  
  
	// add the newly created element and its content into the DOM 
	const currentDiv = document.getElementById("div1"); 
	document.body.insertBefore(newDiv, currentDiv); 
	console.log(JSON.stringify(newDiv));
  }
  
