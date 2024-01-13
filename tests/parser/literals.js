const assert = require("assert");
const { describe, it } = require("node:test");
const { parse } = require("./helpers");
const { number } = require("../../parser/literals");

describe("Number", () => {
  it("should parse a valid integer", () => {
    const ast = parse(number, "15");
    const expected = { type: "number", value: 15 };
    assert.deepEqual(ast, expected);
  });

  it("should parse a valid float", () => {
    const ast = parse(number, "3.1415");
    const expected = { type: "number", value: 3.1415 };
    assert.deepEqual(ast, expected);
  });

  it("should parse a negative number", () => {
    const ast = parse(number, "-42.01");
    const expected = { type: "number", value: -42.01 };
    assert.deepEqual(ast, expected);
  });

  it("should fail to parse an invalid number", () => {
    assert.throws(() => parse(number, "-"));
  });
});

