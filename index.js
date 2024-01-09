const Parser = require("./parser");
const { inspect } = require("util");

function log(value) {
  console.log(inspect(value, {depth: Infinity, colors: true}))
}

const parser = new Parser();
const ast = parser.parse("say Hello\nsay world");
log(ast);
