# InStride - Drupal

## Getting Started

- Clone the repo:  _git clone git@github.com:InStrideHQ/lp-platform.git_

- Install Lando:
 
    - Linux https://docs.devwithlando.io/installation/linux.html
    
    - OsX https://docs.devwithlando.io/installation/macos.html
    
    - Windows https://docs.devwithlando.io/installation/windows.html

- Run "lando start" - this will create the local environment using docker containers 

- Run once "lando setup" - This will create the site from scratch, and it will run inside the containers the following commands:  composer install, node install, gulp build, and drush si.

- Visit https://instride.lndo.site

- that's all, in order to access the admin area, go to https://instride.lndo.site/user, user: admin, pass: admin

## Additional commands

- lando phpcs - Check drupal standards

- lando update - Update drupal with latest configuration

- lando info - Get important connection info

- lando ssh - "SSH" into the appserver

- lando logs - Get info on Lando service logs

- lando share -u https://instride.lndo.site - Get a publically accessible URL via localtunnel.me. 

- lando stop - Stop my site

- lando restart - Restart containers

- lando rebuild - Rebuild all containers and build process steps

- lando destroy - Destroy the containers and tools for this app

- lando poweroff - Power off lando

- lando update - it should be run after a pull from the repository, it will update the local environment with all new changes. it will run composer install to get latest packages, gulp build to compile latest css and js, also it will run drush updb.

- lando gulp watch - for ongoing scss complilation

- lando gulp build - one-off compile css, js and lint

- lando db-import/db-export database.sql.gz - it can can handle uncompressed, gzipped or zipped files. Dump file MUST exist somewhere inside of your app directory.

## Deployment steps
This commands should run automatically on every deploy, the webroot folder is /web

- On the root folder

    - composer install --no-dev --optimize-autoloader

    - npm install

    - gulp build:prod

- On the webroot folder

    - drush updb -y

    - drush cim -y
