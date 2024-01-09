const { isAlphabetic, isWhitespace } = require("./helpers");

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
      commands.push(this.parseCommand());
      this.newline();
    }
    return commands;
  }

  parseCommand() {
    const command = this.parseCommandName();
    switch (command) {
      case "say":
        return this.parseSayCommand();

      default:
        throw new Error(`Unrecognised command "${command}"`);
    }
  }

  parseCommandName() {
    let command = "";
    while (isAlphabetic(this.next())) {
      command += this.consume();
    }
    if (command.length === 0) {
      throw new Error("Expected command");
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

  parseUntilEOL() {
    let text = "";
    while (!this.eof() && this.next() !== "\n") {
      text += this.consume();
    };

    return text;
  }

  next() {
    return this.src[this.pos];
  }

  consume() {
    return this.src[this.pos++];
  }

  expect(str) {
    const subStr = this.src.slice(this.pos, this.pos + str.length);
    if (subStr !== str) {
      throw new Error(`Expected "${str}", got "${subStr}"`);
    }
    this.pos += str.length;
    return str;
  }

  space() {
    if (this.next() !== " ") {
      throw new Error(`Expected space, got "${this.next()}"`);
    }
    this.consume();
  }

  newline() {
    if (this.eof()) {
      return;
    }

    if (this.next() !== "\n") {
      throw new Error(`Expected newline after command, got "${this.next()}"`);
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
