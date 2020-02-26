let SpotifyApi = require("spotify-web-api-node");
const program = require("commander");
require("dotenv").config();

let Spotify = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

program.version("0.0.1");

//TODO token persistent storage
let accessToken; 
let tokenExpires;

//TODO set access token if valid, else grant credentials
// Spotify.setAccessToken(accessToken);

//TODO specify API scopes
Spotify.clientCredentialsGrant().then(
  data => {
    accessToken = data.body["access_token"];
    tokenExpires = data.body["expires_in"];

    Spotify.setAccessToken(accessToken);
  },
  err => {
    console.log(
      "Something went wrong when retrieving an access token",
      err.message
    );
  }
);

//Need to autorize spotify on every call .then() perform actions

program.parse(process.argv);
