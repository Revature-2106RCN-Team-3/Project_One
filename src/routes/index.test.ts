import supertest from "supertest";
import baseRouter from "./index";
import app from "../Server";
import {postObj1, postObj2, postObj3} from "../pre-start/testEnviroment"

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 50000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

//************************************************************************************************
//* Get Operators
//************************************************************************************************

// Test Social Post Endpoint
it("get all posts", async () => {
  const res = await supertest(baseRouter).get("/home/post").send();
  expect(res.statusCode).toEqual(302);
});