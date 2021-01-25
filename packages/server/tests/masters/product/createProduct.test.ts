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
  ProductMasterHistory,
} from "../../../src/modules/masters/product";

import { fakeData, TestClient } from "../../utils";

const correctInput1 = fakeData.getProductVals();
const correctInput2 = fakeData.getProductVals();

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
    expect(createdProduct.createdBy.id).toEqual(user.id);

    const createdProductInHistory = await ProductMasterHistory.findOne({
      where: { pid: response.data.createProduct.product?.id },
      relations: ["createdBy"],
    });

    if (!createdProductInHistory) {
      throw new Error("Product was not created in the history!");
    }

    expect(createdProductInHistory.code).toEqual(input.code);
    expect(createdProductInHistory.name).toEqual(input.name);
    expect(createdProductInHistory.deprecated).toEqual(input.deprecated);
    expect(createdProductInHistory.createdAt).toBeTruthy();
    expect(createdProductInHistory.createdBy.id).toEqual(user.id);

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
    expect(createdProduct.createdBy.id).toEqual(user.id);

    const createdProductInHistory = await ProductMasterHistory.findOne({
      where: { pid: response.data.createProduct.product?.id },
      relations: ["createdBy"],
    });

    if (!createdProductInHistory) {
      throw new Error("Product was not created in the history!");
    }

    expect(createdProductInHistory.code).toEqual(input.code);
    expect(createdProductInHistory.name).toEqual(input.name);
    expect(createdProductInHistory.deprecated).toEqual(false);
    expect(createdProductInHistory.createdAt).toBeTruthy();
    expect(createdProductInHistory.createdBy.id).toEqual(user.id);

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
