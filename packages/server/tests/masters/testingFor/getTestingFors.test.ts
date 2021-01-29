import { Connection } from "typeorm";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { MenuMaster, TestingForMaster } from "../../../src/modules/masters";

import { fakeData, TestClient } from "../../utils";

const {
  username: correctUsername,
  password: correctPassword,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user: User;
let menu: MenuMaster;
let testingFor1: TestingForMaster;
let testingFor2: TestingForMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create products to test on
  menu = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  testingFor1 = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
    menu,
  }).save();
  testingFor2 = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
    menu,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Get many testingFors", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingFors(menu.id);

    expect(response.data.getTestingFors[0]?.code).toEqual(testingFor2.code);
    expect(response.data.getTestingFors[0]?.name).toEqual(testingFor2.name);
    expect(response.data.getTestingFors[0]?.deprecated).toEqual(
      testingFor2.deprecated
    );
    expect(response.data.getTestingFors[0]?.createdBy.id).toEqual(user.id);
    expect(response.data.getTestingFors[0]?.menu.id).toEqual(menu.id);

    expect(response.data.getTestingFors[1]?.code).toEqual(testingFor1.code);
    expect(response.data.getTestingFors[1]?.name).toEqual(testingFor1.name);
    expect(response.data.getTestingFors[1]?.deprecated).toEqual(
      testingFor1.deprecated
    );
    expect(response.data.getTestingFors[1]?.createdBy.id).toEqual(user.id);
    expect(response.data.getTestingFors[1]?.menu.id).toEqual(menu.id);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingFors("");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingFors("dasgdshadg");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getTestingFors(menu.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });
});
