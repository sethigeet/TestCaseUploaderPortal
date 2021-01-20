import { Connection } from "typeorm";
import { internet, seed } from "faker";

import { UserRoles } from "@portal/common";

import { User } from "../../src/modules/user/userEntity";
import { createTypeormConnection } from "../../src/modules/shared/utils";

import { TestClient } from "../utils";
import { TestCase } from "../../src/modules/testCase/testCaseEntity";

const correctInput = {
  productCode: "PROD-1",
  moduleCode: "MOD-1",
  menuCode: "MEN-1",
  testingFor: "TFOR-1",
  testingScope: "TSCO-1",
  description: "This is a valid description for a test case!",
  expectedResult: "This should not expect any errors",
};

seed(Date.now() + 10);
const correctUsername1 = internet.userName();
const correctPassword1 = internet.password(7);

seed(Date.now() + 11);
const correctUsername2 = internet.userName();
const correctPassword2 = internet.password(7);

seed(Date.now() + 12);
const correctUsername3 = internet.userName();
const correctPassword3 = internet.password(7);

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
  await User.create({
    username: correctUsername3,
    password: correctPassword3,
    role: UserRoles.ADMIN,
  }).save();

  // create a user to test on
  testCase1 = await TestCase.create({
    ...correctInput,
    createdBy: user1.id,
  }).save();
  testCase2 = await TestCase.create({
    ...correctInput,
    createdBy: user2.id,
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

    done();
  });
});
