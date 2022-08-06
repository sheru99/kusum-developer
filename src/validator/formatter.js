const trim = function () {
  let text = "    kusum    ";
  let result = text.trim();
  return result;
};
const changetoLowerCase = function () {
  let text = "KUSUM";
  let result = text.toLowerCase();
  return result;
};
const changeToUpperCase = function () {
  let text = "kusum";
  let result = text.toUpperCase();
  return result;
};
module.exports.trim = trim;
module.exports.changetoLowerCase = changetoLowerCase;
module.exports.changeToUpperCase = changeToUpperCase;
