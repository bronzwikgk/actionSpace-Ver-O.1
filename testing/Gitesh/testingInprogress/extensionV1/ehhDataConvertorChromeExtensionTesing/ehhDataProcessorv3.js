/** 
 * Default metadata for a JSON object
 * @private
 * @ignore
 */
var metaData = {
  href: window.location.href || null,
userAgent: window.navigator && window.navigator.userAgent ? window.navigator.userAgent : null,
version: '0.1.2'
};


/** 
* A list of node properties that must be copied if they exist; there is no user option that will remove these
* @private
* @ignore
*/
var required = [
  'tagName',
  'attributes',
  'childNodes',
];
	
	
	
/** 
 * A list of node properties to specifically avoid simply copying; there is no user option that will allow these to be copied directly
 * @private
 * @ignore
 */

 var ignored = [
		'attributes',
		'childNodes',
		'children',
		'classList',
		'dataset',
    'style'
  ];
  
  var requestEntity = {
    resourceLocation : "window",
    resource : "document",
    requestFor : "getElementsByTagName",
    request : {
      requestName : "body",
      required,
      ignored
    }
}
  

var element = document.getElementsByTagName("body")[0];
console.log(element);

//var output = iterateObj(output);

//console.log(output);

function iterateObj(obj, output) { 
  console.log(obj);
  for (var key in obj) {
    if (obj[key]) { 
      eachKey(key, obj[key]);
    } 
  }
}

function eachKey(key,val,output) { 
  console.log("eachKey",key, val);
}



