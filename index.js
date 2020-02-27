const program = require("commander");

import './spotify.js';

startSpotify();

program.version("0.0.1");
program.name("spotify");

program
  .option("-t, --track")
  .option("-p, --playlist")
  .option("-a, --album");

program
  .command("start")
  .description("begin music playback")
  .action(() => {
    console.log("YOU DONE STARTED");
  });

program
  .command("stop")
  .description("suspend music playback")
  .action(() => {
    console.log("YOU DONE STOPPED");
  });

program
  .command("next")
  .description("skip to the next song in the queue")
  .action(() => {
    console.log("YOU DONE SKIPPED A SONG");
  });

program
  .command("prev")
  .description("starts the most recently played song")
  .action(() => {
    console.log("YOU DONE GONE BACK");
  });

program
  .command("search <query>")
  .description("Search for a specified track, album, or playlist")
  .action(function(query) {
    console.log("searchin' for ", query);
  });

//Need to autorize spotify on every call .then() perform actions

program.parse(process.argv);
