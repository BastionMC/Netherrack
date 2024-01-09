function isAlphabetic(char) {
  return /[A-Za-z]/.test(char);
}

function isWhitespace(char) {
  return /\s/.test(char);
}

module.exports = {
  isAlphabetic,
  isWhitespace,
};
