/**
 * This file has to be further divided into seperate files of their respective class.
 */

// all the json definations / object to be save in seperate folder called Json. Hence this to be moved.
var actionEditor = {
    style: '/*min-height : 200px;*/ width: max-content; border-top: 0px; padding: 21px; overflow: auto; display:grid',
    toolBar: [
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-right"></i>',
            'data-cmd': 'justifyRight'
        },
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-left"></i>',
            'data-cmd': 'justifyLeft'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-center"></i>',
            'data-cmd': 'justifyCenter'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-justify"></i>',
            'data-cmd': 'justifyFull'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-bold"></i>',
            'data-cmd': 'Bold'
        },
        {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-italic"></i>',
            "data-cmd": 'italic'

        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-underline"></i>',
            "data-cmd": 'underline'

        },
        {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-list-ul"></i>',
            "data-cmd": 'insertUnorderedList'

        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-list-ol"></i>',
            "data-cmd": 'insertOrderedList'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-link"></i>',
            "data-cmd": 'createLink'
        }, {

            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-code"></i>',
            "data-cmd": 'showCode'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-redo"></i>',
            "data-cmd": 'redo'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-undo"></i>',
            "data-cmd": 'undo'
        }
    ],
    actionEditorBlock: {
        name: 'div',
        contentEditable: true,
        class: 'actionEditor-block',
        id: 'actionEditor-block',
        lineNumbers: true,
        innerText: "Write whatever you can think of...",
        //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
        //output: ['self', 'output'],
        state: 'idle',

    },
}
//this to be deleted and validated with attributes of live elements on runtime
var htmlAttributesList = ['name', 'label', 'onclick', 'lineNumbers', 'class', 'id', 'text', 'title', 'content', 'value', 'type', 'data-cmd']

/**
 * Ideally this should extend controller class and should be renamed to event Contoller. 
 * Event Controller registers/executes/conduct all the event in the actionSpace System
 */
class EventEmitter {
    constructor() {
        this._events = {};
    }

    on(evt, listener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, arg) {
        (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    }
}

/**
 * Do we need both entity  and entity Model Class??
 * 
 */
class Entity {
    constructor(input, output) {
        this.entity = process.processReq(input, output);
        console.log(this);
    }

    static create(input, output, key, value, callback, callbackClass) {
        // console.log('create request for ',output,key)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
            // var response = Object.create(output.constructor.prototype)
            var response = document.createElement(key);
            // Entity.set(input, response, 'id', key + entityIndex.next().value);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }

        if (!response) console.log("no response", output);
        return response;
    }

    static append(input, output, key, value, callback, callbackClass) {
        console.log('appending', input, output)

        if (operate.is(output).includes("HTML")) { //Onl
            console.log(output)// y HTML creation
            var response = output.appendChild(input);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            // console.log("append request for ",input,output)
            output[key] = input;
            var response = output;
            //var response = document.createElement(key);

        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            // console.log("append request for ",input,output)
            output.push(input);
            var response = output;
            //var response = document.createElement(key);

        }


        // console.log('appended',response)
        // console.log(document.getElementsByTagName('toolbar'))
        return response;
    }

    static set(input, output, key, value, callback, callbackClass) {
        // console.log("setting",key, value,"in",output)
        if (operate.is(output).includes("HTML")) { //Only HTML creation

            if (operate.isIn(key, htmlAttributesList)) {
                //console.log("setting",key, value,"in",output)
                output.setAttribute(key, value)
                //console.log(output);
            } else {
                //var buffer = output;
                output[key] = input[key];
                //buffer=output;

            }

        }
        return output;
    }
}


class entityModel extends EventEmitter {

    constructor(input, output) {
        super();
        this.input = input;
        this.output = output;
    }

    create() {
        //    TODO;
    }

    append() {
        //    TODO;
    }

    set() {
        //    TODO;
    }

    get() {
        //    TODO;
    }

    update() {
        //    TODO;
    }

    delete() {
        //    TODO;
    }


}

class entityView extends EventEmitter {
    constructor(model, elements) {
        super();
        this.model = model
        this.elements = elements
        let buttons = this.elements.buttons
        for (let i = 0; i < buttons.length; ++i) {
            buttons[i].addEventListener('click', () => {
                let cmd = buttons[i].getAttribute('data-cmd');
                if (cmd === "createLink") {
                    this.emit("createLink", cmd)
                } else {
                    this.emit("other", cmd)
                    console.log(cmd)
                }
                if (cmd === "showCode") {
                    this.emit("showCode")
                }
            })
        }


    }

    updateDomContent(cmd) {
        if (cmd === "createLink") {
            let url = prompt("Enter Url");
            this.elements.document.execCommand(cmd, true, url) // Since View doesnt perform any action on users data directly, Ideally this should be part of controller class and should be handled by event controller

        } else
            this.elements.document.execCommand(cmd, false, null)
    }

    updateDom(cmd) {
        // TODO;
    }

    getDom() {
        // TODO;
    }

    getDomContent() {
        return this.elements.editor.innerHTML;
    }

}

class entityController {

    constructor(ehhView, model) {
        this._model = model
        this.ehhView = ehhView
        ehhView.on("createLink", cmd => this.createLink(cmd))
        ehhView.on("showCode", () => this.showCode())
        ehhView.on("other", command => this.otherActions(command))
    }

    createLink(cmd) {
        console.log(cmd)
        this.ehhView.updateDomContent(cmd)
    }

    showCode() {
        //TODO(send this to backend)
        alert('check Console')
        let htmlFromEditor = this.ehhView.getDomContent()
        // console.log(this.ehhView.getDomContent())
    }

    otherActions(command) {
        this.ehhView.updateDomContent(command)
        console.log(`other ${command}`)

    }
}


ehhAppOutput = document.createElement('ehhOutput');
const temp = new Entity(actionEditor, ehhAppOutput);
//newBlock = Entity.create(actionEditor.actionEditorBlock,temp.entity)
//console.log(newBlock)
//console.log(temp.entity)
document.getElementsByTagName('body')[0].appendChild(temp.entity);
console.log("all set and done")
//console.log(temp.output);


const model = new entityModel(temp, null),
    view = new entityView(model, {
        'buttons': document.getElementsByTagName('toolbar')[0].children,
        'editor': document.getElementsByTagName('ehhoutput')[0].children[1],
        'document': document
    }),
    controller = new entityController(view, model)
