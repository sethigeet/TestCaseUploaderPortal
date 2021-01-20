import { Connection } from "typeorm";
import { internet, seed } from "faker";

import { UserRoles } from "@portal/common";

import { User } from "../../src/modules/user/userEntity";
import { createTypeormConnection } from "../../src/modules/shared/utils";

import { TestClient } from "../utils";
import { TestCase } from "../../src/modules/testCase/testCaseEntity";

const correctInput1 = {
  productCode: "PROD-1",
  moduleCode: "MOD-1",
  menuCode: "MEN-1",
  testingFor: "TFOR-1",
  testingScope: "TSCO-1",
  description: "This is a valid description for a test case!",
  expectedResult: "This should not expect any errors",
};

const correctInput2 = {
  productCode: "PROD-2",
  moduleCode: "MOD-2",
  menuCode: "MEN-2",
  testingFor: "TFOR-2",
  testingScope: "TSCO-2",
  description: "This is a valid description for a test case2!",
  expectedResult: "This should not expect any errors2",
};

seed(Date.now() + 6);
const correctUsername1 = internet.userName();
const correctPassword1 = internet.password(7);

seed(Date.now() + 7);
const correctUsername2 = internet.userName();
const correctPassword2 = internet.password(7);

const limit = 2;
let cursor: Date;

let conn: Connection;
let user1: User;
let user2: User;
let testCase1: TestCase;
let testCase2: TestCase;

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

  // create a user to test on
  testCase1 = await TestCase.create({
    ...correctInput1,
    userId: user1.id,
  }).save();
  testCase2 = await TestCase.create({
    ...correctInput2,
    userId: user2.id,
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

    expect(response.data.getTestCases.testCases.length).toEqual(1);
    expect(response.data.getTestCases.testCases[0]?.userId).toEqual(user1.id);
    expect(response.data.getTestCases.hasMore).toEqual(false);

    done();
  });

  test("Check with correct credentials but with higher permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.getTestCases(limit);

    expect(response.data.getTestCases.testCases.length).toEqual(2);
    expect(response.data.getTestCases.testCases[0]?.userId).toEqual(user2.id);
    expect(response.data.getTestCases.testCases[1]?.userId).toEqual(user1.id);
    expect(response.data.getTestCases.hasMore).toEqual(false);

    done();
  });

  test("Check with correct credentials but with higher permissions and lower limit", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const limit = 1;
    const response = await client.getTestCases(limit);

    expect(response.data.getTestCases.testCases.length).toEqual(1);
    expect(response.data.getTestCases.testCases[0]?.userId).toEqual(user2.id);
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
    expect(response.data.getTestCases.testCases[0].userId).toEqual(
      testCase1.userId
    );
    expect(response.data.getTestCases.testCases[0].description).toEqual(
      testCase1.description
    );
    expect(response.data.getTestCases.hasMore).toEqual(false);

    done();
  });
});
