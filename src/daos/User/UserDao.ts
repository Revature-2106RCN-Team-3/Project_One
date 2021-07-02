import { IUser } from "../../entities/User";
import logger from '../../shared/Logger';
import AWS from 'aws-sdk';

// Access details stored in the env folder for the database
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

//constants for an instance of DocClient and table being accessed in database
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "profile"

export interface IUserDao {
  getOne: (username: string) => Promise<IUser | null>;
  getAll: (user: IUser) => Promise<IUser[]>;
  addUser: (user: IUser) => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
  delete: (username: string) => Promise<void>;
}

class UserDao implements IUserDao {
  /**
   * References:
   *  https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
   *  https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
   * 
   * Returns a user by the username
   * @param username
   */
  public getOne(username: string): Promise<IUser | null> {
    logger.info("Using getOne route in DAO");
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "#username = :username",
      ExpressionAttributeNames:{
        "#username": "username"
      },
      ExpressionAttributeValues: {
        ":username": username,
      }
    }
    const db = dynamoClient.query(params).promise();
    return db.then();
  }

  /**
   * Returns all users in the table
   * @returns
   */
  public getAll(): Promise<IUser[]> {
    logger.info("Using getAll route in DAO");
    const params = {
      TableName: TABLE_NAME
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  /**
   * Adds a user's information
   * @param user
   */
   public async addUser(user: IUser): Promise<void> {
    logger.info("Using add route in DAO");
    const { username, first_name, last_name, phone_number, public_name } = user;
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        public_name: public_name,
      }
    }

    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }


  /**
   * Adds/Updates a user's information
   * @param user
   */
  public async updateUser(user: IUser): Promise<void> {
    logger.info("Using add/update route in DAO");
    const params = {
      TableName: TABLE_NAME,
      Item: user,
      Key: {
        "username": user.username
      }
    }

    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  /**
   * Deletes a user by the username
   * @param userName
   */
  public async delete(username:string): Promise<void> {
    logger.info("Using delete route in DAO");
    const params = {
      TableName: TABLE_NAME,
      Key: {
        "username": username
      }
    }
    await dynamoClient.delete(params).promise();
    return Promise.resolve(undefined);
  }
}

export default UserDao;
