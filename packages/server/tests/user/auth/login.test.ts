import { Connection } from "typeorm";
import { internet, seed } from "faker";

import {
  getDoesNotExistMessage,
  getIncorrectPasswordMessage,
  getRequiredMessage,
} from "@portal/common";

import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { User } from "../../../src/modules/user";

import { TestClient } from "../../utils";

seed(Date.now() + 2);
const correctUsername = internet.userName();
const correctPassword = internet.password(7);

let conn: Connection;

beforeAll(async (done) => {
  conn = await createTypeormConnection();

  done();
});

afterAll(async (done) => {
  await conn.close();

  done();
});

describe("Login a user", () => {
  test("Check with a username that is not registered", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const username = "dsahddsa";
    const password = correctPassword;

    const response = await client.login(username, password);

    expect(response.data.login.errors).toEqual([
      {
        field: "username",
        message: getDoesNotExistMessage("username"),
      },
    ]);
    expect(response.data.login.user).toBeNull();

    done();
  });

  test("Check with a correct username but wrong password", async (done) => {
    // Register the user before running further tests
    await User.create({
      username: correctUsername,
      password: correctPassword,
    }).save();

    // -----------------------------------------------

    const client = new TestClient(process.env.TEST_HOST as string);

    const username = correctUsername;
    const password = "dasgdjga";

    const response = await client.login(username, password);

    expect(response.data.login.errors).toEqual([
      { field: "password", message: getIncorrectPasswordMessage() },
    ]);
    expect(response.data.login.user).toBeNull();

    done();
  });

  test("Check with missing credentials", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const username = "";
    const password = "";

    const response = await client.login(username, password);

    expect(response.data.login.errors).toEqual([
      {
        field: "username",
        message: getRequiredMessage("username"),
      },
      { field: "password", message: getRequiredMessage("password") },
    ]);
    expect(response.data.login.user).toBeNull();

    done();
  });

  test("Check with a correct username and correct passowrd", async (done) => {
    const client = new TestClient(process.env.TEST_HOST as string);

    const username = correctUsername;
    const password = correctPassword;

    const response = await client.login(username, password);

    expect(response.data.login.errors).toBeNull();
    expect(response.data.login.user?.username).toEqual(username);
    expect(response.data.login.user?.password).toBeUndefined();

    done();
  });
});
