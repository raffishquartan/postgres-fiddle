#!/bin/bash

sudo -u postgres psql -c "CREATE USER postgres_fiddle WITH PASSWORD 'postgres_fiddle';"
sudo -u postgres psql -c "CREATE DATABASE postgres_fiddle OWNER postgres_fiddle;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE postgres_fiddle TO postgres_fiddle;"
sudo -u postgres psql -c "CREATE SCHEMA pfsq AUTHORIZATION postgres_fiddle;" postgres_fiddle
sudo -u postgres psql -c 'CREATE EXTENSION "uuid-ossp" SCHEMA pfsq;' postgres_fiddle
