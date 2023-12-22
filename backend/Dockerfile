# Use the official PHP image
FROM php:7.4-apache

# Set the working directory
WORKDIR /var/www/html

# Install required dependencies
RUN apt-get update && \
    apt-get install -y libzip-dev zip && \
    docker-php-ext-install pdo_mysql zip && \
    a2enmod rewrite

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files
COPY . /var/www/html

# Install dependencies
RUN composer install --no-scripts --no-dev --prefer-dist --optimize-autoloader

# Set the correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Copy the Apache virtual host file
COPY docker/apache2.conf /etc/apache2/sites-available/000-default.conf

# Enable Apache site configuration
RUN a2ensite 000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
