const fs = require("fs");

const setAuth = (value) => {
  fs.writeFile("tokens/auth.txt", value, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("File saved successfully!");
  });
};
const setRefresh = (value) => {
  fs.writeFile("tokens/refresh.txt", value, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("File saved successfully!");
  });
};
const getAuth = () => {
  return fs.readFileSync("tokens/auth.txt").toString();
};
const getRefresh = () => {
  return fs.readFileSync("tokens/refresh.txt").toString();
};

exports.setAuth = setAuth;
exports.setRefresh = setRefresh;
exports.getAuth = getAuth;
exports.getRefresh = getRefresh;
