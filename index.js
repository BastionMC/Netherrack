const Parser = require("./parser");
const { inspect } = require("util");

function log(value) {
  console.log(inspect(value, {depth: Infinity, colors: true}));
}

const parser = new Parser();
const ast = parser.parse("say Hello, world!\nsummon custom.entities:hostile/tiger\nsummon zombie 1 ~-.5 1");
log(ast);
