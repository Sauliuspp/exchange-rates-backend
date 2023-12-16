const router = require('express').Router();

const { asyncWrap } = require('../Utils');

const exchangeRateDb = require('../databases/ExchangeRateDatabase');
const LogRepository = require('../repositories/LogRepository');
const CurrencyService = require('../services/CurrencyService');
const CurrencyController = require('../controllers/CurrencyController');

const cacheApi = require('../api/CacheApi');
const currencyApi = require('../api/CurrencyApi');
const logRepository = new LogRepository({ exchangeRateDb });
const currencyService = new CurrencyService({
    cacheApi,
    currencyApi,
    logRepository,
});
const currencyController = new CurrencyController({ currencyService });

router.get('/exchange-rates', [], asyncWrap(currencyController.getExchangeRates));

module.exports = router;
