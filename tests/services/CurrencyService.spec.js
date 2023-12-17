const CurrencyService = require('../../src/services/CurrencyService');
const sinon = require('sinon');

const {
    CACHE_KEY_PREFIX,
    CACHE_KEYS,
} = require('../../src/Constants');
const { ApplicationError } = require('../../src/Error');

const exchangeRates = { rates: {} };
const apiKey = 'apiKeyValue';
const ip = 'ipValue';
const cachedExchangeRates = "{\"cachedExchangeRates\":{\"EUR\":123}}";

describe('CurrencyService', () => {
    describe('getExchangeRates', () => {
        it('should return exchange rates from cache', async () => {
            const cacheApi = {
                get: () => cachedExchangeRates,
                set: () => { },
            };
            const currencyApi = { getExchangeRates: () => exchangeRates };
            const logRepository = { logAccess: () => { } };

            const currencyService = new CurrencyService({
                cacheApi,
                currencyApi,
                logRepository,
            });

            sinon.spy(cacheApi, 'get');
            sinon.spy(currencyApi, 'getExchangeRates');
            sinon.spy(cacheApi, 'set');
            sinon.spy(logRepository, 'logAccess');

            await currencyService.getExchangeRates(apiKey, ip);

            sinon.assert.calledOnceWithExactly(
                cacheApi.get,
                `${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`
            );
            sinon.assert.notCalled(currencyApi.getExchangeRates);
            sinon.assert.notCalled(cacheApi.set);
            sinon.assert.calledOnceWithExactly(logRepository.logAccess, ip);

        });
        it('should return exchange rates from api', async () => {
            const cacheApi = {
                get: () => null,
                set: () => { },
            };
            const currencyApi = { getExchangeRates: () => exchangeRates };
            const logRepository = { logAccess: () => { } };

            const currencyService = new CurrencyService({
                cacheApi,
                currencyApi,
                logRepository,
            });

            sinon.spy(cacheApi, 'get');
            sinon.spy(currencyApi, 'getExchangeRates');
            sinon.spy(cacheApi, 'set');
            sinon.spy(logRepository, 'logAccess');

            await currencyService.getExchangeRates(apiKey, ip);

            sinon.assert.calledOnceWithExactly(
                cacheApi.get,
                `${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`
            );
            sinon.assert.calledOnceWithExactly(currencyApi.getExchangeRates, apiKey);
            sinon.assert.calledOnceWithExactly(
                cacheApi.set,
                `${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`,
                JSON.stringify(exchangeRates)
            );
            sinon.assert.calledOnceWithExactly(logRepository.logAccess, ip);

        });
        it('should throw error when getting cached value', async () => {
            const error = new ApplicationError(400, 'Failed to fetch exchange rates');
            const cacheApi = {
                get: () => null,
                set: () => { },
            };
            const currencyApi = { getExchangeRates: () => exchangeRates };
            const logRepository = { logAccess: () => { } };

            const currencyService = new CurrencyService({
                cacheApi,
                currencyApi,
                logRepository,
            });

            sinon.stub(cacheApi, 'get').throws(error);
            sinon.spy(currencyApi, 'getExchangeRates');
            sinon.spy(cacheApi, 'set');
            sinon.spy(logRepository, 'logAccess');

            try {
                await currencyService.getExchangeRates(apiKey, ip);
            } catch (error) {
                sinon.assert.calledOnceWithExactly(
                    cacheApi.get,
                    `${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`
                );
                sinon.assert.threw(cacheApi.get);
                sinon.assert.notCalled(currencyApi.getExchangeRates);
                sinon.assert.notCalled(cacheApi.set);
                sinon.assert.calledOnceWithExactly(logRepository.logAccess, ip);
            }
        });
        it('should throw error when getting value from api', async () => {
            const error = new ApplicationError(400, 'Failed to fetch exchange rates');
            const cacheApi = {
                get: () => null,
                set: () => { },
            };
            const currencyApi = { getExchangeRates: () => exchangeRates };
            const logRepository = { logAccess: () => { } };

            const currencyService = new CurrencyService({
                cacheApi,
                currencyApi,
                logRepository,
            });

            sinon.spy(cacheApi, 'get');
            sinon.stub(currencyApi, 'getExchangeRates').throws(error);
            sinon.spy(cacheApi, 'set');
            sinon.spy(logRepository, 'logAccess');

            try {
                await currencyService.getExchangeRates(apiKey, ip);
            } catch (error) {
                sinon.assert.calledOnceWithExactly(
                    cacheApi.get,
                    `${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`
                );
                sinon.assert.calledOnceWithExactly(currencyApi.getExchangeRates, apiKey);
                sinon.assert.threw(currencyApi.getExchangeRates);
                sinon.assert.notCalled(cacheApi.set);
                sinon.assert.calledOnceWithExactly(logRepository.logAccess, ip);
            }
        });
        it('should throw error when caching value', async () => {
            const error = new ApplicationError(400, 'Failed to fetch exchange rates');
            const cacheApi = {
                get: () => null,
                set: () => { },
            };
            const currencyApi = { getExchangeRates: () => exchangeRates };
            const logRepository = { logAccess: () => { } };

            const currencyService = new CurrencyService({
                cacheApi,
                currencyApi,
                logRepository,
            });

            sinon.spy(cacheApi, 'get');
            sinon.spy(currencyApi, 'getExchangeRates');
            sinon.stub(cacheApi, 'set').throws(error);
            sinon.spy(logRepository, 'logAccess');

            try {
                await currencyService.getExchangeRates(apiKey, ip);
            } catch (error) {
                sinon.assert.calledOnceWithExactly(
                    cacheApi.get,
                    `${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`
                );
                sinon.assert.calledOnceWithExactly(currencyApi.getExchangeRates, apiKey);
                sinon.assert.calledOnceWithExactly(
                    cacheApi.set,
                    `${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`,
                    JSON.stringify(exchangeRates),
                );
                sinon.assert.threw(cacheApi.set);
                sinon.assert.calledOnceWithExactly(logRepository.logAccess, ip);
            }
        });
    });
});
