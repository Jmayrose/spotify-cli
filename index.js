const commander = require("commander");
const Spotify = require("./spotify");
const program = require("commander");
program.version("0.1.0");
program.name("spotify");
//TODO Write README
program.command("init").action(() => Spotify.init());
program.command("play").action(() => Spotify.play());
program.command("pause").action(() => Spotify.pause());
program.command("skip").action(() => Spotify.skip());

program.parse(process.argv);
