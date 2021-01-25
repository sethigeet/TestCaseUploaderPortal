import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import {
  ProductMaster,
  ProductMasterHistory,
} from "../../../src/modules/masters/product";

import { fakeData, TestClient } from "../../utils";

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

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  await User.create({
    username: correctUsername1,
    password: correctPassword1,
  }).save();
  await User.create({
    username: correctUsername2,
    password: correctPassword2,
    role: UserRoles.SUPERVISOR,
  }).save();
  user = await User.create({
    username: correctUsername3,
    password: correctPassword3,
    role: UserRoles.ADMIN,
  }).save();

  // create products to test on
  product = await ProductMaster.create({
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

describe("Delete a product", () => {
  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.deleteProduct(product.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.deleteProduct(product.id);
    await client.login(correctUsername1, correctPassword1);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.deleteProduct(product.id);
    await client.login(correctUsername2, correctPassword2);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with admin permissions but with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteProduct("");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions but with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteProduct("dhsjadgsa dskagd shkad");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteProduct(product.id);

    expect(response.data.deleteProduct).toEqual(true);

    const deletedProduct = await ProductMaster.findOne(product.id);
    expect(deletedProduct).toBeUndefined();

    const deletedProductInHistory = await ProductMasterHistory.find({
      where: { pid: product.id },
      relations: ["deletedBy"],
    });

    if (!deletedProductInHistory) {
      throw new Error("Product was not created in the history!");
    }

    expect(deletedProductInHistory[1].deletedAt).toBeTruthy();
    expect(deletedProductInHistory[1].deletedBy.id).toEqual(user.id);

    done();
  });
});
