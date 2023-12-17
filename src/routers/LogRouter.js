const router = require('express').Router();
const { query } = require('express-validator');

const { asyncWrap } = require('../Utils');
const { validate } = require('../RequestValidation');

const LogRepository = require('../repositories/LogRepository');
const LogService = require('../services/LogService');
const LogController = require('../controllers/LogController');

const exchangeRateDb = require('../databases/ExchangeRateDatabase');

const logRepository = new LogRepository({ exchangeRateDb });
const logService = new LogService({ logRepository });
const logController = new LogController({ logService });

router.get('/logs', [
    query('startDate').optional().isDate({ format: 'YYYY-MM-DD' }),
    query('endDate').optional().isDate({ format: 'YYYY-MM-DD' }),
    validate,
], asyncWrap(logController.getLogs));

module.exports = router;
