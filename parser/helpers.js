function isAlphabetic(char) {
  return /[A-Za-z]/.test(char);
}

function isNumeric(char) {
  return /\d/.test(char);
}

function isWhitespace(char) {
  return /\s/.test(char);
}

function isNamespaceCharacter(char) {
  return /[a-z0-9\-_.]/.test(char);
}

module.exports = {
  isAlphabetic,
  isNumeric,
  isWhitespace,
  isNamespaceCharacter,
};
