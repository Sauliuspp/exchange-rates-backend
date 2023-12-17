const axios = require('axios');

const { ApplicationError } = require('../Error');

const api = axios.create({
    baseURL: process.env.OPEN_EXCHANGE_RATES_API_URL,
});

const getExchangeRates = async (apiKey) => {
    try {
        const response = await api.get('/latest.json', {
            params: {
                app_id: apiKey,
            }
        });

        return response.data;
    } catch (error) {
        throw new ApplicationError(400, 'Failed to fetch exchange rates');
    }
}

module.exports = { getExchangeRates };
