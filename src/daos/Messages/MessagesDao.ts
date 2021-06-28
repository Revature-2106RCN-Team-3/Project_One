import { IMessage } from '@entities/Messages';
import AWS from 'aws-sdk';
import logger from '@shared/Logger';

//TODO Update Loggers

// Access details stored in env foler under prestart
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// create an instance of AWS
const dynamoClient =  new AWS.DynamoDB.DocumentClient();

/**
 * identify the name of the table we are using
 * ATM this is going to give an ERROR ON PURPOSE, as I don't know the name of the table
*/
const TABLE_NAME = ;

export interface IMessageDao {
    // retrieves message history with a given user
    getMessages: (postInfo: IMessage) => Promise<IMessage | null>;
    // Potential future implementation; returns a specific message if linked to
    // getLinked: (postInfo: IMessage) => Promise<iMessage | null>;
    // add or update post based on post_id and current username
    addorUpdateMessage: (postInfo: IMessage) => Promise<void>;
    //delete a post based on post_id and current username
    deleteMessage: (postInfo: IMessage) => Promise<void>
}

class MessagesDao implements IMessageDao {

    public getMessages(messageInfo: IMessage): Promise<IMessage | null>{
        logger.info("Using route ```getPost``` in messages DAO");
        const params = {
            TableName: TABLE_NAME,
            IndexName : , // Unknown index name
            KeyConditionExpression : "#username = :username",
            ExpressionAttributeNames:{
                "#username": "username"
            },    
            ExpressionAttributeValues:{
                ":username": messageInfo.userName
            }
        };
        const db = dynamoClient.query(params).promise();
        return db.then()
    }

    public async addorUpdateMessage(messageInfo: IMessage): Promise<void> {
        logger.info("Using route ```addorUpdate``` in messages DAO");
        const params = {
            TableName: TABLE_NAME,
            Item: messageInfo,
            Key: {
                "fips": messageInfo.fips
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }


    public async deleteMessage(fips: number): Promise<void> {
        logger.info("Using route ```delete``` in messages DAO");
         const params = {
            TableName: TABLE_NAME,
            Key: {
                "fips": fips
            }
        };
        await dynamoClient.delete(params).promise();
        return Promise.resolve(undefined);
    }

}