const { choice } = require("./helpers");

function line(p) {
  let text = "";
  while (!p.eof() && p.next() !== "\n") {
    text += p.consume();
  };

  return text;
}

function facingAnchor(p) {
  return choice(
    p,
    p.expect.bind(p, "eyes"),
    p.expect.bind(p, "feet"),
  );
}

module.exports = {
  line,
  facingAnchor,
};
