'''
Application file configuration

Guides user through configuration file changes, writing the changes to disk. Does not move, copy, backup or otherwise
edit any files. Does not make any database changes. Does not restart the web application
'''

#!/usr/bin/python

import os.path as path
import lib.ConfigurationOption as lib

class ConfigureGroup:
  '''
  Represents a group of configuration options (usually associated with one file, but not necessarily)
  '''

  def __init__(self, group_name, current_value_install_dir, output_value_install_dir, default_config_file_rel_path):
    if path.isdir(current_value_install_dir) is not True:
      raise Exception(
        'Error:\n' +
        '"' + current_value_install_dir + '" could not be found, please check paths'
      )

    if path.isdir(output_value_install_dir) is not True:
      raise Exception(
        'Error:\n' +
        '"' + output_value_install_dir + '" could not be found, please check paths'
      )

    self.group_name = group_name
    self.current_value_install_dir = current_value_install_dir
    self.output_value_install_dir = output_value_install_dir
    self.default_config_file_rel_path = default_config_file_rel_path
    self.options = []

  def add_option(self, re_string, name, desc, curr_val_dir=None, output_val_dir=None, config_file_rel_path=None):
    '''
    Adds a ConfigurationOption to the group.

    NB: re_string is assumed to be a regex string with a single capture group that has the form '(<something>)'
    '''
    if curr_val_dir is None:
      curr_val_dir = self.current_value_install_dir
    if output_val_dir is None:
      output_val_dir = self.output_value_install_dir
    if config_file_rel_path is None:
      config_file_rel_path = self.default_config_file_rel_path

    curr_value_file_path = path.join(curr_val_dir, config_file_rel_path)
    output_file_path = path.join(output_val_dir, config_file_rel_path)
    self.options.append(lib.ConfigurationOption(
      current_value_file_path = curr_value_file_path,
      output_file_path=output_file_path,
      regex_match_string=re_string,
      name=name,
      description=desc
    ))

  def configure_options(self):
    print('******************************************************************')
    print('  CONFIGURING ' + self.group_name.upper())
    print('******************************************************************')
    [option.configure_option(self.current_value_install_dir, self.output_value_install_dir) for option in self.options]
    print('******************************************************************')
    print('')
    print('')
    print('')

def configure_app(current_value_install_dir, output_value_install_dir):
  '''
  Specifies the configuration option groups for the application and calls configure_options on each
  '''
  groups = []

  groups.append(ConfigureGroup(
    group_name='General server setup',
    current_value_install_dir=current_value_install_dir,
    output_value_install_dir=output_value_install_dir,
    default_config_file_rel_path='./server/app/config/server.js'
  ))
  groups[-1].add_option(
    name='HTTP port',
    desc='The HTTP port that the server listens on [number]',
    re_string='http_port: (\d+)'
  )
  groups[-1].add_option(
    name='q long stack traces',
    desc='Enable long stack traces from Q [true or false]',
    re_string='q_longStackSupport: (true|false|undefined)'
  )
  groups[-1].add_option(
    name='Static cache max age',
    desc='The maximum length of time a static element is cached by the server [number]',
    re_string='static_max_age: (\d+)'
  )

  groups.append(ConfigureGroup(
    group_name='Server application logging',
    current_value_install_dir=current_value_install_dir,
    output_value_install_dir=output_value_install_dir,
    default_config_file_rel_path='./server/app/util/logger/logger_config.json'
  ))
  groups[-1].add_option(
    name='Server app log level',
    desc='The log level for server app/* loggers; set other options/granular logging manually [log level string]',
    re_string='"level": "([^"]*)"'
  )

  groups.append(ConfigureGroup(
    group_name='Server Express logging',
    current_value_install_dir=current_value_install_dir,
    output_value_install_dir=output_value_install_dir,
    default_config_file_rel_path='./server/app/config/logger.js'
  ))

  groups.append(ConfigureGroup(
    group_name='Database information',
    current_value_install_dir=current_value_install_dir,
    output_value_install_dir=output_value_install_dir,
    default_config_file_rel_path='./server/app/config/database.js'
  ))
  groups[-1].add_option(
    name='DB name',
    desc='The database name [a valid string]',
    re_string='name: \'([a-zA-Z_]*)\''
  )
  groups[-1].add_option(
    name='DB name check',
    desc='This is used by Sequelize to validate that changes are being made to the correct DB [the same as the name]',
    re_string='database_name_check_before_sync: /([a-zA-Z_]*)/'
  )
  groups[-1].add_option(
    name='DB user',
    desc='The database username [a valid string]',
    re_string='user: \'([a-zA-Z_]*)\''
  )
  groups[-1].add_option(
    name='DB user password',
    desc='The database user password [a valid string]',
    re_string='password: \'([a-zA-Z_]*)\''
  )
  groups[-1].add_option(
    name='DB host',
    desc='The database host [a URI]',
    re_string='host: \'([a-zA-Z_]*)\''
  )
  groups[-1].add_option(
    name='DB port',
    desc='The database port [a number, probably greater than 1024]',
    re_string='port: \'([\d]+)\''
  )
  groups[-1].add_option(
    name='DB schema',
    desc='The database schema to use [a valid string]',
    re_string='schema: \'([a-zA-Z_]*)\''
  )
  groups[-1].add_option(
    name='Maximum DB connections',
    desc='DB connections pool - maximum number of connections to have open [a number]',
    re_string='maxConnections: (\d+)'
  )
  groups[-1].add_option(
    name='Minimum DB connections',
    desc='DB connections pool - minimum number of connections to have open [a number]',
    re_string='minConnections: (\d+)'
  )
  groups[-1].add_option(
    name='Max idle time',
    desc='Maximum DB connection open idle time (in milliseconds) [a number]',
    re_string='maxIdleTime: (\d+)'
  )

  groups.append(ConfigureGroup(
    group_name='Client logging',
    current_value_install_dir=current_value_install_dir,
    output_value_install_dir=output_value_install_dir,
    default_config_file_rel_path='./client/js/app/config.js'
  ))
  groups[-1].add_option(
    name='Client js logger',
    desc='The log level for all root/js loggers',
    re_string='level: \'([^\']*)\', // configure.py: js'
  )
  groups[-1].add_option(
    name='Client events_logger',
    desc='The log level for events_logger (Marionette evets)',
    re_string='level: \'([^\']*)\', // configure.py: events_logger'
  )

  [group.configure_options() for group in groups]
  print('NB: server/app/config/logger.js must be configured manually')
  print('CONFIGURATION COMPLETE')


if __name__ == '__main__':
  current_value_install_dir = \
    raw_input('Please enter the directory location of the currently installed app to read from: ')
  output_value_install_dir = \
    raw_input('Please enter the directory location of the currently installed app to write to:  ')
  current_value_install_dir = current_value_install_dir.strip()
  output_value_install_dir = output_value_install_dir.strip()
  print('\nYou have elected:')
  print('- to read default values from:           ' + current_value_install_dir)
  print('- to write the updated configuration to: ' + output_value_install_dir)
  if lib.prompt_for_confirm('Is this correct?'):
    print('')
    configure_app(
      current_value_install_dir=current_value_install_dir,
      output_value_install_dir=output_value_install_dir
    )
  else:
    print('Aborting')
