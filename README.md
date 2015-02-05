# POSTGRES-FIDDLE

This fiddle app demonstrates a Node.JS web app that reads dynamic data from a postgres DB.

## Using postgres-fiddle

## Bumping, building and testing postgres-fiddle

Build postgres-fiddle using Grunt. A deployable archive is created in the `build/dist`
directory by the build task.

Command                     | Notes
----------------------------|---------------------------------------------------------------------
grunt clean                 | Removes the `build` directory
grunt test                  | Runs jshint and mocha tests
grunt build                 | Builds application

## Deploying postgres-fiddle

SES requires Node >= 0.10, pm2 >= 0.12 and postgres >= 9.1.

### Installation

Uncompress `build/dist/ses-*.tar.gz` to the desired location

## Running postgres-fiddle

postgres-fiddle is run using pm2. To start the server, `cd server` and run
`pm2 start ../scripts/pm2-config.json`.

See the pm2 [documentation](https://github.com/Unitech/pm2#table-of-contents) for other useful
commands.

## Changelog

v0.0.0 - initial stub, no functionality

## License

Copyright (C) 2015 Christo Fogelberg, all rights reserved
