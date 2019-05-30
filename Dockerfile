FROM debian:latest

## Install base packages
RUN apt-get update && \
    apt-get -yq install \
          apache2 \
          php \
          libapache2-mod-php \
          curl \
          vim \
          php-mbstring \
          php-xml \
          php-cli \
          php-curl \
          php-json \
          php-odbc \
          php-mcrypt \
          php-mysql && \          
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/archive/*.deb

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN a2enmod rewrite && mkdir /bootstrap

ADD 000-default.conf /etc/apache2/sites-available/000-default.conf
ADD start.sh /bootstrap/start.sh
RUN chmod 755 /bootstrap/start.sh && chown -R www-data:www-data /var/www/html

EXPOSE 80
ENTRYPOINT ["/bootstrap/start.sh"]
