function line(p) {
  let text = "";
  while (!p.eof() && p.next() !== "\n") {
    text += p.consume();
  };

  return text;
}

module.exports = {
  line,
};
