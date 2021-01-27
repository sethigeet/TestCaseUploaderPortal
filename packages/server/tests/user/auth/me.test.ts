import { Connection } from "typeorm";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";

import { fakeData, TestClient } from "../../utils";

const {
  username: correctUsername,
  password: correctPassword,
} = fakeData.getFakeUserCreds();

let conn: Connection;

beforeAll(async (done) => {
  // create the connection to the db
  conn = await createTypeormConnection();

  // create a user to test on
  await User.create({
    username: correctUsername,
    password: correctPassword,
  }).save();

  done();
});

afterAll(async (done) => {
  // close the connection to the db
  await conn.close();

  done();
});

describe("Check the me query", () => {
  test("Check without loggin in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const response = await client.me();

    expect(response.data.me).toBeNull();

    done();
  });

  test("Check after loggin in", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    // Login the user before running further tests
    await client.login(correctUsername, correctPassword);

    // -----------------------------------------------

    const response = await client.me();
    expect(response.data.me).toBeTruthy();

    done();
  });
});
