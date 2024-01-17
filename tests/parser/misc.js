const assert = require("assert");
const { describe, it } = require("node:test");
const { parse } = require("./helpers");
const { entityAnchor } = require("../../parser/misc");

describe("Entity anchors", () => {
  it("the only two cases", () => {
    assert.equal(parse(entityAnchor, "eyes"), "eyes");
    assert.equal(parse(entityAnchor, "feet"), "feet");
    assert.throws(() => parse(entityAnchor, "neither"));
  });
});

