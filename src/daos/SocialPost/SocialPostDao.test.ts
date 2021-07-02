/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
import "../../pre-start/testEnviroment";
import {postObj1, postObj2, postObj3} from "../../pre-start/testObjects"
import SocialPostDao from "./SocialPostDao";

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

// create instance of social post dao
const dao = new SocialPostDao();

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
