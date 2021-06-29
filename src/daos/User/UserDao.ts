import { IUser } from "@entities/User";
import logger from '@shared/Logger';
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "profile"
export interface IUserDao {
  getOne: (userName: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  addOrUpdate: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  delete: (userName: string) => Promise<void>;
}

class UserDao implements IUserDao {
  /**
   * @param userName
   */
  public getOne(userName: string): Promise<IUser | null> {
    logger.info("Using getOne route in DAO")
    const params = {
      TableName: TABLE_NAME,
      Key: {
        "username": userName
      }
    };

    const db = dynamoClient.query(params).promise();
    return db.then();
  }

  /**
   *
   */
  public getAll(): Promise<IUser[]> {
    logger.info("Using getAll route in DAO");
    const params = {
      TableName: TABLE_NAME,
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  /**
   *
   * @param user
   */
  public async addOrUpdate(user: IUser): Promise<void> {
    logger.info("Using addOrUpdate route in DAO");
    const params = {
      TableName: TABLE_NAME,
      Item: user,
      Key: {
        "username": user.userName
      }
    };
    
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

    /**
   *
   * @param user
   */
     public async update(user: IUser): Promise<void> {
      logger.info("Using addOrUpdate route in DAO");
      const params = {
        TableName: TABLE_NAME,
        Item: user,
        Key: {
          "username": user.userName
        }
      };
      
      await dynamoClient.put(params).promise();
      return Promise.resolve(undefined);
    }
  

  /**
   *
   * @param userName
   */
  public async delete(userName: string): Promise<void> {
    logger.info("Using delete route in DAO");
    const params = {
      TableName: TABLE_NAME,
      Key: {
        "username": userName
      }
    };
    await dynamoClient.delete(params).promise();
    return Promise.resolve(undefined);
  }
}

export default UserDao;
