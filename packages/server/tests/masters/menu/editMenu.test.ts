import { Connection } from "typeorm";

import {
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import {
  ModuleMaster,
  MenuMaster,
  MenuMasterHistory,
} from "../../../src/modules/masters";

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
let myModule: ModuleMaster;
let menu1: MenuMaster;
let menu2: MenuMaster;

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
  myModule = await ModuleMaster.create({
    ...fakeData.getModuleVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  menu1 = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
    module: myModule,
  }).save();
  menu2 = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
    module: myModule,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Edit a menu", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editMenu(menu1.id, input);

    expect(response.data.editMenu.errors).toBeNull();
    expect(response.data.editMenu.menu?.code).toEqual(input.code);
    expect(response.data.editMenu.menu?.name).toEqual(input.name);
    expect(response.data.editMenu.menu?.module.id).toEqual(myModule.id);
    expect(response.data.editMenu.menu?.deprecated).toEqual(input.deprecated);
    expect(response.data.editMenu.menu?.createdBy.id).toEqual(user.id);
    expect(response.data.editMenu.menu?.updatedBy?.id).toEqual(user.id);

    const editedMenu = await MenuMaster.findOne(
      response.data.editMenu.menu?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedMenu) {
      throw new Error("Menu was not created in the databse!");
    }

    expect(editedMenu.code).toEqual(input.code);
    expect(editedMenu.name).toEqual(input.name);
    expect(editedMenu.deprecated).toEqual(input.deprecated);
    expect(editedMenu.updatedBy?.id).toEqual(user.id);

    const editedMenuInHistory = await MenuMasterHistory.find({
      where: { pid: response.data.editMenu.menu?.id },
      relations: ["updatedBy"],
    });

    if (!editedMenuInHistory) {
      throw new Error("Menu was not created in the history!");
    }

    expect(editedMenuInHistory[1].code).toEqual(input.code);
    expect(editedMenuInHistory[1].name).toEqual(input.name);
    expect(editedMenuInHistory[1].deprecated).toEqual(input.deprecated);
    expect(editedMenuInHistory[1].updatedAt).toBeTruthy();
    expect(editedMenuInHistory[1].updatedBy?.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editMenu(menu1.id, input);

    expect(response.data.editMenu.errors).toBeNull();
    expect(response.data.editMenu.menu?.code).toEqual(input.code);
    expect(response.data.editMenu.menu?.name).toEqual(input.name);
    expect(response.data.editMenu.menu?.deprecated).toEqual(true);
    expect(response.data.editMenu.menu?.module.id).toEqual(myModule.id);
    expect(response.data.editMenu.menu?.createdBy.id).toEqual(user.id);
    expect(response.data.editMenu.menu?.updatedBy?.id).toEqual(user.id);

    const editedMenu = await MenuMaster.findOne(
      response.data.editMenu.menu?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedMenu) {
      throw new Error("Menu was not created in the databse!");
    }

    expect(editedMenu.code).toEqual(input.code);
    expect(editedMenu.name).toEqual(input.name);
    expect(editedMenu.deprecated).toEqual(true);
    expect(editedMenu.updatedBy?.id).toEqual(user.id);

    const editedMenuInHistory = await MenuMasterHistory.find({
      where: { pid: response.data.editMenu.menu?.id },
      relations: ["updatedBy"],
    });

    if (!editedMenuInHistory) {
      throw new Error("Menu was not created in the history!");
    }

    expect(editedMenuInHistory[2].code).toEqual(input.code);
    expect(editedMenuInHistory[2].name).toEqual(input.name);
    expect(editedMenuInHistory[2].deprecated).toEqual(true);
    expect(editedMenuInHistory[2].updatedAt).toBeTruthy();
    expect(editedMenuInHistory[2].updatedBy?.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editMenu(menu2.id, input);

    expect(response.data.editMenu.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.editMenu(menu1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editMenu(menu1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.editMenu(menu1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing id", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editMenu("", input);

    expect(response.data.editMenu.errors).toEqual([
      { field: "id", message: getRequiredMessage("id") },
    ]);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editMenu(menu1.id, input);

    expect(response.data.editMenu.errors).toEqual([
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.editMenu.menu).toBeNull();

    done();
  });
});
