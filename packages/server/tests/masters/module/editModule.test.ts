import { Connection } from "typeorm";

import {
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import {
  ProductMaster,
  ModuleMaster,
  ModuleMasterHistory,
} from "../../../src/modules/masters";

import { fakeData, TestClient } from "../../utils";

const correctInput1 = fakeData.getModuleVals();
const correctInput2 = fakeData.getModuleVals();

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
let product: ProductMaster;
let module1: ModuleMaster;
let module2: ModuleMaster;

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
  product = await ProductMaster.create({
    ...fakeData.getProductVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  module1 = await ModuleMaster.create({
    ...fakeData.getModuleVals(),
    createdBy: user,
    product,
  }).save();
  module2 = await ModuleMaster.create({
    ...fakeData.getModuleVals(),
    createdBy: user,
    product,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Edit a module", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editModule(module1.id, input);

    expect(response.data.editModule.errors).toBeNull();
    expect(response.data.editModule.module?.code).toEqual(input.code);
    expect(response.data.editModule.module?.name).toEqual(input.name);
    expect(response.data.editModule.module?.product.id).toEqual(product.id);
    expect(response.data.editModule.module?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.editModule.module?.createdBy.id).toEqual(user.id);
    expect(response.data.editModule.module?.updatedBy?.id).toEqual(user.id);

    const editedModule = await ModuleMaster.findOne(
      response.data.editModule.module?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedModule) {
      throw new Error("Module was not created in the databse!");
    }

    expect(editedModule.code).toEqual(input.code);
    expect(editedModule.name).toEqual(input.name);
    expect(editedModule.deprecated).toEqual(input.deprecated);
    expect(editedModule.updatedBy?.id).toEqual(user.id);

    const editedModuleInHistory = await ModuleMasterHistory.find({
      where: { pid: response.data.editModule.module?.id },
      relations: ["updatedBy"],
    });

    if (!editedModuleInHistory) {
      throw new Error("Module was not created in the history!");
    }

    expect(editedModuleInHistory[1].code).toEqual(input.code);
    expect(editedModuleInHistory[1].name).toEqual(input.name);
    expect(editedModuleInHistory[1].deprecated).toEqual(input.deprecated);
    expect(editedModuleInHistory[1].updatedAt).toBeTruthy();
    expect(editedModuleInHistory[1].updatedBy?.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editModule(module1.id, input);

    expect(response.data.editModule.errors).toBeNull();
    expect(response.data.editModule.module?.code).toEqual(input.code);
    expect(response.data.editModule.module?.name).toEqual(input.name);
    expect(response.data.editModule.module?.deprecated).toEqual(true);
    expect(response.data.editModule.module?.product.id).toEqual(product.id);
    expect(response.data.editModule.module?.createdBy.id).toEqual(user.id);
    expect(response.data.editModule.module?.updatedBy?.id).toEqual(user.id);

    const editedModule = await ModuleMaster.findOne(
      response.data.editModule.module?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedModule) {
      throw new Error("Module was not created in the databse!");
    }

    expect(editedModule.code).toEqual(input.code);
    expect(editedModule.name).toEqual(input.name);
    expect(editedModule.deprecated).toEqual(true);
    expect(editedModule.updatedBy?.id).toEqual(user.id);

    const editedModuleInHistory = await ModuleMasterHistory.find({
      where: { pid: response.data.editModule.module?.id },
      relations: ["updatedBy"],
    });

    if (!editedModuleInHistory) {
      throw new Error("Module was not created in the history!");
    }

    expect(editedModuleInHistory[2].code).toEqual(input.code);
    expect(editedModuleInHistory[2].name).toEqual(input.name);
    expect(editedModuleInHistory[2].deprecated).toEqual(true);
    expect(editedModuleInHistory[2].updatedAt).toBeTruthy();
    expect(editedModuleInHistory[2].updatedBy?.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editModule(module2.id, input);

    expect(response.data.editModule.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.editModule(module1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editModule(module1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.editModule(module1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing id", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editModule("", input);

    expect(response.data.editModule.errors).toEqual([
      { field: "id", message: getRequiredMessage("id") },
    ]);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editModule(module1.id, input);

    expect(response.data.editModule.errors).toEqual([
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.editModule.module).toBeNull();

    done();
  });
});
