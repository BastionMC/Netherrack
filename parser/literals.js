const { ParseError } = require("./errors");
const { isNumeric } = require("./predicates");

function number(p) {
  let numberStr = "";
  if (p.next() === "-") {
    numberStr += p.consume();
  }

  let hasFloated = false;
  while (isNumeric(p.next()) || (p.next() === "." && !hasFloated)) {
    if (p.next() === ".") {
      hasFloated = true;
    }
    numberStr += p.consume();
  }


  if (numberStr.length === 0) {
    throw new ParseError(`Expected number, got "${p.next()}"`, true);
  }

  const number = Number(numberStr);
  if (isNaN(numberStr)) {
    throw new ParseError(`Invalid number "${numberStr}"`);
  }

  return {
    type: "number",
    value: number,
  };
}

module.exports = {
  number,
};
