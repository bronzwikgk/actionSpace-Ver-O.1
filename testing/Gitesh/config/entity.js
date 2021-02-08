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
        { "button": "new" },
        { "button": "new2" },
        { "button": "new3" }
    ]
}

var div = {
    'nodeType':1,
        'class': "preference",
        "label": "do you like cheese",
        'type': "checkBox"
    }

