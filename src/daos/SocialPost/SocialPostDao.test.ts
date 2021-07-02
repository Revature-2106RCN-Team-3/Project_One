/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
import "../../pre-start/testenviroment";
import SocialPostDao from "./SocialPostDao";

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

// create instance of social post dao
const dao = new SocialPostDao();

//************************************************************************************************
//* create objects to use during testing
//************************************************************************************************

// Object 1 is the default object passed through each test
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
// object 2 test for when postId and mainPostId are different during comment updates
const postObj2 = {
  userName: String("matthewterry68.mt@gmail.com"),
  postId: String(
    "$2b$10$/Y74Twt.GPYADDRRHOvIXOITEDXTYGCo94H5gHcyecXxZyC.ez9Ra"
  ),
  postText: String("aghhhhhh this is post text!!"),
  parentPostId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  like: Boolean(false),
  dislikes: Boolean(true),
  mainPost: Number(1),
};
// object three test for like/ dislike both being false
const postObj3 = {
  userName: String("matthewterry68.mt@gmail.com"),
  postId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  postText: String("aghhhhhh this is post text!!"),
  parentPostId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  like: Boolean(false),
  dislikes: Boolean(false),
  mainPost: Number(1),
};

//************************************************************************************************
//* tests start here
//************************************************************************************************

/**
 * resource used:
 * https://jestjs.io/docs/dynamodb
 */
describe("[SOCIAL_POST_DAO][Test 1.0] - addComment and getComments", () => {
  it("Should enter then read items from the table", async () => {
    await dao.addComment(postObj1);
    expect(await dao.getComments(postObj1)).toBeDefined();
  });
});

describe("[SOCIAL_POST_DAO][Test 2.0] - addMainPost and getPost", () => {
  it("Should enter then read items from the table", async () => {
    await dao.addMainPost(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });
});

describe("[SOCIAL_POST_DAO][Test 3.0] - getAll", () => {
  it("Should read all items in the table", async () => {
    expect(await dao.getAll()).toBeDefined();
  });
});

describe("[SOCIAL_POST_DAO][Test 4.0] - updateComment", () => {
  it("Should enter then read items from the table", async () => {
    await dao.updateComment(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });
});

describe("[SOCIAL_POST_DAO][Test 4.1] - updateComment", () => {
  it("Should enter then read items from the table", async () => {
    await dao.updateComment(postObj2);
    expect(await dao.getPost(postObj2)).toBeDefined();
  });
});

describe("[SOCIAL_POST_DAO][Test 5.0] - addLikeDislike", () => {
  it("Should enter then read items from the table", async () => {
    await dao.addLikeDislike(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });
});
describe("[SOCIAL_POST_DAO][Test 5.1] - addLikeDislike", () => {
  it("Should enter then read items from the table", async () => {
    await dao.addLikeDislike(postObj2);
    expect(await dao.getPost(postObj2)).toBeDefined();
  });
});
describe("[SOCIAL_POST_DAO][Test 5.2] - addLikeDislike", () => {
  it("Should enter then read items from the table", async () => {
    await dao.addLikeDislike(postObj3);
    expect(await dao.getPost(postObj3)).toBeDefined();
  });
});

describe("[SOCIAL_POST_DAO][Test 6.0] - deletePost", () => {
  it("Should delete then read items from table", async () => {
    await dao.deletePost(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });
});
