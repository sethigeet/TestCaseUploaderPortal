import rp from "request-promise";
import { CoreOptions } from "request";

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
import {
  CreateModuleInput,
  EditModuleInput,
} from "../../src/modules/masters/module/resolver/create/inputTypes";
import { ModuleMasterResponse } from "../../src/modules/masters/module/resolver/ModuleMasterResponse";

import * as queries from "./graphql";

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
      this.getOptions(queries.getRegisterMutation(username, password))
    );
  }

  async login(
    username: string,
    password: string
  ): Promise<{ data: { login: UserResponse } }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getLoginMutation(username, password))
    );
  }

  async me(): Promise<{ data: { me: User | undefined } }> {
    return rp.post(this.url, this.getOptions(queries.getMeQuery()));
  }

  async logout(): Promise<{ data: { logout: boolean } }> {
    return rp.post(this.url, this.getOptions(queries.getLogoutMutation()));
  }

  async logoutAllSessions(): Promise<{ data: { logoutAllSessions: boolean } }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getLogoutAllSessionsMutation())
    );
  }

  async createTestCase(
    input: CreateTestCaseInput
  ): Promise<{
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
      this.getOptions(queries.getCreateTestCaseMutation(input))
    );
  }

  async createTestCases(
    input: CreateTestCasesInput
  ): Promise<{
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
      this.getOptions(queries.getCreateTestCasesMutation(input))
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
    return rp.post(this.url, this.getOptions(queries.getGetTestCaseQuery(id)));
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
      this.getOptions(queries.getGetTestCasesQuery(limit, cursor))
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
      this.getOptions(queries.getVerifyTestCaseMutation(id))
    );
  }

  async testTestCase(
    input: TestTestCaseInput
  ): Promise<{
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
      this.getOptions(queries.getTestTestCaseMutation(input))
    );
  }

  async createProduct(
    input: CreateProductInput
  ): Promise<{
    data: { createProduct: ProductMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getCreateProductMutation(input))
    );
  }

  async getProduct(
    id: string
  ): Promise<{
    data: { getProduct: ProductMaster | null };
    errors: any[];
  }> {
    return rp.post(this.url, this.getOptions(queries.getGetProductQuery(id)));
  }

  async getProducts(): Promise<{
    data: { getProducts: ProductMaster[] };
    errors: any[];
  }> {
    return rp.post(this.url, this.getOptions(queries.getGetProductsQuery()));
  }

  async editProduct(
    id: string,
    input: CreateProductInput
  ): Promise<{
    data: { editProduct: ProductMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getEditProductMutation(id, input))
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
      this.getOptions(queries.getDeleteProductMutation(id))
    );
  }

  async createModule(
    input: CreateModuleInput
  ): Promise<{
    data: { createModule: ModuleMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getCreateModuleMutation(input))
    );
  }

  async getModule(
    id: string
  ): Promise<{
    data: { getModule: ModuleMaster | null };
    errors: any[];
  }> {
    return rp.post(this.url, this.getOptions(queries.getGetModuleQuery(id)));
  }

  async getModules(
    productId: string
  ): Promise<{
    data: { getModules: ModuleMaster[] };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getGetModulesQuery(productId))
    );
  }

  async editModule(
    id: string,
    input: EditModuleInput
  ): Promise<{
    data: { editModule: ModuleMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getEditModuleMutation(id, input))
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
      this.getOptions(queries.getDeleteModuleMutation(id))
    );
  }
}
