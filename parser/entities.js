const { ParseError } = require("./errors");

const selectorOptions = {
  a: "all_players",
  e: "all_entities",
  p: "nearest_player",
  r: "random_player",
  s: "self",
};

function entity(p) {
  p.expect("@");
  const char = p.consume();
  const kind = selectorOptions[char];
  if (kind) {
    return {
      type: "selector",
      kind,
    };
  }

  throw new ParseError(`Invalid selector ${char}`);
}

module.exports = {
  entity,
};

