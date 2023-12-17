const { ApplicationError } = require('../Error');
const {
    CACHE_KEY_PREFIX,
    CACHE_KEYS,
} = require('../Constants');

class CurrencyService {

    cacheApi;
    currencyApi;
    logRepository;

    constructor({
        cacheApi,
        currencyApi,
        logRepository,
    }) {
        this.cacheApi = cacheApi;
        this.currencyApi = currencyApi;
        this.logRepository = logRepository;
    }

    getExchangeRates = async (apiKey, ip) => {
        try {
            let exchangeRates;

            exchangeRates = await this.cacheApi.get(`${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`);

            if (exchangeRates != null) {
                return JSON.parse(exchangeRates);
            }

            exchangeRates = await this.currencyApi.getExchangeRates(apiKey);

            this.cacheApi.set(`${CACHE_KEY_PREFIX}:${CACHE_KEYS.currencyRates}`, JSON.stringify(exchangeRates));

            return exchangeRates;
        } catch (error) {
            throw new ApplicationError(500, 'Failed to fetch exchange rates');
        } finally {
            this.logRepository.logAccess(ip);
        }
    }
}

module.exports = CurrencyService;
