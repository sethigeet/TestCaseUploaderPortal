import { Connection } from "typeorm";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { ProductMaster } from "../../../src/modules/masters/product";
import { ModuleMaster } from "../../../src/modules/masters/module";

import { fakeData, TestClient } from "../../utils";

const {
  username: correctUsername,
  password: correctPassword,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user: User;
let product: ProductMaster;
let module1: ModuleMaster;
let module2: ModuleMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create products to test on
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

describe("Get many modules", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getModules(product.id);

    expect(response.data.getModules[0]?.code).toEqual(module2.code);
    expect(response.data.getModules[0]?.name).toEqual(module2.name);
    expect(response.data.getModules[0]?.deprecated).toEqual(module2.deprecated);
    expect(response.data.getModules[0]?.createdBy.id).toEqual(user.id);
    expect(response.data.getModules[0]?.product.id).toEqual(product.id);

    expect(response.data.getModules[1]?.code).toEqual(module1.code);
    expect(response.data.getModules[1]?.name).toEqual(module1.name);
    expect(response.data.getModules[1]?.deprecated).toEqual(module1.deprecated);
    expect(response.data.getModules[1]?.createdBy.id).toEqual(user.id);
    expect(response.data.getModules[1]?.product.id).toEqual(product.id);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getModules("");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getModules("dasgdshadg");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getModules(product.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });
});
