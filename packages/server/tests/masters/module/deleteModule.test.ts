import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { ProductMaster } from "../../../src/modules/masters/product";
import {
  ModuleMaster,
  ModuleMasterHistory,
} from "../../../src/modules/masters/module";

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
let myModule: ModuleMaster;

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
  const product = await ProductMaster.create({
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

describe("Delete a module", () => {
  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.deleteModule(myModule.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.deleteModule(myModule.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.deleteModule(myModule.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with admin permissions but with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteModule("");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions but with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteModule("dghsdja dsad  gd jdgjsd");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteModule(myModule.id);

    expect(response.data.deleteModule).toEqual(true);

    const deletedModule = await ModuleMaster.findOne(myModule.id);
    expect(deletedModule).toBeUndefined();

    const deletedModuleInHistory = await ModuleMasterHistory.find({
      where: { pid: myModule.id },
      relations: ["deletedBy"],
    });

    if (!deletedModuleInHistory) {
      throw new Error("Module was not created in the history!");
    }

    expect(deletedModuleInHistory[1].deletedAt).toBeTruthy();
    expect(deletedModuleInHistory[1].deletedBy.id).toEqual(user.id);

    done();
  });
});
