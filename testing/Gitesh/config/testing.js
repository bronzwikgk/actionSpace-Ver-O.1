
var schema = {
    'Name': {
        "title": "Name",
        "description": "Nickname allowed",
        "type": "input"
    },
    'Gender': {
        "title": "Gender",
        "description": "Your gender",
        "type": "text",
        //'value':"welcome",
        "select": [
            {value:"male"},
            {vaue:"female"},
            {value:"alien"}
        ]
    }
}


var requestEntity = {
    entity: 'input',
    class: 'toolBar',
    type: 'button',
    value: "do you like cheese"
}

var request = {
    input: 'requestEntity',
    output: document.getElementsByTagName('body')[0],
    callback: 'create',
    callbackClass: 'entity'
}



var tempReq = {
    div:{
        name: 'div',
        type: 'input',
        menu:{
            type:'div',
            name:'menu',
        }
    },
    ac2:{
        name: 'div',
        type: 'div',
        menu:{
            type:'div',
            name:'menu',
        }
    }
}
var inputObjA = {
    "schema": {
        "field": {
            "input": "string",
            "lable": "A field"
        }
    },
    "form": [
        {
            "key": "field"
        },
        {
            "button": "submit",
            "lable": "Submit"
        }
    ]
}


var inputObjB = {
    "schema": {
        "field": {
            "input": "string",
            "lable": "A field"
        }
    },
    "form": [
        {
            "key": "field"
        },
        {
            "button": "submit",
            "lable": "Submit"
        }
    ]
}


