import { Connection } from "typeorm";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";
import { TestingForMaster } from "../../../src/modules/masters/testingFor";
import { TestingScopeMaster } from "../../../src/modules/masters/testingScope";

import { fakeData, TestClient } from "../../utils";

const {
  username: correctUsername,
  password: correctPassword,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user: User;
let testingFor: TestingForMaster;
let testingScope: TestingScopeMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create module to test on
  testingFor = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
  }).save();

  // create menu to test on
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

describe("Get a testingScope", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingScope(testingScope.id);

    expect(response.data.getTestingScope?.code).toEqual(testingScope.code);
    expect(response.data.getTestingScope?.name).toEqual(testingScope.name);
    expect(response.data.getTestingScope?.deprecated).toEqual(
      testingScope.deprecated
    );
    expect(response.data.getTestingScope?.createdBy.id).toEqual(user.id);
    expect(response.data.getTestingScope?.testingFor.id).toEqual(testingFor.id);

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingScope("");

    expect(response.errors).toBeTruthy();
    expect(response.data.getTestingScope).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getTestingScope(testingScope.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getTestingScope).toBeNull();

    done();
  });
});
