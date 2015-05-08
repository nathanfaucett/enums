var create = require("create"),
    defineProperty = require("define_property"),
    forEach = require("for_each"),
    isString = require("is_string"),
    isArrayLike = require("is_array_like"),
    emptyFunction = require("empty_function");


var reSpliter = /[\s ]+/,
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
        forEach(values, insureStrings);
        return createEnums(values);
    } else if (isArrayLike(values)) {
        forEach(values, insureStrings);
        return createEnums(values);
    } else {
        throw new TypeError("enums(values) values must be an array or a string");
    }
}

function insureStrings(value) {
    if (!isString(value)) {
        throw new TypeError("enums(values) enum names must be strings");
    }
}

function createEnums(values) {
    var object = create(null);
    forEach(values, createEnum.set(object));
    freeze(object);
    return object;
}

function createEnum(value) {
    var object = create(null);
    freeze(object);
    descriptor.value = object;
    defineProperty(createEnum.object, value, descriptor);
    descriptor.value = null;
}

createEnum.set = function(object) {
    this.object = object;
    return this;
};
