const makeSpotify = require("./spotify");
const commander = require('commander');
const program = new commander.Command();

let Spotify = makeSpotify();
program.version("0.0.1");

  program
    .command("play")
    .option("-p")
    .action(function(){
        
    });
  program
    .command("username <user>")
    .option("-user")
    .action(function() {
    });

  program.parse(process.argv);