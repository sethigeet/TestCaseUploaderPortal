import rp from "request-promise";
import { CoreOptions } from "request";

import { UserResponse } from "../../../src/modules/user/auth/UserResponse";
import { User } from "../../../src/modules/user/userEntity";

export class TestClient {
  url: string;
  jar: ReturnType<typeof rp.jar>;

  constructor(url: string) {
    this.url = url;
    this.jar = rp.jar();
  }

  getOptions(query: string): CoreOptions {
    return {
      json: true,
      jar: this.jar,
      withCredentials: true,
      body: {
        query,
      },
    };
  }

  async register(
    username: string,
    password: string
  ): Promise<{ data: { register: UserResponse } }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  register(credentials: {username: "${username}", password: "${password}"}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`)
    );
  }

  async login(
    username: string,
    password: string
  ): Promise<{ data: { login: UserResponse } }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  login(credentials: {username: "${username}", password: "${password}"}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`)
    );
  }

  async me(): Promise<{ data: { me: User | undefined } }> {
    return rp.post(
      this.url,
      this.getOptions(`
query {
  me {
    id
    username
  }
}
`)
    );
  }

  async logout(): Promise<{ data: { logout: boolean } }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  logout 
}
`)
    );
  }

  async logoutAllSessions(): Promise<{ data: { logoutAllSessions: boolean } }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  logoutAllSessions
}
`)
    );
  }
}
