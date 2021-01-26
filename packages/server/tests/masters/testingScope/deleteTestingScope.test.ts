import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { ModuleMaster } from "../../../src/modules/masters/module";
import { TestingForMaster } from "../../../src/modules/masters/testingFor";
import {
  TestingScopeMaster,
  TestingScopeMasterHistory,
} from "../../../src/modules/masters/testingScope";

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
let testingScope: TestingScopeMaster;

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
  const testingFor = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
  }).save();

  // create testingFors to test on
  testingScope = await TestingScopeMaster.create({
    ...fakeData.getTestingScopeVals(),
    createdBy: user,
    testingFor,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Delete a testingScope", () => {
  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.deleteTestingScope(testingScope.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with tester permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.deleteTestingScope(testingScope.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with supervisor permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.deleteTestingScope(testingScope.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with admin permissions but with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteTestingScope("");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions but with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteTestingScope("dghsdja dsad  gd jdgjsd");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check with admin permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername3, correctPassword3);

    const response = await client.deleteTestingScope(testingScope.id);

    expect(response.data.deleteTestingScope).toEqual(true);

    const deletedModule = await ModuleMaster.findOne(testingScope.id);
    expect(deletedModule).toBeUndefined();

    const deletedTestingScopeInHistory = await TestingScopeMasterHistory.find({
      where: { pid: testingScope.id },
      relations: ["deletedBy"],
    });

    if (!deletedTestingScopeInHistory) {
      throw new Error("TestingScope was not created in the history!");
    }

    expect(deletedTestingScopeInHistory[1].deletedAt).toBeTruthy();
    expect(deletedTestingScopeInHistory[1].deletedBy.id).toEqual(user.id);

    done();
  });
});
