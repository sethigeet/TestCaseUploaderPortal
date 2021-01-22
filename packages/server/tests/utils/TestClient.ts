import rp from "request-promise";
import { CoreOptions } from "request";
import { inspect } from "util";

import { UserResponse } from "../../src/modules/user/auth/UserResponse";
import { User } from "../../src/modules/user";

import {
  CreateTestCaseInput,
  CreateTestCasesInput,
} from "../../src/modules/testCase/testCaseResolver/create/inputTypes";
import { TestCase } from "../../src/modules/testCase";
import { FieldError } from "../../src/modules/shared/responseTypes";

import { TestTestCaseInput } from "../../src/modules/testCase/testCaseResolver/test/inputTypes";

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
    case: { description, expectedResult },
  }: CreateTestCaseInput): Promise<{
    data: {
      createTestCase: {
        errors?: FieldError[];
        testCase?: TestCase & { createdBy: User; updatedBy: User | undefined };
      };
    };
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
      case: {
        description: "${description}"
        expectedResult: "${expectedResult}"
      }
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
      createdBy {
        id
      }
    }
  }
}
`)
    );
  }

  async createTestCases({
    productCode,
    moduleCode,
    menuCode,
    testingFor,
    testingScope,
    cases,
  }: CreateTestCasesInput): Promise<{
    data: {
      createTestCases: {
        errors?: FieldError[];
        testCases?: (TestCase & {
          createdBy: User;
          updatedBy: User | undefined;
        })[];
      };
    };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
createTestCases(
    input: {
      productCode: "${productCode}"
      moduleCode: "${moduleCode}"
      menuCode: "${menuCode}"
      testingFor: "${testingFor}"
      testingScope: "${testingScope}"
      cases: ${inspect(cases).replace(/'/g, '"')}
    }
  ) {
    errors {
      field
      message
    }
    testCases {
      id
      productCode
      moduleCode
      menuCode
      testingFor
      testingScope
      description
      expectedResult
      createdBy {
        id
      }
    }
  }
}
`)
    );
  }

  async getTestCase(
    id: string
  ): Promise<{
    data: {
      getTestCase:
        | (TestCase & { createdBy: User; updatedBy: User | undefined })
        | undefined;
    };
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
    createdBy {
      id
    }
  }
}
`)
    );
  }

  async getTestCases(
    limit: number,
    cursor?: string
  ): Promise<{
    data: {
      getTestCases: {
        testCases: (TestCase & {
          createdBy: User;
          updatedBy: User | undefined;
        })[];
        hasMore: boolean;
      };
    };
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
      createdBy {
        id
      }
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

  async testTestCase({
    id,
    passed,
    actualResult,
    userRemarks,
  }: TestTestCaseInput): Promise<{
    data: {
      testTestCase: TestCase & {
        createdBy: User;
        updatedBy: User | undefined;
      };
    };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  testTestCase(
    input: {
      id: "${id}"
      passed: ${passed}
      actualResult: "${actualResult}"
      userRemarks: "${userRemarks}"
    }
  ) {
    id
    passed
    actualResult
    userRemarks
  }
}
`)
    );
  }
}
