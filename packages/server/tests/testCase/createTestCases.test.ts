import { Connection } from "typeorm";
import { internet, seed } from "faker";

import { getRequiredMessage, getDoesNotExistMessage } from "@portal/common";

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
  cases: [
    {
      description: "This is a valid description for a test case!1",
      expectedResult: "This should not expect any errors1",
    },
    {
      description: "This is a valid description for a test case!2",
      expectedResult: "This should not expect any errors2",
    },
    {
      description: "This is a valid description for a test case!3",
      expectedResult: "This should not expect any errors3",
    },
    {
      description: "This is a valid description for a test case!4",
      expectedResult: "This should not expect any errors4",
    },
  ],
};

seed(Date.now() + 5);
const correctUsername = internet.userName();
const correctPassword = internet.password(7);

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
      expect(testCase?.productCode).toEqual(input.productCode);
      expect(testCase?.moduleCode).toEqual(input.moduleCode);
      expect(testCase?.menuCode).toEqual(input.menuCode);
      expect(testCase?.testingFor).toEqual(input.testingFor);
      expect(testCase?.testingScope).toEqual(input.testingScope);
      expect(testCase?.description).toEqual(input.cases[i].description);
      expect(testCase?.expectedResult).toEqual(input.cases[i].expectedResult);
      expect(testCase?.createdBy.id).toEqual(user.id);
    });

    response.data.createTestCases.testCases?.forEach(async (testCase) => {
      const createdTestCase = await TestCase.findOne(testCase.id);

      if (!createdTestCase) {
        throw new Error("Test case was not created in the databse!");
      }

      expect(createdTestCase.verified).toEqual(false);
      expect(createdTestCase.passed).toEqual(false);
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
