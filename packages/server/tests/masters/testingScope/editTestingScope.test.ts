import { Connection } from "typeorm";

import {
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { TestingForMaster } from "../../../src/modules/masters/testingFor";
import {
  TestingScopeMaster,
  TestingScopeMasterHistory,
} from "../../../src/modules/masters/testingScope";

import { fakeData, TestClient } from "../../utils";

const correctInput1 = fakeData.getMenuVals();
const correctInput2 = fakeData.getMenuVals();

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
let testingScope1: TestingScopeMaster;
let testingScope2: TestingScopeMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create users to test on
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

  // create modules to test on
  testingFor = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  testingScope1 = await TestingScopeMaster.create({
    ...fakeData.getTestingScopeVals(),
    createdBy: user,
    testingFor,
  }).save();
  testingScope2 = await TestingScopeMaster.create({
    ...fakeData.getTestingScopeVals(),
    createdBy: user,
    testingFor,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Edit a testingScope", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingScope(testingScope1.id, input);

    expect(response.data.editTestingScope.errors).toBeNull();
    expect(response.data.editTestingScope.testingScope?.code).toEqual(
      input.code
    );
    expect(response.data.editTestingScope.testingScope?.name).toEqual(
      input.name
    );
    expect(response.data.editTestingScope.testingScope?.testingFor.id).toEqual(
      testingFor.id
    );
    expect(response.data.editTestingScope.testingScope?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.editTestingScope.testingScope?.createdBy.id).toEqual(
      user.id
    );
    expect(response.data.editTestingScope.testingScope?.updatedBy.id).toEqual(
      user.id
    );

    const editedTestingScope = await TestingScopeMaster.findOne(
      response.data.editTestingScope.testingScope?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedTestingScope) {
      throw new Error("TestingScope was not created in the databse!");
    }

    expect(editedTestingScope.code).toEqual(input.code);
    expect(editedTestingScope.name).toEqual(input.name);
    expect(editedTestingScope.deprecated).toEqual(input.deprecated);
    expect(editedTestingScope.updatedBy.id).toEqual(user.id);

    const editedTestingScopeInHistory = await TestingScopeMasterHistory.find({
      where: { pid: response.data.editTestingScope.testingScope?.id },
      relations: ["updatedBy"],
    });

    if (!editedTestingScopeInHistory) {
      throw new Error("TestingFor was not created in the history!");
    }

    expect(editedTestingScopeInHistory[1].code).toEqual(input.code);
    expect(editedTestingScopeInHistory[1].name).toEqual(input.name);
    expect(editedTestingScopeInHistory[1].deprecated).toEqual(input.deprecated);
    expect(editedTestingScopeInHistory[1].updatedAt).toBeTruthy();
    expect(editedTestingScopeInHistory[1].updatedBy.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingScope(testingScope1.id, input);

    expect(response.data.editTestingScope.errors).toBeNull();
    expect(response.data.editTestingScope.testingScope?.code).toEqual(
      input.code
    );
    expect(response.data.editTestingScope.testingScope?.name).toEqual(
      input.name
    );
    expect(response.data.editTestingScope.testingScope?.deprecated).toEqual(
      true
    );
    expect(response.data.editTestingScope.testingScope?.testingFor.id).toEqual(
      testingFor.id
    );
    expect(response.data.editTestingScope.testingScope?.createdBy.id).toEqual(
      user.id
    );
    expect(response.data.editTestingScope.testingScope?.updatedBy.id).toEqual(
      user.id
    );

    const editedTestingScope = await TestingScopeMaster.findOne(
      response.data.editTestingScope.testingScope?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedTestingScope) {
      throw new Error("TestingScope was not created in the databse!");
    }

    expect(editedTestingScope.code).toEqual(input.code);
    expect(editedTestingScope.name).toEqual(input.name);
    expect(editedTestingScope.deprecated).toEqual(true);
    expect(editedTestingScope.updatedBy.id).toEqual(user.id);

    const editedTestingScopeInHistory = await TestingScopeMasterHistory.find({
      where: { pid: response.data.editTestingScope.testingScope?.id },
      relations: ["updatedBy"],
    });

    if (!editedTestingScopeInHistory) {
      throw new Error("TestingFor was not created in the history!");
    }

    expect(editedTestingScopeInHistory[2].code).toEqual(input.code);
    expect(editedTestingScopeInHistory[2].name).toEqual(input.name);
    expect(editedTestingScopeInHistory[2].deprecated).toEqual(true);
    expect(editedTestingScopeInHistory[2].updatedAt).toBeTruthy();
    expect(editedTestingScopeInHistory[2].updatedBy.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingScope(testingScope2.id, input);

    expect(response.data.editTestingScope.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.editTestingScope(testingScope1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editTestingScope(testingScope1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.editTestingScope(testingScope1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing id", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingScope("", input);

    expect(response.data.editTestingScope.errors).toEqual([
      { field: "id", message: getRequiredMessage("id") },
    ]);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingScope(testingScope1.id, input);

    expect(response.data.editTestingScope.errors).toEqual([
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.editTestingScope.testingScope).toBeNull();

    done();
  });
});
