import { Connection } from "typeorm";
import { internet, seed } from "faker";

import { User } from "../../../src/modules/user";
import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { ProductMaster } from "../../../src/modules/masters/product";

import { TestClient } from "../../utils";

seed(Date.now());
const correctUsername = internet.userName();
const correctPassword = internet.password(7);

let conn: Connection;
let user: User;
let product: ProductMaster;

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

    const response = await client.getProduct(product.id);

    expect(response.data.getProduct?.code).toEqual(product.code);
    expect(response.data.getProduct?.name).toEqual(product.name);
    expect(response.data.getProduct?.deprecated).toEqual(product.deprecated);
    expect(response.data.getProduct?.createdBy.id).toEqual(user.id);

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

    const response = await client.getProduct(product.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getProduct).toBeNull();

    done();
  });
});
