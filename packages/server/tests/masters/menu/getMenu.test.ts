import { Connection } from "typeorm";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { ModuleMaster, MenuMaster } from "../../../src/modules/masters";

import { fakeData, TestClient } from "../../utils";

const {
  username: correctUsername,
  password: correctPassword,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user: User;
let myModule: ModuleMaster;
let menu: MenuMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create module to test on
  myModule = await ModuleMaster.create({
    ...fakeData.getModuleVals(),
    createdBy: user,
  }).save();

  // create menu to test on
  menu = await MenuMaster.create({
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

describe("Get a menu", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getMenu(menu.id);

    expect(response.data.getMenu?.code).toEqual(menu.code);
    expect(response.data.getMenu?.name).toEqual(menu.name);
    expect(response.data.getMenu?.deprecated).toEqual(menu.deprecated);
    expect(response.data.getMenu?.createdBy.id).toEqual(user.id);
    expect(response.data.getMenu?.module.id).toEqual(myModule.id);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getMenu("");

    expect(response.errors).toBeTruthy();
    expect(response.data.getMenu).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getMenu(menu.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getMenu).toBeNull();

    done();
  });
});
