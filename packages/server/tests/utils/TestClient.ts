import rp from "request-promise";
import { CoreOptions } from "request";

import { UserResponse } from "../../src/modules/user/auth/UserResponse";
import { User } from "../../src/modules/user/userEntity";

import { TestCaseResponse } from "../../src/modules/testCase/testCaseResolver/TestCaseResponse";
import { CreateTestCaseInput } from "../../src/modules/testCase/testCaseResolver/create/inputTypes";
import { TestCase } from "../../src/modules/testCase/testCaseEntity";

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

  async createTestCase({
    productCode,
    moduleCode,
    menuCode,
    testingFor,
    testingScope,
    description,
    expectedResult,
  }: CreateTestCaseInput): Promise<{
    data: { createTestCase: TestCaseResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
createTestCase(
    input: {
      productCode: "${productCode}"
      moduleCode: "${moduleCode}"
      menuCode: "${menuCode}"
      testingFor: "${testingFor}"
      testingScope: "${testingScope}"
      description: "${description}"
      expectedResult: "${expectedResult}"
    }
  ) {
    errors {
      field
      message
    }
    testCase {
      id
      productCode
      moduleCode
      menuCode
      testingFor
      testingScope
      description
      expectedResult
      createdBy
    }
  }
}
`)
    );
  }

  async getTestCase(
    id: string
  ): Promise<{
    data: { getTestCase: TestCase | undefined };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
query {
  getTestCase(id: "${id}") {
    id
    productCode
    moduleCode
    menuCode
    testingFor
    testingScope
    description
    expectedResult
    createdBy
  }
}
`)
    );
  }

  async getTestCases(
    limit: number,
    cursor?: string
  ): Promise<{
    data: { getTestCases: { testCases: TestCase[]; hasMore: boolean } };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
query {
  getTestCases(limit: ${limit}${cursor ? `, cursor: "${cursor}"` : ""}) {
    testCases {
      id
      productCode
      moduleCode
      menuCode
      testingFor
      testingScope
      description
      expectedResult
      createdBy
      createdAt
    }
    hasMore
  }
}
`)
    );
  }

  async verifyTestCase(
    id: string
  ): Promise<{
    data: { verifyTestCase: boolean };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  verifyTestCase(id: "${id}") 
}
`)
    );
  }
}
