import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import {
  MenuMaster,
  TestingForMaster,
  TestingForMasterHistory,
} from "../../../src/modules/masters";

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
let testingFor: TestingForMaster;

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

  // create menus to test on
  const menu = await MenuMaster.create({
    ...fakeData.getMenuVals(),
    createdBy: user,
  }).save();

  // create testingFors to test on
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

describe("Delete a testingFor", () => {
  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.deleteTestingFor(testingFor.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.deleteTestingFor(testingFor.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.deleteTestingFor(testingFor.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with admin permissions but with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteTestingFor("");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions but with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteTestingFor("dghsdja dsad  gd jdgjsd");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteTestingFor(testingFor.id);

    expect(response.data.deleteTestingFor).toEqual(true);

    const deletedTestingFor = await TestingForMaster.findOne(testingFor.id);
    expect(deletedTestingFor).toBeUndefined();

    const deletedTestingForInHistory = await TestingForMasterHistory.find({
      where: { pid: testingFor.id },
      relations: ["deletedBy"],
    });

    if (!deletedTestingForInHistory) {
      throw new Error("TestingFor was not created in the history!");
    }

    expect(deletedTestingForInHistory[1].deletedAt).toBeTruthy();
    expect(deletedTestingForInHistory[1].deletedBy?.id).toEqual(user.id);

    done();
  });
});
