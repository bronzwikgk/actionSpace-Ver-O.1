
//const items = Infinity;
class Iterator {
    constructor(Array) { this.Array = Array, this.index = 0 }
    hasNext() { return this.index < this.Array.length }
    next() { return this.Array[this.index++] }
}


const items = ['task1', 'task2', 'task3', 'task4']


const iter = new Iterator(items)

while (iter.hasNext()) { 
    console.log(iter.next());
}

tasks = [
    [task1 = {
        serviceName: 'document', entity: { method: 'get', entity: 'Elements', entityIdentifier: 'ByTagName', entityName: '("body")[0]' },outputTo : 'temp'
    }
    ],
    [task2 = { serviceName: 'operate', entity: { method: 'isGreaterThan', entity: 'Elements', entityIdentifier: 'ByTagName', entityName: '("body")[0]'}}]
]




function task(taskMethod,input, ouput, options) { 


}

















