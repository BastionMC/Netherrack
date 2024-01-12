const parse = require("./parser");
const { inspect } = require("util");

function log(value) {
  console.log(inspect(value, {depth: Infinity, colors: true}));
}

const ast = parse("summon hi ");
log(ast);
