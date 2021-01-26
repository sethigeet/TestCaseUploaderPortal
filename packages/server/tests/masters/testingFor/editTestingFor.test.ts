import { Connection } from "typeorm";

import {
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { MenuMaster } from "../../../src/modules/masters/menu";
import {
  TestingForMaster,
  TestingForMasterHistory,
} from "../../../src/modules/masters/testingFor";

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
let menu: MenuMaster;
let testingFor1: TestingForMaster;
let testingFor2: TestingForMaster;

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
  menu = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  testingFor1 = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
    menu,
  }).save();
  testingFor2 = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
    menu,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Edit a testingFor", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingFor(testingFor1.id, input);

    expect(response.data.editTestingFor.errors).toBeNull();
    expect(response.data.editTestingFor.testingFor?.code).toEqual(input.code);
    expect(response.data.editTestingFor.testingFor?.name).toEqual(input.name);
    expect(response.data.editTestingFor.testingFor?.menu.id).toEqual(menu.id);
    expect(response.data.editTestingFor.testingFor?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.editTestingFor.testingFor?.createdBy.id).toEqual(
      user.id
    );
    expect(response.data.editTestingFor.testingFor?.updatedBy.id).toEqual(
      user.id
    );

    const editedTestingFor = await TestingForMaster.findOne(
      response.data.editTestingFor.testingFor?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedTestingFor) {
      throw new Error("TestingFor was not created in the databse!");
    }

    expect(editedTestingFor.code).toEqual(input.code);
    expect(editedTestingFor.name).toEqual(input.name);
    expect(editedTestingFor.deprecated).toEqual(input.deprecated);
    expect(editedTestingFor.updatedBy.id).toEqual(user.id);

    const editedTestingForInHistory = await TestingForMasterHistory.find({
      where: { pid: response.data.editTestingFor.testingFor?.id },
      relations: ["updatedBy"],
    });

    if (!editedTestingForInHistory) {
      throw new Error("TestingFor was not created in the history!");
    }

    expect(editedTestingForInHistory[1].code).toEqual(input.code);
    expect(editedTestingForInHistory[1].name).toEqual(input.name);
    expect(editedTestingForInHistory[1].deprecated).toEqual(input.deprecated);
    expect(editedTestingForInHistory[1].updatedAt).toBeTruthy();
    expect(editedTestingForInHistory[1].updatedBy.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingFor(testingFor1.id, input);

    expect(response.data.editTestingFor.errors).toBeNull();
    expect(response.data.editTestingFor.testingFor?.code).toEqual(input.code);
    expect(response.data.editTestingFor.testingFor?.name).toEqual(input.name);
    expect(response.data.editTestingFor.testingFor?.deprecated).toEqual(true);
    expect(response.data.editTestingFor.testingFor?.menu.id).toEqual(menu.id);
    expect(response.data.editTestingFor.testingFor?.createdBy.id).toEqual(
      user.id
    );
    expect(response.data.editTestingFor.testingFor?.updatedBy.id).toEqual(
      user.id
    );

    const editedTestingFor = await TestingForMaster.findOne(
      response.data.editTestingFor.testingFor?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedTestingFor) {
      throw new Error("TestingFor was not created in the databse!");
    }

    expect(editedTestingFor.code).toEqual(input.code);
    expect(editedTestingFor.name).toEqual(input.name);
    expect(editedTestingFor.deprecated).toEqual(true);
    expect(editedTestingFor.updatedBy.id).toEqual(user.id);

    const editedTestingForInHistory = await TestingForMasterHistory.find({
      where: { pid: response.data.editTestingFor.testingFor?.id },
      relations: ["updatedBy"],
    });

    if (!editedTestingForInHistory) {
      throw new Error("TestingFor was not created in the history!");
    }

    expect(editedTestingForInHistory[2].code).toEqual(input.code);
    expect(editedTestingForInHistory[2].name).toEqual(input.name);
    expect(editedTestingForInHistory[2].deprecated).toEqual(true);
    expect(editedTestingForInHistory[2].updatedAt).toBeTruthy();
    expect(editedTestingForInHistory[2].updatedBy.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingFor(testingFor2.id, input);

    expect(response.data.editTestingFor.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.editTestingFor(testingFor1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editTestingFor(testingFor1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.editTestingFor(testingFor1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing id", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingFor("", input);

    expect(response.data.editTestingFor.errors).toEqual([
      { field: "id", message: getRequiredMessage("id") },
    ]);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editTestingFor(testingFor1.id, input);

    expect(response.data.editTestingFor.errors).toEqual([
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.editTestingFor.testingFor).toBeNull();

    done();
  });
});
