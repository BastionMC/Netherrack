const parse = require("./parser");
const { inspect } = require("util");

function log(value) {
  console.log(inspect(value, {depth: Infinity, colors: true}));
}

const ast = parse("say Hello, world!\nsummon custom.entities:hostile/tiger\nsummon zombie ~1 ~-.5 1");
log(ast);
