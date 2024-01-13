const { Parser } = require("../../parser");

function parse(parserFn, src) {
  const parser = new Parser(src);
  return parserFn(parser);
}

module.exports = { parse };

