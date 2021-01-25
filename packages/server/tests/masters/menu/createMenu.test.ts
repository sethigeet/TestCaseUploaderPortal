import { Connection } from "typeorm";
import { internet, seed } from "faker";

import {
  getMinLenMessage,
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { User } from "../../../src/modules/user";
import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { ProductMaster } from "../../../src/modules/masters/product";

import { ModuleMaster } from "../../../src/modules/masters/module";

import {
  MenuMaster,
  MenuMasterHistory,
} from "../../../src/modules/masters/menu";

import { TestClient } from "../../utils";

const correctInput1 = {
  code: "M1-MEN-1",
  name: "Menu 1 of Module 1",
};
const correctInput2 = {
  code: "M1-MEN-2",
  name: "Menu 2 of Module 1",
};
const correctInput3 = {
  code: "P1-MOD-3",
  name: "Module 3 of Product 1",
};

seed(Date.now());
const correctUsername1 = internet.userName();
const correctPassword1 = internet.password(7);

seed(Date.now() + 1);
const correctUsername2 = internet.userName();
const correctPassword2 = internet.password(7);

seed(Date.now() + 2);
const correctUsername3 = internet.userName();
const correctPassword3 = internet.password(7);

let conn: Connection;
let user: User;
let myModule: ModuleMaster;

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

  // create a product to test on
  const product = await ProductMaster.create({
    code: "PROD-1",
    name: "Product 1",
  }).save();

  // create a module to test on
  myModule = await ModuleMaster.create({
    code: "MOD-1",
    name: "Module 1",
    product,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Create a menu", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true, moduleId: myModule.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createMenu(input);

    expect(response.data.createMenu.errors).toBeNull();
    expect(response.data.createMenu.menu?.code).toEqual(input.code);
    expect(response.data.createMenu.menu?.name).toEqual(input.name);
    expect(response.data.createMenu.menu?.module.id).toEqual(input.moduleId);
    expect(response.data.createMenu.menu?.deprecated).toEqual(input.deprecated);
    expect(response.data.createMenu.menu?.createdBy.id).toEqual(user.id);

    const createdMenu = await MenuMaster.findOne(
      response.data.createMenu.menu?.id,
      { relations: ["createdBy", "module"] }
    );

    if (!createdMenu) {
      throw new Error("Menu was not created in the databse!");
    }

    expect(createdMenu.code).toEqual(input.code);
    expect(createdMenu.name).toEqual(input.name);
    expect(createdMenu.deprecated).toEqual(input.deprecated);
    expect(createdMenu.module.id).toEqual(input.moduleId);
    expect(createdMenu.createdBy.id).toEqual(user.id);

    const createdMenuInHistory = await MenuMasterHistory.findOne({
      where: { pid: response.data.createMenu.menu?.id },
      relations: ["createdBy"],
    });

    if (!createdMenuInHistory) {
      throw new Error("Menu was not created in the history!");
    }

    expect(createdMenuInHistory.code).toEqual(input.code);
    expect(createdMenuInHistory.name).toEqual(input.name);
    expect(createdMenuInHistory.deprecated).toEqual(input.deprecated);
    expect(createdMenuInHistory.createdAt).toBeTruthy();
    expect(createdMenuInHistory.createdBy.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2, moduleId: myModule.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createMenu(input);

    expect(response.data.createMenu.errors).toBeNull();
    expect(response.data.createMenu.menu?.code).toEqual(input.code);
    expect(response.data.createMenu.menu?.name).toEqual(input.name);
    expect(response.data.createMenu.menu?.module.id).toEqual(input.moduleId);
    expect(response.data.createMenu.menu?.deprecated).toEqual(false);
    expect(response.data.createMenu.menu?.createdBy.id).toEqual(user.id);

    const createdMenu = await MenuMaster.findOne(
      response.data.createMenu.menu?.id,
      { relations: ["createdBy", "module"] }
    );

    if (!createdMenu) {
      throw new Error("Module was not created in the databse!");
    }

    expect(createdMenu.code).toEqual(input.code);
    expect(createdMenu.name).toEqual(input.name);
    expect(createdMenu.deprecated).toEqual(false);
    expect(createdMenu.module.id).toEqual(input.moduleId);
    expect(createdMenu.createdBy.id).toEqual(user.id);

    const createdMenuInHistory = await MenuMasterHistory.findOne({
      where: { pid: response.data.createMenu.menu?.id },
      relations: ["createdBy"],
    });

    if (!createdMenuInHistory) {
      throw new Error("Menu was not created in the history!");
    }

    expect(createdMenuInHistory.code).toEqual(input.code);
    expect(createdMenuInHistory.name).toEqual(input.name);
    expect(createdMenuInHistory.deprecated).toEqual(false);
    expect(createdMenuInHistory.createdAt).toBeTruthy();
    expect(createdMenuInHistory.createdBy.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput1, moduleId: myModule.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createMenu(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.createMenu.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check with invalid moduleId", async (done) => {
    const input = {
      ...correctInput3,
      moduleId: "dsgadfsagd sj dsadsj dgjhgd sgshagdh",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createMenu(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1, moduleId: myModule.id };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createMenu(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1, moduleId: myModule.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.createMenu(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1, moduleId: myModule.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.createMenu(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "", moduleId: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createMenu(input);

    expect(response.data.createMenu.errors).toEqual([
      { field: "moduleId", message: getRequiredMessage("moduleId") },
      { field: "moduleId", message: getMinLenMessage("moduleId", 36) },
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.createMenu.menu).toBeNull();

    done();
  });
});
