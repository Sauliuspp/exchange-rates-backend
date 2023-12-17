# Exchange rates backend

A small personal project for practice.

This is a backend implementation that uses [OpenExchangeRates](https://openexchangerates.org/) API.

Technologies used:
- Node.js
- Express
- Docker
- Redis
- MySQL

## How to setup
1. Run `npm ci`
2. Register at https://openexchangerates.org/signup/free to get API token

## How to launch
1. To launch docker containers, run `docker-compose up`
2. Backend application can be launched with command `npm start`

To connect to MySQL database:
1. Run command `docker exec -it mysql bash`
2. Run command `mysql -h localhost -P 3306 -u root`

## Endpoint documentation
- `GET /exchange-rates`
    - Header `x-api-key` - Open Exchange Rates API key
- `GET /logs`
    - `startDate` and `endDate` - query params, used to filter by date interval. Both must be defined to take effect.

## Tests
Tests are written with `mocha` and `sinon`.
Tests can be run with command `npm test`.

## Caching
`GET /exchange-rates` endpoint uses caching (redis) so that the API wouldn't get spammed.

## Logging
`GET /exchange-rates` endpoint calls are logged to database.
Logs can be accessed by calling `GET /logs` endpoint.
