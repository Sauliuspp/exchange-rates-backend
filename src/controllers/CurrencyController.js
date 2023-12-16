class CurrencyController {

    currencyService;

    constructor({ currencyService }) {
        this.currencyService = currencyService;
    }

    getExchangeRates = async (req, res) => {
        const apiKey = req.header('x-api-key');
        const ip = req.ip;

        const exchangeRates = await this.currencyService.getExchangeRates(apiKey, ip);

        res.json(exchangeRates);
    }
}

module.exports = CurrencyController;
