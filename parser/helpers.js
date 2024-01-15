const { isWhitespace } = require("./predicates");
const { ParseError } = require("./errors");

function space(p) {
  if (p.next() !== " ") {
    throw new ParseError(`Expected space, got "${p.next()}"`);
  }
  p.consume();
}

function maybeSpace(p) {
  if (p.next() === " ") {
    p.consume();
    return true;
  }
  return false;
}

function newline(p) {
  if (p.eof()) {
    return;
  }

  if (p.next() !== "\n") {
    throw new ParseError(`Expected newline after command, got "${p.next()}"`);
  }
  p.consume();
}

function skipWhitespace(p) {
  while (isWhitespace(p.next())) {
    p.consume();
  }
}

function choice(p, ...parsers) {
  for (const parser of parsers) {
    const result = p.optional(parser);
    if (result !== null) {
      return result;
    }
  }

  throw new ParseError("Cannot match any parsers", true);
}

module.exports = {
  space,
  maybeSpace,
  newline,
  skipWhitespace,
  choice,
};

