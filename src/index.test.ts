import supertest from "supertest";
import app from "./Server";

import {
  postBody1,
  msgBody1,
  usersBody1,
} from "./pre-start/testObjects";

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

//************************************************************************************************
//* Get Operators
//************************************************************************************************
describe("[ROUTES TEST]- GET OPERATORS", () => {
  it("[Test 1.0] - get all posts", async () => {
    const res = await supertest(app).get("/api/home/post").send();
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 2.0] - Get all main posts", async () => {
    const res = await supertest(app)
      .get("/api/home/post/getmainPost")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 2.1] - Get all main posts failure", async () => {
    const res = await supertest(app).get("/api/home/post/getmainPost").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 3.0] - Get all comments", async () => {
    const res = await supertest(app)
      .get("/api/home/post/getComments")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 3.1] - Get all comments failure", async () => {
    const res = await supertest(app).get("/api/home/post/getComments").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 4.0] - Get all messages", async () => {
    const res = await supertest(app)
      .get("/api/home/messages/all")
      .send(msgBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 5.0] - Get all users", async () => {
    const res = await supertest(app).get("/api/home/all").send();
    expect(res.statusCode).toEqual(200);
  });
});

//************************************************************************************************
//* Post Operators
//************************************************************************************************

describe("[ROUTES TEST]- POST OPERATORS", () => {
  it("[Test 1.0] - Add posts", async () => {
    const res = await supertest(app)
      .post("/api/home/post/addpost")
      .send(postBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 1.1] - Add posts failure", async () => {
    const res = await supertest(app).post("/api/home/post/addpost").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 2.0] - Add comment", async () => {
    const res = await supertest(app)
      .post("/api/home/post/addcomment")
      .send(postBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 2.1] - Add comment failure", async () => {
    const res = await supertest(app).post("/api/home/post/addcomment").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 3.0] - Add vibe", async () => {
    const res = await supertest(app)
      .post("/api/home/post/addvibe")
      .send(postBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 3.1] - Add vibe failure", async () => {
    const res = await supertest(app).post("/api/home/post/addvibe").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 4.0] - Add User", async () => {
    const res = await supertest(app)
      .post("/api/home/add")
      .send(usersBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 4.1] - Add User failure", async () => {
    const res = await supertest(app)
      .post("/api/home/add")
      .send();
    expect(res.statusCode).toEqual(400);
  });


});
//************************************************************************************************
//* Put Operators
//************************************************************************************************

describe("[ROUTES TEST]- PUT OPERATORS", () => {
  it("[Test 1.0] - Update post", async () => {
    const res = await supertest(app)
      .put("/api/home/post/update")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 1.1] - Update post failure", async () => {
    const res = await supertest(app).put("/api/home/post/update").send();
    expect(res.statusCode).toEqual(400);
  });
});

//************************************************************************************************
//* Delete Operators
//************************************************************************************************

describe("[ROUTES TEST]- DELETE OPERATORS", () => {
  it("[Test 1.0] - Delete a post", async () => {
    const res = await supertest(app)
      .delete("/api/home/post/delete")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 1.1] - Delete a post failure", async () => {
    const res = await supertest(app).delete("/api/home/post/delete").send();
    expect(res.statusCode).toEqual(400);
  });
});
