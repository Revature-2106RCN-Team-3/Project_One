/* eslint-disable max-len */
import { IMessage } from '@entities/Messages';
import AWS from 'aws-sdk';
import logger from '../../shared/Logger';
import deleteInBatch from '../Shared/dynamodb_batch_delete';

//TODO Update Loggers

// Access details stored in env folder under prestart
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// create an instance of AWS
const dynamoClient =  new AWS.DynamoDB.DocumentClient();

/**
 * identify the name of the table we are using
*/
const TABLE_NAME = 'messages';

export interface IMessageDao {
    // retrieves message history with a given user
    getMessages: (messageInfo: IMessage) => Promise<IMessage | null>;
    // Retrieves only top-level messages (letting a user view all their DM groups/chains)
    getGroups: (messageInfo: IMessage) => Promise<IMessage | null>;
    getAll: () => Promise<IMessage[]>;
    // Potential future implementation; returns a specific message if linked to
    // getLinked: (messageInfo: IMessage) => Promise<iMessage | null>;
    // add or update message based on message_id and current username
    addorUpdateMessage: (messageInfo: IMessage) => Promise<void>;
    //delete a message based on message_id and current username
    deleteMessage: (messageInfo: IMessage, parentMessageId: string, messageId?: string) => Promise<void>
}

class MessagesDao implements IMessageDao {

    public getAll(tableName?: string, dynamo?: AWS.DynamoDB.DocumentClient): Promise<IMessage[]> {
        logger.info("Using route getAll in DAO");
        const params = {
            TableName: tableName || TABLE_NAME,
        };
        let client;
        if (dynamo) {client = dynamo} else {client = dynamoClient};
        const db = client.scan(params).promise();
        return db.then();
    }

    public getMessages(messageInfo: IMessage, tableName?: string, dynamo?: AWS.DynamoDB.DocumentClient): Promise<IMessage | null>{
        logger.info("Using route ```getMessages``` in messages DAO");
        const params = {
            TableName: tableName || TABLE_NAME,
            FilterExpression : "#username = :username AND #group = :group",
            ExpressionAttributeNames:{
                "#username": "username",
                "#group": "parent_message_id",
            },    
            ExpressionAttributeValues:{
                ":username": messageInfo.userName,
                ":group": messageInfo.parentMessageId,
            }
        };

        let client;
        if (dynamo) {client = dynamo} else {client = dynamoClient};
        const db = client.scan(params).promise();
        return db.then()
    }

    public getGroups(messageInfo: IMessage, tableName?: string, dynamo?: AWS.DynamoDB.DocumentClient): Promise<IMessage | null>{
        logger.info("Using route ```getMessages``` in messages DAO");
        const params = {
            TableName: tableName || TABLE_NAME,
            FilterExpression : "#username = :username AND #group = #message",
            ExpressionAttributeNames:{
                "#username": "username",
                "#group": "parent_message_id",
                "#message": "message_id",
            },    
            ExpressionAttributeValues:{
                ":username": messageInfo.userName,
            }
        };

        let client;
        if (dynamo) {client = dynamo} else {client = dynamoClient};
        const db = client.scan(params).promise();
        return db.then()
    }

    public async addorUpdateMessage(messageInfo: IMessage, tableName?: string, dynamo?: AWS.DynamoDB.DocumentClient): Promise<void> {
        logger.info("Using route ```addorUpdate``` in messages DAO");
        const params = {
            TableName: tableName || TABLE_NAME,
            Item: messageInfo,
            Key: {
                "username": messageInfo.userName,
                "message_id": messageInfo.messageId,
            }
        };
        let client;
        if (dynamo) {client = dynamo} else {client = dynamoClient};
        console.log(params.Key);
        await client.put(params).promise();
        return Promise.resolve(undefined);
    }

    // Delete will accomplish nothing if neither parentMessageId nor messageId are given
    public async deleteMessage(messageInfo: IMessage, parentMessageId?: string, messageId?: string, tableName?: string, dynamo?: AWS.DynamoDB.DocumentClient): Promise<void> {
        logger.info("Using route ```delete``` in messages DAO");
        if (!messageId && parentMessageId) {
            this.deleteGroup(messageInfo, parentMessageId);
        } else if (messageId) {
            const params = {
                TableName: tableName || TABLE_NAME,
                Key: {
                    "username": messageInfo.userName,
                    "message_id": messageId,
                }
            };

            let client;
            if (dynamo) {client = dynamo} else {client = dynamoClient};
            await client.delete(params).promise();
            return Promise.resolve(undefined);
        }
    }

    public async deleteGroup(messageInfo: IMessage, parentMessageID: string, tableName?: string, dynamo?: AWS.DynamoDB.DocumentClient) {
        logger.info("Using route ```deleteGroup``` in messages DAO");
        
        await deleteInBatch(tableName || TABLE_NAME, ['parent_message_id', parentMessageID], dynamo);
    }

}

export default MessagesDao;