import { IStateInfo } from '@entities/SocialPosts';
import AWS from 'aws-sdk';
import logger from '@shared/Logger';


// Access details stored in env foler under prestart
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// create an instance of AWS
const dynamoClient =  new AWS.DynamoDB.DocumentClient();

/**
 * identify the name of the table we are using to
 * *this is labeled covid because this is meant to be the start 
 * *   of a massive data structure that could be used to track covid 
 * *   hotspots based on county
*/
const TABLE_NAME = "COVID";

/**
 * kept the interface to keep me honest and organized :)
 */
export interface IStateDao {
    getCounty: (fips: number) => Promise<IStateInfo | null>;
    getState: (state: string) => Promise<IStateInfo | null>;
    getAll: () => Promise<IStateInfo[]>;
    addorUpdate: (stateInfo: IStateInfo) => Promise<void>;
    delete: (fips: number) => Promise<void>;
}

class StateDao implements IStateDao {

    /**
     * *takes in fips from routes (states) and passes it to 
     * *    the DB to retrieve the matching fips 
     * @param fips 
     * @returns 
     */
    public getCounty(fips: number): Promise<IStateInfo | null>{
        logger.info("Using route ```getCounty``` in DAO");
        const params = {
            TableName: TABLE_NAME,
            Key: {
                "fips": fips
            }
        };
        const db = dynamoClient.get(params).promise();
        return db.then()
    }

    /**
     * * takes in the state from the url and queries the db to retrieve
     * *    the matching state (i.e Alaska)
     *  
     * resource used: 
     * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
     *      
     * @param stateLookUp 
     * @returns 
     */
    public getState(stateLookUp: string): Promise<IStateInfo | null>{
        logger.info("Using route ```getState``` in DAO");
        const params = {
            TableName: TABLE_NAME,
            IndexName : 'state-index',
            KeyConditionExpression : "#state = :state",
            ExpressionAttributeNames:{
                "#state": "state"
            },    
            ExpressionAttributeValues:{
                ":state": stateLookUp      
            }
        };
        const db =  dynamoClient.query(params).promise();
        return db.then()
    }

    /**
     * this just return everything in the table
     * @returns 
     */
    public getAll(): Promise<IStateInfo[]> {
        logger.info("Using route ```getAll``` in DAO");
        const params = {
            TableName: TABLE_NAME,
        };
        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    /**
     * * this uses the put function to either create a new item or replace an old item
     * @param stateInfo 
     * @returns 
     */
    public async addorUpdate(stateInfo: IStateInfo): Promise<void> {
        logger.info("Using route ```addorUpdate``` in DAO");
        const params = {
            TableName: TABLE_NAME,
            Item: stateInfo,
            Key: {
                "fips": stateInfo.fips
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }

    /**
     * takes in fips from the url and attempts to locate and delete the Item
     * from teh database if it exist
     * @param fips 
     * @returns 
     */
    public async delete(fips: number): Promise<void> {
        logger.info("Using route ```delete``` in DAO");
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

export default StateDao;
