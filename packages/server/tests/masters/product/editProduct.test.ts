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

const correctInput1 = fakeData.getNewProductVals();
const correctInput2 = fakeData.getNewProductVals();

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
let product1: ProductMaster;
let product2: ProductMaster;

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

  // create products to test on
  product1 = await ProductMaster.create({
    ...fakeData.getProductVals(),
    createdBy: user,
  }).save();
  product2 = await ProductMaster.create({
    ...fakeData.getProductVals(),
    createdBy: user,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Edit a product", () => {
  test("Check with correct and all inputs", async (done) => {
    const input = { ...correctInput1, deprecated: true };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editProduct(product1.id, input);

    expect(response.data.editProduct.errors).toBeNull();
    expect(response.data.editProduct.product?.code).toEqual(input.code);
    expect(response.data.editProduct.product?.name).toEqual(input.name);
    expect(response.data.editProduct.product?.modules).toEqual([]);
    expect(response.data.editProduct.product?.deprecated).toEqual(
      input.deprecated
    );
    expect(response.data.editProduct.product?.updatedBy.id).toEqual(user.id);

    const editedProduct = await ProductMaster.findOne(
      response.data.editProduct.product?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedProduct) {
      throw new Error("Product was not created in the databse!");
    }

    expect(editedProduct.code).toEqual(input.code);
    expect(editedProduct.name).toEqual(input.name);
    expect(editedProduct.deprecated).toEqual(input.deprecated);
    expect(editedProduct.updatedBy.id).toEqual(user.id);

    const editedProductInHistory = await ProductMasterHistory.find({
      where: { pid: response.data.editProduct.product?.id },
      relations: ["updatedBy"],
    });

    if (!editedProductInHistory) {
      throw new Error("Product was not created in the history!");
    }

    expect(editedProductInHistory[1].code).toEqual(input.code);
    expect(editedProductInHistory[1].name).toEqual(input.name);
    expect(editedProductInHistory[1].deprecated).toEqual(input.deprecated);
    expect(editedProductInHistory[1].updatedAt).toBeTruthy();
    expect(editedProductInHistory[1].updatedBy.id).toEqual(user.id);

    done();
  });

  test("Check with correct but without optional inputs", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editProduct(product1.id, input);

    expect(response.data.editProduct.errors).toBeNull();
    expect(response.data.editProduct.product?.code).toEqual(input.code);
    expect(response.data.editProduct.product?.name).toEqual(input.name);
    expect(response.data.editProduct.product?.deprecated).toEqual(true);
    expect(response.data.editProduct.product?.modules).toEqual([]);
    expect(response.data.editProduct.product?.updatedBy.id).toEqual(user.id);

    const editedProduct = await ProductMaster.findOne(
      response.data.editProduct.product?.id,
      { relations: ["updatedBy"] }
    );

    if (!editedProduct) {
      throw new Error("Product was not created in the databse!");
    }

    expect(editedProduct.code).toEqual(input.code);
    expect(editedProduct.name).toEqual(input.name);
    expect(editedProduct.deprecated).toEqual(true);
    expect(editedProduct.updatedBy.id).toEqual(user.id);

    const editedProductInHistory = await ProductMasterHistory.find({
      where: { pid: response.data.editProduct.product?.id },
      relations: ["updatedBy"],
    });

    if (!editedProductInHistory) {
      throw new Error("Product was not created in the history!");
    }

    expect(editedProductInHistory[2].code).toEqual(input.code);
    expect(editedProductInHistory[2].name).toEqual(input.name);
    expect(editedProductInHistory[2].deprecated).toEqual(true);
    expect(editedProductInHistory[2].updatedAt).toBeTruthy();
    expect(editedProductInHistory[2].updatedBy.id).toEqual(user.id);

    done();
  });

  test("Check for duplicate code", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editProduct(product2.id, input);

    expect(response.data.editProduct.errors).toEqual([
      { field: "code", message: getUnavailableMessage("code") },
    ]);

    done();
  });

  test("Check without logging in", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.editProduct(product1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.editProduct(product1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const input = { ...correctInput1 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.editProduct(product1.id, input);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with missing id", async (done) => {
    const input = { ...correctInput2 };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editProduct("", input);

    expect(response.data.editProduct.errors).toEqual([
      { field: "id", message: getRequiredMessage("id") },
    ]);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const input = { code: "", name: "" };

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.editProduct(product1.id, input);

    expect(response.data.editProduct.errors).toEqual([
      { field: "code", message: getRequiredMessage("code") },
      { field: "name", message: getRequiredMessage("name") },
    ]);
    expect(response.data.editProduct.product).toBeNull();

    done();
  });
});
