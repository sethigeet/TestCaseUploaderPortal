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
  MenuMaster,
  TestingForMaster,
  TestingForMasterHistory,
} from "../../../src/modules/masters";

import { fakeData, TestClient } from "../../utils";

const correctInput1 = fakeData.getTestingForVals();
const correctInput2 = fakeData.getTestingForVals();
const correctInput3 = fakeData.getTestingForVals();

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
  menu = await MenuMaster.create({
    ...fakeData.getMenuVals(),
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Create a testingFor", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true, menuId: menu.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingFor(input);

    expect(response.data.createTestingFor.errors).toBeNull();
    expect(response.data.createTestingFor.testingFor?.code).toEqual(input.code);
    expect(response.data.createTestingFor.testingFor?.name).toEqual(input.name);
    expect(response.data.createTestingFor.testingFor?.menu.id).toEqual(
      input.menuId
    );
    expect(response.data.createTestingFor.testingFor?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.createTestingFor.testingFor?.createdBy.id).toEqual(
      user.id
    );

    const createdTestingFor = await TestingForMaster.findOne(
      response.data.createTestingFor.testingFor?.id,
      { relations: ["createdBy", "menu"] }
    );

    if (!createdTestingFor) {
      throw new Error("TestingFor was not created in the databse!");
    }

    expect(createdTestingFor.code).toEqual(input.code);
    expect(createdTestingFor.name).toEqual(input.name);
    expect(createdTestingFor.deprecated).toEqual(input.deprecated);
    expect(createdTestingFor.menu.id).toEqual(input.menuId);
    expect(createdTestingFor.createdBy.id).toEqual(user.id);

    const createdTestingForInHistory = await TestingForMasterHistory.findOne({
      where: { pid: response.data.createTestingFor.testingFor?.id },
      relations: ["createdBy"],
    });

    if (!createdTestingForInHistory) {
      throw new Error("TestingFor was not created in the history!");
    }

    expect(createdTestingForInHistory.code).toEqual(input.code);
    expect(createdTestingForInHistory.name).toEqual(input.name);
    expect(createdTestingForInHistory.deprecated).toEqual(input.deprecated);
    expect(createdTestingForInHistory.createdAt).toBeTruthy();
    expect(createdTestingForInHistory.createdBy?.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2, menuId: menu.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingFor(input);

    expect(response.data.createTestingFor.errors).toBeNull();
    expect(response.data.createTestingFor.testingFor?.code).toEqual(input.code);
    expect(response.data.createTestingFor.testingFor?.name).toEqual(input.name);
    expect(response.data.createTestingFor.testingFor?.menu.id).toEqual(
      input.menuId
    );
    expect(response.data.createTestingFor.testingFor?.deprecated).toEqual(
      false
    );
    expect(response.data.createTestingFor.testingFor?.createdBy.id).toEqual(
      user.id
    );

    const createdTestingFor = await TestingForMaster.findOne(
      response.data.createTestingFor.testingFor?.id,
      { relations: ["createdBy", "menu"] }
    );

    if (!createdTestingFor) {
      throw new Error("TestingFor was not created in the databse!");
    }

    expect(createdTestingFor.code).toEqual(input.code);
    expect(createdTestingFor.name).toEqual(input.name);
    expect(createdTestingFor.deprecated).toEqual(false);
    expect(createdTestingFor.menu.id).toEqual(input.menuId);
    expect(createdTestingFor.createdBy.id).toEqual(user.id);

    const createdTestingForInHistory = await TestingForMasterHistory.findOne({
      where: { pid: response.data.createTestingFor.testingFor?.id },
      relations: ["createdBy"],
    });

    if (!createdTestingForInHistory) {
      throw new Error("TestingFor was not created in the history!");
    }

    expect(createdTestingForInHistory.code).toEqual(input.code);
    expect(createdTestingForInHistory.name).toEqual(input.name);
    expect(createdTestingForInHistory.deprecated).toEqual(false);
    expect(createdTestingForInHistory.createdAt).toBeTruthy();
    expect(createdTestingForInHistory.createdBy?.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput1, menuId: menu.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingFor(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.createTestingFor.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check with invalid menuId", async (done) => {
    const input = {
      ...correctInput3,
      menuId: "dsgadfsagd sj dsadsj dgjhgd sgshagdh",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingFor(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1, menuId: menu.id };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createTestingFor(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1, menuId: menu.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.createTestingFor(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1, menuId: menu.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.createTestingFor(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "", menuId: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createTestingFor(input);

    expect(response.data.createTestingFor.errors).toEqual([
      { field: "menuId", message: getRequiredMessage("menuId") },
      { field: "menuId", message: getMinLenMessage("menuId", 36) },
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.createTestingFor.testingFor).toBeNull();

    done();
  });
});
