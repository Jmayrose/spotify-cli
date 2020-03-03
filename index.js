const program = require("commander");
var Spotify = require("./spotify");

Spotify.start();

program.version("0.0.5");
program.name("spotify");

program.command("login").action();//Opens prompt for app authorization for account access

program.command("play"); //resumes music //Typable
program.command("pause").action(Spotify.pause());

program.command("skip");//skips to next song in queue
program.command("rewind");//

program.command("add"); //adds item to queue //Typable

program.command("queue"); //displays 5 items in queue
program.command("clear").action(Spotify.clear());

program.command("search"); //Typable

program.parse(process.argv);
