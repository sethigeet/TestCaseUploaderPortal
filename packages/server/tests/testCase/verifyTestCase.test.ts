import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";

import { fakeData, TestClient } from "../utils";

const correctInput = fakeData.getTestCaseVals();
const {
  username: correctUsername1,
  password: correctPassword1,
} = fakeData.getFakeUserCreds();
const {
  username: correctUsername2,
  password: correctPassword2,
} = fakeData.getFakeUserCreds();
const {
  username: correctUsername3,
  password: correctPassword3,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user1: User;
let user2: User;
let testCase1: TestCase;
let testCase2: TestCase;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create users to test on
  user1 = await User.create({
    username: correctUsername1,
    password: correctPassword1,
  }).save();
  user2 = await User.create({
    username: correctUsername2,
    password: correctPassword2,
    role: UserRoles.SUPERVISOR,
  }).save();
  await User.create({
    username: correctUsername3,
    password: correctPassword3,
    role: UserRoles.ADMIN,
  }).save();

  // create test cases to test on
  testCase1 = await TestCase.create({
    ...correctInput,
    createdBy: user1,
  }).save();
  testCase2 = await TestCase.create({
    ...correctInput,
    createdBy: user2,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Verify a test case", () => {
  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.verifyTestCase(testCase1.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    const changedTestCase = await TestCase.findOne(testCase1.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.verified).toEqual(false);

    done();
  });

  test("Check with tester permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.verifyTestCase(testCase1.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    const changedTestCase = await TestCase.findOne(testCase1.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.verified).toEqual(false);

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.verifyTestCase(testCase1.id);

    expect(response.errors).toBeUndefined();
    expect(response.data.verifyTestCase).toEqual(true);

    const changedTestCase = await TestCase.findOne(testCase1.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.verified).toEqual(true);

    const changedTestCaseInHistory = await TestCaseHistory.find({
      where: { tsid: testCase1.id },
      order: { createdAt: "DESC" },
    });
    if (!changedTestCaseInHistory) {
      throw new Error("Test case was not even created in the history");
    }

    done();
  });

  test("Check with admin permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.verifyTestCase(testCase2.id);

    expect(response.errors).toBeUndefined();
    expect(response.data.verifyTestCase).toEqual(true);

    const changedTestCase = await TestCase.findOne(testCase2.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.verified).toEqual(true);

    const changedTestCaseInHistory = await TestCaseHistory.find({
      where: { tsid: testCase2.id },
      order: { createdAt: "DESC" },
    });
    if (!changedTestCaseInHistory) {
      throw new Error("Test case was not even created in the history");
    }
    expect(changedTestCaseInHistory[0].verified).toEqual(true);

    done();
  });
});
