const { describe, it } = require("node:test");
const { parse } = require("./helpers");
const { vec3, rotation } = require("../../parser/coordinates");
const assert = require("assert");

describe("Coordinates", () => {
  it("should parse all absolute coordinates", () => {
    const ast = parse(vec3, "1 2 3");
    const expected = {
      type: "vec3",
      x: {
        type: "coordinate",
        variant: "absolute",
        value: { type: "number", value: 1, },
      },
      y: {
        type: "coordinate",
        variant: "absolute",
        value: { type: "number", value: 2, },
      },
      z: {
        type: "coordinate",
        variant: "absolute",
        value: { type: "number", value: 3, },
      },
    };

    assert.deepEqual(ast, expected);
  });

  it("should parse all relative coordinates", () => {
    const ast = parse(vec3, "~ ~-1 ~3.29");
    const expected = {
      type: "vec3",
      x: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: 0, },
      },
      y: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: -1, },
      },
      z: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: 3.29, },
      },
    };

    assert.deepEqual(ast, expected);
  });

  it("should parse all local coordinates", () => {
    const ast = parse(vec3, "^ ^1 ^-2");
    const expected = {
      type: "vec3",
      x: {
        type: "coordinate",
        variant: "local",
        value: { type: "number", value: 0, },
      },
      y: {
        type: "coordinate",
        variant: "local",
        value: { type: "number", value: 1, },
      },
      z: {
        type: "coordinate",
        variant: "local",
        value: { type: "number", value: -2, },
      },
    };

    assert.deepEqual(ast, expected);
  });

  it("should parse a mix of relative and absolute coordinates", () => {
    const ast = parse(vec3, "~1 -256 ~-1");
    const expected = {
      type: "vec3",
      x: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: 1, },
      },
      y: {
        type: "coordinate",
        variant: "absolute",
        value: { type: "number", value: -256, },
      },
      z: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: -1, },
      },
    };

    assert.deepEqual(ast, expected);
  });

  it("should fail to parse a mix of relative and local coordinates", () => {
    assert.throws(() => parse(vec3, "~1 ^2 -3"));
  });

  it("should fail to parse a position with too few coordinates", () => {
    assert.throws(() => parse(vec3, "~ ~1"));
  });
  
  it("should fail to parse a position with invalid notation", () => {
    assert.throws(() => parse(vec3, "~ ~1 @5"));
  });
});

describe("Rotation", () => {
  it("should parse an absolute rotation", () => {
    const ast = parse(rotation, "90 45");
    const expected = {
      type: "rotation",
      yaw: {
        type: "coordinate",
        variant: "absolute",
        value: { type: "number", value: 90 },
      },
      pitch: {
        type: "coordinate",
        variant: "absolute",
        value: { type: "number", value: 45 },
      },
    };

    assert.deepEqual(ast, expected);
  });

  it("should parse a relative rotation", () => {
    const ast = parse(rotation, "~10 ~-22.5");
    const expected = {
      type: "rotation",
      yaw: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: 10 },
      },
      pitch: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: -22.5 },
      },
    };

    assert.deepEqual(ast, expected);
  });

  it("should parse a mix of relative and absolute", () => {
    const ast = parse(rotation, "~15 0");
    const expected = {
      type: "rotation",
      yaw: {
        type: "coordinate",
        variant: "relative",
        value: { type: "number", value: 15 },
      },
      pitch: {
        type: "coordinate",
        variant: "absolute",
        value: { type: "number", value: 0 },
      },
    };

    assert.deepEqual(ast, expected);
  });

  it("should fail to parse caret notation", () => {
    assert.throws(() => parse(rotation, "^10 ^90"));
  });

  it("should fail to parse only one coordinate", () => {
    assert.throws(() => parse(rotation, "15"));
  });

  it("should fail to parse invalid notation", () => {
    assert.throws(() => parse(rotation, "(hi)"));
    assert.throws(() => parse(rotation, "~10 foo"));
  });
});

