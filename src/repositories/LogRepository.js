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

    getLogs = async (startDate, endDate) => {
        let query =
            `SELECT id, ip_address, date
            FROM access_logs`;
        query = (startDate && endDate) ? query += ` WHERE ? <= date AND date <= ?` : query;

        const [logs] = await this.exchangeRateDb.query(
            query,
            [
                startDate,
                endDate,
            ],
        );

        return logs;
    }
}

module.exports = LogRepository;
