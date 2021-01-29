import { Connection } from "typeorm";

import {
  getMinLenMessage,
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import {
  TestingForMaster,
  TestingScopeMaster,
  TestingScopeMasterHistory,
} from "../../../src/modules/masters";

import { fakeData, TestClient } from "../../utils";

const correctInput1 = fakeData.getTestingScopeVals();
const correctInput2 = fakeData.getTestingScopeVals();
const correctInput3 = fakeData.getTestingScopeVals();

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
let user: User;
let testingFor: TestingForMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername1,
    password: correctPassword1,
    role: UserRoles.ADMIN,
  }).save();
  await User.create({
    username: correctUsername2,
    password: correctPassword2,
  }).save();
  await User.create({
    username: correctUsername3,
    password: correctPassword3,
    role: UserRoles.SUPERVISOR,
  }).save();

  // create a module to test on
  testingFor = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Create a testingScope", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = {
      ...correctInput1,
      deprecated: true,
      testingForId: testingFor.id,
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingScope(input);

    expect(response.data.createTestingScope.errors).toBeNull();
    expect(response.data.createTestingScope.testingScope?.code).toEqual(
      input.code
    );
    expect(response.data.createTestingScope.testingScope?.name).toEqual(
      input.name
    );
    expect(
      response.data.createTestingScope.testingScope?.testingFor.id
    ).toEqual(input.testingForId);
    expect(response.data.createTestingScope.testingScope?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.createTestingScope.testingScope?.createdBy.id).toEqual(
      user.id
    );

    const createdTestingScope = await TestingScopeMaster.findOne(
      response.data.createTestingScope.testingScope?.id,
      { relations: ["createdBy", "testingFor"] }
    );

    if (!createdTestingScope) {
      throw new Error("TestingScope was not created in the databse!");
    }

    expect(createdTestingScope.code).toEqual(input.code);
    expect(createdTestingScope.name).toEqual(input.name);
    expect(createdTestingScope.deprecated).toEqual(input.deprecated);
    expect(createdTestingScope.testingFor.id).toEqual(input.testingForId);
    expect(createdTestingScope.createdBy.id).toEqual(user.id);

    const createdTestingScopeInHistory = await TestingScopeMasterHistory.findOne(
      {
        where: { pid: response.data.createTestingScope.testingScope?.id },
        relations: ["createdBy"],
      }
    );

    if (!createdTestingScopeInHistory) {
      throw new Error("TestingScope was not created in the history!");
    }

    expect(createdTestingScopeInHistory.code).toEqual(input.code);
    expect(createdTestingScopeInHistory.name).toEqual(input.name);
    expect(createdTestingScopeInHistory.deprecated).toEqual(input.deprecated);
    expect(createdTestingScopeInHistory.createdAt).toBeTruthy();
    expect(createdTestingScopeInHistory.createdBy?.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2, testingForId: testingFor.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingScope(input);

    expect(response.data.createTestingScope.errors).toBeNull();
    expect(response.data.createTestingScope.testingScope?.code).toEqual(
      input.code
    );
    expect(response.data.createTestingScope.testingScope?.name).toEqual(
      input.name
    );
    expect(
      response.data.createTestingScope.testingScope?.testingFor.id
    ).toEqual(input.testingForId);
    expect(response.data.createTestingScope.testingScope?.deprecated).toEqual(
      false
    );
    expect(response.data.createTestingScope.testingScope?.createdBy.id).toEqual(
      user.id
    );

    const createdTestingScope = await TestingScopeMaster.findOne(
      response.data.createTestingScope.testingScope?.id,
      { relations: ["createdBy", "testingFor"] }
    );

    if (!createdTestingScope) {
      throw new Error("TestingScope was not created in the databse!");
    }

    expect(createdTestingScope.code).toEqual(input.code);
    expect(createdTestingScope.name).toEqual(input.name);
    expect(createdTestingScope.deprecated).toEqual(false);
    expect(createdTestingScope.testingFor.id).toEqual(input.testingForId);
    expect(createdTestingScope.createdBy.id).toEqual(user.id);

    const createdTestingScopeInHistory = await TestingScopeMasterHistory.findOne(
      {
        where: { pid: response.data.createTestingScope.testingScope?.id },
        relations: ["createdBy"],
      }
    );

    if (!createdTestingScopeInHistory) {
      throw new Error("TestingScope was not created in the history!");
    }

    expect(createdTestingScopeInHistory.code).toEqual(input.code);
    expect(createdTestingScopeInHistory.name).toEqual(input.name);
    expect(createdTestingScopeInHistory.deprecated).toEqual(false);
    expect(createdTestingScopeInHistory.createdAt).toBeTruthy();
    expect(createdTestingScopeInHistory.createdBy?.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput1, testingForId: testingFor.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingScope(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.createTestingScope.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check with invalid menuId", async (done) => {
    const input = {
      ...correctInput3,
      testingForId: "dsgadfsagd sj dsadsj dgjhgd sgshagdh",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingScope(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1, testingForId: testingFor.id };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createTestingScope(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1, testingForId: testingFor.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.createTestingScope(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1, testingForId: testingFor.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.createTestingScope(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "", testingForId: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingScope(input);

    expect(response.data.createTestingScope.errors).toEqual([
      { field: "testingForId", message: getRequiredMessage("testingForId") },
      { field: "testingForId", message: getMinLenMessage("testingForId", 36) },
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.createTestingScope.testingScope).toBeNull();

    done();
  });
});
