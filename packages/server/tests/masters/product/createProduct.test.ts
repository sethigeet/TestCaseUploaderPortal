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

const correctInput1 = {
  code: "PROD-1",
  name: "Product 1",
};
const correctInput2 = {
  code: "PROD-2",
  name: "Product 2",
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

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Create a product", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createProduct(input);

    expect(response.data.createProduct.errors).toBeNull();
    expect(response.data.createProduct.product?.code).toEqual(input.code);
    expect(response.data.createProduct.product?.name).toEqual(input.name);
    expect(response.data.createProduct.product?.modules).toBeNull();
    expect(response.data.createProduct.product?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.createProduct.product?.createdBy.id).toEqual(user.id);

    const createdProduct = await ProductMaster.findOne(
      response.data.createProduct.product?.id,
      { relations: ["createdBy"] }
    );

    if (!createdProduct) {
      throw new Error("Product was not created in the databse!");
    }

    expect(createdProduct.code).toEqual(input.code);
    expect(createdProduct.name).toEqual(input.name);
    expect(createdProduct.deprecated).toEqual(input.deprecated);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createProduct(input);

    expect(response.data.createProduct.errors).toBeNull();
    expect(response.data.createProduct.product?.code).toEqual(input.code);
    expect(response.data.createProduct.product?.name).toEqual(input.name);
    expect(response.data.createProduct.product?.deprecated).toEqual(false);
    expect(response.data.createProduct.product?.modules).toBeNull();
    expect(response.data.createProduct.product?.createdBy.id).toEqual(user.id);

    const createdProduct = await ProductMaster.findOne(
      response.data.createProduct.product?.id,
      { relations: ["createdBy"] }
    );

    if (!createdProduct) {
      throw new Error("Product was not created in the databse!");
    }

    expect(createdProduct.code).toEqual(input.code);
    expect(createdProduct.name).toEqual(input.name);
    expect(createdProduct.deprecated).toEqual(false);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createProduct(input);

    expect(response.errors).toBeUndefined();
    expect(response.data.createProduct.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.createProduct(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.createProduct(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.createProduct(input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.createProduct(input);

    expect(response.data.createProduct.errors).toEqual([
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.createProduct.product).toBeNull();

    done();
  });
});
