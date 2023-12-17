const { ApplicationError } = require("../Error");

class LogService {

    logRepository;

    constructor({ logRepository }) {
        this.logRepository = logRepository;
    }

    getLogs = async (startDate, endDate) => {
        try {
            return await this.logRepository.getLogs(startDate, endDate);
        } catch (error) {
            throw new ApplicationError(500, 'Could not get access logs');
        }
    }
}

module.exports = LogService;
