import re
import os.path as path

def prompt_for_confirm(prompt=None, resp=False):
    '''
    prompts for yes or no response from the user. Returns True for yes and
    False for no.

    'resp' should be set to the default value assumed by the caller when
    user simply types ENTER.

    >>> prompt_for_confirm(prompt='Create Directory?', resp=True)
    Create Directory? [y]|n:
    True
    >>> prompt_for_confirm(prompt='Create Directory?', resp=False)
    Create Directory? [n]|y:
    False
    >>> prompt_for_confirm(prompt='Create Directory?', resp=False)
    Create Directory? [n]|y: y
    True

    Source: https://code.activestate.com/recipes/541096-prompt-the-user-for-confirmation/
    '''

    if prompt is None:
        prompt = 'Confirm'

    if resp:
        prompt = '%s [%s]|%s: ' % (prompt, 'y', 'n')
    else:
        prompt = '%s [%s]|%s: ' % (prompt, 'n', 'y')

    while True:
        ans = raw_input(prompt)
        if not ans:
            return resp
        if ans not in ['y', 'Y', 'n', 'N']:
            print 'please enter y or n.'
            continue
        if ans == 'y' or ans == 'Y':
            return True
        if ans == 'n' or ans == 'N':
            return False

class ConfigurationOption:
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
    #### Load current file as string
    with open(self.current_value_file_path, 'r') as current_value_file:
      current_file_as_string = current_value_file.read()

    #### Check that regex_match_string matches once and once only
    if len(re.findall(self.regex_match_string, current_file_as_string)) > 1:
      raise Exception(
        'Error:\n' +
        self.name + ' could not be configured because there are multiple matches for the pattern ' +
        '"' + self.regex_match_string + '" in ' + current_value_file_path
      )
    elif len(re.findall(self.regex_match_string, current_file_as_string)) == 0:
      raise Exception(
        'Error:\n' +
        self.name + ' could not be configured because there are no matches for the pattern ' +
        '"' + self.regex_match_string + '" in ' + current_value_file_path
      )
    else:
      #### Extract current value
      current_value = re.match('.*' + self.regex_match_string + '.*', current_file_as_string, re.DOTALL).group(1)

      #### Explain to user and get updated value
      print(self.name)
      print(self.description)
      print('')
      print('Current value:                                         ' + current_value)
      input_value = raw_input('Enter desired value, or leave blank to make no change: ')

      if input_value == '':
        output_value = current_value
      else:
        output_value = input_value

      if prompt_for_confirm('Value will be set to "' + output_value + '", is that correct? '):
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

if __name__ == '__main__':
  print('This file is not configured to be run separately; tests will come at a later date')
