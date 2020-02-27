const program = require("commander");
var Spotify = require("./spotify");

Spotify.start();

program.version("0.0.1");
program.name("spotify");

program
  .option("-t, --track")
  .option("-p, --playlist")
  .option("-a, --album");

program
  .command("start")
  .description("begin music playback")
  .action();

program
  .command("stop")
  .description("suspend music playback")
  .action();

program
  .command("next")
  .description("skip to the next song in the queue")
  .action();

program
  .command("prev")
  .description("starts the most recently played song")
  .action();

program
  .command("search <query>")
  .description("Search for a specified track, album, or playlist")
  .action();

//Need to autorize spotify on every call .then() perform actions

program.parse(process.argv);
