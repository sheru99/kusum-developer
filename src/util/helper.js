const printDate = function () {
    return new Date().getDate();
}
const printMonth = function () {
  return new Date().toLocaleString('default', { month: 'long' })
};
const getBatchInfo = function () {
  return "Plutonium, W3D5, the topic for today is Nodejs module system."
};
module.exports.printDate = printDate;
module.exports.printMonth = printMonth;
module.exports.getBatchInfo = getBatchInfo;
