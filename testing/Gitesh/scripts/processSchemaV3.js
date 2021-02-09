var schema5 = {
    definitions: {
      hobby: {
        type: "object",
        properties: {
          name: { type: "string" },
          durationInMonth: { type: "integer" },
        }
      }
    },
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: [
      "firstName",
      "lastName"
    ],
    properties: {
      firstName: {
        type: "string",
        title: "First name"
      },
      lastName: {
        type: "string",
        title: "Last name"
      },
      age: {
        type: "integer",
        title: "Age",
      },
      bio: {
        type: "string",
        title: "Bio",
      },
      country: {
        type: "string",
        title: "Country" 
      },
      state: {
        type: "string",
        title: "State" 
      },
      zip: {
        type: "string",
        title: "ZIP" 
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10
      },
      work: { "$ref": "#/definitions/hobby" },
      hobbies: {
          type: "array",
          items: { "$ref": "#/definitions/hobby" }
      }
    }
  }
var formElements = ["button", 'datalist', "div", 'fieldset', "form", "input", "label", 'legend', 'li', 'meter', 'optgroup', "option", 'output', 'progress', "select", "span", "textarea", "ul"];
var properties = ["type", "title", "class", "id", "name", "value", "required", "default", "readOnly"]
var supportedType = [ "string","number","array","integer","boolean","object"]

var slightlyComplex = {
    "schema": {
        "message": {
            "input": "string",
            "label": "Message"
        },
        "author": {
            "type": "object",
            "label": "Author",
            "properties": {
                "name": {
                    "input": "string",
                    "label": "Name"
                },
                "gender": {
                    "label": "Gender",
                    "select": "string",
                    "option": [
                        "male",
                        "female",
                        "alien"
                    ],
                    "span": "Your gender"
                },
                "magic": {
                    "input": "integer",
                    "label": "Magic number",
                    "default": 42
                }
            }
        }
    }
}

var toolbar = {

    "topNav": [
            {
                "button": "new"
            },
            { "button": "new2" },
            { "button": "new3" }
        ]
}

var a = {
    div:{
        'class': "preference",
        "label": "do you like cheese",
        'type' : "checkBox"
    }

}

class processSchema { 

    static schema2(input, output,key,value) {
        if (!Object.keys(input).length) return;// if there's no keys, then the call returns undefined
        switch (input?.constructor) {
            case Object:
                processSchema.processObj(input, output,key,value);
            case Array:
                processSchema.processArr(input, output,key,value);
            case String:
            //processSchema.processString(input, output);
            default:
            // return
        }
        return output;
    }
    static create(input, output,key,value) { 
        if (getEntityType(output).includes("HTML")) { //Only HTML creation
        //    console.log("got request for  from create", input, output, key, value)

            if (getEntityType(value) === 'Object') {//An object property generates a fieldset, i.e. a <fieldset> element.
           //   console.log("creating div object", key, value)
                var nwEle = document.createElement("div");
                nwEle.className = input;
              //  nwEle.className = "createdFromObject";
            } else if (getEntityType(value) === 'Array') {
                var nwEle = document.createElement(input);
                nwEle.className = "createdFromArrayProperty";
            
            } else if (getEntityType(value) === 'String' || getEntityType(value) === 'Boolean') {
           //     console.log("create Request property for ", input, output, key, value, formElements.indexOf(input))
                if (formElements.indexOf(input) < 0) { //check if the input is a formElement by crosschecking in the define array.
                    var nwEle = document.createElement("div");
                    nwEle.className = input;
              // console.log("divElement", nwEle);
                } else {
                 
                //    console.log("create Request property for ", input, output, key, value, formElements.indexOf(input))
                    var nwEle = document.createElement(input);
                    nwEle.className = "createdFromStringProperty";                  
                    var content = document.createTextNode(value);
                    nwEle.appendChild(content);
                  //  nwEle.setAttribute("value", key);
                //    console.log("formElement", nwEle);
                    
                }
            } else {
                console.log("strays")
            }
         // console.log("new element from create",nwEle)
            return nwEle;
        }
    }
    static setAttributes(input, output, key) { 

    }

    static appendChild(input, output, key ,value) { 
        
        if (getEntityType(output).includes("HTML")) {

            if (getEntityType(input).includes("HTML") && typeof value !== 'string') {
                output.appendChild(input);
            }
            if (getEntityType(input).includes("String") && typeof value !== 'string') {
             //   output.appendChild(currentNode);
            }  
        }
    }

    static processObj(input,output,key,value) { 

        for (var key in input) {
            if (getEntityType(input[key]) === 'Object') {  
             
               // console.log("creating fieldSet object", key, input[key])
               
                var currentNode = processSchema.create(key, output, key, input[key]);
             //  console.log("recived from create",currentNode)
                processSchema.schema2(input[key], currentNode,key,input[key]);
               
                processSchema.appendChild(currentNode, output);

            } else if (getEntityType(input[key]) === 'Array') { 
               
                var currentNode = processSchema.create(key, output, key, input[key]);
              //  console.log("recived from create", currentNode)

                processSchema.schema2(input[key], currentNode, key, input[key]);
                processSchema.appendChild(currentNode, output);

          
            }else if (getEntityType(input[key]) === 'String' || getEntityType(input[key]) === 'Function' || getEntityType(input[key]) === 'Boolean') {                  
            //   console.log("create req property object", key, input[key])
                var currentNode = processSchema.create(key, output, key, input[key]);
                
                if (processSchema.validate(input[key], supportedType, key, input[key], "isOneOf")){ 
                    currentNode.setAttribute("type", input[key]);
                }
                processSchema.appendChild(currentNode, output);
            } else {
                console.log("strays",input,key,value)
            }

        }
        return output;
    }
    static processArr(input, output,key,value) { 

        for (var i = 0; i < input.length; i++) {
            if (getEntityType(input[i]) === 'Object') {
               // console.log("found Object in array", input[i],output)
                
                var currentNode = processSchema.create(key, output, input[i], input[i]);
                //console.log("recived from create",currentNode)
                processSchema.schema2(input[i], currentNode, key, input[i]);

                processSchema.appendChild(currentNode, output);

            } else if (getEntityType(input[i]) === 'Array') {
              //  console.log("found Object in array", input[i])
            } else if (getEntityType(input[i]) === 'String' || getEntityType(input[i]) === 'Function' || getEntityType(input[i]) === 'Boolean') {
                var currentNode = processSchema.create(key, output, input[i], input[i]);
               processSchema.appendChild(currentNode, output);
            } else {
            }
            //            console.log(input[i], getEntityType(input[i]));
         //   processSchema.setAppendEntity(input[i], output, input[i]);


        }



        return output;


    }

    static validate(input, output,key,value,validation) {
      //  console.log("validating", input, output, validation)
            //this condition primarly check for the presence of a keys in any an array, if not present and options [ returns false and update and return position]

        if (validation === 'isOneOf') {
            if (output.indexOf(input) === -1 && typeof input !== null && typeof input !== undefined) {
                return false;
            } else {
                return true;
            }
        } 
    }
}

function getEntityType(entity) {
  //  console.log(entity, Object.getPrototypeOf(entity).constructor.name)
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}


function processTest(e) {
  //  e.preventDefault();
  var in2 = slightlyComplex;
    console.log(in2)
    var outputElement = document.createElement("outputElement");
    console.log(outputElement)
    var outputE = processSchema.schema2(in2, outputElement);
    console.log("outputElement", outputE)
    //  const depth = getMax(outputArray,2);

    // var table = createTable(outputArray);
    // outputJson = arr2(outputArray,{} ,depth);
    // console.log(outputJson);
    //  document.getElementById("output").innerText = JSON.stringify(outputArray);
    document.getElementById("output").appendChild(outputE);
}

processTest();
//document.getElementById("get").addEventListener("click", processTest);


{/* <div class="preference">
    <label for="cheese">Do you like cheese?</label>
    <input type="checkbox" name="cheese" id="cheese">
</div>

<div class="preference">
    <label for="peas">Do you like peas?</label>
    <input type="checkbox" name="peas" id="peas">
</div> */}

