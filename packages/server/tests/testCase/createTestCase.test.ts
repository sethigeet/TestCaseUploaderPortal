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
  description: "This is a valid description for a test case!",
  expectedResult: "This should not expect any errors",
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

describe("Create a test case", () => {
  test("Check with correct inputs", async (done) => {
    const input = { ...correctInput };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toBeNull();
    expect(response.data.createTestCase.testCase?.productCode).toEqual(
      input.productCode
    );
    expect(response.data.createTestCase.testCase?.moduleCode).toEqual(
      input.moduleCode
    );
    expect(response.data.createTestCase.testCase?.menuCode).toEqual(
      input.menuCode
    );
    expect(response.data.createTestCase.testCase?.testingFor).toEqual(
      input.testingFor
    );
    expect(response.data.createTestCase.testCase?.testingScope).toEqual(
      input.testingScope
    );
    expect(response.data.createTestCase.testCase?.description).toEqual(
      input.description
    );
    expect(response.data.createTestCase.testCase?.expectedResult).toEqual(
      input.expectedResult
    );
    expect(response.data.createTestCase.testCase?.userId).toEqual(user.id);

    const createdTestCase = await TestCase.findOne(
      response.data.createTestCase.testCase?.id
    );

    if (!createdTestCase) {
      throw new Error("Test case was not created in the databse!");
    }

    expect(createdTestCase.verified).toEqual(false);
    expect(createdTestCase.passed).toEqual(false);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createTestCase(input);

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

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      { field: "productCode", message: getDoesNotExistMessage("productCode") },
      { field: "moduleCode", message: getDoesNotExistMessage("moduleCode") },
      { field: "menuCode", message: getDoesNotExistMessage("menuCode") },
      { field: "testingFor", message: getDoesNotExistMessage("testingFor") },
      {
        field: "testingScope",
        message: getDoesNotExistMessage("testingScope"),
      },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = {
      ...correctInput,
      description: "",
      expectedResult: "",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      { field: "description", message: getRequiredMessage("description") },
      {
        field: "expectedResult",
        message: getRequiredMessage("expectedResult"),
      },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });
});
