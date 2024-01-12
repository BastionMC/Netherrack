class ParseError extends Error {
  constructor(message, recoverable = false) {
    super(message);
    this.recoverable = recoverable;
  }

  toString() {
    console.log(this.recoverable);
    return super.toString();
  }
}

module.exports = {
   ParseError,
};

