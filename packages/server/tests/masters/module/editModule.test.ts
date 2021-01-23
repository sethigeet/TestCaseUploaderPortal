import { Connection } from "typeorm";
import { internet, seed } from "faker";

import {
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { User } from "../../../src/modules/user";
import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { ProductMaster } from "../../../src/modules/masters/product";

import { TestClient } from "../../utils";
import { ModuleMaster } from "../../../src/modules/masters/module";

const correctInput1 = {
  code: "PROD-1-N",
  name: "Product 1 - NEW",
};
const correctInput2 = {
  code: "PROD-2-N",
  name: "Product 2 - NEW",
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
    code: "PROD-1",
    name: "Product 1",
    createdBy: user,
  }).save();

  // create modules to test on
  module1 = await ModuleMaster.create({
    code: "MOD-1",
    name: "Module 1",
    createdBy: user,
    product,
  }).save();
  module2 = await ModuleMaster.create({
    code: "MOD-2",
    name: "Module 2",
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

    const createdModule = await ModuleMaster.findOne(
      response.data.editModule.module?.id,
      { relations: ["updatedBy"] }
    );

    if (!createdModule) {
      throw new Error("Module was not created in the databse!");
    }

    expect(createdModule.code).toEqual(input.code);
    expect(createdModule.name).toEqual(input.name);
    expect(createdModule.deprecated).toEqual(input.deprecated);
    expect(createdModule.updatedBy.id).toEqual(user.id);

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

    const createdModule = await ModuleMaster.findOne(
      response.data.editModule.module?.id,
      { relations: ["updatedBy"] }
    );

    if (!createdModule) {
      throw new Error("Module was not created in the databse!");
    }

    expect(createdModule.code).toEqual(input.code);
    expect(createdModule.name).toEqual(input.name);
    expect(createdModule.deprecated).toEqual(true);
    expect(createdModule.updatedBy.id).toEqual(user.id);

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
