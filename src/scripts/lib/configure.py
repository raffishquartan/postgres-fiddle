import os.path as path
import re

import general as general

class Option:
  """
  Represents a single configuration option
  """
  def __init__(self, current_value_file_path, output_file_path, regex_match_string, name, description):
    if path.isfile(current_value_file_path) is not True:
      raise Exception(
        'Error:\n' +
        '"' + current_value_file_path + '"" does not exist'
      )

    if path.isfile(output_file_path) is not True:
      raise Exception(
        'Error:\n' +
        '"' + output_file_path + '"" does not exist'
      )

    self.current_value_file_path = current_value_file_path
    self.output_file_path = output_file_path
    self.regex_match_string = regex_match_string
    self.name = name
    self.description = description

  def configure_option(self, current_value_install_dir, dest_value_install_dir):
    print('')
    #### Load current file as string
    with open(self.current_value_file_path, 'r') as current_value_file:
      current_file_as_string = current_value_file.read()

    #### Extract current value, value_from_file_string also checks regex matches once and once only
    current_value = general.value_from_file_string(
      regex_match_string=self.regex_match_string,
      file_as_string=current_file_as_string,
      file_path=self.current_value_file_path,
      name=self.name
    )

    #### Explain to user and get updated value
    print(self.name + ': ' + self.description)
    print('Current value: ' + current_value)
    input_value = raw_input('Enter desired value, or leave blank to make no change: ')

    if input_value == '':
      output_value = current_value
    else:
      output_value = input_value

    if general.prompt_for_confirm('Value will be set to "' + output_value + '", is that correct? '):
      replacement_string = re.sub(r'\([^\)]*\)', output_value, self.regex_match_string)
      updated_file_as_str_count_tuple = re.subn(self.regex_match_string, replacement_string, current_file_as_string)

      if updated_file_as_str_count_tuple[1] == 1:
        #### Write updated value to destination path
        with open(self.output_file_path, 'w') as destination_value_file:
          #destination_value_file.truncate()
          destination_value_file.write(updated_file_as_str_count_tuple[0])
      else:
        raise Exception(
          'Error:\n' +
          self.name + ' was expecting just one substitution, but ' + updated_file_as_str_count_tuple[1] + ' ' +
          'were made'
        )
    else:
      print('Making no changes to ' + self.output_file_path)



class Group:
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
    Adds a Option to the group.

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
    self.options.append(Option(
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



if __name__ == '__main__':
  print('This file is not configured to be run separately; tests will come at a later date')
