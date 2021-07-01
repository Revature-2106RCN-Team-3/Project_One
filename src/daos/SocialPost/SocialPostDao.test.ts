/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { DynamoDB, yourConfig } from "aws-sdk";
// import dotenv from 'dotenv'
// dotenv.config({ path: 'src/pre-start/env/test.env' });
import "../../pre-start/test";
import "jest-dynalite/withDb";
const {
  DocumentClient,
  DynamoDB,
  yourConfig,
} = require("aws-sdk/clients/dynamodb");
import SocialPostDao from "./SocialPostDao";

// const client = new DynamoDB({
//   ...yourConfig,
//   ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
//     endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
//     sslEnabled: false,
//     region: "local",
//   }),
// });

// import AWS from 'aws-sdk';
// const dynamodb = new AWS.DynamoDB({ region: 'local-env' });
// const client = new AWS.DynamoDB.DocumentClient({ service: dynamodb });
const socialPostDao = new SocialPostDao();

// const isTest = process.env.JEST_WORKER_ID;
// const config = {
//   convertEmptyValues: true,
//   ...(isTest && {
//     endpoint: "localhost:8000",
//     sslEnabled: false,
//     region: "local-env",
//   }),
// };

// const ddb = new DocumentClient(config);
const TABLE_NAME = "post_and_comments";

// afterAll(async () => {
//     await new Promise<void>(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
//   });

const postObj1 = {
  userName: String("matthewterry68.mt@gmail.com"),
  postId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  postText: String("aghhhhhh this is post text!!"),
  parentPostId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  like: Boolean(true),
  dislikes: Boolean(false),
  mainPost: Number(1),
};

describe("getPost", () => {
  //   jest.setTimeout(30000);
  it("This should pull a Main Post", async () => {
    const tst = await socialPostDao.getPost(postObj1);
    return expect(tst).toEqual({
      userName: String("matthewterry68.mt@gmail.com"),
      postId: String(
        "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
      ),
      postText: String("aghhhhhh this is post text!!"),
      parentPostId: String(
        "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
      ),
      like: Boolean(true),
      dislikes: Boolean(false),
      mainPost: Number(1),
    });
  });
});
//   it("should handle no value for key", async () => {
//     expect(await keystore.getItem("a")).toBeUndefined();
//   });

//   it("should contain the existing key from example data", async () => {
//     expect(await keystore.getItem("50")).toEqual({ name: "already exists" });
//   });
// });

/**
 * resource used:
 * https://jestjs.io/docs/dynamodb
 */
// it("Should insert one item into table", async () => {
//   await ddb
//     .put({
//       TableName: TABLE_NAME,
//       Item: {
//         main_post: 1,
//         parent_post_id:
//           "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
//         post_date_time: "1625090060153",
//         post_id: "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
//         post_text: "this is a comment my dudes",
//         username: "matthewterry68.mt@gmail.com",
//       },
//     })
//     .promise();

//   const { Item } = await ddb
//     .get({
//       TableName: TABLE_NAME,
//       Key: {
//         username: "matthewterry68.mt@gmail.com",
//         post_id: "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
//       },
//     })
//     .promise();

//   return expect(Item).toEqual({
//     main_post: 1,
//     parent_post_id:
//       "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
//     post_date_time: "1625090060153",
//     post_id: "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
//     post_text: "this is a comment my dudes",
//     username: "matthewterry68.mt@gmail.com",
//   });
// });

// it("Should delete one item from table", async () => {
//   await ddb.delete({ TableName: TABLE_NAME, Key: { fips: 1 } }).promise();

//   const { Item } = await ddb
//     .get({ TableName: TABLE_NAME, Key: { fips: 1 } })
//     .promise();

//   return expect(Item).withContext;
//  });
