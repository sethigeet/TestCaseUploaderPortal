import { Connection } from "typeorm";
import { internet, seed } from "faker";

import { User } from "../../../src/modules/user";
import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { ModuleMaster } from "../../../src/modules/masters/module";

import { TestClient } from "../../utils";
import { ProductMaster } from "../../../src/modules/masters/product";

seed(Date.now());
const correctUsername = internet.userName();
const correctPassword = internet.password(7);

let conn: Connection;
let user: User;
let product: ProductMaster;
let myModule: ModuleMaster;

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
    code: "PROD-TEST",
    name: "Product for testing",
    createdBy: user,
  }).save();

  // create modules to test on
  myModule = await ModuleMaster.create({
    code: "MOD-TEST",
    name: "Module for testing",
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

describe("Get a module", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getModule(myModule.id);

    expect(response.data.getModule?.code).toEqual(myModule.code);
    expect(response.data.getModule?.name).toEqual(myModule.name);
    expect(response.data.getModule?.deprecated).toEqual(myModule.deprecated);
    expect(response.data.getModule?.createdBy.id).toEqual(user.id);
    expect(response.data.getModule?.product.id).toEqual(product.id);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getProduct("");

    expect(response.errors).toBeTruthy();
    expect(response.data.getProduct).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getProduct(myModule.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getProduct).toBeNull();

    done();
  });
});
