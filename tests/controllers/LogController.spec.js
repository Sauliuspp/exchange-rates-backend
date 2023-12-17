const LogController = require('../../src/controllers/LogController');
const sinon = require('sinon');

const { ApplicationError } = require('../../src/Error');

const req = {
    query: {
        startDate: '',
        endDate: '',
    }
};
const res = { json: sinon.spy() };

describe('LogController', () => {
    describe('getLogs', () => {
        it('should return logs', async () => {
            const { startDate, endDate } = req.query;
            const logService = { getLogs: () => { } };
            const logController = new LogController({ logService });

            sinon.spy(logService, 'getLogs');

            await logController.getLogs(req, res);

            sinon.assert.calledOnceWithExactly(logService.getLogs, startDate, endDate);
        });
        it('should throw error', async () => {
            const { startDate, endDate } = req.query;
            const error = new ApplicationError(500, 'Could not get access logs');
            const logService = { getLogs: () => { } };

            sinon.stub(logService, 'getLogs').throws(error);

            const logController = new LogController({ logService });

            try {
                await logController.getLogs(req, res);
            } catch (error) {
                sinon.assert.calledOnceWithExactly(logService.getLogs, startDate, endDate);
                sinon.assert.threw(logService.getLogs);
            }
        });
    });
});
