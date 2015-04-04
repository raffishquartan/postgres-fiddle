# POSTGRES-FIDDLE

This fiddle app demonstrates a Node.JS web app that reads dynamic data from a postgres DB.

## Using postgres-fiddle

You can't really use this. It's just a fiddle.

## Bumping, building and testing postgres-fiddle

Build postgres-fiddle using Grunt. A deployable archive is created in the `build/dist`
directory by the build task.

Command                     | Notes
----------------------------|---------------------------------------------------------------------
grunt clean                 | Removes the `build` directory and other temporary files
grunt test                  | Runs jshint (client, server) and mocha (server) tests
grunt build                 | Cleans, tests and builds application ready for deployment

## Deploying postgres-fiddle

SES requires Node >= 0.10, pm2 >= 0.12 and postgres >= 9.1.

### Installation

**INSTRUCTIONS TO BE UPDATED TO USE INSTALLATION INSTRUCTIONS**

### 0) Install to the desired location

Uncompress `build/dist/postgres-fiddle-*.tar.gz` to the desired location

### 1) Edit postgres-fiddle configuration files

postgres-fiddle configuration is simple and manual. Edit the following files to adjust its configuration:

- server/app/util/logger/logger_config.json
  - Server logger configuration (appenders, dest groups and log levels by logger)
  - NB: Everything sits under `logger:app`
- server/app/config/server.js
  - Server http_port, q_longStackSupport status (true/false) and the length of time to cache static assets
- server/app/config/database.js
  - Database connection information and schema name
- client/js/app/config.js
  - Client logger configuration (and theoretically other things, but there aren't any)
  - All logs sit under `logger:root`, most logging is in `logger:root:js` but all events are info-logged to `
    logger:root:events_logger`

### 2) Set up the postgres-fiddle database

Edit commands in `2-db-setup.sh` to match the configuration specified in (1) and execute this bash script

If the user postgres does not have rights to be in the install directory (they probably won't) then there may be error output 'could not change directory to "/path/to/install/directory"' - this can be ignored.

### 3) Initialise the physical representation

Run `node scripts/3_initialise-pr.js` to create the DB schema and all associated tables.

### 4) Create DB indexes (optional)

`scripts/create-db-indexes.sql` can also be optionally executed to create additional DB indexes for
better performance

## Running postgres-fiddle

postgres-fiddle is run using pm2. To start the server, `cd` to the root directory of the install (with the `scripts`,
directory in it) and run `pm2 start scripts/pm2-config.json`. See the pm2 [documentation](https://github.com/Unitech/
pm2#table-of-contents) for other useful commands.

Alternatively, to run from source before building (e.g. for testing), `cd src` and run `nodemon server/app/server.js`

## Nice features

postgres-fiddle started as a simple app to figure out how best to use postgres with node. In the end it's grown a
little and has some nice features I intend to use in other apps as well

- Configurable log4j-like logging on both client and server that refreshes (on the server) without a server restart
- Backbone extensions for easier debugging and better logging
- Scripts for installing, upgrading and configuring the application that are easily usable elsewhere
- A clean code structure that makes code navigation easy
- Server tests that help turn Javascript runtime errors into test-time errors

## Issues

- There is no client testing implemented

## Changelog

v0.0.0 - initial stub, no functionality

## License

Copyright (C) 2015 Christo Fogelberg, all rights reserved
