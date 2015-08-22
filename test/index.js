var tape = require("tape"),
    enums = require("..");


function runTest(types, assert) {
    assert.equal(types.ONE, types.ONE);
    assert.equal(types.TWO, types.TWO);
    assert.equal(types.THREE, types.THREE);

    assert.notEqual(types.ONE, types.TWO);
    assert.notEqual(types.ONE, types.THREE);
    assert.notEqual(types.TWO, types.THREE);

    (function() {
        "use strict";

        try {
            types.FOUR = 4;
        } catch (e) {
            assert.equal(e.message, "Can't add property FOUR, object is not extensible");
        }
    }());
}


tape("enums(values: String) should return new object with keys from string as unique values only equal to itself", function(assert) {
    runTest(enums("ONE TWO THREE"), assert);
    assert.end();
});

tape("enums(values: Array<String>) should return new object with keys from string as unique values only equal to itself", function(assert) {
    runTest(enums(["ONE", "TWO", "THREE"]), assert);
    assert.end();
});

tape("enums(values: Object<Key: String, Value: Number>) should return new object with keys from Object keys", function(assert) {
    var num = enums({
        ONE: 1,
        TWO: 2,
        THREE: 3
    });

    assert.equal(num.ONE, 1);
    assert.equal(num.TWO, 2);
    assert.equal(num.THREE, 3);

    assert.end();
});
