const { vec3, rotation } = require("./coordinates");
const { entity } = require("./entities");
const { ParseError } = require("./errors");
const { space, maybeSpace } = require("./helpers");
const { resourceLocation } = require("./identifiers");
const { line, entityAnchor } = require("./misc");
const { isAlphabetic } = require("./predicates");

function command(p) {
  const name = p.must(commandName);
  switch (name) {
    case "say":
      return p.must(sayCommand);

    case "summon":
      return p.must(summonCommand);

    case "teleport":
    case "tp":
      return p.must(teleportCommand);

    default:
      throw new ParseError(`Unrecognised command "${name}"`);
  }
}

function commandName(p) {
  let command = "";
  while (isAlphabetic(p.next())) {
    command += p.consume();
  }
  if (command.length === 0) {
    throw new ParseError("Expected command", true);
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

function teleportCommand(p) {
  p.parse(space);
  let location = p.optional(vec3);
  if (location !== null) {
    return {
      type: "command",
      name: "teleport",
      destination: location,
    };
  }
  
  const targetEntity = p.must(entity);

  if (!p.parse(maybeSpace)) {
    return {
      type: "command",
      name: "teleport",
      destination: targetEntity,
    };
  }

  const destination = p.optional(entity);
  if (destination !== null) {
    return {
      type: "command",
      name: "teleport",
      targets: targetEntity,
      destination,
    };
  }

  location = p.must(vec3);

  const command = {
    type: "command",
    name: "teleport",
    targets: targetEntity,
    destination: location,
  };

  if (!p.parse(maybeSpace)) {
    return command;
  }

  const toRotation = p.optional(rotation);
  if (toRotation !== null) {
    command.rotation = toRotation;
    return command;
  }

  p.expect("facing");
  p.parse(space);

  const facingLocation = p.optional(vec3);
  if (facingLocation !== null) {
    command.facing = facingLocation;
    return command;
  }

  p.expect("entity");
  p.parse(space);
  command.facing = p.must(entity);
  if (p.parse(maybeSpace)) {
    command.facing_anchor = p.must(entityAnchor);
  }

  return command;
}

module.exports = {
  command,
};
