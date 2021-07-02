/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
import { IMessage } from '@entities/Messages';
import AWS from 'aws-sdk';
import logger from '../../shared/Logger';
import deleteInBatch from '../Shared/dynamodb_batch_delete';
import { createHash } from "../../shared/functions";

let config;
let dynamoClient: any;

if (process.env.NODE_ENV === "test") {
    config = {
      convertEmptyValues: true,
      ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: "local",
      }),
    };
    // create an instance of AWS
    dynamoClient = new AWS.DynamoDB.DocumentClient(config);
  } else {
    // Access details stored in env foler under prestart
    AWS.config.update({
      region: process.env.AWS_DEFAULT_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    // create an instance of AWS
    dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

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
    deleteMessage: (messageInfo: IMessage, parent_message_id: string, message_id?: string) => Promise<void>
}

class MessagesDao implements IMessageDao {

    public getAll(): Promise<IMessage[]> {
        logger.info("Using route getAll in DAO");
        const params = {
            TableName: TABLE_NAME,
        };

        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    public getMessages(messageInfo: IMessage): Promise<IMessage | null>{
        logger.info("Using route ```getMessages``` in messages DAO");
        const params = {
            TableName: TABLE_NAME,
            FilterExpression : "#username = :username AND #group = :group",
            ExpressionAttributeNames:{
                "#username": "username",
                "#group": "parent_message_id",
            },    
            ExpressionAttributeValues:{
                ":username": messageInfo.username,
                ":group": messageInfo.parent_message_id,
            }
        };

        const db = dynamoClient.scan(params).promise();
        return db.then()
    }

    public getGroups(messageInfo: IMessage): Promise<IMessage | null>{
        logger.info("Using route ```getMessages``` in messages DAO");
        const params = {
            TableName: TABLE_NAME,
            FilterExpression : "#username = :username AND #group = :zero",
            ExpressionAttributeNames:{
                "#username": "username",
                "#group": "parent_message_id",
            },    
            ExpressionAttributeValues:{
                ":username": messageInfo.username,
                ":zero": "0",
            }
        };

        const db = dynamoClient.scan(params).promise();
        return db.then()
    }

    public async addorUpdateMessage(messageInfo: IMessage): Promise<void> {
        logger.info("Using route ```addorUpdate``` in messages DAO");
        let newMessage = messageInfo;
        if (newMessage.message_id == 'null') {
            newMessage.message_id = await createHash(messageInfo.username + String(Date.now()));
        }
        const params = {
            TableName: TABLE_NAME,
            Item: newMessage,
            Key: {
                "username": {S: newMessage.username},
                "message_id": {S: newMessage.message_id},
            }
        };
        logger.info(params.Item.username);
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }

    // Delete will accomplish nothing if neither parentMessageId nor messageId are given
    public async deleteMessage(messageInfo: IMessage, parent_message_id?: string, message_id?: string): Promise<void> {
        logger.info("Using route ```delete``` in messages DAO");
        if (!message_id && parent_message_id) {
            this.deleteGroup(messageInfo, parent_message_id);
        } else if (message_id) {
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    "username": messageInfo.username,
                    "message_id": message_id,
                }
            };

            await dynamoClient.delete(params).promise();
            return Promise.resolve(undefined);
        }
    }

    public async deleteGroup(messageInfo: IMessage, parent_message_id: string) {
        logger.info("Using route ```deleteGroup``` in messages DAO");
        
        await deleteInBatch(TABLE_NAME, ['parent_message_id', parent_message_id]);
    }

}

export default MessagesDao;