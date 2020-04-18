const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const open = require("open");

const tokenManagement = require("./tokenManagement");

require("dotenv").config();

const request = require("request"); //TODO Refactor request calls to axios

const myAxios = axios.create({
  headers: { Authorization: "Bearer " + tokenManagement.getAuth() },
});

const generalError = () => {
  console.log("Something went wrong");
};

module.exports.play = () => {
  myAxios
    .put("https://api.spotify.com/v1/me/player/play")
    .then()
    .catch((err) => {
      generalError();
      console.log(err.data);
    });
};
module.exports.pause = () => {
  myAxios
    .put("https://api.spotify.com/v1/me/player/pause")
    .then()
    .catch((err) => {
      generalError();
      console.log(err.data);
    });
};
module.exports.skip = () => {
  myAxios
    .post("https://api.spotify.com/v1/me/player/next")
    .then()
    .catch((err) => {
      generalError();
      console.log(err.data);
    });
};

//if not already authorized, will prompt for login
//TODO Test unauthroized login
module.exports.init = () => {

  //TODO try to refresh bearer token before authorizing
  let state = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 16; i++) {
    state += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  let scope =
    "user-read-private user-read-email user-read-playback-state streaming playlist-read-collaborative user-modify-playback-state playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read app-remote-control user-read-recently-played playlist-modify-private user-follow-modify user-library-read";

  app = express();
  app.listen(8888);

  app.get("/callback", function (res, req) {
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: res.query.code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };
    request.post(authOptions, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        console.log("errors", error);
      } else {
        tokenManagement.setAuth(body.access_token);
        tokenManagement.setRefresh(body.refresh_token);
      }
    });
  });

  open(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: "code",
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
      })
  );

  //process.exit() after everything is done
};
module.exports.tokenRefresh = () => {
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: tokenManagement.getRefresh(),
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      tokenManagement.setAuth(body.access_token);
    }
  });
};
