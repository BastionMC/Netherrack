const { ParseError } = require("./errors");
const { skipWhitespace, newline } = require("./helpers");
const { command } = require("./commands");

function parse(src) {
  const parser = new Parser(src);
  return parser.parseFile();
}

class Parser {
  constructor(src) {
    this.pos = 0;
    this.src = src;
  }

  parseFile() {
    const commands = [];

    while (!this.eof()) {
      skipWhitespace(this);
      commands.push(this.must(command));
      this.must(newline);
    }
    return commands;
  }

  parse(parser) {
    return parser(this); 
  } 

  must(parser) {
    try {
      return parser(this);
    } catch (err) {
      if (err.recoverable) {
        throw new ParseError(err.toString());
      }
      throw err;
    }
  }

  optional(parser) {
    try {
      return parser(this);
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
      throw new ParseError(`Expected "${str}", got "${subStr}"`, true);
    }
    this.pos += str.length;
    return str;
  }

  eof() {
    return this.pos >= this.src.length;
  }
}

module.exports = parse;
