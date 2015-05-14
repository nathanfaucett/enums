var assert = require("assert"),
    enums = require("../src/index");


describe("enums(values)", function() {

    function runTest(types) {
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

    describe("enums(values: String)", function() {
        it("should return new object with keys from string as unique values only equal to itself", function() {
            runTest(enums("ONE TWO THREE"));
        });
    });

    describe("enums(values: Array<String>)", function() {
        it("should return new object with keys from string as unique values only equal to itself", function() {
            runTest(enums(["ONE", "TWO", "THREE"]));
        });
    });
});
