import { Connection } from "typeorm";

import { getRequiredMessage, getDoesNotExistMessage } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";
import {
  ProductMaster,
  ModuleMaster,
  MenuMaster,
  TestingForMaster,
  TestingScopeMaster,
} from "../../src/modules/masters";

import { fakeData, TestClient } from "../utils";

let correctInput: {
  productId: string;
  moduleId: string;
  menuId: string;
  testingForId: string;
  testingScopeId: string;
  cases: {
    description: string;
    expectedResult: string;
  }[];
};

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

  // create the masters to test on
  const product = await ProductMaster.create(fakeData.getProductVals()).save();
  const module = await ModuleMaster.create({
    ...fakeData.getModuleVals(),
    product,
  }).save();
  const menu = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    module,
  }).save();
  const testingFor = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    menu,
  }).save();
  const testingScope = await TestingScopeMaster.create({
    ...fakeData.getTestingScopeVals(),
    testingFor,
  }).save();

  correctInput = {
    ...fakeData.getTestCasesVals(),
    productId: product.id,
    moduleId: module.id,
    menuId: menu.id,
    testingForId: testingFor.id,
    testingScopeId: testingScope.id,
  };

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
      expect(testCase.productId).toEqual(input.productId);
      expect(testCase.moduleId).toEqual(input.moduleId);
      expect(testCase.menuId).toEqual(input.menuId);
      expect(testCase.testingForId).toEqual(input.testingForId);
      expect(testCase.testingScopeId).toEqual(input.testingScopeId);
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

      expect(createdTestCaseInHistory.productId).toEqual(input.productId);
      expect(createdTestCaseInHistory.moduleId).toEqual(input.moduleId);
      expect(createdTestCaseInHistory.menuId).toEqual(input.menuId);
      expect(createdTestCaseInHistory.testingForId).toEqual(input.testingForId);
      expect(createdTestCaseInHistory.testingScopeId).toEqual(
        input.testingScopeId
      );
      expect(createdTestCaseInHistory.description).toEqual(
        input.cases[i].description
      );
      expect(createdTestCaseInHistory.expectedResult).toEqual(
        input.cases[i].expectedResult
      );
      expect(createdTestCaseInHistory.createdBy?.id).toEqual(user.id);
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

  test("Check with invalid product id", async (done) => {
    const input = {
      ...correctInput,
      productId: "PROD",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toEqual([
      { field: "productId", message: getDoesNotExistMessage("productId") },
    ]);
    expect(response.data.createTestCases.testCases).toBeNull();

    done();
  });

  test("Check with invalid module id", async (done) => {
    const input = {
      ...correctInput,
      moduleId: "MOD",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toEqual([
      { field: "moduleId", message: getDoesNotExistMessage("moduleId") },
    ]);
    expect(response.data.createTestCases.testCases).toBeNull();

    done();
  });

  test("Check with invalid menu id", async (done) => {
    const input = {
      ...correctInput,
      menuId: "MEN",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toEqual([
      { field: "menuId", message: getDoesNotExistMessage("menuId") },
    ]);
    expect(response.data.createTestCases.testCases).toBeNull();

    done();
  });

  test("Check with invalid testingFor id", async (done) => {
    const input = {
      ...correctInput,
      testingForId: "TFOR",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toEqual([
      {
        field: "testingForId",
        message: getDoesNotExistMessage("testingForId"),
      },
    ]);
    expect(response.data.createTestCases.testCases).toBeNull();

    done();
  });

  test("Check with invalid testingScope id", async (done) => {
    const input = {
      ...correctInput,
      testingScopeId: "TSCO",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCases(input);

    expect(response.data.createTestCases.errors).toEqual([
      {
        field: "testingScopeId",
        message: getDoesNotExistMessage("testingScopeId"),
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
