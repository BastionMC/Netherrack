const { vec3 } = require("./coordinates");
const { space, maybeSpace } = require("./helpers");
const { resourceLocation } = require("./identifiers");
const { line } = require("./misc");
const { isAlphabetic } = require("./predicates");

function command(p) {
  const name = p.must(commandName);
  switch (name) {
    case "say":
      return p.must(sayCommand);

    case "summon":
      return p.must(summonCommand);

    default:
      throw new SyntaxError(`Unrecognised command "${name}"`);
  }
}

function commandName(p) {
  let command = "";
  while (isAlphabetic(p.next())) {
    command += p.consume();
  }
  if (command.length === 0) {
    throw new SyntaxError("Expected command", true);
  }
  return command;
}

function sayCommand(p) {
  p.parse(space);
  const text = p.must(line);
  return {
    type: "command",
    name: "say",
    text,
  };
}

function summonCommand(p) {
  p.parse(space);
  const entity = p.must(resourceLocation);
  let position = null;
  if (p.parse(maybeSpace)) {
    position = p.optional(vec3);
  }
  return {
    type: "command",
    name: "summon",
    entity,
    position,
  };
}

module.exports = {
  command,
};
