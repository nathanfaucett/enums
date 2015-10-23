var create = require("create"),
    defineProperty = require("define_property"),
    forEach = require("for_each"),
    isString = require("is_string"),
    isNumber = require("is_number"),
    emptyFunction = require("empty_function"),
    stringHashCode = require("string-hash_code");


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
        return createEnums(values.split(reSpliter));
    } else if (values) {
        return createEnums(values);
    } else {
        throw new TypeError("enums(values) values must be an array, object, or a string");
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
        value = stringHashCode(value);
    }

    descriptor.value = value;
    defineProperty(createEnum.object, key, descriptor);
    descriptor.value = null;
}

createEnum.set = function(object) {
    createEnum.object = object;
    return createEnum;
};
