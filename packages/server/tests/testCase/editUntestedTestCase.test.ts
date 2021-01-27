import { Connection } from "typeorm";

import { getRequiredMessage } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";

import { fakeData, TestClient } from "../utils";

const correctInput = fakeData.getNewUntestedTestCaseVals();

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

    const response = await client.editUntestedTestCase(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check on someone else's test", async (done) => {
    const input = { ...correctInput, id: testCase1.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editUntestedTestCase(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = {
      id: "",
      description: "",
      expectedResult: "",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editUntestedTestCase(input);

    expect(response.data.editUntestedTestCase.errors).toEqual([
      { field: "id", message: getRequiredMessage("id") },
      { field: "description", message: getRequiredMessage("description") },
      {
        field: "expectedResult",
        message: getRequiredMessage("expectedResult"),
      },
    ]);
    expect(response.data.editUntestedTestCase.testCase).toBeNull();

    done();
  });

  test("Check with correct inputs", async (done) => {
    const input = { ...correctInput, id: testCase2.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editUntestedTestCase(input);

    expect(response.data.editUntestedTestCase.errors).toBeNull();
    expect(response.data.editUntestedTestCase.testCase?.productCode).toEqual(
      testCase2.productCode
    );
    expect(response.data.editUntestedTestCase.testCase?.moduleCode).toEqual(
      testCase2.moduleCode
    );
    expect(response.data.editUntestedTestCase.testCase?.menuCode).toEqual(
      testCase2.menuCode
    );
    expect(response.data.editUntestedTestCase.testCase?.testingFor).toEqual(
      testCase2.testingFor
    );
    expect(response.data.editUntestedTestCase.testCase?.testingScope).toEqual(
      testCase2.testingScope
    );
    expect(response.data.editUntestedTestCase.testCase?.description).toEqual(
      input.description
    );
    expect(response.data.editUntestedTestCase.testCase?.expectedResult).toEqual(
      input.expectedResult
    );
    expect(response.data.editUntestedTestCase.testCase?.updatedBy?.id).toEqual(
      user2.id
    );

    const editedTestCase = await TestCase.findOne(
      response.data.editUntestedTestCase.testCase?.id,
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
    expect(editedTestCase.description).toEqual(input.description);
    expect(editedTestCase.expectedResult).toEqual(input.expectedResult);
    expect(editedTestCase.updatedBy?.id).toEqual(user2.id);

    const editedTestCaseInHistory = await TestCaseHistory.find({
      where: { tsid: response.data.editUntestedTestCase.testCase?.id },
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
    expect(editedTestCaseInHistory[1].description).toEqual(input.description);
    expect(editedTestCaseInHistory[1].expectedResult).toEqual(
      input.expectedResult
    );
    expect(editedTestCaseInHistory[1].updatedBy?.id).toEqual(user2.id);

    done();
  });

  test("Check on a test that has been tested", async (done) => {
    // Test the test case before running furhter tests
    TestCase.update(testCase2.id, {
      actualResult: "this is the actual result of the test",
      userRemarks: "these are some user remarks",
    });

    // ----------------------------------------------

    const input = { ...correctInput, id: testCase2.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editUntestedTestCase(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });
});
