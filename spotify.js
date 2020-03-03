let SpotifyApi = require("spotify-web-api-node");
const axios = require("axios");
require("dotenv").config();

let API = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

//token persistent storage?
let accessToken, tokenExpires;

/** @name start
 *  @description generates access credentials
 */
module.exports.start = function start() {
  API.clientCredentialsGrant().then(
    data => {
      accessToken = data.body["access_token"];
      tokenExpires = data.body["expires_in"];

      API.setAccessToken(process.env.ACCESS_TOKEN);
      // console.log(accessToken);
    },
    err => {
      console.log(err.message);
    }
  );
};

/** @name clear
 *  @description clears queue of all songs
 */
module.exports.clear = function clear() {};

/** @name pause
 * @description pauses playback
 */
module.exports.pause = function pause() {};
