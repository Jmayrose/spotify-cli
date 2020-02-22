let SpotifyApi = require("spotify-web-api-node");
require("dotenv").config();

module.exports = function Spotify() {
  let spoofy = new SpotifyApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  spoofy.clientCredentialsGrant().then(
    function(data) {
      let localAccessToken = data.body["access_token"];
      let tokenExpiration = data.body["expires_in"];

      // console.log("The access token expires in " + tokenExpiration);
      // console.log("The access token is " + localAccessToken);

      spoofy.setAccessToken(data.body["access_token"]);
    },
    function(err) {
      console.log(
        "Something went wrong when retrieving an access token",
        err.message
      );
    }
  );
  return spoofy;
};
