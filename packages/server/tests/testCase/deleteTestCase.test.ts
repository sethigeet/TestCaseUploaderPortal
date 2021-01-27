import { Connection } from "typeorm";

import { UserRoles } from "@portal/common";

import { createTypeormConnection } from "../../src/modules/shared/utils";

import { User } from "../../src/modules/user";
import { TestCase, TestCaseHistory } from "../../src/modules/testCase";

import { fakeData, TestClient } from "../utils";

const {
  username: correctUsername1,
  password: correctPassword1,
} = fakeData.getFakeUserCreds();
const {
  username: correctUsername2,
  password: correctPassword2,
} = fakeData.getFakeUserCreds();

let conn: Connection;
let user: User;
let testCase: TestCase;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  await User.create({
    username: correctUsername1,
    password: correctPassword1,
  }).save();
  user = await User.create({
    username: correctUsername2,
    password: correctPassword2,
    role: UserRoles.SUPERVISOR,
  }).save();

  // create products to test on
  testCase = await TestCase.create({
    ...fakeData.getTestCaseVals(),
    createdBy: user,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Delete a product", () => {
  test("Check without logging in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.deleteTestCase(testCase.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check on someone else's test", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername1, correctPassword1);

    const response = await client.deleteTestCase(testCase.id);

    expect(response.errors).toBeTruthy();
    expect(response.data).toBeNull();

    done();
  });

  test("Check on you own test but with missing inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.deleteTestCase("");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check on you own test but with incorrect inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.deleteTestCase("dhsjadgsa dskagd shkad");

    expect(response.errors).toBeTruthy();

    done();
  });

  test("Check on your own test with correct inputs", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(correctUsername2, correctPassword2);

    const response = await client.deleteTestCase(testCase.id);

    expect(response.data.deleteTestCase).toEqual(true);

    const deletedProduct = await TestCase.findOne(testCase.id);
    expect(deletedProduct).toBeUndefined();

    const deletedProductInHistory = await TestCaseHistory.find({
      where: { tsid: testCase.id },
      relations: ["deletedBy"],
    });

    if (!deletedProductInHistory) {
      throw new Error("TestCase was not created in the history!");
    }

    expect(deletedProductInHistory[1].deletedAt).toBeTruthy();
    expect(deletedProductInHistory[1].deletedBy?.id).toEqual(user.id);

    done();
  });
});
