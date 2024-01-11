const { isAlphabetic, isWhitespace, isNamespaceCharacter, isNumeric } = require("./helpers");
const { SyntaxError } = require("./errors");

class Parser {
  constructor() {
    this.pos = 0;
    this.src = "";
  }

  parse(src) {
    this.src = src;
    this.pos = 0;

    const commands = [];

    while (!this.eof()) {
      this.skipWhitespace();
      commands.push(this.must(this.parseCommand));
      this.must(this.newline);
    }
    return commands;
  }

  parseCommand() {
    const command = this.must(this.parseCommandName);
    switch (command) {
      case "say":
        return this.must(this.parseSayCommand);

      case "summon":
        return this.must(this.parseSummonCommand);

      default:
        throw new SyntaxError(`Unrecognised command "${command}"`);
    }
  }

  parseCommandName() {
    let command = "";
    while (isAlphabetic(this.next())) {
      command += this.consume();
    }
    if (command.length === 0) {
      throw new SyntaxError("Expected command", true);
    }
    return command;
  }

  parseSayCommand() {
    this.space();
    const text = this.parseUntilEOL();
    return {
      type: "command",
      name: "say",
      text,
    };
  }

  parseSummonCommand() {
    this.space();
    const entity = this.must(this.parseResourceLocation);
    this.maybeSpace();
    const position = this.optional(this.parseVec3);
    return {
      type: "command",
      name: "summon",
      entity,
      position,
    };
  }

  parseResourceLocation() {
    let namespace = "";
    let id = "";
    while (!this.eof() && isNamespaceCharacter(this.next())) {
      namespace += this.consume();
    }

    if (namespace.length === 0) {
      throw new SyntaxError(`Expected resource location, got "${this.next()}"`, true)
    }

    if (this.next() === ":") {
      this.consume();

      while (isNamespaceCharacter(this.next()) || this.next() === "/") {
        if (this.eof()) {
          break;
        }
        id += this.consume();
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

  parseVec3() {
    const x = this.parseCoordinate();
    this.space();
    const y = this.must(this.parseCoordinate);
    this.space();
    const z = this.must(this.parseCoordinate);

    if (x.variant === "local") {
      if (y.variant !== "local" || z.variant !== "local") {
        throw new SyntaxError(
          "Local and relative/absolute coordinates cannot be mixed"
        );
      }
    } else {
      if (y.variant === "local" || z.variant === "local") {
        throw new SyntaxError(
          "Local and relative/absolute coordinates cannot be mixed"
        );
      }
    }

    return {
      type: "vec3",
      x, y, z,
    };
  }

  parseCoordinate() {
    let variant = "absolute";

    if (this.next() === "~") {
      this.consume();
      variant = "relative";
    } else if (this.next() === "^") {
      this.consume();
      variant = "local";
    }

    const value = variant === "absolute" ?
      this.parseNumber() 
      : this.must(this.parseNumber);    

    return {
      type: "coordinate",
      value,
      variant,
    };
  }

  parseNumber() {
    let numberStr = "";
    if (this.next() === "-") {
      numberStr += this.consume();
    }

    let hasFloated = false;
    while (isNumeric(this.next()) || (this.next() === "." && !hasFloated)) {
      if (this.next() === ".") {
        hasFloated = true;
      }
      numberStr += this.consume();
    }

    if (numberStr.length === 0) {
      throw new SyntaxError(`Expected number, got "${this.next()}"`, true);
    }

    const number = Number(numberStr);
    if (isNaN(numberStr)) {
      throw new SyntaxError(`Invalid number "${numberStr}"`);
    }

    return {
      type: "number",
      value: number,
    };
  }

  parseUntilEOL() {
    let text = "";
    while (!this.eof() && this.next() !== "\n") {
      text += this.consume();
    };

    return text;
  }

  must(parser) {
    try {
      return parser.call(this);
    } catch (err) {
      if (err.recoverable) {
        throw new SyntaxError(err.toString());
      }
      throw err;
    }
  }

  optional(parser) {
    try {
      return parser.call(this);
    } catch (err) {
      if (err.recoverable) {
        return null;
      }
      throw err;
    }
  }

  next() {
    if (this.eof()) {
      return "\x00";
    }
    return this.src[this.pos];
  }

  consume() {
    const next = this.next();
    this.pos++;
    return next;
  }

  expect(str) {
    const subStr = this.src.slice(this.pos, this.pos + str.length);
    if (subStr !== str) {
      throw new SyntaxError(`Expected "${str}", got "${subStr}"`);
    }
    this.pos += str.length;
    return str;
  }

  maybe(str) {
    const subStr = this.src.slice(this.pos, this.pos + str.length);
    if (subStr !== str) {
      throw new SyntaxError(`Expected "${str}", got "${subStr}"`, true);
    }
    this.pos += str.length;
    return str;
  }

  space() {
    if (this.next() !== " ") {
      throw new SyntaxError(`Expected space, got "${this.next()}"`);
    }
    this.consume();
  }

  maybeSpace() {
    if (this.next() === " ") {
      this.consume();
    }
  }

  newline() {
    if (this.eof()) {
      return;
    }

    if (this.next() !== "\n") {
      throw new SyntaxError(`Expected newline after command, got "${this.next()}"`);
    }
    this.consume();
  }

  skipWhitespace() {
    while (isWhitespace(this.next())) {
      this.consume();
    }
  }

  eof() {
    return this.pos >= this.src.length;
  }
}

module.exports = Parser;
