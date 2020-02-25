#!/usr/bin/env node

let SpotifyApi = require("spotify-web-api-node");
const commander = require("commander");
const program = new commander.Command();
require("dotenv").config();

program.version("0.0.1");

let Spotify = new SpotifyApi({
  // clientId: process.env.CLIENT_ID,
  // clientSecret: process.env.CLIENT_SECRET,
  accessToken: 'BQArN9qzIy22e0XsypudLSh5u_2eG2ICCY_Bkbn4gWrVfCazp6hXx2wIjAtU6g5cGaHRmq3ZuFLtlmcDNKU' //can continue to instantiage Spotify while token is valid
});

Spotify.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE", {
    limit: 10,
    offset: 20
  }).then(
    function(data) {
      console.log("Album information", data.body);
    },
    function(err) {
      console.error(err);
    }
  );

// Spotify.clientCredentialsGrant()
//   .then(
//     data => {
//       let localAccessToken = data.body["access_token"];
//       let tokenExpiration = data.body["expires_in"];

//       Spotify.setAccessToken(localAccessToken);
//       console.log(localAccessToken);
//     },
//     err => {
//       console.log(
//         "Something went wrong when retrieving an access token",
//         err.message
//       );
//     }
//   )
//   .then(() => {
    //Handle commands in here?
    // Spotify.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE", {
    //   limit: 10,
    //   offset: 20
    // }).then(
    //   function(data) {
    //     console.log("Album information", data.body);
    //   },
    //   function(err) {
    //     console.error(err);
    //   }
    // );
  // });

program.parse(process.argv);
