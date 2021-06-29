/* eslint-disable max-len */
import { IPost } from '@entities/SocialPosts';
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
 * 
*/
const TABLE_NAME = "post_and_comments123";

/**
 * kept the interface to keep me honest and organized :)
 */
export interface IPostDao {
    // gets all post you did
    getPost: (postInfo: IPost) => Promise<IPost | null>;
    //!get all comments under each parent post?
    getComments: (postInfo: IPost) => Promise<IPost | null>;
    //! gets all post from friends? or just get all post
    getAll: () => Promise<IPost[]>;
    // add or update post based on post_id and current username
    addorUpdatePost: (postInfo: IPost) => Promise<void>;
    //delete a post based on post_id and current username
    deletePost: (username: string) => Promise<void>
}

class SocialPostDao implements IPostDao {

    /** 
     * 
     *  resource used: 
     // eslint-disable-next-line max-len
     * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
     * 
     * @param postInfo
     * @returns 
     */
    //TODO create an index to pull all posts if it equals parent post
    //TODO investigate additional keys needed for query parameters
    public getPost(postInfo: IPost): Promise<IPost | null>{
        logger.info("Using route ```getPost``` in DAO");
        const params = {
            TableName: TABLE_NAME,
            IndexName : 'username-main_post-index',
            KeyConditionExpression : "#username = :username",
            ExpressionAttributeNames:{
                "#username": "username"
            },    
            ExpressionAttributeValues:{
                ":username": postInfo.userName      
            }
        };
        const db = dynamoClient.query(params).promise();
        return db.then()
    }

    /**
     * 
     *  
     * resource used: 
     * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
     *      
     * @param
     * @returns 
     */
    public getComments(postInfo: IPost): Promise<IPost | null>{
        logger.info("Using route ```getState``` in DAO");
        const params = {
            TableName: TABLE_NAME,
            IndexName : 'username-main_post-index',
            KeyConditionExpression : "#username = :username",
            ExpressionAttributeNames:{
                "#username": "username"
            },    
            ExpressionAttributeValues:{
                ":username": postInfo.userName      
            }
        };
        const db =  dynamoClient.query(params).promise();
        return db.then()
    }

    /**
     * this just return everything in the table
     * @returns 
     */
    public getAll(): Promise<IPost[]> {
        logger.info("Using route ```getAll``` in DAO");
        const params = {
            TableName: TABLE_NAME,
        };
        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    /**
     * * this uses the put function to either create a new item or replace an old item
     * @param
     * @returns 
     */
    public async addorUpdatePost(postInfo: IPost): Promise<void> {
        logger.info("Using route ```addorUpdate``` in DAO");
        const params = {
            TableName: TABLE_NAME,
            Item: postInfo,
            Key: {
                "postid": postInfo.postId
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
    public async deletePost(username: string): Promise<void> {
        logger.info("Using route ```delete``` in DAO");
         const params = {
            TableName: TABLE_NAME,
            Key: {
                "username": username
            }
        };
        await dynamoClient.delete(params).promise();
        return Promise.resolve(undefined);
    }
}

export default SocialPostDao;
