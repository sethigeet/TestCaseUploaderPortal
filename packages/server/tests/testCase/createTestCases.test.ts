import { Connection } from "typeorm";

import { getRequiredMessage, getDoesNotExistMessage } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";

import { fakeData, TestClient } from "../utils";

const correctInput = fakeData.getTestCasesVals();

const {
  username: correctUsername,
  password: correctPassword,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user: User;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Create test cases", () => {
  test("Check with correct inputs", async (done) => {
    const input = { ...correctInput };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toBeNull();
    response.data.createTestCases.testCases?.forEach((testCase, i) => {
      expect(testCase.productCode).toEqual(input.productCode);
      expect(testCase.moduleCode).toEqual(input.moduleCode);
      expect(testCase.menuCode).toEqual(input.menuCode);
      expect(testCase.testingFor).toEqual(input.testingFor);
      expect(testCase.testingScope).toEqual(input.testingScope);
      expect(testCase.description).toEqual(input.cases[i].description);
      expect(testCase.expectedResult).toEqual(input.cases[i].expectedResult);
      expect(testCase.createdBy.id).toEqual(user.id);
    });

    response.data.createTestCases.testCases?.forEach(async (testCase, i) => {
      const createdTestCase = await TestCase.findOne(testCase.id, {
        relations: ["createdBy"],
      });

      if (!createdTestCase) {
        throw new Error("Test case was not created in the databse!");
      }

      expect(createdTestCase.verified).toEqual(false);
      expect(createdTestCase.passed).toBeNull();

      const createdTestCaseInHistory = await TestCaseHistory.findOne({
        where: { tsid: testCase.id },
        relations: ["createdBy"],
      });

      if (!createdTestCaseInHistory) {
        throw new Error("Test case was not created in the history!");
      }

      expect(createdTestCaseInHistory.productCode).toEqual(input.productCode);
      expect(createdTestCaseInHistory.moduleCode).toEqual(input.moduleCode);
      expect(createdTestCaseInHistory.menuCode).toEqual(input.menuCode);
      expect(createdTestCaseInHistory.testingFor).toEqual(input.testingFor);
      expect(createdTestCaseInHistory.testingScope).toEqual(input.testingScope);
      expect(createdTestCaseInHistory.description).toEqual(
        input.cases[i].description
      );
      expect(createdTestCaseInHistory.expectedResult).toEqual(
        input.cases[i].expectedResult
      );
      expect(createdTestCaseInHistory.createdBy.id).toEqual(user.id);
      expect(createdTestCaseInHistory.verified).toEqual(false);
      expect(createdTestCaseInHistory.passed).toBeNull();
    });

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createTestCases(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with invalid codes", async (done) => {
    const input = {
      ...correctInput,
      productCode: "PROD",
      moduleCode: "MOD",
      menuCode: "MEN",
      testingFor: "TFOR",
      testingScope: "TSCO",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toEqual([
      { field: "productCode", message: getDoesNotExistMessage("productCode") },
      { field: "moduleCode", message: getDoesNotExistMessage("moduleCode") },
      { field: "menuCode", message: getDoesNotExistMessage("menuCode") },
      { field: "testingFor", message: getDoesNotExistMessage("testingFor") },
      {
        field: "testingScope",
        message: getDoesNotExistMessage("testingScope"),
      },
    ]);
    expect(response.data.createTestCases.testCases).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = {
      ...correctInput,
      cases: [{ description: "", expectedResult: "" }],
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toEqual([
      {
        field: "cases[0].description",
        message: getRequiredMessage("description"),
      },
      {
        field: "cases[0].expectedResult",
        message: getRequiredMessage("expectedResult"),
      },
    ]);
    expect(response.data.createTestCases.testCases).toBeNull();

    done();
  });
});
