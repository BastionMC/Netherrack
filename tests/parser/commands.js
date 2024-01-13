const assert = require("assert");
const { describe, it } = require("node:test");
const { parse } = require("../../parser");

describe("The say command", () => {
  it("should parse a basic command", () => {
    const ast = parse("say Hello!");
    const expected = [{
      type: "command",
      name: "say",
      text: "Hello!",
    }];

    assert.deepEqual(ast, expected);
  });

  it("should fail to parse a command with no arguments", () => {
    assert.throws(() => parse("say"));
  });
});

describe("The summon command", () => {
  it("should parse a basic command", () => {
    const ast = parse("summon foo:bar/baz");
    const expected = [{
      type: "command",
      name: "summon",
      entity: {
        type: "resource_location",
        namespace: "foo",
        id: "bar/baz",
      },
      position: null,
    }];

    assert.deepEqual(ast, expected);
  });

  it("should parse a command with a position", () => {
    const ast = parse("summon zombie 3.8 ~ ~-.7");
    const expected = [{
      type: "command",
      name: "summon",
      entity: {
        type: "resource_location",
        namespace: "minecraft",
        id: "zombie",
      },
      position: {
        type: "vec3",
        x: {
          type: "coordinate",
          variant: "absolute",
          value: { type: "number", value: 3.8 },
        },
        y: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
        z: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: -0.7 },
        },
      },
    }];

    assert.deepEqual(ast, expected);
  });

  it("should fail to parse a command with missing arguments", () => {
    assert.throws(() => parse("summon "));
    assert.throws(() => parse("summon"));
    assert.throws(() => parse("summon hi ~"));
  });
});

