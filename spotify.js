const axios = require("axios");
require("dotenv").config();
const authServer = require("./app");

let bearerToken = process.env.ACCESS_TOKEN;//TODO persistent storage for tokens

const myAxios = axios.create({
  headers: { Authorization: "Bearer " + bearerToken },
});

module.exports.init = function init() {
  authServer.Authorize();
};

module.exports.play = () => {
  myAxios.put("https://api.spotify.com/v1/me/player/play");
};
module.exports.pause = () => {
  myAxios.put("https://api.spotify.com/v1/me/player/pause");
};

module.exports.skip = () => {
  myAxios.post("https://api.spotify.com/v1/me/player/next");
};
