'''
Installs the application to a server

Installs the application to a server, using the current location of the extracted files as their final location (so
extract the files from any install archive to where they should be installed first).
- Guides user through configuration file changes
- Sets up and configures the database and database schema
- Executes further database-level tasks like index creation (optional)
- Symlinks the desired application directory (e.g. /opt/postgres-fiddle/app) to the install location

Assumptions:
- That the database engine is running and listening
'''

#!/usr/bin/python

import os as os
import uuid as uuid

import lib.general as general
import configure as configure



CONST_DB_SETUP_COMMANDS_TEMPLATE = """
sudo -u postgres psql -c "CREATE USER {db.user} WITH PASSWORD '{db.pw}';"
sudo -u postgres psql -c "CREATE DATABASE {db.name} OWNER {db.user};"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE {db.name} TO {db.user};"
sudo -u postgres psql -c "CREATE SCHEMA {db.schema} AUTHORIZATION {db.user};" {db.name}
sudo -u postgres psql -c 'CREATE EXTENSION "uuid-ossp" SCHEMA {db.schema};' {db.name}
"""

CONST_INITIALISE_PR = """
'use strict';

var pr = require('app/util/pr');
var q = require('q');

pr.sq.sync({ force: true })
.then(function() {
  var hard_coded_tag_promises = q.all([
    pr.pr.entry.tag.create({value: 'foo'}),
    pr.pr.entry.tag.create({value: 'bar'}),
    pr.pr.entry.tag.create({value: 'baz'})
  ]);

  var hard_coded_entry_promises = q.all([
    pr.pr.entry.entry.create({
      body: 'This is entry 0. Here is some text.',
      date: new Date(2015, 2, 10)
    }), pr.pr.entry.entry.create({
      body: 'This is entry one. Here is some more text.',
      date: new Date(2015, 2, 10)
    }), pr.pr.entry.entry.create({
      body: 'This is entry tertius III. Here is interesting text.',
      date: new Date(2015, 2, 12)
    }), pr.pr.entry.entry.create({
      body: 'this is entry iv i dont know punctuation',
      date: new Date(2015, 2, 11)
    }), pr.pr.entry.entry.create({
      body: 'This is entry si4 with id 5 and a fullstop.',
      date: new Date(2015, 2, 13)
    }), pr.pr.entry.entry.create({
      body: 'This is entry hex. Should I be a magical curse?',
      date: new Date(2015, 2, 14)
    })
  ]);
  return q.all([hard_coded_tag_promises, hard_coded_entry_promises]);
})
.spread(function(hard_coded_tags, hard_coded_entries) {
  return q.all([
    hard_coded_entries[0].setTags([hard_coded_tags[0], hard_coded_tags[1]]),
    hard_coded_entries[1].setTags([hard_coded_tags[2]]),
    hard_coded_entries[2].setTags([hard_coded_tags[1], hard_coded_tags[2]]),
    hard_coded_entries[3].setTags([hard_coded_tags[0]]),
    hard_coded_entries[4].setTags([hard_coded_tags[1]]),
    hard_coded_entries[5].setTags([hard_coded_tags[0], hard_coded_tags[1], hard_coded_tags[2]])
  ]);
})
.then(function() {
  pr.sq.close();
})
.done();
"""

CONST_DB_ADDITIONAL_COMMANDS = """
sudo -u postgres psql -c "CREATE INDEX entry_tag_entry_ndx ON {db.schema}.entry_tag (entry_id);" {db.name}
sudo -u postgres psql -c "CREATE INDEX entry_tag_tag_ndx ON {db.schema}.entry_tag (tag_id);" {db.name}
"""



def read_db_configuration(install_dir_path):
  db_config_path = 'server/app/config/database.js'
  with open(os.path.join(install_dir_path, db_config_path), 'r') as db_config_file:
    curr_file_as_string = db_config_file.read()
  user = general.value_from_file_string('user: \'([a-zA-Z_]*)\'', curr_file_as_string, db_config_path, 'User')
  pw = general.value_from_file_string('password: \'([a-zA-Z_]*)\'', curr_file_as_string, db_config_path, 'Password')
  name = general.value_from_file_string('name: \'([a-zA-Z_]*)\'', curr_file_as_string, db_config_path, 'Name')
  schema = general.value_from_file_string('schema: \'([a-zA-Z_]*)\'', curr_file_as_string, db_config_path, 'Schema')
  return (user, pw, name, schema)



def execute_shell_commands(commands_list):
  for command in commands_list:
    print('Executing: ' + command)
    os.system(command)



def setup_database(install_dir_path):
  print('******************************************************************')
  print('  SETTING UP DATABASE')
  print('******************************************************************')

  print('NB: Commands may create spurious stderr output if postgres user cannot read install dir')
  # Read DB configuration from server/app/config/database.js
  (user, pw, name, schema) = read_db_configuration(install_dir_path)

  # Generate and write DB creation shell script
  db_setup_commands = CONST_DB_SETUP_COMMANDS_TEMPLATE \
    .replace('{db.user}', user) \
    .replace('{db.pw}', pw) \
    .replace('{db.name}', name) \
    .replace('{db.schema}', schema) \
    .strip() \
    .split('\n')

  # Execute the DB setup commands
  execute_shell_commands(db_setup_commands)

  print('******************************************************************')
  print('')
  print('')
  print('')



def initialise_schema(install_dir_path):
  print('******************************************************************')
  print('  INITIALISING DB SCHEMA')
  print('******************************************************************')

  # Write initialise PR script to a temp file in server application directory
  temp_nodefile_file_path = 'TEMP-' + str(uuid.uuid4()) + '-initialise-pr.js'
  print('Generating temporary node script to: ' + temp_nodefile_file_path)
  temp_nodefile_full_path = os.path.join(
    install_dir_path,
    'server',
    'app',
    temp_nodefile_file_path
  )
  with open(temp_nodefile_full_path, 'w') as temp_nodefile_file:
    temp_nodefile_file.write(CONST_INITIALISE_PR)

  # Run the file as a node server script from a directory with a logs directory
  #
  cwd = os.getcwd()
  print('Changing working directory to ' + install_dir_path)
  os.chdir(install_dir_path)
  initialise_pr_command = 'node ' + os.path.join('server', 'app', temp_nodefile_file_path)
  print('Executing : ' + initialise_pr_command)
  os.system(initialise_pr_command)
  print('Restoring working directory to ' + cwd)
  os.chdir(cwd)

  # Delete the temporarily generated file
  print('Deleting ' + temp_nodefile_full_path)
  os.unlink(temp_nodefile_full_path)

  print('******************************************************************')
  print('')
  print('')
  print('')



def execute_additional_db_tasks(install_dir_path):
  print('******************************************************************')
  print('  EXECUTING ADDITIONAL DB TASKS')
  print('******************************************************************')
  (user, pw, name, schema) = read_db_configuration(install_dir_path)

  db_additional_commands = CONST_DB_ADDITIONAL_COMMANDS \
    .replace('{db.user}', user) \
    .replace('{db.pw}', pw) \
    .replace('{db.name}', name) \
    .replace('{db.schema}', schema) \
    .strip() \
    .split('\n')

  execute_shell_commands(db_additional_commands)

  print('******************************************************************')
  print('')
  print('')
  print('')



def create_app_symlink(install_dir_path, app_symlink_path):
  print('******************************************************************')
  print('  CREATING APP SYMLINK')
  print('******************************************************************')

  if not os.path.exists(os.path.dirname(app_symlink_path)):
    os.makedirs(os.path.dirname(app_symlink_path))
  os.symlink(install_dir_path, app_symlink_path)

  print('******************************************************************')
  print('')
  print('')
  print('')



def install_app(install_dir_path, app_symlink_path):
  '''
  Installs the application by executing the following process:
  - (0) Check install_dir_path exists and app_symlink_path doesn't
  - (1) Guide user through configuration file changes
  - (2) Initialise the DB, creating users and schema
  - (3) Set up the database schema
  - (4) Executes additional database level tasks (like index creation for improved performance)
  - (5) Symlinks the install directory to the target application directory
  '''
  # (0)
  if not os.path.exists(install_dir_path):
    raise Error(
      'Error:\n' +
      'Install directory path does not exist: "' + install_dir_path + '"'
    )
  if os.path.lexists(app_symlink_path):
    raise Error(
      'Error:\n' +
      'App symlink already exists: "' + app_symlink_path + '"'
    )

  # (1)
  configure.configure_app(
    current_value_install_dir=install_dir_path,
    output_value_install_dir=install_dir_path
  )

  # (2)
  setup_database(
    install_dir_path=install_dir_path
  )

  # (3)
  initialise_schema(
    install_dir_path=install_dir_path
  )

  # (4)
  execute_additional_db_tasks(
    install_dir_path=install_dir_path
  )

  # (5)
  create_app_symlink(
    install_dir_path=install_dir_path,
    app_symlink_path=app_symlink_path
  )



if __name__ == '__main__':
  print('NB: The application install directory is probably the parent of this scripts directory')
  install_dir_path = raw_input('Enter the application install directory path: ').strip()
  app_symlink_path = raw_input('Enter the application symlink path:           ').strip()
  print('\nYou have entered:')
  print('- application install directory path: ' + install_dir_path)
  print('- application symlink path:           ' + app_symlink_path)
  if general.prompt_for_confirm('Is this correct?'):
    print('')
    install_app(
      install_dir_path=install_dir_path,
      app_symlink_path=app_symlink_path
    )
    print('')
    print('')
    print('')
    print('******************************************************************')
    print('******************************************************************')
    print('******************************************************************')
    print('                        INSTALL COMPLETE')
    print('******************************************************************')
    print('******************************************************************')
    print('******************************************************************')
  else:
    print('Aborting')
