import { Connection } from "typeorm";
import { internet, seed } from "faker";

import {
  getMinLenMessage,
  getMustNotContainMessage,
  getRequiredMessage,
  getUnavailableMessage,
  UserRoles,
} from "@portal/common";

import { User } from "../../../src/modules/user";
import { createTypeormConnection } from "../../../src/modules/shared/utils";

import { TestClient } from "../../utils";

seed(Date.now() + 0);
const correctUsername = internet.userName();
const correctPassword = internet.password(7);

const usernameForLogin = "username";
const passwordForLogin = internet.password(7);

let conn: Connection;
beforeAll(async (done) => {
  conn = await createTypeormConnection();

  await User.create({
    username: usernameForLogin,
    password: passwordForLogin,
    role: UserRoles.ADMIN,
  }).save();

  done();
});
afterAll(async (done) => {
  await conn.close();
  done();
});

describe("Register a user", () => {
  test("Check with correct credentials", async (done) => {
    const username = correctUsername;
    const password = correctPassword;

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(usernameForLogin, passwordForLogin);

    const response = await client.register(username, password);

    expect(response.data.register.errors).toBeNull();
    expect(response.data.register.user?.username).toEqual(username);
    expect(response.data.register.user?.password).toBeUndefined();

    const createdUser = await User.findOne({ where: { username } });

    if (!createdUser) {
      throw new Error("User was not created in the databse!");
    }

    expect(createdUser.password).not.toEqual(password);

    done();
  });

  test("Check for duplicate username", async (done) => {
    const username = correctUsername;
    const password = correctPassword;

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(usernameForLogin, passwordForLogin);

    const response = await client.register(username, password);

    expect(response.data.register.errors).toEqual([
      { field: "username", message: getUnavailableMessage("username") },
    ]);
    expect(response.data.register.user).toBeNull();

    done();
  });

  test("Check for username with @ symbol", async (done) => {
    const username = "abdad@";
    const password = correctPassword;

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(usernameForLogin, passwordForLogin);

    const response = await client.register(username, password);

    expect(response.data.register.errors).toEqual([
      { field: "username", message: getMustNotContainMessage("username", "@") },
    ]);
    expect(response.data.register.user).toBeNull();

    done();
  });

  test("Check with short/wrong credentials", async (done) => {
    const username = "ab";
    const password = "bd";

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(usernameForLogin, passwordForLogin);

    const response = await client.register(username, password);

    expect(response.data.register.errors).toEqual([
      { field: "username", message: getMinLenMessage("username") },
      { field: "password", message: getMinLenMessage("password") },
    ]);
    expect(response.data.register.user).toBeNull();

    done();
  });

  test("Check with missing credentials", async (done) => {
    const username = "";
    const password = "";

    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(usernameForLogin, passwordForLogin);

    const response = await client.register(username, password);

    expect(response.data.register.errors).toEqual([
      { field: "username", message: getRequiredMessage("username") },
      { field: "username", message: getMinLenMessage("username") },
      { field: "password", message: getRequiredMessage("password") },
      { field: "password", message: getMinLenMessage("password") },
    ]);
    expect(response.data.register.user).toBeNull();

    done();
  });
});
