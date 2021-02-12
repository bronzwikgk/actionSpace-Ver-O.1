var actionEditor = {
    style: 'min-height : 200px; width: 400px; border-top: 0px; padding: 21px; overflow: auto;',
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
    toolBar: [
        {
            name: 'button',
            type: 'div',
            'innerText': 'add',
            'id': 'add',
            'onclick': 'console.log("addButtonClicked")'
        },
        {
            name: 'button',
            type: 'div',
            'innerText': 'BTN',
            'onclick': 'console.log("i was clicked")'
        },
        {
            name: 'button',
            type: 'button',
            'innerText': 'BTN',
            'onclick': 'console.log("i was clicked")'
        },
        {
            name: 'button',
            type: 'button',
            'innerText': 'BTN',
            'onclick': 'console.log("i was clicked")'
        },
        {
            name: 'button',
            type: 'button',
            'innerText': 'BTN',
            'onclick': 'console.log("i was clicked")'
        },

    ]
}