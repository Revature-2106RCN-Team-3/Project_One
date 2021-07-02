import supertest from "supertest";
import app from "./Server";
import {postObj1, postObj2, postObj3} from "./pre-start/testObjects"

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

//************************************************************************************************
//* Get Operators
//************************************************************************************************

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/post").send();
  expect(res.statusCode).toEqual(200);
});

it("get all main posts", async () => {
  const res = await supertest(app)
    .get("/api/home/post/mainPost")
    .send(postObj1);
  expect(res.statusCode).toEqual(200);
});

it("get all comments", async () => {
  const res = await supertest(app)
    .get("/api/home/post/getComments")
    .send(postObj1);
  expect(res.statusCode).toEqual(200);
});

it("get all messages", async () => {
  const res = await supertest(app).get("/api/home/messages/all").send();
  expect(res.statusCode).toEqual(200);
});

it("get all users", async () => {
  const res = await supertest(app).get("/api/home/all").send();
  expect(res.statusCode).toEqual(200);
});

//************************************************************************************************
//* Post Operators
//************************************************************************************************

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/post/addpost").send(postObj1);
  expect(res.statusCode).toEqual(200);
});

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/post/addcomment").send(postObj2);
  expect(res.statusCode).toEqual(200);
});

it("get all posts", async () => {
  const res = await supertest(app).get("/api/home/post/addvibe").send(postObj1);
  expect(res.statusCode).toEqual(200);
});
