import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase } from "../../src/modules/testCase";

import { fakeData, TestClient } from "../utils";

const correctInput1 = fakeData.getTestCaseVals();
const correctInput2 = fakeData.getTestCaseVals();

const {
  username: correctUsername1,
  password: correctPassword1,
} = fakeData.getFakeUserCreds();
const {
  username: correctUsername2,
  password: correctPassword2,
} = fakeData.getFakeUserCreds();

const limit = 2;
let cursor: Date;

let conn: Connection;
let user1: User;
let user2: User;
let testCase1: TestCase;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user1 = await User.create({
    username: correctUsername1,
    password: correctPassword1,
  }).save();
  user2 = await User.create({
    username: correctUsername2,
    password: correctPassword2,
    role: UserRoles.SUPERVISOR,
  }).save();

  // create test cases to test on
  testCase1 = await TestCase.create({
    ...correctInput1,
    createdBy: user1,
  }).save();
  await TestCase.create({
    ...correctInput2,
    createdBy: user2,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Get many test cases", () => {
  test("Check with correct credentials but with lower permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.getTestCases(limit);

    expect(response.errors).toBeUndefined();

    expect(response.data.getTestCases.testCases.length).toEqual(1);
    expect(response.data.getTestCases.testCases[0]?.createdBy.id).toEqual(
      user1.id
    );
    expect(response.data.getTestCases.hasMore).toEqual(false);

    done();
  });

  test("Check with correct credentials but with higher permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.getTestCases(limit);

    expect(response.data.getTestCases.testCases.length).toEqual(2);
    expect(response.data.getTestCases.testCases[0]?.createdBy.id).toEqual(
      user2.id
    );
    expect(response.data.getTestCases.testCases[1]?.createdBy.id).toEqual(
      user1.id
    );
    expect(response.data.getTestCases.hasMore).toEqual(false);

    done();
  });

  test("Check with correct credentials but with higher permissions and lower limit", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const limit = 1;
    const response = await client.getTestCases(limit);

    expect(response.data.getTestCases.testCases.length).toEqual(1);
    expect(response.data.getTestCases.testCases[0]?.createdBy.id).toEqual(
      user2.id
    );
    expect(response.data.getTestCases.hasMore).toEqual(true);

    cursor = response.data.getTestCases.testCases[0]?.createdAt;

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getTestCases(limit);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with incorrect argument for cursor", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const cursor = "dasgjdhgsha";

    const response = await client.getTestCases(limit, cursor);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with correct correct argument for cursor", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.getTestCases(limit, `${cursor}`);

    expect(response.data.getTestCases.testCases.length).toEqual(1);
    expect(response.data.getTestCases.testCases[0].createdBy.id).toEqual(
      testCase1.createdBy.id
    );
    expect(response.data.getTestCases.testCases[0].description).toEqual(
      testCase1.description
    );
    expect(response.data.getTestCases.hasMore).toEqual(false);

    done();
  });
});
