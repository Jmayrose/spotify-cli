const commander = require("commander");
const Spotify = require("./spotify");
const program = require("commander");
program.version("0.1.0");
program.name("spotify");

//TODO Write README

program.command("init").action(() => Spotify.init());
program.command("resume").action(() => Spotify.resume());
program.command("pause").action(() => Spotify.pause());
program.command("skip").action(() => Spotify.skip());

//TODO queue track
//? album/playlist/artist
program.command("queue <query...>").action((query) => Spotify.queue(query));

//TODO search track
//? album/playlist/artist
program.command("search <query...>").action((query) => Spotify.search(query));

program.parse(process.argv);
