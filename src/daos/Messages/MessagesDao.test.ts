let TABLE_NAME = 'Test-Messages';
import MessagesDao from './MessagesDao';
import Message from '../../entities/Messages';

const dao = new MessagesDao;

const {DocumentClient} = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);

/**
 * resource used:
 * https://jestjs.io/docs/dynamodb
 */

describe("Messages DAO", () => {
  it('should not timeout', async () => {
    const testMessage = new Message("Jimmy", "Jimothy");
    console.log(testMessage);
    // await dao.addorUpdateMessage(testMessage, TABLE_NAME, ddb);
    await ddb
        .put({ TableName: TABLE_NAME, 
            Item: { 
                username: 'Testy',
                message_id: '1',
                // parent_id: '0',
            }
        })
        .promise();

    const res = await dao.getAll(TABLE_NAME, ddb);
    console.log(res);
    return expect(res);
  });
})