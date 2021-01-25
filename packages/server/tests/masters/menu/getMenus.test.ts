import { Connection } from "typeorm";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { ModuleMaster } from "../../../src/modules/masters/module";
import { MenuMaster } from "../../../src/modules/masters/menu";

import { fakeData, TestClient } from "../../utils";

const {
  username: correctUsername,
  password: correctPassword,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user: User;
let myModule: ModuleMaster;
let menu1: MenuMaster;
let menu2: MenuMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create products to test on
  myModule = await ModuleMaster.create({
    ...fakeData.getModuleVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  menu1 = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
    module: myModule,
  }).save();
  menu2 = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
    module: myModule,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Get many menu", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getMenus(myModule.id);

    expect(response.data.getMenus[0]?.code).toEqual(menu2.code);
    expect(response.data.getMenus[0]?.name).toEqual(menu2.name);
    expect(response.data.getMenus[0]?.deprecated).toEqual(menu2.deprecated);
    expect(response.data.getMenus[0]?.createdBy.id).toEqual(user.id);
    expect(response.data.getMenus[0]?.module.id).toEqual(myModule.id);

    expect(response.data.getMenus[1]?.code).toEqual(menu1.code);
    expect(response.data.getMenus[1]?.name).toEqual(menu1.name);
    expect(response.data.getMenus[1]?.deprecated).toEqual(menu1.deprecated);
    expect(response.data.getMenus[1]?.createdBy.id).toEqual(user.id);
    expect(response.data.getMenus[1]?.module.id).toEqual(myModule.id);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getMenus("");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getMenus("dasgdshadg");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getMenus(myModule.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });
});
