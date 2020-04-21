const express = require("express");
const axios = require("axios");
const querystring = require("querystring"); //! deprecated
const open = require("open");

require("dotenv").config();

const tokenManagement = require("./tokenManagement");

const request = require("request"); //! deprecated
//TODO Refactor request calls to axios

const myAxios = axios.create({
  headers: { Authorization: "Bearer " + tokenManagement.getAuth() },
});

module.exports.resume = () => {
  myAxios
    .put("https://api.spotify.com/v1/me/player/play")
    .then()
    .catch((err) => {
      if (err.response.data.error.status !== 403) {
        console.log("Something went wrong");
      }
    });
};

module.exports.pause = () => {
  myAxios
    .put("https://api.spotify.com/v1/me/player/pause")
    .then()
    .catch(() => console.log("Something went wrong"));
};

module.exports.skip = () => {
  //TODO Log name of next song to console
  myAxios
    .post("https://api.spotify.com/v1/me/player/next")
    .then()
    .catch(() => console.log("Something went wrong"));
};

module.exports.queue = async (query) => {
  query.join("+");

  let type = "track";

  console.log("queuing the", type, query);

  myAxios
    .get(`https://api.spotify.com/v1/search?q=${query}&limit=1&type=${type}`)
    .then((res) => {
      let uri = res.data.tracks.items[0].uri;
      myAxios
        .post(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`)
        .then()
        .catch((err) => {
          generalError();
        });
    })
    .catch((err) => {
      generalError();
    });
};

module.exports.search = (query) => {
  //TODO Add type parameter to query
  //! for now type default to track

  query = query.join("+");

  myAxios
    .get(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then((res) => {
      console.log(res.data.tracks.items);
      //TODO Extract meaningful data from this
    })
    .catch();
};

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
        console.log("Initialization successful");
        //TODO process.exit() after files saved
      }
    });
  });

  //TODO console log shorter link for user to click on
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
};

tokenRefresh = () => {
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
  };

  console.log("tokenRefresh authOptions:");
  console.log(authOptions);

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      tokenManagement.setAuth(body.access_token);
    }
  });
};
