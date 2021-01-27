import rp from "request-promise";
import { CoreOptions } from "request";

import { User } from "../../src/modules/user";
import { UserResponse } from "../../src/modules/user/auth/UserResponse";

import { TestCase } from "../../src/modules/testCase";
import {
  TestCaseResponse,
  TestCasesResponse,
} from "../../src/modules/testCase/testCaseResolver/TestCaseResponse";
import { PaginatedTestCases } from "../../src/modules/testCase/testCaseResolver/get/responseTypes";
import {
  CreateTestCaseInput,
  CreateTestCasesInput,
} from "../../src/modules/testCase/testCaseResolver/create/inputTypes";
import { TestTestCaseInput } from "../../src/modules/testCase/testCaseResolver/test/inputTypes";
import {
  EditTestedTestCaseInput,
  EditUntestedTestCaseInput,
} from "../../src/modules/testCase/testCaseResolver/edit/inputTypes";

import { ProductMaster } from "../../src/modules/masters/product";
import { ProductMasterResponse } from "../../src/modules/masters/product/resolver/ProductMasterResponse";
import { CreateProductInput } from "../../src/modules/masters/product/resolver/create/inputTypes";

import { ModuleMaster } from "../../src/modules/masters/module";
import { ModuleMasterResponse } from "../../src/modules/masters/module/resolver/ModuleMasterResponse";
import {
  CreateModuleInput,
  EditModuleInput,
} from "../../src/modules/masters/module/resolver/create/inputTypes";

import { MenuMaster } from "../../src/modules/masters/menu";
import { MenuMasterResponse } from "../../src/modules/masters/menu/resolver/MenuMasterResponse";
import { CreateMenuInput } from "../../src/modules/masters/menu/resolver/create/inputTypes";
import {
  CreateTestingForInput,
  EditTestingForInput,
} from "../../src/modules/masters/testingFor/resolver/create/inputTypes";

import { TestingForMaster } from "../../src/modules/masters/testingFor";
import { TestingForMasterResponse } from "../../src/modules/masters/testingFor/resolver/TestingForMasterResponse";

import { TestingScopeMaster } from "../../src/modules/masters/testingScope";
import { TestingScopeMasterResponse } from "../../src/modules/masters/testingScope/resolver/TestingScopeMasterResponse";
import {
  CreateTestingScopeInput,
  EditTestingScopeInput,
} from "../../src/modules/masters/testingScope/resolver/create/inputTypes";

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
    data: { createTestCase: TestCaseResponse };
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
    data: { createTestCases: TestCasesResponse };
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
    data: { getTestCase: TestCase | undefined };
    errors: any[];
  }> {
    return rp.post(this.url, this.getOptions(queries.getGetTestCaseQuery(id)));
  }

  async getTestCases(
    limit: number,
    cursor?: string
  ): Promise<{
    data: { getTestCases: PaginatedTestCases };
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

  async deleteTestCase(
    id: string
  ): Promise<{
    data: { deleteTestCase: boolean };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getDeleteTestCaseMutation(id))
    );
  }

  async editUntestedTestCase(
    input: EditUntestedTestCaseInput
  ): Promise<{
    data: { editUntestedTestCase: TestCaseResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getEditUntestedTestCaseMutation(input))
    );
  }

  async editTestedTestCase(
    input: EditTestedTestCaseInput
  ): Promise<{
    data: { editTestedTestCase: TestCaseResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getEditTestedTestCaseMutation(input))
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

  async createMenu(
    input: CreateMenuInput
  ): Promise<{
    data: { createMenu: MenuMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getCreateMenuMutation(input))
    );
  }

  async getMenu(
    id: string
  ): Promise<{
    data: { getMenu: MenuMaster | null };
    errors: any[];
  }> {
    return rp.post(this.url, this.getOptions(queries.getGetMenuQuery(id)));
  }

  async getMenus(
    moduleId: string
  ): Promise<{
    data: { getMenus: MenuMaster[] };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getGetMenusQuery(moduleId))
    );
  }

  async editMenu(
    id: string,
    input: EditModuleInput
  ): Promise<{
    data: { editMenu: MenuMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getEditMenuMutation(id, input))
    );
  }

  async deleteMenu(
    id: string
  ): Promise<{
    data: { deleteMenu: boolean };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getDeleteMenuMutation(id))
    );
  }

  async createTestingFor(
    input: CreateTestingForInput
  ): Promise<{
    data: { createTestingFor: TestingForMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getCreateTestingForMutation(input))
    );
  }

  async getTestingFor(
    id: string
  ): Promise<{
    data: { getTestingFor: TestingForMaster | null };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getGetTestingForQuery(id))
    );
  }

  async getTestingFors(
    menuId: string
  ): Promise<{
    data: { getTestingFors: TestingForMaster[] };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getGetTestingForsQuery(menuId))
    );
  }

  async editTestingFor(
    id: string,
    input: EditTestingForInput
  ): Promise<{
    data: { editTestingFor: TestingForMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getEditTestingForMutation(id, input))
    );
  }

  async deleteTestingFor(
    id: string
  ): Promise<{
    data: { deleteTestingFor: boolean };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getDeleteTestingForMutation(id))
    );
  }

  async createTestingScope(
    input: CreateTestingScopeInput
  ): Promise<{
    data: { createTestingScope: TestingScopeMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getCreateTestingScopeMutation(input))
    );
  }

  async getTestingScope(
    id: string
  ): Promise<{
    data: { getTestingScope: TestingScopeMaster | null };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getGetTestingScopeQuery(id))
    );
  }

  async getTestingScopes(
    testingForId: string
  ): Promise<{
    data: { getTestingScopes: TestingScopeMaster[] };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getGetTestingScopesQuery(testingForId))
    );
  }

  async editTestingScope(
    id: string,
    input: EditTestingScopeInput
  ): Promise<{
    data: { editTestingScope: TestingScopeMasterResponse };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getEditTestingScopeMutation(id, input))
    );
  }

  async deleteTestingScope(
    id: string
  ): Promise<{
    data: { deleteTestingScope: boolean };
    errors: any[];
  }> {
    return rp.post(
      this.url,
      this.getOptions(queries.getDeleteTestingScopeMutation(id))
    );
  }
}
