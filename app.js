const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const opn = require("opn");

module.exports.Authorize = () => {
  let client_id = process.env.CLIENT_ID; // Your client id
  let client_secret = process.env.CLIENT_SECRET; // Your secret
  let redirect_uri = process.env.REDIRECT_URI; // Your redirect uri

  let generateRandomString = function (length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  let app = express();

  app
    .use(express.static(__dirname + "/public"))
    .use(cors())
    .use(cookieParser());

  app.get("/login", function (req, res) {
    let state = generateRandomString(16);
    res.cookie("spotify_auth_state", state);

    // your application requests authorization
    let scope =
      "user-read-private user-read-email user-read-playback-state streaming playlist-read-collaborative user-modify-playback-state playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read app-remote-control user-read-recently-played playlist-modify-private user-follow-modify user-library-read";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          client_id: client_id,
          response_type: "code",
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  });

  app.get("/callback", function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies["spotify_auth_state"] : null;

    if (state === null || state !== storedState) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      res.clearCookie("spotify_auth_state");
      let authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let access_token = body.access_token,
            refresh_token = body.refresh_token;

          let options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };

          // use the access token to access the Spotify Web API
          request.get(options, function (error, response, body) {
            console.log(body);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            "/#" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
              })
          );
        } else {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  });

  app.get("/refresh_token", function (req, res) {
    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        res.send({
          access_token: access_token,
        });
      }
    });
  });

  console.log("Click here to login: http://localhost:8888"); //TODO Use opn() to redireect to page in default browser
  app.listen(8888);
};
