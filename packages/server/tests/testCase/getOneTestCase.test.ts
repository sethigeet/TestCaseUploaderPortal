import { Connection } from "typeorm";
import { internet, seed } from "faker";

import { UserRoles } from "@portal/common";

import { User } from "../../src/modules/user";
import { createTypeormConnection } from "../../src/modules/shared/utils";

import { TestClient } from "../utils";
import { TestCase } from "../../src/modules/testCase";

const correctInput = {
  productCode: "PROD-1",
  moduleCode: "MOD-1",
  menuCode: "MEN-1",
  testingFor: "TFOR-1",
  testingScope: "TSCO-1",
  description: "This is a valid description for a test case!",
  expectedResult: "This should not expect any errors",
};

seed(Date.now());
const correctUsername1 = internet.userName();
const correctPassword1 = internet.password(7);

seed(Date.now() + 1);
const correctUsername2 = internet.userName();
const correctPassword2 = internet.password(7);

let conn: Connection;
let user1: User;
let user2: User;
let testCase1: TestCase;
let testCase2: TestCase;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create users to test on
  user1 = await User.create({
    username: correctUsername1,
    password: correctPassword1,
  }).save();
  user2 = await User.create({
    username: correctUsername2,
    password: correctPassword2,
    role: UserRoles.SUPERVISOR,
  }).save();

  // create test cases to test on
  testCase1 = await TestCase.create({
    ...correctInput,
    createdBy: user1,
  }).save();
  testCase2 = await TestCase.create({
    ...correctInput,
    createdBy: user2,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Get a test case", () => {
  test("Check with correct credentials and inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.getTestCase(testCase1.id);

    expect(response.data.getTestCase?.productCode).toEqual(
      correctInput.productCode
    );
    expect(response.data.getTestCase?.moduleCode).toEqual(
      correctInput.moduleCode
    );
    expect(response.data.getTestCase?.menuCode).toEqual(correctInput.menuCode);
    expect(response.data.getTestCase?.testingFor).toEqual(
      correctInput.testingFor
    );
    expect(response.data.getTestCase?.testingScope).toEqual(
      correctInput.testingScope
    );
    expect(response.data.getTestCase?.description).toEqual(
      correctInput.description
    );
    expect(response.data.getTestCase?.expectedResult).toEqual(
      correctInput.expectedResult
    );
    expect(response.data.getTestCase?.createdBy.id).toEqual(user1.id);

    done();
  });

  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.getTestCase(testCase1.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getTestCase).toBeNull();

    done();
  });

  test("Check with incorrect id", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.getTestCase("dfsgadgsd5d45d13asd1s");

    expect(response.data.getTestCase).toBeNull();

    done();
  });

  test("Check with incorrect credentials and insufficient permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.getTestCase(testCase2.id);

    expect(response.errors).toBeTruthy();
    expect(response.data.getTestCase).toBeNull();

    done();
  });

  test("Check with incorrect credentials but with supervisor permissions", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.getTestCase(testCase1.id);

    expect(response.data.getTestCase?.productCode).toEqual(
      correctInput.productCode
    );
    expect(response.data.getTestCase?.moduleCode).toEqual(
      correctInput.moduleCode
    );
    expect(response.data.getTestCase?.menuCode).toEqual(correctInput.menuCode);
    expect(response.data.getTestCase?.testingFor).toEqual(
      correctInput.testingFor
    );
    expect(response.data.getTestCase?.testingScope).toEqual(
      correctInput.testingScope
    );
    expect(response.data.getTestCase?.description).toEqual(
      correctInput.description
    );
    expect(response.data.getTestCase?.expectedResult).toEqual(
      correctInput.expectedResult
    );
    expect(response.data.getTestCase?.createdBy.id).toEqual(user1.id);

    done();
  });
  test("Check with incorrect credentials but with admin permissions", async (done) => {
    await User.update({ id: user2.id }, { role: UserRoles.ADMIN });

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.getTestCase(testCase1.id);

    expect(response.data.getTestCase?.productCode).toEqual(
      correctInput.productCode
    );
    expect(response.data.getTestCase?.moduleCode).toEqual(
      correctInput.moduleCode
    );
    expect(response.data.getTestCase?.menuCode).toEqual(correctInput.menuCode);
    expect(response.data.getTestCase?.testingFor).toEqual(
      correctInput.testingFor
    );
    expect(response.data.getTestCase?.testingScope).toEqual(
      correctInput.testingScope
    );
    expect(response.data.getTestCase?.description).toEqual(
      correctInput.description
    );
    expect(response.data.getTestCase?.expectedResult).toEqual(
      correctInput.expectedResult
    );
    expect(response.data.getTestCase?.createdBy.id).toEqual(user1.id);

    done();
  });
});
