import { Connection } from "typeorm";
import { internet, seed } from "faker";

import { User } from "../../../src/modules/user";
import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { ProductMaster } from "../../../src/modules/masters/product";

import { TestClient } from "../../utils";

seed(Date.now() + 22);
const correctUsername = internet.userName();
const correctPassword = internet.password(7);

let conn: Connection;
let user: User;
let product1: ProductMaster;
let product2: ProductMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create products to test on
  product1 = await ProductMaster.create({
    code: "PROD-TEST2",
    name: "Product for testing 2",
    createdBy: user,
  }).save();
  product2 = await ProductMaster.create({
    code: "PROD-TEST3",
    name: "Product for testing 3",
    createdBy: user,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Get a product", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getProducts();

    expect(response.data.getProducts[0]?.code).toEqual(product1.code);
    expect(response.data.getProducts[0]?.name).toEqual(product1.name);
    expect(response.data.getProducts[0]?.deprecated).toEqual(
      product1.deprecated
    );
    expect(response.data.getProducts[0]?.createdBy.id).toEqual(user.id);

    expect(response.data.getProducts[1]?.code).toEqual(product2.code);
    expect(response.data.getProducts[1]?.name).toEqual(product2.name);
    expect(response.data.getProducts[1]?.deprecated).toEqual(
      product2.deprecated
    );
    expect(response.data.getProducts[1]?.createdBy.id).toEqual(user.id);

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getProducts();

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });
});
