#!/usr/bin/env bash

ROOT_DIR="$(pwd)/"
LIST=$( git diff --name-only --cached --diff-filter=AM )

# Check if there is at least 1 file created or modified
if [ -z "$LIST" ]
then
  exit 0
else
  PHPCS_BIN=vendor/squizlabs/php_codesniffer/bin/phpcs
  echo "Executing phpcs..."
  $PHPCS_BIN --standard=Drupal,DrupalPractice --extensions=php,module,inc,install,test,profile,theme,css,info,txt,md $LIST

  # Return the status of the last run command.
  exit $?
fi
