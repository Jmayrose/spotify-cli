let SpotifyApi = require("spotify-web-api-node");
require("dotenv").config();

let API = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

//TODO token persistent storage
let accessToken;
let tokenExpires;

//TODO set access token if valid, else grant credentials
// Spotify.setAccessToken(accessToken);

//TODO specify API scopes
module.exports.start = function start() {
  API.clientCredentialsGrant().then(
    data => {
      accessToken = data.body["access_token"];
      tokenExpires = data.body["expires_in"];

      API.setAccessToken(accessToken);
    },
    err => {
      console.log(
        "Something went wrong when retrieving an access token",
        err.message
      );
    }
  );
};

module.exports.play = function play() {

};
