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

import { TestClient } from "../../utils";
import {
  ModuleMaster,
  ModuleMasterHistory,
} from "../../../src/modules/masters/module";

const correctInput1 = {
  code: "P1-MOD-1",
  name: "Module 1 of Product 1",
};
const correctInput2 = {
  code: "P1-MOD-2",
  name: "Module 2 of Product 1",
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
let product: ProductMaster;

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
  product = await ProductMaster.create({
    code: "PROD-1",
    name: "Product 1",
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Create a module", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true, productId: product.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createModule(input);

    expect(response.data.createModule.errors).toBeNull();
    expect(response.data.createModule.module?.code).toEqual(input.code);
    expect(response.data.createModule.module?.name).toEqual(input.name);
    expect(response.data.createModule.module?.product.id).toEqual(
      input.productId
    );
    expect(response.data.createModule.module?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.createModule.module?.createdBy.id).toEqual(user.id);

    const createdModule = await ModuleMaster.findOne(
      response.data.createModule.module?.id,
      { relations: ["createdBy", "product"] }
    );

    if (!createdModule) {
      throw new Error("Module was not created in the databse!");
    }

    expect(createdModule.code).toEqual(input.code);
    expect(createdModule.name).toEqual(input.name);
    expect(createdModule.deprecated).toEqual(input.deprecated);
    expect(createdModule.product.id).toEqual(input.productId);
    expect(createdModule.createdBy.id).toEqual(user.id);

    const createdModuleInHistory = await ModuleMasterHistory.findOne({
      where: { pid: response.data.createModule.module?.id },
      relations: ["createdBy"],
    });

    if (!createdModuleInHistory) {
      throw new Error("Module was not created in the history!");
    }

    expect(createdModuleInHistory.code).toEqual(input.code);
    expect(createdModuleInHistory.name).toEqual(input.name);
    expect(createdModuleInHistory.deprecated).toEqual(input.deprecated);
    expect(createdModuleInHistory.createdAt).toBeTruthy();
    expect(createdModuleInHistory.createdBy.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2, productId: product.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createModule(input);

    expect(response.data.createModule.errors).toBeNull();
    expect(response.data.createModule.module?.code).toEqual(input.code);
    expect(response.data.createModule.module?.name).toEqual(input.name);
    expect(response.data.createModule.module?.product.id).toEqual(
      input.productId
    );
    expect(response.data.createModule.module?.deprecated).toEqual(false);
    expect(response.data.createModule.module?.createdBy.id).toEqual(user.id);

    const createdModule = await ModuleMaster.findOne(
      response.data.createModule.module?.id,
      { relations: ["createdBy", "product"] }
    );

    if (!createdModule) {
      throw new Error("Module was not created in the databse!");
    }

    expect(createdModule.code).toEqual(input.code);
    expect(createdModule.name).toEqual(input.name);
    expect(createdModule.deprecated).toEqual(false);
    expect(createdModule.product.id).toEqual(input.productId);
    expect(createdModule.createdBy.id).toEqual(user.id);

    const createdModuleInHistory = await ModuleMasterHistory.findOne({
      where: { pid: response.data.createModule.module?.id },
      relations: ["createdBy"],
    });

    if (!createdModuleInHistory) {
      throw new Error("Module was not created in the history!");
    }

    expect(createdModuleInHistory.code).toEqual(input.code);
    expect(createdModuleInHistory.name).toEqual(input.name);
    expect(createdModuleInHistory.deprecated).toEqual(false);
    expect(createdModuleInHistory.createdAt).toBeTruthy();
    expect(createdModuleInHistory.createdBy.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput1, productId: product.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createModule(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.createModule.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check with invalid productId", async (done) => {
    const input = {
      ...correctInput3,
      productId: "dsgadfsagd sj dsadsj dgjhgd sgshagdh",
    };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createModule(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1, productId: product.id };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createModule(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1, productId: product.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.createModule(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1, productId: product.id };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.createModule(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "", productId: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createModule(input);

    expect(response.data.createModule.errors).toEqual([
      { field: "productId", message: getRequiredMessage("productId") },
      { field: "productId", message: getMinLenMessage("productId", 36) },
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.createModule.module).toBeNull();

    done();
  });
});
