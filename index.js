const program = require("commander");

import './spotify.js';

startSpotify();

program.version("0.0.1");

//Need to autorize spotify on every call .then() perform actions

program.parse(process.argv);
