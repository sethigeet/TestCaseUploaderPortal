import rp from "request-promise";
import { CoreOptions } from "request";
import { inspect } from "util";

import { FieldError } from "../../src/modules/shared/responseTypes";

import { UserResponse } from "../../src/modules/user/auth/UserResponse";
import { User } from "../../src/modules/user";

import {
  CreateTestCaseInput,
  CreateTestCasesInput,
} from "../../src/modules/testCase/testCaseResolver/create/inputTypes";
import { TestCase } from "../../src/modules/testCase";
import { TestTestCaseInput } from "../../src/modules/testCase/testCaseResolver/test/inputTypes";

import { ProductMaster } from "../../src/modules/masters/product";
import { CreateProductInput } from "../../src/modules/masters/product/resolver/create/inputTypes";
import { ProductMasterResponse } from "../../src/modules/masters/product/resolver/ProductMasterResponse";

import { ModuleMaster } from "../../src/modules/masters/module";
import { CreateModuleInput } from "../../src/modules/masters/module/resolver/create/inputTypes";
import { ModuleMasterResponse } from "../../src/modules/masters/module/resolver/ModuleMasterResponse";

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

  async createProduct({
    code,
    name,
    deprecated,
  }: CreateProductInput): Promise<{
    data: { createProduct: ProductMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  createProduct(
    input: {
      code: "${code}"
      name: "${name}"
      ${deprecated ? `deprecated: ${deprecated}` : ""}
    }
  ) {
    errors {
      field
      message
    }
    product {
      id
      code
      name
      deprecated
      createdBy {
        id
      }
      modules {
        id
      }
    }
  }
}
`)
    );
  }

  async getProduct(
    id: string
  ): Promise<{
    data: { getProduct: ProductMaster | null };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
query {
  getProduct(id: "${id}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
  }
}
`)
    );
  }

  async getProducts(): Promise<{
    data: { getProducts: ProductMaster[] };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
query {
  getProducts {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
  }
}
`)
    );
  }

  async editProduct(
    id: string,
    { code, name, deprecated }: CreateProductInput
  ): Promise<{
    data: { editProduct: ProductMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  editProduct(
    id: "${id}"
    input: {
      code: "${code}"
      name: "${name}"
      ${deprecated ? `deprecated: ${deprecated}` : ""}
    }
  ) {
    errors {
      field
      message
    }
    product {
      id
      code
      name
      deprecated
      updatedBy {
        id
      }
      modules {
        id
      }
    }
  }
}
`)
    );
  }

  async deleteProduct(
    id: string
  ): Promise<{
    data: { deleteProduct: boolean };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  deleteProduct(id: "${id}")
}
`)
    );
  }

  async createModule({
    productId,
    code,
    name,
    deprecated,
  }: CreateModuleInput): Promise<{
    data: { createModule: ModuleMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  createModule(
    input: {
      productId: "${productId}"
      code: "${code}"
      name: "${name}"
      ${deprecated ? `deprecated: ${deprecated}` : ""}
    }
  ) {
    errors {
      field
      message
    }
    module {
      id
      code
      name
      deprecated
      createdBy {
        id
      }
      product {
        id
      }
    }
  }
}
`)
    );
  }

  async getModule(
    id: string
  ): Promise<{
    data: { getModule: ModuleMaster | null };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
query {
  getModule(id: "${id}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
    product {
      id
    }
  }
}
`)
    );
  }

  async getModules(
    productId: string
  ): Promise<{
    data: { getModules: ModuleMaster[] };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
query {
  getModules(productId: "${productId}") {
    id
    code
    name
    deprecated
    createdBy {
      id
    }
    product {
      id
    }
  }
}
`)
    );
  }

  async editModule(
    id: string,
    { code, name, deprecated }: CreateProductInput
  ): Promise<{
    data: { editModule: ModuleMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  editModule(
    id: "${id}"
    input: {
      code: "${code}"
      name: "${name}"
      ${deprecated ? `deprecated: ${deprecated}` : ""}
    }
  ) {
    errors {
      field
      message
    }
    module {
      id
      code
      name
      deprecated
      createdBy {
        id
      }
      updatedBy {
        id
      }
      product {
        id
      }
    }
  }
}
`)
    );
  }

  async deleteModule(
    id: string
  ): Promise<{
    data: { deleteModule: boolean };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(`
mutation {
  deleteModule(id: "${id}")
}
`)
    );
  }
}
