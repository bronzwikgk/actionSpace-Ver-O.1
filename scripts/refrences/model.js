// Model.js
class Model1 { 
    constructor() {
        this.name = {
            value: null,
            validator: ['isString', 'isNotEmpty']
        };
        this.age = {
            value: null,
            validator: ['isInt']
        };


    }


}


Model1.prototype.set = function (value, key) {
    if (this.validator.validate(value, key.validator)) {
        key.value = value;
        return true;
    }
    return false;
};
Model.prototype.setName = function (name) {
    this.set(name, this.name);
};

Model.prototype.setAge = function (age) {
    this.set(age, this.age);
};

// var Model = function () {
//     this.name = {
//         value: null,
//         validator: ['isString', 'isNotEmpty']
//     };
//     this.age = {
//         value: null,
//         validator: ['isInt']
//     };
// };

Model.prototype.set = function (value, key) {
    if (this.validator.validate(value, key.validator)) {
        key.value = value;
        return true;
    }
    return false;
};

Model.prototype.setName = function (name) {
    this.set(name, this.name);
};

Model.prototype.setAge = function (age) {
    this.set(age, this.age);
};


class Person {
    constructor() {
        this.name = {
            value: null,
            operate: ['isString', 'isNotEmpty']
        };
        this.age = {
            value: null,
            operate: ['isInt']
        };


    }


}


Person.prototype.set = function (value, key) {
    if (this.validator.validate(value, key.validator)) {
        key.value = value;
        return true;
    }
    return false;
};

Person.prototype.setName = function (name) {
    this.set(name, this.name);
};

Person.prototype.setAge = function (age) {
    this.set(age, this.age);
};