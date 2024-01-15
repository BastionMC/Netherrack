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

describe("The teleport command", () => {
  it("should parse a command with only a destination", () => {
    const ast = parse("tp @r");
    const expected = [{
      type: "command",
      name: "teleport",
      destination: {
        type: "selector",
        kind: "random_player"
      },
    }];

    assert.deepEqual(ast, expected);
  });

  it("should parse a command with targets and a destination", () => {
    const ast = parse("tp @e @s");
    const expected = [{
      type: "command",
      name: "teleport",
      destination: {
        type: "selector",
        kind: "self"
      },
      targets: {
        type: "selector",
        kind: "all_entities"
      },
    }];

    assert.deepEqual(ast, expected);
  });

  it("should parse a command with only a location", () => {
    const ast = parse("tp ~ ~1 ~2");
    const expected = [{
      type: "command",
      name: "teleport",
      destination: {
        type: "vec3",
        x: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
        y: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 1 },
        },
        z: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 2 },
        },
      },
    }];

    assert.deepEqual(ast, expected);
  });

  it("should parse a command with targets and a location", () => {
    const ast = parse("tp @p ^ ^-1 ^2");
    const expected = [{
      type: "command",
      name: "teleport",
      destination: {
        type: "vec3",
        x: {
          type: "coordinate",
          variant: "local",
          value: { type: "number", value: 0 },
        },
        y: {
          type: "coordinate",
          variant: "local",
          value: { type: "number", value: -1 },
        },
        z: {
          type: "coordinate",
          variant: "local",
          value: { type: "number", value: 2 },
        },
      },
      targets: {
        type: "selector",
        kind: "nearest_player"
      },
    }];

    assert.deepEqual(ast, expected);
  });

  it("should parse a command with targets, a location and a rotation", () => {
    const ast = parse("tp @s ~ ~1 ~ ~10 -63");
    const expected = [{
      type: "command",
      name: "teleport",
      destination: {
        type: "vec3",
        x: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
        y: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 1 },
        },
        z: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
      },
      targets: {
        type: "selector",
        kind: "self"
      },
      rotation: {
        type: "rotation",
        yaw: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 10 },
        },
        pitch: {
          type: "coordinate",
          variant: "absolute",
          value: { type: "number", value: -63 },
        },
      },
    }];

    assert.deepEqual(ast, expected);
  });

  it("should parse a command with targets, a location and a facing location", () => {
    const ast = parse("tp @r ~ ~ ~ facing 0 64 0");
    const expected = [{
      type: "command",
      name: "teleport",
      destination: {
        type: "vec3",
        x: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
        y: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
        z: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
      },
      targets: {
        type: "selector",
        kind: "random_player"
      },
      facing: {
        type: "vec3",
        x: {
          type: "coordinate",
          variant: "absolute",
          value: { type: "number", value: 0 },
        },
        y: {
          type: "coordinate",
          variant: "absolute",
          value: { type: "number", value: 64 },
        },
        z: {
          type: "coordinate",
          variant: "absolute",
          value: { type: "number", value: 0 },
        },
      },
    }];

    assert.deepEqual(ast, expected);
  });

  it("should parse a command with targets, a location and a facing entity", () => {
    const ast = parse("tp @s ~ ~ ~ facing entity @r feet");
    const expected = [{
      type: "command",
      name: "teleport",
      destination: {
        type: "vec3",
        x: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
        y: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
        z: {
          type: "coordinate",
          variant: "relative",
          value: { type: "number", value: 0 },
        },
      },
      targets: {
        type: "selector",
        kind: "self"
      },
      facing: {
        type: "selector",
        kind: "random_player",
      },
      facing_anchor: "feet"
    }];

    assert.deepEqual(ast, expected);
  });
});

