import { Connection } from "typeorm";
import { random } from "faker";

import {
  getRequiredMessage,
  getDoesNotExistMessage,
  getInvalidUuidMessage,
} from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";
import {
  MenuMaster,
  ModuleMaster,
  ProductMaster,
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
  case: {
    description: string;
    expectedResult: string;
  };
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
    ...fakeData.getCreateTestCaseVals(),
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

describe("Create a test case", () => {
  test("Check with correct inputs", async (done) => {
    const input = { ...correctInput };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toBeNull();
    expect(response.data.createTestCase.testCase?.productId).toEqual(
      input.productId
    );
    expect(response.data.createTestCase.testCase?.moduleId).toEqual(
      input.moduleId
    );
    expect(response.data.createTestCase.testCase?.menuId).toEqual(input.menuId);
    expect(response.data.createTestCase.testCase?.testingForId).toEqual(
      input.testingForId
    );
    expect(response.data.createTestCase.testCase?.testingScopeId).toEqual(
      input.testingScopeId
    );
    expect(response.data.createTestCase.testCase?.description).toEqual(
      input.case.description
    );
    expect(response.data.createTestCase.testCase?.expectedResult).toEqual(
      input.case.expectedResult
    );
    expect(response.data.createTestCase.testCase?.createdBy.id).toEqual(
      user.id
    );

    const createdTestCase = await TestCase.findOne(
      response.data.createTestCase.testCase?.id,
      { relations: ["createdBy"] }
    );

    if (!createdTestCase) {
      throw new Error("Test case was not created in the databse!");
    }

    expect(createdTestCase.verified).toEqual(false);
    expect(createdTestCase.passed).toBeNull();

    const createdTestCaseInHistory = await TestCaseHistory.findOne({
      where: { tsid: response.data.createTestCase.testCase?.id },
      relations: ["createdBy"],
    });

    if (!createdTestCaseInHistory) {
      throw new Error("Test case was not created in the history!");
    }

    expect(createdTestCaseInHistory.verified).toEqual(false);
    expect(createdTestCaseInHistory.passed).toBeNull();

    expect(createdTestCaseInHistory.productId).toEqual(input.productId);
    expect(createdTestCaseInHistory.moduleId).toEqual(input.moduleId);
    expect(createdTestCaseInHistory.menuId).toEqual(input.menuId);
    expect(createdTestCaseInHistory.testingForId).toEqual(input.testingForId);
    expect(createdTestCaseInHistory.testingScopeId).toEqual(
      input.testingScopeId
    );
    expect(createdTestCaseInHistory.description).toEqual(
      input.case.description
    );
    expect(createdTestCaseInHistory.expectedResult).toEqual(
      input.case.expectedResult
    );
    expect(createdTestCaseInHistory.createdBy?.id).toEqual(user.id);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createTestCase(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with invalid product Id", async (done) => {
    const input = {
      ...correctInput,
      productId: random.uuid(),
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      { field: "productId", message: getDoesNotExistMessage("productId") },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });

  test("Check with invalid module Id", async (done) => {
    const input = {
      ...correctInput,
      moduleId: random.uuid(),
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      { field: "moduleId", message: getDoesNotExistMessage("moduleId") },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });

  test("Check with invalid menu Id", async (done) => {
    const input = {
      ...correctInput,
      menuId: random.uuid(),
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      { field: "menuId", message: getDoesNotExistMessage("menuId") },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });

  test("Check with invalid testingFor Id", async (done) => {
    const input = {
      ...correctInput,
      testingForId: random.uuid(),
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      {
        field: "testingForId",
        message: getDoesNotExistMessage("testingForId"),
      },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });

  test("Check with invalid testingScope Id", async (done) => {
    const input = {
      ...correctInput,
      testingScopeId: random.uuid(),
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      {
        field: "testingScopeId",
        message: getDoesNotExistMessage("testingScopeId"),
      },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = {
      productId: "",
      moduleId: "",
      menuId: "",
      testingForId: "",
      testingScopeId: "",
      case: {
        description: "",
        expectedResult: "",
      },
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.createTestCase(input);

    expect(response.data.createTestCase.errors).toEqual([
      { field: "productId", message: getRequiredMessage("productId") },
      { field: "productId", message: getInvalidUuidMessage("productId") },
      { field: "moduleId", message: getRequiredMessage("moduleId") },
      { field: "moduleId", message: getInvalidUuidMessage("moduleId") },
      { field: "menuId", message: getRequiredMessage("menuId") },
      { field: "menuId", message: getInvalidUuidMessage("menuId") },
      { field: "testingForId", message: getRequiredMessage("testingForId") },
      { field: "testingForId", message: getInvalidUuidMessage("testingForId") },
      {
        field: "testingScopeId",
        message: getRequiredMessage("testingScopeId"),
      },
      {
        field: "testingScopeId",
        message: getInvalidUuidMessage("testingScopeId"),
      },
      { field: "case.description", message: getRequiredMessage("description") },
      {
        field: "case.expectedResult",
        message: getRequiredMessage("expectedResult"),
      },
    ]);
    expect(response.data.createTestCase.testCase).toBeNull();

    done();
  });
});
