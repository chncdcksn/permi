"use strict";

var assert = require("assert");
var permi = require("../");

describe("match()", function() {
  it("should match plain strings.", function() {
    assert(permi("test.permission", "test.permission"));
    assert.ifError(permi("test.permission", "test.invalid"));
    assert.ifError(permi("test.also.invalid", "test.permission"));
    assert.ifError(permi("test.permission", "test.also.invalid"));
  });
  it("should match with wildcard.", function() {
    assert(permi("test.*", "test.permission"));
    assert(permi("test.permission", "test.*"));
    assert(permi("test.*", "test.*"));
    assert.ifError(permi("test.permission", "invalid.*"));
    assert.ifError(permi("invalid.*", "test.permission"));
    assert.ifError(permi("test.*", "invalid.*"));
  });
  it("should match with wildcard of a different length.", function() {
    assert(permi("test.permission.test", "test.*"));
    assert(permi("test.*", "test.permission.test"));
    assert(permi("test.*", "test.permission.*"));
    assert(permi("test.permission.*", "test.*"));
    assert.ifError(permi("test.permission.test", "invalid.*"));
    assert.ifError(permi("invalid.*", "test.permission.test"));
    assert.ifError(permi("invalid.*", "test.permission.*"));
    assert.ifError(permi("test.permission.*", "invalid.*"));
  });
  it("should match with arrays.", function() {
    assert(permi(["test.invalid", "test.permission"], "test.permission"));
    assert(permi("test.permission", ["test.invalid", "test.permission"]));
    assert.ifError(permi(["test.invalid", "test.alsoinvalid"], "test.permission"));
    assert.ifError(permi("test.permission", ["test.invalid", "test.alsoinvalid"]));
  });
  it("should match with arrays and wildcards.", function() {
    assert(permi(["test.invalid", "test.permission.test"], "test.permission.test"));
    assert(permi(["test.invalid", "test.permission.test"], "test.permission.*"));
    assert(permi(["test.invalid", "test.permission"], "test.*"));
    assert(permi("test.permission.test", ["test.invalid", "test.permission.test"]));
    assert(permi("test.permission.test", ["test.invalid", "test.permission.*"]));
    assert(permi("test.permission.test", ["test.invalid", "test.*"]));
    debugger;
    assert(permi(["test.invalid", "test.permission.test"], ["test.permission.test", "test.alsoinvalid"]));
    assert(permi(["test.invalid", "test.permission.test"], ["test.permission.*", "test.alsoinvalid"]));
    assert(permi(["test.invalid", "test.permission"], ["test.*", "test.alsoinvalid"]));
    assert(permi(["test.permission.test", "test.alsoinvalid"], ["test.invalid", "test.permission.test"]));
    assert(permi(["test.permission.test", "test.alsoinvalid"], ["test.invalid", "test.permission.*"]));
    assert(permi(["test.permission.test", "test.alsoinvalid"], ["test.invalid", "test.*"]));
    assert.ifError(permi(["test.invalid", "test.alsoinvalid"], "test.permission"));
    assert.ifError(permi("test.permission", ["test.invalid", "test.alsoinvalid"]));
  });
});
