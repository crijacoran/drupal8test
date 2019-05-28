cd /var/www/html/web
chown -R www-data:www-data sites
cd /var/www/html/web
chown -R www-data:www-data themes
cd /var/www/html/web
chown -R www-data:www-data modules
cd /var/www/html
composer install --no-dev --optimize-autoloader
npm install
gulp build:prod
cd /var/www/html/web
drush updb -y
drush cim -y

