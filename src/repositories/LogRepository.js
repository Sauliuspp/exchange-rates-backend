class LogRepository {

    exchangeRateDb;

    constructor({ exchangeRateDb }) {
        this.exchangeRateDb = exchangeRateDb;
    }

    logAccess = async (ip) => {
        return this.exchangeRateDb.query(`
            INSERT INTO access_logs (ip_address)
            VALUES(?)`,
            ip
        );
    }
}

module.exports = LogRepository;
