"use strict";

var assert = require("assert");
var permi = require("../");

describe("match()", function() {
  it("should match plain strings.", function() {
    assert(permi("test.permission", "test.permission"));
    assert.ifError(permi("test.permission", "test.invalid"));
    assert.ifError(permi("test.invalid", "test.permission"));
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
});
