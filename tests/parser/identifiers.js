const assert = require("assert");
const { describe, it } = require("node:test");
const { parse } = require("./helpers");
const { resourceLocation } = require("../../parser/identifiers");

describe("Resource location", () => {
  it("should parse a resource with no namespace", () => {
    const ast = parse(resourceLocation, "hello");
    const expected = {
      type: "resource_location",
      namespace: "minecraft",
      id: "hello",
    };

    assert.deepEqual(ast, expected);
  });

  it("should parse a resource with a namespace", () => {
    const ast = parse(resourceLocation, "foo.bar:baz/qux");
    const expected = {
      type: "resource_location",
      namespace: "foo.bar",
      id: "baz/qux",
    };

    assert.deepEqual(ast, expected);
  });

  it("should fail to parse a resource with an invalid name", () => {
    assert.throws(() => parse(resourceLocation, "$hi"));
  });
});

