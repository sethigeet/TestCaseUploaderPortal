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
let testingFor: TestingForMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create module to test on
  menu = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
  }).save();

  // create menu to test on
  testingFor = await TestingForMaster.create({
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

describe("Get a testingFor", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingFor(testingFor.id);

    expect(response.data.getTestingFor?.code).toEqual(testingFor.code);
    expect(response.data.getTestingFor?.name).toEqual(testingFor.name);
    expect(response.data.getTestingFor?.deprecated).toEqual(
      testingFor.deprecated
    );
    expect(response.data.getTestingFor?.createdBy.id).toEqual(user.id);
    expect(response.data.getTestingFor?.menu.id).toEqual(menu.id);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingFor("");

    expect(response.errors).toBeTruthy();
    expect(response.data.getTestingFor).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getTestingFor(testingFor.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getTestingFor).toBeNull();

    done();
  });
});
