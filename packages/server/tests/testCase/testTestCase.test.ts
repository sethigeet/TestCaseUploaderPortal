import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";

import { fakeData, TestClient } from "../utils";

const creationInput = fakeData.getTestCaseVals();

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
const {
  username: correctUsername4,
  password: correctPassword4,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user1: User;
let user2: User;
let user3: User;
let testCase1: TestCase;
let testCase2: TestCase;
let testCase3: TestCase;

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
  }).save();
  user3 = await User.create({
    username: correctUsername3,
    password: correctPassword3,
    role: UserRoles.SUPERVISOR,
  }).save();
  await User.create({
    username: correctUsername4,
    password: correctPassword4,
    role: UserRoles.ADMIN,
  }).save();

  // create test cases to test on
  testCase1 = await TestCase.create({
    ...creationInput,
    createdBy: user1,
  }).save();
  testCase2 = await TestCase.create({
    ...creationInput,
    createdBy: user2,
  }).save();
  testCase3 = await TestCase.create({
    ...creationInput,
    createdBy: user3,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Test a test case", () => {
  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.testTestCase(
      fakeData.getTestTestCaseVals(testCase1.id, true)
    );

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    const changedTestCase = await TestCase.findOne(testCase1.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.passed).toBeNull();
    expect(changedTestCase.actualResult).toBeNull();
    expect(changedTestCase.userRemarks).toBeNull();

    done();
  });

  test("Check without verifying the test", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.testTestCase(
      fakeData.getTestTestCaseVals(testCase1.id, true)
    );

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    const changedTestCase = await TestCase.findOne(testCase1.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.passed).toBeNull();
    expect(changedTestCase.actualResult).toBeNull();
    expect(changedTestCase.userRemarks).toBeNull();

    done();
  });

  test("Check on your own test with tester permissions", async (done) => {
    // verify the test case before further tests
    const promises: Promise<any>[] = [];
    promises.push(TestCase.update({ id: testCase1.id }, { verified: true }));
    promises.push(TestCase.update({ id: testCase2.id }, { verified: true }));
    promises.push(TestCase.update({ id: testCase3.id }, { verified: true }));
    await Promise.all(promises);

    // -----------------------------------------------------------------

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const input = fakeData.getTestTestCaseVals(testCase1.id, true);

    const response = await client.testTestCase(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.testTestCase.passed).toEqual(input.passed);
    expect(response.data.testTestCase.actualResult).toEqual(input.actualResult);
    expect(response.data.testTestCase.userRemarks).toEqual(input.userRemarks);

    const changedTestCase = await TestCase.findOne(testCase1.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.passed).toEqual(input.passed);
    expect(changedTestCase.actualResult).toEqual(input.actualResult);
    expect(changedTestCase.userRemarks).toEqual(input.userRemarks);

    const changedTestCaseInHistory = await TestCaseHistory.find({
      where: { tsid: testCase1.id },
      order: { createdAt: "DESC" },
    });
    if (!changedTestCaseInHistory) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCaseInHistory[0].passed).toEqual(input.passed);
    expect(changedTestCaseInHistory[0].actualResult).toEqual(
      input.actualResult
    );
    expect(changedTestCaseInHistory[0].userRemarks).toEqual(input.userRemarks);

    done();
  });

  test("Check on someone else's test with tester permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.testTestCase(
      fakeData.getTestTestCaseVals(testCase2.id, true)
    );

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    const changedTestCase = await TestCase.findOne(testCase2.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.passed).toBeNull();
    expect(changedTestCase.actualResult).toBeNull();
    expect(changedTestCase.userRemarks).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const input = fakeData.getTestTestCaseVals(testCase2.id, true);

    const response = await client.testTestCase(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.testTestCase.passed).toEqual(input.passed);
    expect(response.data.testTestCase.actualResult).toEqual(input.actualResult);
    expect(response.data.testTestCase.userRemarks).toEqual(input.userRemarks);

    const changedTestCase = await TestCase.findOne(testCase2.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.passed).toEqual(input.passed);
    expect(changedTestCase.actualResult).toEqual(input.actualResult);
    expect(changedTestCase.userRemarks).toEqual(input.userRemarks);

    const changedTestCaseInHistory = await TestCaseHistory.find({
      where: { tsid: testCase2.id },
      order: { createdAt: "DESC" },
    });
    if (!changedTestCaseInHistory) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCaseInHistory[0].passed).toEqual(input.passed);
    expect(changedTestCaseInHistory[0].actualResult).toEqual(
      input.actualResult
    );
    expect(changedTestCaseInHistory[0].userRemarks).toEqual(input.userRemarks);

    done();
  });

  test("Check with admin permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername4, correctPassword4);

    const input = fakeData.getTestTestCaseVals(testCase3.id, true);

    const response = await client.testTestCase(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.testTestCase.passed).toEqual(input.passed);
    expect(response.data.testTestCase.actualResult).toEqual(input.actualResult);
    expect(response.data.testTestCase.userRemarks).toEqual(input.userRemarks);

    const changedTestCase = await TestCase.findOne(testCase3.id);
    if (!changedTestCase) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCase.passed).toEqual(input.passed);
    expect(changedTestCase.actualResult).toEqual(input.actualResult);
    expect(changedTestCase.userRemarks).toEqual(input.userRemarks);

    const changedTestCaseInHistory = await TestCaseHistory.find({
      where: { tsid: testCase3.id },
      order: { createdAt: "DESC" },
    });
    if (!changedTestCaseInHistory) {
      throw new Error("Test case was not even created");
    }
    expect(changedTestCaseInHistory[0].passed).toEqual(input.passed);
    expect(changedTestCaseInHistory[0].actualResult).toEqual(
      input.actualResult
    );
    expect(changedTestCaseInHistory[0].userRemarks).toEqual(input.userRemarks);

    done();
  });
});
