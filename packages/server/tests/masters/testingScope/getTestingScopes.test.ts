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
let testingScope1: TestingScopeMaster;
let testingScope2: TestingScopeMaster;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  user = await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  // create products to test on
  testingFor = await TestingForMaster.create({
    ...fakeData.getTestingForVals(),
    createdBy: user,
  }).save();

  // create modules to test on
  testingScope1 = await TestingScopeMaster.create({
    ...fakeData.getTestingScopeVals(),
    createdBy: user,
    testingFor,
  }).save();
  testingScope2 = await TestingScopeMaster.create({
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

describe("Get many testingScopes", () => {
  test("Check with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingScopes(testingFor.id);

    expect(response.data.getTestingScopes[0]?.code).toEqual(testingScope2.code);
    expect(response.data.getTestingScopes[0]?.name).toEqual(testingScope2.name);
    expect(response.data.getTestingScopes[0]?.deprecated).toEqual(
      testingScope2.deprecated
    );
    expect(response.data.getTestingScopes[0]?.createdBy.id).toEqual(user.id);
    expect(response.data.getTestingScopes[0]?.testingFor.id).toEqual(
      testingFor.id
    );

    expect(response.data.getTestingScopes[1]?.code).toEqual(testingScope1.code);
    expect(response.data.getTestingScopes[1]?.name).toEqual(testingScope1.name);
    expect(response.data.getTestingScopes[1]?.deprecated).toEqual(
      testingScope1.deprecated
    );
    expect(response.data.getTestingScopes[1]?.createdBy.id).toEqual(user.id);
    expect(response.data.getTestingScopes[1]?.testingFor.id).toEqual(
      testingFor.id
    );

    done();
  });

  test("Check with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingScopes("");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername, correctPassword);

    const response = await client.getTestingScopes("dasgdshadg");

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getTestingScopes(testingFor.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });
});
