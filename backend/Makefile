setup:
	@make build
	@make up
	@make composer-update
build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
up:
	docker-compose up -d
composer-update:
	docker exec paiement-auto-app bash -c "composer update"
data:
	docker exec paiement-auto-app bash -c "php artisan migrate"
