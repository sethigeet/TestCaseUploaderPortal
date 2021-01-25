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
    ...fakeData.getProductVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  myModule = await ModuleMaster.create({
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

    const response = await client.getModule("");

    expect(response.errors).toBeTruthy();
    expect(response.data.getModule).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getModule(myModule.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getModule).toBeNull();

    done();
  });
});
