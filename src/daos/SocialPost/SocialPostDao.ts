/* eslint-disable max-len */
import { IPost } from '@entities/SocialPosts';
import AWS from 'aws-sdk';
import logger from '@shared/Logger';

//TODO Update Loggers
/*******************************
 * 
 */

// Access details stored in env foler under prestart
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// create an instance of AWS
const dynamoClient =  new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "post_and_comments";

/**
 * kept the interface to keep me honest and organized :)
 */
export interface IPostDao {
    getPost: (postInfo: IPost) => Promise<IPost | null>; //*COMPLETED!
    getComments: (postInfo: IPost) => Promise<IPost | null>;//*COMPLETED!
    
    //! gets all post from friends? or just get all post and main post only
    getAll: () => Promise<IPost[]>;//*COMPLETED! 
    addMainPost: (postInfo: IPost) => Promise<void>; //TODO add or update post based on post_id and current username
    addComment: (postInfo: IPost) => Promise<void>;
    addLikeDislike: (postInfo: IPost) => Promise<void>;
    deletePost: (postInfo: IPost) => Promise<void> // TODO delete a post based on post_id and current username
}

class SocialPostDao implements IPostDao {
    

    /** 
     * * COMPLETED!
     * 
     *  resource used: 
     // eslint-disable-next-line max-len
     * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
     * https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
     * 
     * @param postInfo
     * @returns 
     */
    public getPost(postInfo: IPost): Promise<IPost | null>{
        logger.info("Using route getPost in DAO");
        const params = {
            TableName: TABLE_NAME,
            FilterExpression : "#username = :username AND #group = #post",
            ExpressionAttributeNames:{
                "#username": "username",
                "#group": "parent_post_id",
                "#post": "post_id",
            },    
            ExpressionAttributeValues:{
                ":username": postInfo.userName,
            }
        };
        const db = dynamoClient.scan(params).promise();
        return db.then()
    }

    /**
     * *COMPLETED!
     *  
     * !note: if i need to create an index rather 
     * !      than use scan  the resource below will assist
     * resource used: 
     * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
     *      
     * @param
     * @returns 
     */
    public getComments(postInfo: IPost): Promise<IPost | null>{
        logger.info("Using route getComments in DAO");
        const params = {
            TableName: TABLE_NAME,
            FilterExpression : "#group = :group",
            ExpressionAttributeNames:{
                // "#username": "username",
                "#group": "parent_post_id"
            },    
            ExpressionAttributeValues:{
                // ":username": postInfo.userName,
                ":group": postInfo.parentPostId
            }
        };
        const db =  dynamoClient.scan(params).promise();
        return db.then()
    }

    /**
     * * COMPLETED!
     * this just return everything in the table
     * @returns 
     */
    public getAll(): Promise<IPost[]> {
        logger.info("Using route getAll in DAO");
        const params = {
            TableName: TABLE_NAME,
        };
        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    /**
     * !new main post only!!
     * TODO create like/dislike
     * todo create comment postInfo
     * 
     * 
     * * this uses the put function to either create a new item or replace an old item
     * @param
     * @returns 
     */
    public async addMainPost(postInfo: IPost): Promise<void> {
        logger.info("Using route addMainPost in DAO");
        const params = {
            TableName: TABLE_NAME,
            Item: {
                username: postInfo.userName,
                post_id: `${postInfo.userName}*` + String(Date.now()),
                parent_post_id: `${postInfo.userName}*` + String(Date.now()),
                post_date_time: String(Date.now()),
                post_text: postInfo.postText,
                main_post: 1,
                // like: postInfo.like,
                dislikes: postInfo.dislikes
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }

    public async addComment: (postInfo: IPost) => Promise<void>{
        logger.info("Using route addMainPost in DAO");
        const params = {
            TableName: TABLE_NAME,
            Item: {
                username: postInfo.userName,
                post_id: `${postInfo.userName}*` + String(Date.now()),
                parent_post_id: `${postInfo.userName}*` + String(Date.now()),
                post_date_time: String(Date.now()),
                post_text: postInfo.postText,
                main_post: 1,
                // like: postInfo.like,
                dislikes: postInfo.dislikes
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }


    public async addLikeDislike: (postInfo: IPost) => Promise<void> {
        logger.info("Using route addMainPost in DAO");
        
        const params = {
            TableName: TABLE_NAME,
            Item: {
                username: postInfo.userName,
                post_id: `${postInfo.userName}*` + String(Date.now()),
                parent_post_id: `${postInfo.userName}*` + String(Date.now()),
                post_date_time: String(Date.now()),
                post_text: postInfo.postText,
                main_post: 1,
                // like: postInfo.like,
                dislikes: postInfo.dislikes
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }


    /**
     * * COMPLETED!
     * 
     * deletes individual post_id/comment
     * 
     * @param fips 
     * @returns 
     */
    public async deletePost(postInfo: IPost): Promise<void> {
        logger.info("Using route ```delete``` in DAO");
         const params = {
            TableName: TABLE_NAME,
            Key: {
                "username": postInfo.userName,
                "post_id": postInfo.postId
            }
        };
        await dynamoClient.delete(params).promise();
        return Promise.resolve(undefined);
    }
}

export default SocialPostDao;
