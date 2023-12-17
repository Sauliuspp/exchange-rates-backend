const LogService = require('../../src/services/LogService');
const sinon = require('sinon');

const { ApplicationError } = require('../../src/Error');


const startDate = '';
const endDate = '';

describe('LogService', () => {
    describe('getLogs', () => {
        it('should return logs', async () => {
            const logRepository = { getLogs: () => { } };

            const logService = new LogService({ logRepository });

            sinon.spy(logRepository, 'getLogs');

            await logService.getLogs(startDate, endDate);

            sinon.assert.calledOnceWithExactly(
                logRepository.getLogs,
                startDate,
                endDate,
            );
        });
        it('should throw error', async () => {
            const error = new ApplicationError(500, 'Could not get access logs');
            const logRepository = { getLogs: () => { } };

            const logService = new LogService({ logRepository });

            sinon.stub(logRepository, 'getLogs').throws(error);

            try {
                await logService.getLogs(startDate, endDate);
            } catch (error) {
                sinon.assert.calledOnceWithExactly(
                    logRepository.getLogs,
                    startDate,
                    endDate,
                );
                sinon.assert.threw(logRepository.getLogs);
            }
        });
    });
});
