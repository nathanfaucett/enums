var create = require("@nathanfaucett/create"),
    defineProperty = require("@nathanfaucett/define_property"),
    objectForEach = require("@nathanfaucett/object-for_each"),
    arrayForEach = require("@nathanfaucett/array-for_each"),
    isString = require("@nathanfaucett/is_string"),
    isNumber = require("@nathanfaucett/is_number"),
    isArray = require("@nathanfaucett/is_array"),
    emptyFunction = require("@nathanfaucett/empty_function"),
    stringHashCode = require("@nathanfaucett/string-hash_code");


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

    if (isArray(values)) {
        arrayForEach(values, createEnum.set(object));
    } else {
        objectForEach(values, createEnum.set(object));
    }
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
