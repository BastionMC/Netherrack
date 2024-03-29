const { ParseError } = require("./errors");
const { space } = require("./helpers");
const { number } = require("./literals");

function vec3(p) {
  const x = p.parse(coordinate);
  p.parse(space);
  const y = p.must(coordinate);
  p.parse(space);
  const z = p.must(coordinate);

  if (x.variant === "local") {
    if (y.variant !== "local" || z.variant !== "local") {
      throw new ParseError(
        "Local and relative/absolute coordinates cannot be mixed"
      );
    }
  } else {
    if (y.variant === "local" || z.variant === "local") {
      throw new ParseError(
        "Local and relative/absolute coordinates cannot be mixed"
      );
    }
  }

  return {
    type: "vec3",
    x, y, z,
  };
}

function rotation(p) {
  const yaw = p.parse(coordinate);
  if (yaw.variant === "local") {
    throw new ParseError("Cannot use caret notation in rotation");
  }
  p.parse(space);
  const pitch = p.must(coordinate);
  if (pitch.variant === "local") {
    throw new ParseError("Cannot use caret notation in rotation");
  }

  return {
    type: "rotation",
    yaw,
    pitch,
  };
}

function coordinate(p) {
  let variant = "absolute";

  if (p.next() === "~") {
    p.consume();
    variant = "relative";
  } else if (p.next() === "^") {
    p.consume();
    variant = "local";
  }

  const value = variant === "absolute" ?
    p.parse(number) 
    : p.optional(number) ?? { type: "number", value: 0, };

  return {
    type: "coordinate",
    value,
    variant,
  };
}

module.exports = {
  vec3,
  rotation,
};
