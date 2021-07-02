import supertest from "supertest";
import app from "./Server";

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

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
//* Get Operators
//************************************************************************************************
// Test User Endpoint
it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/post").send();
  expect(res.statusCode).toEqual(200);
});

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/post/mainPost").send(postObj1);
  expect(res.statusCode).toEqual(200);
});

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/post/getComments").send(postObj1);
  expect(res.statusCode).toEqual(200);
});

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/messages/all").send();
  expect(res.statusCode).toEqual(200);
});

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/all").send();
  expect(res.statusCode).toEqual(200);
});
