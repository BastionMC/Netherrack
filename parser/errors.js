class ParseError extends Error {
  constructor(message, recoverable = false) {
    super(message);
    this.recoverable = recoverable;
  }
}

module.exports = {
   ParseError,
};

