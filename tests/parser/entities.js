const { describe, it } = require("node:test");
const { parse } = require("./helpers");
const assert = require("assert");
const { entity } = require("../../parser/entities");

describe("Selectors", () => {
  it("should parse a valid selector", () => {
    assert.deepEqual(parse(entity, "@s"), { type: "selector", kind: "self" });
    assert.deepEqual(parse(entity, "@r"), { type: "selector", kind: "random_player" });
    assert.deepEqual(parse(entity, "@p"), { type: "selector", kind: "nearest_player" });
    assert.deepEqual(parse(entity, "@e"), { type: "selector", kind: "all_entities" });
    assert.deepEqual(parse(entity, "@a"), { type: "selector", kind: "all_players" });
  });

  it("should fail to parse an invalid selector", () => {
    assert.throws(() => parse(entity, "^s"));
    assert.throws(() => parse(entity, "@n"));
  });
});

