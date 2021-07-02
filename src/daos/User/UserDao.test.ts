import "../../pre-start/test.env.ts";
import UserDao from './UserDao';
import { userTest1 } from './userTestObj';
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
/**
 * Resource used: 
 * https://jestjs.io/docs/dynamodb
 */

//configure jest settings
const DEFAULT_JEST_TIMEOUT = 5000;
jest.setTimeout(5 * DEFAULT_JEST_TIMEOUT);

//create an instance of DAO
// const isTest = process.env.MOCK_DYNAMODB_ENDPOINT;
// const config = {
//   convertEmptyValues: true,
//   ...(isTest && {
//     endpoint: "localhost:8000",
//     sslEnabled: false,
//     region: "local",
//   }),
// }

const userDao = new UserDao();


describe("User Test 1 - getUser", () => {
  it('Should read one user', async() => {
    await userDao.getOne(userTest1.username);
    expect(userTest1).toEqual({
      username: String("bWayne@gotham.org"),
      first_name: String("Bruce"),
      last_name: String("Wayne"),
      phone_number: String("546-456-8956"),
      publicName: String("DarkKnight"),
    });
  });
});

describe("User Test 2 - getAll", () => {
  it('Should read all users in the table', async() => {
    expect(await userDao.getAll()).toBeDefined();
  })
})

describe("User Test 3 - addOrUpdate", () => {
  it('Should add/update a user in the table', async() => {
    await userDao.addOrUpdateUser(userTest1);
    expect(await userDao.getOne(userTest1.username)).toBeDefined();
  })
})

describe("User Test 4 - delete", () => {
  it('Should delete a user in the table', async() => {
    await userDao.delete(userTest1.username);
    expect(userTest1).toBeUndefined();
  })
})