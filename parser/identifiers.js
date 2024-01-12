const { isNamespaceCharacter } = require("./predicates");

function resourceLocation(p) {
  let namespace = "";
  let id = "";
  while (!p.eof() && isNamespaceCharacter(p.next())) {
    namespace += p.consume();
  }

  if (namespace.length === 0) {
    throw new SyntaxError(`Expected resource location, got "${p.next()}"`, true)
  }

  if (p.next() === ":") {
    p.consume();

    while (isNamespaceCharacter(p.next()) || p.next() === "/") {
      if (p.eof()) {
        break;
      }
      id += p.consume();
    }
  }
  else {
    id = namespace;
    namespace = "minecraft";
  }

  return {
    type: "resource_location",
    namespace,
    id,
  };
}

module.exports = {
  resourceLocation,
};
