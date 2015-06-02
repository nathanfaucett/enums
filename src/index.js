var create = require("create"),
    defineProperty = require("define_property"),
    forEach = require("for_each"),
    isString = require("is_string"),
    isNumber = require("is_number"),
    emptyFunction = require("empty_function");


var reSpliter = /[\s\, ]+/,
    descriptor = {
        configurable: false,
        enumerable: true,
        writable: false,
        value: null
    },
    freeze = Object.freeze || emptyFunction;


module.exports = enums;


function enums(values) {
    if (isString(values)) {
        values = values.split(reSpliter);
        return createEnums(values);
    } else if (values) {
        return createEnums(values);
    } else {
        throw new TypeError("enums(values) values must be an array or a string");
    }
}

function createEnums(values) {
    var object = create(null);
    forEach(values, createEnum.set(object));
    freeze(object);
    return object;
}

function createEnum(value, key) {
    if (isNumber(key)) {
        key = value;
    }

    descriptor.value = isString(value) ? stringToHash(value) : value;
    defineProperty(createEnum.object, key, descriptor);
    descriptor.value = null;
}

createEnum.set = function(object) {
    this.object = object;
    return this;
};

function stringToHash(value) {
    var result = 0,
        i = -1,
        il = value.length - 1;

    while (i++ < il) {
        result = result * 31 + value.charCodeAt(i);
    }

    return result;
}
