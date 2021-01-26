import { Connection } from "typeorm";

import { getRequiredMessage } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";

import { fakeData, TestClient } from "../utils";

const correctInput = fakeData.getNewTestedTestCaseVals();

const {
  username: correctUsername1,
  password: correctPassword1,
} = fakeData.getFakeUserCreds();
const {
  username: correctUsername2,
  password: correctPassword2,
} = fakeData.getFakeUserCreds();

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
  }).save();

  // create test cases to test on
  testCase1 = await TestCase.create({
    ...fakeData.getTestCaseVals(),
    createdBy: user1,
  }).save();
  testCase2 = await TestCase.create({
    ...fakeData.getTestCaseVals(),
    createdBy: user2,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Edit a tested test case", () => {
  test("Check without logging in", async (done) => {
    const input = { ...correctInput, id: testCase1.id };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.editTestedTestCase(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check on a test that hasn't been tested", async (done) => {
    const input = { ...correctInput, id: testCase1.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editTestedTestCase(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check on someone else's test", async (done) => {
    // Test the test case before running furhter tests
    TestCase.update(testCase2.id, {
      actualResult: "this is the actual result of the test",
      userRemarks: "these are some user remarks",
    });

    // ----------------------------------------------

    const input = { ...correctInput, id: testCase1.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editTestedTestCase(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = {
      id: "",
      actualResult: "",
      userRemarks: "",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestedTestCase(input);

    expect(response.data.editTestedTestCase.errors).toEqual([
      { field: "id", message: getRequiredMessage("id") },
      { field: "actualResult", message: getRequiredMessage("actualResult") },
      { field: "userRemarks", message: getRequiredMessage("userRemarks") },
    ]);
    expect(response.data.editTestedTestCase.testCase).toBeNull();

    done();
  });

  test("Check with correct inputs", async (done) => {
    const input = { ...correctInput, id: testCase2.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editTestedTestCase(input);

    expect(response.data.editTestedTestCase.errors).toBeNull();
    expect(response.data.editTestedTestCase.testCase?.productCode).toEqual(
      testCase2.productCode
    );
    expect(response.data.editTestedTestCase.testCase?.moduleCode).toEqual(
      testCase2.moduleCode
    );
    expect(response.data.editTestedTestCase.testCase?.menuCode).toEqual(
      testCase2.menuCode
    );
    expect(response.data.editTestedTestCase.testCase?.testingFor).toEqual(
      testCase2.testingFor
    );
    expect(response.data.editTestedTestCase.testCase?.testingScope).toEqual(
      testCase2.testingScope
    );
    expect(response.data.editTestedTestCase.testCase?.description).toEqual(
      testCase2.description
    );
    expect(response.data.editTestedTestCase.testCase?.expectedResult).toEqual(
      testCase2.expectedResult
    );
    expect(response.data.editTestedTestCase.testCase?.updatedBy.id).toEqual(
      user2.id
    );

    const editedTestCase = await TestCase.findOne(
      response.data.editTestedTestCase.testCase?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedTestCase) {
      throw new Error("Test case was not created in the databse!");
    }

    expect(editedTestCase.productCode).toEqual(testCase2.productCode);
    expect(editedTestCase.moduleCode).toEqual(testCase2.moduleCode);
    expect(editedTestCase.menuCode).toEqual(testCase2.menuCode);
    expect(editedTestCase.testingFor).toEqual(testCase2.testingFor);
    expect(editedTestCase.testingScope).toEqual(testCase2.testingScope);
    expect(editedTestCase.description).toEqual(testCase2.description);
    expect(editedTestCase.expectedResult).toEqual(testCase2.expectedResult);
    expect(editedTestCase.updatedBy.id).toEqual(user2.id);

    const editedTestCaseInHistory = await TestCaseHistory.find({
      where: { tsid: response.data.editTestedTestCase.testCase?.id },
      relations: ["updatedBy"],
    });

    if (!editedTestCaseInHistory) {
      throw new Error("Test case was not created in the history!");
    }

    expect(editedTestCaseInHistory[1].productCode).toEqual(
      testCase2.productCode
    );
    expect(editedTestCaseInHistory[1].moduleCode).toEqual(testCase2.moduleCode);
    expect(editedTestCaseInHistory[1].menuCode).toEqual(testCase2.menuCode);
    expect(editedTestCaseInHistory[1].testingFor).toEqual(testCase2.testingFor);
    expect(editedTestCaseInHistory[1].testingScope).toEqual(
      testCase2.testingScope
    );
    expect(editedTestCaseInHistory[1].description).toEqual(
      testCase2.description
    );
    expect(editedTestCaseInHistory[1].expectedResult).toEqual(
      testCase2.expectedResult
    );
    expect(editedTestCaseInHistory[1].updatedBy.id).toEqual(user2.id);

    done();
  });
});
