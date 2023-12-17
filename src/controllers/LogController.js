class LogController {

    logService;

    constructor({ logService }) {
        this.logService = logService;
    }

    getLogs = async (req, res) => {
        const { startDate, endDate } = req.query;

        const logs = await this.logService.getLogs(startDate, endDate);

        res.json({ logs });
    }
}

module.exports = LogController;
