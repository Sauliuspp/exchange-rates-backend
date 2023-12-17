const CurrencyController = require('../../src/controllers/CurrencyController');
const sinon = require('sinon');

const { ApplicationError } = require('../../src/Error');

const req = {
    header: () => 'headerValue',
    ip: 'ipValue',
};
const res = { json: sinon.spy() };

const apiKey = req.header();
const ip = req.ip;
const exchangeRates = { rates: {} };

describe('CurrencyController', () => {
    describe('getExchangeRates', () => {
        it('should return exchange rates', async () => {
            const currencyService = { getExchangeRates: () => exchangeRates };
            const currencyController = new CurrencyController({ currencyService });

            sinon.spy(currencyService, 'getExchangeRates');

            await currencyController.getExchangeRates(req, res);

            sinon.assert.calledOnceWithExactly(currencyService.getExchangeRates, apiKey, ip);
        });
        it('should throw error', async () => {
            const error = new ApplicationError(400, 'Failed to fetch exchange rates');
            const currencyService = { getExchangeRates: () => exchangeRates };

            sinon.stub(currencyService, 'getExchangeRates').throws(error);

            const currencyController = new CurrencyController({ currencyService });

            try {
                await currencyController.getExchangeRates(req, res);
            } catch (error) {
                sinon.assert.calledOnceWithExactly(currencyService.getExchangeRates, apiKey, ip);
                sinon.assert.threw(currencyService.getExchangeRates);
            }
        });
    });
});
