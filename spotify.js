let SpotifyApi = require("spotify-web-api-node");
require("dotenv").config();

let Spotify = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

//TODO token persistent storage
let accessToken;
let tokenExpires;

//TODO set access token if valid, else grant credentials
// Spotify.setAccessToken(accessToken);

//TODO specify API scopes
function startSpotify() {
  console.log("Starting Spotify");
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
}

function doSomeShit(){
    console.log('did some shit');
}

export {
  startSpotify,
    
};
