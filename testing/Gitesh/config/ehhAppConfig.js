const typeofDocuments = {

}

const ModelEntitytype = {
    htmlElement: {
        methods: {
            createElement: parent.createElement,
            appendElement: parent.appendChild,
            getElementById: parent.getElementById,
            getElementAttribute: parent.getAttribute,
            'objectType': 'operate.is',
        },
        attributes: {
            contentEditable: Boolean,
            
        },
        class: {},
        'childNodes'
    },
    object: {
        method: {
            create: Object.create,
            compare: Object.is,
            objectType: operate.is,
            assignMerge: Object.assign,
            hasProperty: this.hasOwnProperty('propertyToFind')
        }

    }



}


 
