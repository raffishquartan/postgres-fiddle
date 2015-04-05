import os as os
import re as re
import subprocess as subprocess

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



def value_from_file_string(regex_match_string, file_as_string, file_path='file', name='Property'):
  #### Check that regex_match_string matches once and once only
  if len(re.findall(regex_match_string, file_as_string)) > 1:
    raise Exception(
      'Error:\n' +
      name + ' could not be extracted because there are multiple matches for the pattern ' +
      '"' + regex_match_string + '" in ' + file_path
    )
  elif len(re.findall(regex_match_string, file_as_string)) == 0:
    raise Exception(
      'Error:\n' +
      name + ' could not be extracted because there are no matches for the pattern ' +
      '"' + regex_match_string + '" in ' + file_path
    )
  else:
    #### Extract current value
    return re.match('.*' + regex_match_string + '.*', file_as_string, re.DOTALL).group(1)



if __name__ == '__main__':
  print('This file is not configured to be run separately; tests will come at a later date')
