const router = require('express').Router();
const { header } = require('express-validator');
const { validate } = require('../RequestValidation');

const { asyncWrap } = require('../Utils');

const LogRepository = require('../repositories/LogRepository');
const CurrencyService = require('../services/CurrencyService');
const CurrencyController = require('../controllers/CurrencyController');

const exchangeRateDb = require('../databases/ExchangeRateDatabase');
const cacheApi = require('../api/CacheApi');
const currencyApi = require('../api/CurrencyApi');

const logRepository = new LogRepository({ exchangeRateDb });
const currencyService = new CurrencyService({
    cacheApi,
    currencyApi,
    logRepository,
});
const currencyController = new CurrencyController({ currencyService });

router.get('/exchange-rates', [
    header('x-api-key').trim().notEmpty().isAlphanumeric(),
    validate,
], asyncWrap(currencyController.getExchangeRates));

module.exports = router;
