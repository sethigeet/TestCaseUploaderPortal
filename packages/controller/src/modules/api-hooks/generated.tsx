import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getTestingScope?: Maybe<TestingScopeMaster>;
  getTestingScopes: Array<TestingScopeMaster>;
  getTestingFor?: Maybe<TestingForMaster>;
  getTestingFors: Array<TestingForMaster>;
  getMenu?: Maybe<MenuMaster>;
  getMenus: Array<MenuMaster>;
  getModule?: Maybe<ModuleMaster>;
  getModules: Array<ModuleMaster>;
  getProduct?: Maybe<ProductMaster>;
  getProducts: Array<ProductMaster>;
  getTestCase?: Maybe<TestCase>;
  getTestCases: PaginatedTestCases;
  me?: Maybe<User>;
};


export type QueryGetTestingScopeArgs = {
  id: Scalars['String'];
};


export type QueryGetTestingScopesArgs = {
  testingForId: Scalars['String'];
};


export type QueryGetTestingForArgs = {
  id: Scalars['String'];
};


export type QueryGetTestingForsArgs = {
  menuId: Scalars['String'];
};


export type QueryGetMenuArgs = {
  id: Scalars['String'];
};


export type QueryGetMenusArgs = {
  moduleId: Scalars['String'];
};


export type QueryGetModuleArgs = {
  id: Scalars['String'];
};


export type QueryGetModulesArgs = {
  productId: Scalars['String'];
};


export type QueryGetProductArgs = {
  id: Scalars['String'];
};


export type QueryGetTestCaseArgs = {
  id: Scalars['String'];
};


export type QueryGetTestCasesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type TestingScopeMaster = {
  __typename?: 'TestingScopeMaster';
  id: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated: Scalars['Boolean'];
  createdAt: Scalars['String'];
  createdBy: User;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
  testingFor: TestingForMaster;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
};

export type TestingForMaster = {
  __typename?: 'TestingForMaster';
  id: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated: Scalars['Boolean'];
  createdAt: Scalars['String'];
  createdBy: User;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
  menu: MenuMaster;
  testingScopes?: Maybe<Array<TestingScopeMaster>>;
};

export type MenuMaster = {
  __typename?: 'MenuMaster';
  id: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated: Scalars['Boolean'];
  createdAt: Scalars['String'];
  createdBy: User;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
  module: ModuleMaster;
  testingFors?: Maybe<Array<TestingForMaster>>;
};

export type ModuleMaster = {
  __typename?: 'ModuleMaster';
  id: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated: Scalars['Boolean'];
  createdAt: Scalars['String'];
  createdBy: User;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
  product: ProductMaster;
  menus?: Maybe<Array<MenuMaster>>;
};

export type ProductMaster = {
  __typename?: 'ProductMaster';
  id: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated: Scalars['Boolean'];
  createdAt: Scalars['String'];
  createdBy: User;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
  modules?: Maybe<Array<ModuleMaster>>;
};

export type TestCase = {
  __typename?: 'TestCase';
  id: Scalars['String'];
  productId: Scalars['String'];
  moduleId: Scalars['String'];
  menuId: Scalars['String'];
  testingForId: Scalars['String'];
  testingScopeId: Scalars['String'];
  description: Scalars['String'];
  expectedResult: Scalars['String'];
  verified: Scalars['Boolean'];
  verifiedBy: User;
  passed: Scalars['Boolean'];
  actualResult: Scalars['String'];
  userRemarks: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy: User;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
};

export type PaginatedTestCases = {
  __typename?: 'PaginatedTestCases';
  testCases: Array<TestCase>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTestingScope: TestingScopeMasterResponse;
  editTestingScope: TestingScopeMasterResponse;
  deleteTestingScope: Scalars['Boolean'];
  createTestingFor: TestingForMasterResponse;
  editTestingFor: TestingForMasterResponse;
  deleteTestingFor: Scalars['Boolean'];
  createMenu: MenuMasterResponse;
  editMenu: MenuMasterResponse;
  deleteMenu: Scalars['Boolean'];
  createModule: ModuleMasterResponse;
  editModule: ModuleMasterResponse;
  deleteModule: Scalars['Boolean'];
  createProduct: ProductMasterResponse;
  editProduct: ProductMasterResponse;
  deleteProduct: Scalars['Boolean'];
  createTestCase: TestCaseResponse;
  createTestCases: TestCasesResponse;
  deleteTestCase: Scalars['Boolean'];
  editUntestedTestCase: TestCaseResponse;
  editTestedTestCase: TestCaseResponse;
  testTestCase: TestCase;
  verifyTestCase: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  logoutAllSessions: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreateTestingScopeArgs = {
  input: CreateTestingScopeInput;
};


export type MutationEditTestingScopeArgs = {
  input: EditTestingScopeInput;
  id: Scalars['String'];
};


export type MutationDeleteTestingScopeArgs = {
  id: Scalars['String'];
};


export type MutationCreateTestingForArgs = {
  input: CreateTestingForInput;
};


export type MutationEditTestingForArgs = {
  input: EditTestingForInput;
  id: Scalars['String'];
};


export type MutationDeleteTestingForArgs = {
  id: Scalars['String'];
};


export type MutationCreateMenuArgs = {
  input: CreateMenuInput;
};


export type MutationEditMenuArgs = {
  input: EditMenuInput;
  id: Scalars['String'];
};


export type MutationDeleteMenuArgs = {
  id: Scalars['String'];
};


export type MutationCreateModuleArgs = {
  input: CreateModuleInput;
};


export type MutationEditModuleArgs = {
  input: EditModuleInput;
  id: Scalars['String'];
};


export type MutationDeleteModuleArgs = {
  id: Scalars['String'];
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationEditProductArgs = {
  input: CreateProductInput;
  id: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationCreateTestCaseArgs = {
  input: CreateTestCaseInput;
};


export type MutationCreateTestCasesArgs = {
  input: CreateTestCasesInput;
};


export type MutationDeleteTestCaseArgs = {
  id: Scalars['String'];
};


export type MutationEditUntestedTestCaseArgs = {
  input: EditUntestedTestCaseInput;
};


export type MutationEditTestedTestCaseArgs = {
  input: EditTestedTestCaseInput;
};


export type MutationTestTestCaseArgs = {
  input: TestTestCaseInput;
};


export type MutationVerifyTestCaseArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationRegisterArgs = {
  credentials: RegisterInput;
};

export type TestingScopeMasterResponse = {
  __typename?: 'TestingScopeMasterResponse';
  errors?: Maybe<Array<FieldError>>;
  testingScope?: Maybe<TestingScopeMaster>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CreateTestingScopeInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
  testingForId: Scalars['String'];
};

export type EditTestingScopeInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
};

export type TestingForMasterResponse = {
  __typename?: 'TestingForMasterResponse';
  errors?: Maybe<Array<FieldError>>;
  testingFor?: Maybe<TestingForMaster>;
};

export type CreateTestingForInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
  menuId: Scalars['String'];
};

export type EditTestingForInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
};

export type MenuMasterResponse = {
  __typename?: 'MenuMasterResponse';
  errors?: Maybe<Array<FieldError>>;
  menu?: Maybe<MenuMaster>;
};

export type CreateMenuInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
  moduleId: Scalars['String'];
};

export type EditMenuInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
};

export type ModuleMasterResponse = {
  __typename?: 'ModuleMasterResponse';
  errors?: Maybe<Array<FieldError>>;
  module?: Maybe<ModuleMaster>;
};

export type CreateModuleInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
  productId: Scalars['String'];
};

export type EditModuleInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
};

export type ProductMasterResponse = {
  __typename?: 'ProductMasterResponse';
  errors?: Maybe<Array<FieldError>>;
  product?: Maybe<ProductMaster>;
};

export type CreateProductInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  deprecated?: Maybe<Scalars['Boolean']>;
};

export type TestCaseResponse = {
  __typename?: 'TestCaseResponse';
  errors?: Maybe<Array<FieldError>>;
  testCase?: Maybe<TestCase>;
};

export type CreateTestCaseInput = {
  productId: Scalars['String'];
  moduleId: Scalars['String'];
  menuId: Scalars['String'];
  testingForId: Scalars['String'];
  testingScopeId: Scalars['String'];
  case: CaseType;
};

export type CaseType = {
  description: Scalars['String'];
  expectedResult: Scalars['String'];
};

export type TestCasesResponse = {
  __typename?: 'TestCasesResponse';
  errors?: Maybe<Array<FieldError>>;
  testCases?: Maybe<Array<TestCase>>;
};

export type CreateTestCasesInput = {
  productId: Scalars['String'];
  moduleId: Scalars['String'];
  menuId: Scalars['String'];
  testingForId: Scalars['String'];
  testingScopeId: Scalars['String'];
  cases: Array<CaseType>;
};

export type EditUntestedTestCaseInput = {
  id: Scalars['String'];
  description: Scalars['String'];
  expectedResult: Scalars['String'];
};

export type EditTestedTestCaseInput = {
  id: Scalars['String'];
  actualResult: Scalars['String'];
  userRemarks: Scalars['String'];
};

export type TestTestCaseInput = {
  id: Scalars['String'];
  passed: Scalars['Boolean'];
  actualResult: Scalars['String'];
  userRemarks: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Scalars['String']>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularMenuMasterFragment = (
  { __typename?: 'MenuMaster' }
  & Pick<MenuMaster, 'id' | 'code' | 'name' | 'deprecated' | 'createdAt' | 'updatedAt'>
  & { createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), updatedBy?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )>, module: (
    { __typename?: 'ModuleMaster' }
    & Pick<ModuleMaster, 'id' | 'code' | 'name' | 'deprecated'>
  ), testingFors?: Maybe<Array<(
    { __typename?: 'TestingForMaster' }
    & Pick<TestingForMaster, 'id' | 'code' | 'name' | 'deprecated'>
  )>> }
);

export type RegularModuleMasterFragment = (
  { __typename?: 'ModuleMaster' }
  & Pick<ModuleMaster, 'id' | 'code' | 'name' | 'deprecated' | 'createdAt' | 'updatedAt'>
  & { createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), updatedBy?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )>, product: (
    { __typename?: 'ProductMaster' }
    & Pick<ProductMaster, 'id' | 'code' | 'name' | 'deprecated'>
  ), menus?: Maybe<Array<(
    { __typename?: 'MenuMaster' }
    & Pick<MenuMaster, 'id' | 'code' | 'name' | 'deprecated'>
  )>> }
);

export type RegularProductMasterFragment = (
  { __typename?: 'ProductMaster' }
  & Pick<ProductMaster, 'id' | 'code' | 'name' | 'deprecated' | 'createdAt' | 'updatedAt'>
  & { createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), updatedBy?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )>, modules?: Maybe<Array<(
    { __typename?: 'ModuleMaster' }
    & Pick<ModuleMaster, 'id' | 'code' | 'name' | 'deprecated'>
  )>> }
);

export type RegularTestingForMasterFragment = (
  { __typename?: 'TestingForMaster' }
  & Pick<TestingForMaster, 'id' | 'code' | 'name' | 'deprecated' | 'createdAt' | 'updatedAt'>
  & { createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), updatedBy?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )>, menu: (
    { __typename?: 'MenuMaster' }
    & Pick<MenuMaster, 'id' | 'code' | 'name' | 'deprecated'>
  ), testingScopes?: Maybe<Array<(
    { __typename?: 'TestingScopeMaster' }
    & Pick<TestingScopeMaster, 'id' | 'code' | 'name' | 'deprecated'>
  )>> }
);

export type RegularTestingScopeMasterFragment = (
  { __typename?: 'TestingScopeMaster' }
  & Pick<TestingScopeMaster, 'id' | 'code' | 'name' | 'deprecated' | 'createdAt' | 'updatedAt'>
  & { createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), updatedBy?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )>, testingFor: (
    { __typename?: 'TestingForMaster' }
    & Pick<TestingForMaster, 'id' | 'code' | 'name' | 'deprecated'>
  ) }
);

export type RegularTestCaseFragment = (
  { __typename?: 'TestCase' }
  & Pick<TestCase, 'id' | 'productId' | 'moduleId' | 'menuId' | 'testingForId' | 'testingScopeId' | 'description' | 'expectedResult' | 'verified' | 'passed' | 'actualResult' | 'userRemarks' | 'createdAt' | 'updatedAt'>
  & { verifiedBy: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ), createdBy: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ), updatedBy?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'role'>
);

export type CreateMenuMutationVariables = Exact<{
  input: CreateMenuInput;
}>;


export type CreateMenuMutation = (
  { __typename?: 'Mutation' }
  & { createMenu: (
    { __typename?: 'MenuMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, menu?: Maybe<(
      { __typename?: 'MenuMaster' }
      & RegularMenuMasterFragment
    )> }
  ) }
);

export type DeleteMenuMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMenuMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMenu'>
);

export type EditMenuMutationVariables = Exact<{
  id: Scalars['String'];
  input: EditMenuInput;
}>;


export type EditMenuMutation = (
  { __typename?: 'Mutation' }
  & { editMenu: (
    { __typename?: 'MenuMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, menu?: Maybe<(
      { __typename?: 'MenuMaster' }
      & RegularMenuMasterFragment
    )> }
  ) }
);

export type CreateModuleMutationVariables = Exact<{
  input: CreateModuleInput;
}>;


export type CreateModuleMutation = (
  { __typename?: 'Mutation' }
  & { createModule: (
    { __typename?: 'ModuleMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, module?: Maybe<(
      { __typename?: 'ModuleMaster' }
      & RegularModuleMasterFragment
    )> }
  ) }
);

export type DeleteModuleMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteModuleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteModule'>
);

export type EditModuleMutationVariables = Exact<{
  id: Scalars['String'];
  input: EditModuleInput;
}>;


export type EditModuleMutation = (
  { __typename?: 'Mutation' }
  & { editModule: (
    { __typename?: 'ModuleMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, module?: Maybe<(
      { __typename?: 'ModuleMaster' }
      & RegularModuleMasterFragment
    )> }
  ) }
);

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'ProductMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, product?: Maybe<(
      { __typename?: 'ProductMaster' }
      & RegularProductMasterFragment
    )> }
  ) }
);

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type EditProductMutationVariables = Exact<{
  id: Scalars['String'];
  input: CreateProductInput;
}>;


export type EditProductMutation = (
  { __typename?: 'Mutation' }
  & { editProduct: (
    { __typename?: 'ProductMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, product?: Maybe<(
      { __typename?: 'ProductMaster' }
      & RegularProductMasterFragment
    )> }
  ) }
);

export type CreateTestingForMutationVariables = Exact<{
  input: CreateTestingForInput;
}>;


export type CreateTestingForMutation = (
  { __typename?: 'Mutation' }
  & { createTestingFor: (
    { __typename?: 'TestingForMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, testingFor?: Maybe<(
      { __typename?: 'TestingForMaster' }
      & RegularTestingForMasterFragment
    )> }
  ) }
);

export type DeleteTestingForMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTestingForMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTestingFor'>
);

export type EditTestingForMutationVariables = Exact<{
  id: Scalars['String'];
  input: EditTestingForInput;
}>;


export type EditTestingForMutation = (
  { __typename?: 'Mutation' }
  & { editTestingFor: (
    { __typename?: 'TestingForMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, testingFor?: Maybe<(
      { __typename?: 'TestingForMaster' }
      & RegularTestingForMasterFragment
    )> }
  ) }
);

export type CreateTestingScopeMutationVariables = Exact<{
  input: CreateTestingScopeInput;
}>;


export type CreateTestingScopeMutation = (
  { __typename?: 'Mutation' }
  & { createTestingScope: (
    { __typename?: 'TestingScopeMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, testingScope?: Maybe<(
      { __typename?: 'TestingScopeMaster' }
      & RegularTestingScopeMasterFragment
    )> }
  ) }
);

export type DeleteTestingScopeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTestingScopeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTestingScope'>
);

export type EditTestingScopeMutationVariables = Exact<{
  id: Scalars['String'];
  input: EditTestingScopeInput;
}>;


export type EditTestingScopeMutation = (
  { __typename?: 'Mutation' }
  & { editTestingScope: (
    { __typename?: 'TestingScopeMasterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, testingScope?: Maybe<(
      { __typename?: 'TestingScopeMaster' }
      & RegularTestingScopeMasterFragment
    )> }
  ) }
);

export type EditTestedTestCaseMutationVariables = Exact<{
  input: EditTestedTestCaseInput;
}>;


export type EditTestedTestCaseMutation = (
  { __typename?: 'Mutation' }
  & { editTestedTestCase: (
    { __typename?: 'TestCaseResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, testCase?: Maybe<(
      { __typename?: 'TestCase' }
      & RegularTestCaseFragment
    )> }
  ) }
);

export type EditUntestedTestCaseMutationVariables = Exact<{
  input: EditUntestedTestCaseInput;
}>;


export type EditUntestedTestCaseMutation = (
  { __typename?: 'Mutation' }
  & { editUntestedTestCase: (
    { __typename?: 'TestCaseResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, testCase?: Maybe<(
      { __typename?: 'TestCase' }
      & RegularTestCaseFragment
    )> }
  ) }
);

export type CreateTestCasesMutationVariables = Exact<{
  input: CreateTestCasesInput;
}>;


export type CreateTestCasesMutation = (
  { __typename?: 'Mutation' }
  & { createTestCases: (
    { __typename?: 'TestCasesResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, testCases?: Maybe<Array<(
      { __typename?: 'TestCase' }
      & RegularTestCaseFragment
    )>> }
  ) }
);

export type DeleteTestCaseMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTestCaseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTestCase'>
);

export type TestTestCaseMutationVariables = Exact<{
  input: TestTestCaseInput;
}>;


export type TestTestCaseMutation = (
  { __typename?: 'Mutation' }
  & { testTestCase: (
    { __typename?: 'TestCase' }
    & RegularTestCaseFragment
  ) }
);

export type VerifyTestCaseMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type VerifyTestCaseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyTestCase'>
);

export type LoginMutationVariables = Exact<{
  credentials: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type GetMenuQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMenuQuery = (
  { __typename?: 'Query' }
  & { getMenu?: Maybe<(
    { __typename?: 'MenuMaster' }
    & RegularMenuMasterFragment
  )> }
);

export type GetMenusQueryVariables = Exact<{
  moduleId: Scalars['String'];
}>;


export type GetMenusQuery = (
  { __typename?: 'Query' }
  & { getMenus: Array<(
    { __typename?: 'MenuMaster' }
    & RegularMenuMasterFragment
  )> }
);

export type GetModuleQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetModuleQuery = (
  { __typename?: 'Query' }
  & { getModule?: Maybe<(
    { __typename?: 'ModuleMaster' }
    & RegularModuleMasterFragment
  )> }
);

export type GetModulesQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetModulesQuery = (
  { __typename?: 'Query' }
  & { getModules: Array<(
    { __typename?: 'ModuleMaster' }
    & RegularModuleMasterFragment
  )> }
);

export type GetProductQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'ProductMaster' }
    & RegularProductMasterFragment
  )> }
);

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { getProducts: Array<(
    { __typename?: 'ProductMaster' }
    & RegularProductMasterFragment
  )> }
);

export type GetTestingForQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTestingForQuery = (
  { __typename?: 'Query' }
  & { getTestingFor?: Maybe<(
    { __typename?: 'TestingForMaster' }
    & RegularTestingForMasterFragment
  )> }
);

export type GetTestingForsQueryVariables = Exact<{
  menuId: Scalars['String'];
}>;


export type GetTestingForsQuery = (
  { __typename?: 'Query' }
  & { getTestingFors: Array<(
    { __typename?: 'TestingForMaster' }
    & RegularTestingForMasterFragment
  )> }
);

export type GetTestingScopeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTestingScopeQuery = (
  { __typename?: 'Query' }
  & { getTestingScope?: Maybe<(
    { __typename?: 'TestingScopeMaster' }
    & RegularTestingScopeMasterFragment
  )> }
);

export type GetTestingScopesQueryVariables = Exact<{
  testingForId: Scalars['String'];
}>;


export type GetTestingScopesQuery = (
  { __typename?: 'Query' }
  & { getTestingScopes: Array<(
    { __typename?: 'TestingScopeMaster' }
    & RegularTestingScopeMasterFragment
  )> }
);

export type GetTestCaseQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTestCaseQuery = (
  { __typename?: 'Query' }
  & { getTestCase?: Maybe<(
    { __typename?: 'TestCase' }
    & RegularTestCaseFragment
  )> }
);

export type GetTestCasesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetTestCasesQuery = (
  { __typename?: 'Query' }
  & { getTestCases: (
    { __typename?: 'PaginatedTestCases' }
    & Pick<PaginatedTestCases, 'hasMore'>
    & { testCases: Array<(
      { __typename?: 'TestCase' }
      & RegularTestCaseFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularMenuMasterFragmentDoc = gql`
    fragment RegularMenuMaster on MenuMaster {
  id
  code
  name
  deprecated
  createdAt
  createdBy {
    id
    username
  }
  updatedAt
  updatedBy {
    id
    username
  }
  module {
    id
    code
    name
    deprecated
  }
  testingFors {
    id
    code
    name
    deprecated
  }
}
    `;
export const RegularModuleMasterFragmentDoc = gql`
    fragment RegularModuleMaster on ModuleMaster {
  id
  code
  name
  deprecated
  createdAt
  createdBy {
    id
    username
  }
  updatedAt
  updatedBy {
    id
    username
  }
  product {
    id
    code
    name
    deprecated
  }
  menus {
    id
    code
    name
    deprecated
  }
}
    `;
export const RegularProductMasterFragmentDoc = gql`
    fragment RegularProductMaster on ProductMaster {
  id
  code
  name
  deprecated
  createdAt
  createdBy {
    id
    username
  }
  updatedAt
  updatedBy {
    id
    username
  }
  modules {
    id
    code
    name
    deprecated
  }
}
    `;
export const RegularTestingForMasterFragmentDoc = gql`
    fragment RegularTestingForMaster on TestingForMaster {
  id
  code
  name
  deprecated
  createdAt
  createdBy {
    id
    username
  }
  updatedAt
  updatedBy {
    id
    username
  }
  menu {
    id
    code
    name
    deprecated
  }
  testingScopes {
    id
    code
    name
    deprecated
  }
}
    `;
export const RegularTestingScopeMasterFragmentDoc = gql`
    fragment RegularTestingScopeMaster on TestingScopeMaster {
  id
  code
  name
  deprecated
  createdAt
  createdBy {
    id
    username
  }
  updatedAt
  updatedBy {
    id
    username
  }
  testingFor {
    id
    code
    name
    deprecated
  }
}
    `;
export const RegularTestCaseFragmentDoc = gql`
    fragment RegularTestCase on TestCase {
  id
  productId
  moduleId
  menuId
  testingForId
  testingScopeId
  description
  expectedResult
  verified
  verifiedBy {
    username
  }
  passed
  actualResult
  userRemarks
  createdAt
  createdBy {
    username
  }
  updatedAt
  updatedBy {
    username
  }
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  role
}
    `;
export const CreateMenuDocument = gql`
    mutation CreateMenu($input: CreateMenuInput!) {
  createMenu(input: $input) {
    errors {
      ...RegularError
    }
    menu {
      ...RegularMenuMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularMenuMasterFragmentDoc}`;
export type CreateMenuMutationFn = Apollo.MutationFunction<CreateMenuMutation, CreateMenuMutationVariables>;

/**
 * __useCreateMenuMutation__
 *
 * To run a mutation, you first call `useCreateMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMenuMutation, { data, loading, error }] = useCreateMenuMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMenuMutation(baseOptions?: Apollo.MutationHookOptions<CreateMenuMutation, CreateMenuMutationVariables>) {
        return Apollo.useMutation<CreateMenuMutation, CreateMenuMutationVariables>(CreateMenuDocument, baseOptions);
      }
export type CreateMenuMutationHookResult = ReturnType<typeof useCreateMenuMutation>;
export type CreateMenuMutationResult = Apollo.MutationResult<CreateMenuMutation>;
export type CreateMenuMutationOptions = Apollo.BaseMutationOptions<CreateMenuMutation, CreateMenuMutationVariables>;
export const DeleteMenuDocument = gql`
    mutation DeleteMenu($id: String!) {
  deleteMenu(id: $id)
}
    `;
export type DeleteMenuMutationFn = Apollo.MutationFunction<DeleteMenuMutation, DeleteMenuMutationVariables>;

/**
 * __useDeleteMenuMutation__
 *
 * To run a mutation, you first call `useDeleteMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMenuMutation, { data, loading, error }] = useDeleteMenuMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMenuMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMenuMutation, DeleteMenuMutationVariables>) {
        return Apollo.useMutation<DeleteMenuMutation, DeleteMenuMutationVariables>(DeleteMenuDocument, baseOptions);
      }
export type DeleteMenuMutationHookResult = ReturnType<typeof useDeleteMenuMutation>;
export type DeleteMenuMutationResult = Apollo.MutationResult<DeleteMenuMutation>;
export type DeleteMenuMutationOptions = Apollo.BaseMutationOptions<DeleteMenuMutation, DeleteMenuMutationVariables>;
export const EditMenuDocument = gql`
    mutation EditMenu($id: String!, $input: EditMenuInput!) {
  editMenu(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    menu {
      ...RegularMenuMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularMenuMasterFragmentDoc}`;
export type EditMenuMutationFn = Apollo.MutationFunction<EditMenuMutation, EditMenuMutationVariables>;

/**
 * __useEditMenuMutation__
 *
 * To run a mutation, you first call `useEditMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMenuMutation, { data, loading, error }] = useEditMenuMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditMenuMutation(baseOptions?: Apollo.MutationHookOptions<EditMenuMutation, EditMenuMutationVariables>) {
        return Apollo.useMutation<EditMenuMutation, EditMenuMutationVariables>(EditMenuDocument, baseOptions);
      }
export type EditMenuMutationHookResult = ReturnType<typeof useEditMenuMutation>;
export type EditMenuMutationResult = Apollo.MutationResult<EditMenuMutation>;
export type EditMenuMutationOptions = Apollo.BaseMutationOptions<EditMenuMutation, EditMenuMutationVariables>;
export const CreateModuleDocument = gql`
    mutation CreateModule($input: CreateModuleInput!) {
  createModule(input: $input) {
    errors {
      ...RegularError
    }
    module {
      ...RegularModuleMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularModuleMasterFragmentDoc}`;
export type CreateModuleMutationFn = Apollo.MutationFunction<CreateModuleMutation, CreateModuleMutationVariables>;

/**
 * __useCreateModuleMutation__
 *
 * To run a mutation, you first call `useCreateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModuleMutation, { data, loading, error }] = useCreateModuleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateModuleMutation(baseOptions?: Apollo.MutationHookOptions<CreateModuleMutation, CreateModuleMutationVariables>) {
        return Apollo.useMutation<CreateModuleMutation, CreateModuleMutationVariables>(CreateModuleDocument, baseOptions);
      }
export type CreateModuleMutationHookResult = ReturnType<typeof useCreateModuleMutation>;
export type CreateModuleMutationResult = Apollo.MutationResult<CreateModuleMutation>;
export type CreateModuleMutationOptions = Apollo.BaseMutationOptions<CreateModuleMutation, CreateModuleMutationVariables>;
export const DeleteModuleDocument = gql`
    mutation DeleteModule($id: String!) {
  deleteModule(id: $id)
}
    `;
export type DeleteModuleMutationFn = Apollo.MutationFunction<DeleteModuleMutation, DeleteModuleMutationVariables>;

/**
 * __useDeleteModuleMutation__
 *
 * To run a mutation, you first call `useDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModuleMutation, { data, loading, error }] = useDeleteModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteModuleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModuleMutation, DeleteModuleMutationVariables>) {
        return Apollo.useMutation<DeleteModuleMutation, DeleteModuleMutationVariables>(DeleteModuleDocument, baseOptions);
      }
export type DeleteModuleMutationHookResult = ReturnType<typeof useDeleteModuleMutation>;
export type DeleteModuleMutationResult = Apollo.MutationResult<DeleteModuleMutation>;
export type DeleteModuleMutationOptions = Apollo.BaseMutationOptions<DeleteModuleMutation, DeleteModuleMutationVariables>;
export const EditModuleDocument = gql`
    mutation EditModule($id: String!, $input: EditModuleInput!) {
  editModule(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    module {
      ...RegularModuleMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularModuleMasterFragmentDoc}`;
export type EditModuleMutationFn = Apollo.MutationFunction<EditModuleMutation, EditModuleMutationVariables>;

/**
 * __useEditModuleMutation__
 *
 * To run a mutation, you first call `useEditModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editModuleMutation, { data, loading, error }] = useEditModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditModuleMutation(baseOptions?: Apollo.MutationHookOptions<EditModuleMutation, EditModuleMutationVariables>) {
        return Apollo.useMutation<EditModuleMutation, EditModuleMutationVariables>(EditModuleDocument, baseOptions);
      }
export type EditModuleMutationHookResult = ReturnType<typeof useEditModuleMutation>;
export type EditModuleMutationResult = Apollo.MutationResult<EditModuleMutation>;
export type EditModuleMutationOptions = Apollo.BaseMutationOptions<EditModuleMutation, EditModuleMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    errors {
      ...RegularError
    }
    product {
      ...RegularProductMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularProductMasterFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: String!) {
  deleteProduct(id: $id)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, baseOptions);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const EditProductDocument = gql`
    mutation EditProduct($id: String!, $input: CreateProductInput!) {
  editProduct(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    product {
      ...RegularProductMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularProductMasterFragmentDoc}`;
export type EditProductMutationFn = Apollo.MutationFunction<EditProductMutation, EditProductMutationVariables>;

/**
 * __useEditProductMutation__
 *
 * To run a mutation, you first call `useEditProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProductMutation, { data, loading, error }] = useEditProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditProductMutation(baseOptions?: Apollo.MutationHookOptions<EditProductMutation, EditProductMutationVariables>) {
        return Apollo.useMutation<EditProductMutation, EditProductMutationVariables>(EditProductDocument, baseOptions);
      }
export type EditProductMutationHookResult = ReturnType<typeof useEditProductMutation>;
export type EditProductMutationResult = Apollo.MutationResult<EditProductMutation>;
export type EditProductMutationOptions = Apollo.BaseMutationOptions<EditProductMutation, EditProductMutationVariables>;
export const CreateTestingForDocument = gql`
    mutation CreateTestingFor($input: CreateTestingForInput!) {
  createTestingFor(input: $input) {
    errors {
      ...RegularError
    }
    testingFor {
      ...RegularTestingForMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTestingForMasterFragmentDoc}`;
export type CreateTestingForMutationFn = Apollo.MutationFunction<CreateTestingForMutation, CreateTestingForMutationVariables>;

/**
 * __useCreateTestingForMutation__
 *
 * To run a mutation, you first call `useCreateTestingForMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestingForMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestingForMutation, { data, loading, error }] = useCreateTestingForMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTestingForMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestingForMutation, CreateTestingForMutationVariables>) {
        return Apollo.useMutation<CreateTestingForMutation, CreateTestingForMutationVariables>(CreateTestingForDocument, baseOptions);
      }
export type CreateTestingForMutationHookResult = ReturnType<typeof useCreateTestingForMutation>;
export type CreateTestingForMutationResult = Apollo.MutationResult<CreateTestingForMutation>;
export type CreateTestingForMutationOptions = Apollo.BaseMutationOptions<CreateTestingForMutation, CreateTestingForMutationVariables>;
export const DeleteTestingForDocument = gql`
    mutation DeleteTestingFor($id: String!) {
  deleteTestingFor(id: $id)
}
    `;
export type DeleteTestingForMutationFn = Apollo.MutationFunction<DeleteTestingForMutation, DeleteTestingForMutationVariables>;

/**
 * __useDeleteTestingForMutation__
 *
 * To run a mutation, you first call `useDeleteTestingForMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTestingForMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTestingForMutation, { data, loading, error }] = useDeleteTestingForMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTestingForMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTestingForMutation, DeleteTestingForMutationVariables>) {
        return Apollo.useMutation<DeleteTestingForMutation, DeleteTestingForMutationVariables>(DeleteTestingForDocument, baseOptions);
      }
export type DeleteTestingForMutationHookResult = ReturnType<typeof useDeleteTestingForMutation>;
export type DeleteTestingForMutationResult = Apollo.MutationResult<DeleteTestingForMutation>;
export type DeleteTestingForMutationOptions = Apollo.BaseMutationOptions<DeleteTestingForMutation, DeleteTestingForMutationVariables>;
export const EditTestingForDocument = gql`
    mutation EditTestingFor($id: String!, $input: EditTestingForInput!) {
  editTestingFor(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    testingFor {
      ...RegularTestingForMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTestingForMasterFragmentDoc}`;
export type EditTestingForMutationFn = Apollo.MutationFunction<EditTestingForMutation, EditTestingForMutationVariables>;

/**
 * __useEditTestingForMutation__
 *
 * To run a mutation, you first call `useEditTestingForMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTestingForMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTestingForMutation, { data, loading, error }] = useEditTestingForMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTestingForMutation(baseOptions?: Apollo.MutationHookOptions<EditTestingForMutation, EditTestingForMutationVariables>) {
        return Apollo.useMutation<EditTestingForMutation, EditTestingForMutationVariables>(EditTestingForDocument, baseOptions);
      }
export type EditTestingForMutationHookResult = ReturnType<typeof useEditTestingForMutation>;
export type EditTestingForMutationResult = Apollo.MutationResult<EditTestingForMutation>;
export type EditTestingForMutationOptions = Apollo.BaseMutationOptions<EditTestingForMutation, EditTestingForMutationVariables>;
export const CreateTestingScopeDocument = gql`
    mutation CreateTestingScope($input: CreateTestingScopeInput!) {
  createTestingScope(input: $input) {
    errors {
      ...RegularError
    }
    testingScope {
      ...RegularTestingScopeMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTestingScopeMasterFragmentDoc}`;
export type CreateTestingScopeMutationFn = Apollo.MutationFunction<CreateTestingScopeMutation, CreateTestingScopeMutationVariables>;

/**
 * __useCreateTestingScopeMutation__
 *
 * To run a mutation, you first call `useCreateTestingScopeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestingScopeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestingScopeMutation, { data, loading, error }] = useCreateTestingScopeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTestingScopeMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestingScopeMutation, CreateTestingScopeMutationVariables>) {
        return Apollo.useMutation<CreateTestingScopeMutation, CreateTestingScopeMutationVariables>(CreateTestingScopeDocument, baseOptions);
      }
export type CreateTestingScopeMutationHookResult = ReturnType<typeof useCreateTestingScopeMutation>;
export type CreateTestingScopeMutationResult = Apollo.MutationResult<CreateTestingScopeMutation>;
export type CreateTestingScopeMutationOptions = Apollo.BaseMutationOptions<CreateTestingScopeMutation, CreateTestingScopeMutationVariables>;
export const DeleteTestingScopeDocument = gql`
    mutation DeleteTestingScope($id: String!) {
  deleteTestingScope(id: $id)
}
    `;
export type DeleteTestingScopeMutationFn = Apollo.MutationFunction<DeleteTestingScopeMutation, DeleteTestingScopeMutationVariables>;

/**
 * __useDeleteTestingScopeMutation__
 *
 * To run a mutation, you first call `useDeleteTestingScopeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTestingScopeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTestingScopeMutation, { data, loading, error }] = useDeleteTestingScopeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTestingScopeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTestingScopeMutation, DeleteTestingScopeMutationVariables>) {
        return Apollo.useMutation<DeleteTestingScopeMutation, DeleteTestingScopeMutationVariables>(DeleteTestingScopeDocument, baseOptions);
      }
export type DeleteTestingScopeMutationHookResult = ReturnType<typeof useDeleteTestingScopeMutation>;
export type DeleteTestingScopeMutationResult = Apollo.MutationResult<DeleteTestingScopeMutation>;
export type DeleteTestingScopeMutationOptions = Apollo.BaseMutationOptions<DeleteTestingScopeMutation, DeleteTestingScopeMutationVariables>;
export const EditTestingScopeDocument = gql`
    mutation EditTestingScope($id: String!, $input: EditTestingScopeInput!) {
  editTestingScope(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    testingScope {
      ...RegularTestingScopeMaster
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTestingScopeMasterFragmentDoc}`;
export type EditTestingScopeMutationFn = Apollo.MutationFunction<EditTestingScopeMutation, EditTestingScopeMutationVariables>;

/**
 * __useEditTestingScopeMutation__
 *
 * To run a mutation, you first call `useEditTestingScopeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTestingScopeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTestingScopeMutation, { data, loading, error }] = useEditTestingScopeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTestingScopeMutation(baseOptions?: Apollo.MutationHookOptions<EditTestingScopeMutation, EditTestingScopeMutationVariables>) {
        return Apollo.useMutation<EditTestingScopeMutation, EditTestingScopeMutationVariables>(EditTestingScopeDocument, baseOptions);
      }
export type EditTestingScopeMutationHookResult = ReturnType<typeof useEditTestingScopeMutation>;
export type EditTestingScopeMutationResult = Apollo.MutationResult<EditTestingScopeMutation>;
export type EditTestingScopeMutationOptions = Apollo.BaseMutationOptions<EditTestingScopeMutation, EditTestingScopeMutationVariables>;
export const EditTestedTestCaseDocument = gql`
    mutation EditTestedTestCase($input: EditTestedTestCaseInput!) {
  editTestedTestCase(input: $input) {
    errors {
      ...RegularError
    }
    testCase {
      ...RegularTestCase
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTestCaseFragmentDoc}`;
export type EditTestedTestCaseMutationFn = Apollo.MutationFunction<EditTestedTestCaseMutation, EditTestedTestCaseMutationVariables>;

/**
 * __useEditTestedTestCaseMutation__
 *
 * To run a mutation, you first call `useEditTestedTestCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTestedTestCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTestedTestCaseMutation, { data, loading, error }] = useEditTestedTestCaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTestedTestCaseMutation(baseOptions?: Apollo.MutationHookOptions<EditTestedTestCaseMutation, EditTestedTestCaseMutationVariables>) {
        return Apollo.useMutation<EditTestedTestCaseMutation, EditTestedTestCaseMutationVariables>(EditTestedTestCaseDocument, baseOptions);
      }
export type EditTestedTestCaseMutationHookResult = ReturnType<typeof useEditTestedTestCaseMutation>;
export type EditTestedTestCaseMutationResult = Apollo.MutationResult<EditTestedTestCaseMutation>;
export type EditTestedTestCaseMutationOptions = Apollo.BaseMutationOptions<EditTestedTestCaseMutation, EditTestedTestCaseMutationVariables>;
export const EditUntestedTestCaseDocument = gql`
    mutation EditUntestedTestCase($input: EditUntestedTestCaseInput!) {
  editUntestedTestCase(input: $input) {
    errors {
      ...RegularError
    }
    testCase {
      ...RegularTestCase
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTestCaseFragmentDoc}`;
export type EditUntestedTestCaseMutationFn = Apollo.MutationFunction<EditUntestedTestCaseMutation, EditUntestedTestCaseMutationVariables>;

/**
 * __useEditUntestedTestCaseMutation__
 *
 * To run a mutation, you first call `useEditUntestedTestCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUntestedTestCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUntestedTestCaseMutation, { data, loading, error }] = useEditUntestedTestCaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditUntestedTestCaseMutation(baseOptions?: Apollo.MutationHookOptions<EditUntestedTestCaseMutation, EditUntestedTestCaseMutationVariables>) {
        return Apollo.useMutation<EditUntestedTestCaseMutation, EditUntestedTestCaseMutationVariables>(EditUntestedTestCaseDocument, baseOptions);
      }
export type EditUntestedTestCaseMutationHookResult = ReturnType<typeof useEditUntestedTestCaseMutation>;
export type EditUntestedTestCaseMutationResult = Apollo.MutationResult<EditUntestedTestCaseMutation>;
export type EditUntestedTestCaseMutationOptions = Apollo.BaseMutationOptions<EditUntestedTestCaseMutation, EditUntestedTestCaseMutationVariables>;
export const CreateTestCasesDocument = gql`
    mutation CreateTestCases($input: CreateTestCasesInput!) {
  createTestCases(input: $input) {
    errors {
      field
      message
    }
    testCases {
      ...RegularTestCase
    }
  }
}
    ${RegularTestCaseFragmentDoc}`;
export type CreateTestCasesMutationFn = Apollo.MutationFunction<CreateTestCasesMutation, CreateTestCasesMutationVariables>;

/**
 * __useCreateTestCasesMutation__
 *
 * To run a mutation, you first call `useCreateTestCasesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestCasesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestCasesMutation, { data, loading, error }] = useCreateTestCasesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTestCasesMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestCasesMutation, CreateTestCasesMutationVariables>) {
        return Apollo.useMutation<CreateTestCasesMutation, CreateTestCasesMutationVariables>(CreateTestCasesDocument, baseOptions);
      }
export type CreateTestCasesMutationHookResult = ReturnType<typeof useCreateTestCasesMutation>;
export type CreateTestCasesMutationResult = Apollo.MutationResult<CreateTestCasesMutation>;
export type CreateTestCasesMutationOptions = Apollo.BaseMutationOptions<CreateTestCasesMutation, CreateTestCasesMutationVariables>;
export const DeleteTestCaseDocument = gql`
    mutation DeleteTestCase($id: String!) {
  deleteTestCase(id: $id)
}
    `;
export type DeleteTestCaseMutationFn = Apollo.MutationFunction<DeleteTestCaseMutation, DeleteTestCaseMutationVariables>;

/**
 * __useDeleteTestCaseMutation__
 *
 * To run a mutation, you first call `useDeleteTestCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTestCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTestCaseMutation, { data, loading, error }] = useDeleteTestCaseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTestCaseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTestCaseMutation, DeleteTestCaseMutationVariables>) {
        return Apollo.useMutation<DeleteTestCaseMutation, DeleteTestCaseMutationVariables>(DeleteTestCaseDocument, baseOptions);
      }
export type DeleteTestCaseMutationHookResult = ReturnType<typeof useDeleteTestCaseMutation>;
export type DeleteTestCaseMutationResult = Apollo.MutationResult<DeleteTestCaseMutation>;
export type DeleteTestCaseMutationOptions = Apollo.BaseMutationOptions<DeleteTestCaseMutation, DeleteTestCaseMutationVariables>;
export const TestTestCaseDocument = gql`
    mutation TestTestCase($input: TestTestCaseInput!) {
  testTestCase(input: $input) {
    ...RegularTestCase
  }
}
    ${RegularTestCaseFragmentDoc}`;
export type TestTestCaseMutationFn = Apollo.MutationFunction<TestTestCaseMutation, TestTestCaseMutationVariables>;

/**
 * __useTestTestCaseMutation__
 *
 * To run a mutation, you first call `useTestTestCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestTestCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testTestCaseMutation, { data, loading, error }] = useTestTestCaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestTestCaseMutation(baseOptions?: Apollo.MutationHookOptions<TestTestCaseMutation, TestTestCaseMutationVariables>) {
        return Apollo.useMutation<TestTestCaseMutation, TestTestCaseMutationVariables>(TestTestCaseDocument, baseOptions);
      }
export type TestTestCaseMutationHookResult = ReturnType<typeof useTestTestCaseMutation>;
export type TestTestCaseMutationResult = Apollo.MutationResult<TestTestCaseMutation>;
export type TestTestCaseMutationOptions = Apollo.BaseMutationOptions<TestTestCaseMutation, TestTestCaseMutationVariables>;
export const VerifyTestCaseDocument = gql`
    mutation VerifyTestCase($id: String!) {
  verifyTestCase(id: $id)
}
    `;
export type VerifyTestCaseMutationFn = Apollo.MutationFunction<VerifyTestCaseMutation, VerifyTestCaseMutationVariables>;

/**
 * __useVerifyTestCaseMutation__
 *
 * To run a mutation, you first call `useVerifyTestCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTestCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTestCaseMutation, { data, loading, error }] = useVerifyTestCaseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVerifyTestCaseMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTestCaseMutation, VerifyTestCaseMutationVariables>) {
        return Apollo.useMutation<VerifyTestCaseMutation, VerifyTestCaseMutationVariables>(VerifyTestCaseDocument, baseOptions);
      }
export type VerifyTestCaseMutationHookResult = ReturnType<typeof useVerifyTestCaseMutation>;
export type VerifyTestCaseMutationResult = Apollo.MutationResult<VerifyTestCaseMutation>;
export type VerifyTestCaseMutationOptions = Apollo.BaseMutationOptions<VerifyTestCaseMutation, VerifyTestCaseMutationVariables>;
export const LoginDocument = gql`
    mutation Login($credentials: LoginInput!) {
  login(credentials: $credentials) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetMenuDocument = gql`
    query GetMenu($id: String!) {
  getMenu(id: $id) {
    ...RegularMenuMaster
  }
}
    ${RegularMenuMasterFragmentDoc}`;

/**
 * __useGetMenuQuery__
 *
 * To run a query within a React component, call `useGetMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMenuQuery(baseOptions: Apollo.QueryHookOptions<GetMenuQuery, GetMenuQueryVariables>) {
        return Apollo.useQuery<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, baseOptions);
      }
export function useGetMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuQuery, GetMenuQueryVariables>) {
          return Apollo.useLazyQuery<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, baseOptions);
        }
export type GetMenuQueryHookResult = ReturnType<typeof useGetMenuQuery>;
export type GetMenuLazyQueryHookResult = ReturnType<typeof useGetMenuLazyQuery>;
export type GetMenuQueryResult = Apollo.QueryResult<GetMenuQuery, GetMenuQueryVariables>;
export const GetMenusDocument = gql`
    query GetMenus($moduleId: String!) {
  getMenus(moduleId: $moduleId) {
    ...RegularMenuMaster
  }
}
    ${RegularMenuMasterFragmentDoc}`;

/**
 * __useGetMenusQuery__
 *
 * To run a query within a React component, call `useGetMenusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenusQuery({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useGetMenusQuery(baseOptions: Apollo.QueryHookOptions<GetMenusQuery, GetMenusQueryVariables>) {
        return Apollo.useQuery<GetMenusQuery, GetMenusQueryVariables>(GetMenusDocument, baseOptions);
      }
export function useGetMenusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenusQuery, GetMenusQueryVariables>) {
          return Apollo.useLazyQuery<GetMenusQuery, GetMenusQueryVariables>(GetMenusDocument, baseOptions);
        }
export type GetMenusQueryHookResult = ReturnType<typeof useGetMenusQuery>;
export type GetMenusLazyQueryHookResult = ReturnType<typeof useGetMenusLazyQuery>;
export type GetMenusQueryResult = Apollo.QueryResult<GetMenusQuery, GetMenusQueryVariables>;
export const GetModuleDocument = gql`
    query GetModule($id: String!) {
  getModule(id: $id) {
    ...RegularModuleMaster
  }
}
    ${RegularModuleMasterFragmentDoc}`;

/**
 * __useGetModuleQuery__
 *
 * To run a query within a React component, call `useGetModuleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModuleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetModuleQuery(baseOptions: Apollo.QueryHookOptions<GetModuleQuery, GetModuleQueryVariables>) {
        return Apollo.useQuery<GetModuleQuery, GetModuleQueryVariables>(GetModuleDocument, baseOptions);
      }
export function useGetModuleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModuleQuery, GetModuleQueryVariables>) {
          return Apollo.useLazyQuery<GetModuleQuery, GetModuleQueryVariables>(GetModuleDocument, baseOptions);
        }
export type GetModuleQueryHookResult = ReturnType<typeof useGetModuleQuery>;
export type GetModuleLazyQueryHookResult = ReturnType<typeof useGetModuleLazyQuery>;
export type GetModuleQueryResult = Apollo.QueryResult<GetModuleQuery, GetModuleQueryVariables>;
export const GetModulesDocument = gql`
    query GetModules($productId: String!) {
  getModules(productId: $productId) {
    ...RegularModuleMaster
  }
}
    ${RegularModuleMasterFragmentDoc}`;

/**
 * __useGetModulesQuery__
 *
 * To run a query within a React component, call `useGetModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModulesQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetModulesQuery(baseOptions: Apollo.QueryHookOptions<GetModulesQuery, GetModulesQueryVariables>) {
        return Apollo.useQuery<GetModulesQuery, GetModulesQueryVariables>(GetModulesDocument, baseOptions);
      }
export function useGetModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModulesQuery, GetModulesQueryVariables>) {
          return Apollo.useLazyQuery<GetModulesQuery, GetModulesQueryVariables>(GetModulesDocument, baseOptions);
        }
export type GetModulesQueryHookResult = ReturnType<typeof useGetModulesQuery>;
export type GetModulesLazyQueryHookResult = ReturnType<typeof useGetModulesLazyQuery>;
export type GetModulesQueryResult = Apollo.QueryResult<GetModulesQuery, GetModulesQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: String!) {
  getProduct(id: $id) {
    ...RegularProductMaster
  }
}
    ${RegularProductMasterFragmentDoc}`;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  getProducts {
    ...RegularProductMaster
  }
}
    ${RegularProductMasterFragmentDoc}`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetTestingForDocument = gql`
    query GetTestingFor($id: String!) {
  getTestingFor(id: $id) {
    ...RegularTestingForMaster
  }
}
    ${RegularTestingForMasterFragmentDoc}`;

/**
 * __useGetTestingForQuery__
 *
 * To run a query within a React component, call `useGetTestingForQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestingForQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestingForQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTestingForQuery(baseOptions: Apollo.QueryHookOptions<GetTestingForQuery, GetTestingForQueryVariables>) {
        return Apollo.useQuery<GetTestingForQuery, GetTestingForQueryVariables>(GetTestingForDocument, baseOptions);
      }
export function useGetTestingForLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestingForQuery, GetTestingForQueryVariables>) {
          return Apollo.useLazyQuery<GetTestingForQuery, GetTestingForQueryVariables>(GetTestingForDocument, baseOptions);
        }
export type GetTestingForQueryHookResult = ReturnType<typeof useGetTestingForQuery>;
export type GetTestingForLazyQueryHookResult = ReturnType<typeof useGetTestingForLazyQuery>;
export type GetTestingForQueryResult = Apollo.QueryResult<GetTestingForQuery, GetTestingForQueryVariables>;
export const GetTestingForsDocument = gql`
    query GetTestingFors($menuId: String!) {
  getTestingFors(menuId: $menuId) {
    ...RegularTestingForMaster
  }
}
    ${RegularTestingForMasterFragmentDoc}`;

/**
 * __useGetTestingForsQuery__
 *
 * To run a query within a React component, call `useGetTestingForsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestingForsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestingForsQuery({
 *   variables: {
 *      menuId: // value for 'menuId'
 *   },
 * });
 */
export function useGetTestingForsQuery(baseOptions: Apollo.QueryHookOptions<GetTestingForsQuery, GetTestingForsQueryVariables>) {
        return Apollo.useQuery<GetTestingForsQuery, GetTestingForsQueryVariables>(GetTestingForsDocument, baseOptions);
      }
export function useGetTestingForsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestingForsQuery, GetTestingForsQueryVariables>) {
          return Apollo.useLazyQuery<GetTestingForsQuery, GetTestingForsQueryVariables>(GetTestingForsDocument, baseOptions);
        }
export type GetTestingForsQueryHookResult = ReturnType<typeof useGetTestingForsQuery>;
export type GetTestingForsLazyQueryHookResult = ReturnType<typeof useGetTestingForsLazyQuery>;
export type GetTestingForsQueryResult = Apollo.QueryResult<GetTestingForsQuery, GetTestingForsQueryVariables>;
export const GetTestingScopeDocument = gql`
    query GetTestingScope($id: String!) {
  getTestingScope(id: $id) {
    ...RegularTestingScopeMaster
  }
}
    ${RegularTestingScopeMasterFragmentDoc}`;

/**
 * __useGetTestingScopeQuery__
 *
 * To run a query within a React component, call `useGetTestingScopeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestingScopeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestingScopeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTestingScopeQuery(baseOptions: Apollo.QueryHookOptions<GetTestingScopeQuery, GetTestingScopeQueryVariables>) {
        return Apollo.useQuery<GetTestingScopeQuery, GetTestingScopeQueryVariables>(GetTestingScopeDocument, baseOptions);
      }
export function useGetTestingScopeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestingScopeQuery, GetTestingScopeQueryVariables>) {
          return Apollo.useLazyQuery<GetTestingScopeQuery, GetTestingScopeQueryVariables>(GetTestingScopeDocument, baseOptions);
        }
export type GetTestingScopeQueryHookResult = ReturnType<typeof useGetTestingScopeQuery>;
export type GetTestingScopeLazyQueryHookResult = ReturnType<typeof useGetTestingScopeLazyQuery>;
export type GetTestingScopeQueryResult = Apollo.QueryResult<GetTestingScopeQuery, GetTestingScopeQueryVariables>;
export const GetTestingScopesDocument = gql`
    query GetTestingScopes($testingForId: String!) {
  getTestingScopes(testingForId: $testingForId) {
    ...RegularTestingScopeMaster
  }
}
    ${RegularTestingScopeMasterFragmentDoc}`;

/**
 * __useGetTestingScopesQuery__
 *
 * To run a query within a React component, call `useGetTestingScopesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestingScopesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestingScopesQuery({
 *   variables: {
 *      testingForId: // value for 'testingForId'
 *   },
 * });
 */
export function useGetTestingScopesQuery(baseOptions: Apollo.QueryHookOptions<GetTestingScopesQuery, GetTestingScopesQueryVariables>) {
        return Apollo.useQuery<GetTestingScopesQuery, GetTestingScopesQueryVariables>(GetTestingScopesDocument, baseOptions);
      }
export function useGetTestingScopesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestingScopesQuery, GetTestingScopesQueryVariables>) {
          return Apollo.useLazyQuery<GetTestingScopesQuery, GetTestingScopesQueryVariables>(GetTestingScopesDocument, baseOptions);
        }
export type GetTestingScopesQueryHookResult = ReturnType<typeof useGetTestingScopesQuery>;
export type GetTestingScopesLazyQueryHookResult = ReturnType<typeof useGetTestingScopesLazyQuery>;
export type GetTestingScopesQueryResult = Apollo.QueryResult<GetTestingScopesQuery, GetTestingScopesQueryVariables>;
export const GetTestCaseDocument = gql`
    query GetTestCase($id: String!) {
  getTestCase(id: $id) {
    ...RegularTestCase
  }
}
    ${RegularTestCaseFragmentDoc}`;

/**
 * __useGetTestCaseQuery__
 *
 * To run a query within a React component, call `useGetTestCaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestCaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestCaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTestCaseQuery(baseOptions: Apollo.QueryHookOptions<GetTestCaseQuery, GetTestCaseQueryVariables>) {
        return Apollo.useQuery<GetTestCaseQuery, GetTestCaseQueryVariables>(GetTestCaseDocument, baseOptions);
      }
export function useGetTestCaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestCaseQuery, GetTestCaseQueryVariables>) {
          return Apollo.useLazyQuery<GetTestCaseQuery, GetTestCaseQueryVariables>(GetTestCaseDocument, baseOptions);
        }
export type GetTestCaseQueryHookResult = ReturnType<typeof useGetTestCaseQuery>;
export type GetTestCaseLazyQueryHookResult = ReturnType<typeof useGetTestCaseLazyQuery>;
export type GetTestCaseQueryResult = Apollo.QueryResult<GetTestCaseQuery, GetTestCaseQueryVariables>;
export const GetTestCasesDocument = gql`
    query GetTestCases($limit: Int!, $cursor: String) {
  getTestCases(limit: $limit, cursor: $cursor) {
    testCases {
      ...RegularTestCase
    }
    hasMore
  }
}
    ${RegularTestCaseFragmentDoc}`;

/**
 * __useGetTestCasesQuery__
 *
 * To run a query within a React component, call `useGetTestCasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestCasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestCasesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetTestCasesQuery(baseOptions: Apollo.QueryHookOptions<GetTestCasesQuery, GetTestCasesQueryVariables>) {
        return Apollo.useQuery<GetTestCasesQuery, GetTestCasesQueryVariables>(GetTestCasesDocument, baseOptions);
      }
export function useGetTestCasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestCasesQuery, GetTestCasesQueryVariables>) {
          return Apollo.useLazyQuery<GetTestCasesQuery, GetTestCasesQueryVariables>(GetTestCasesDocument, baseOptions);
        }
export type GetTestCasesQueryHookResult = ReturnType<typeof useGetTestCasesQuery>;
export type GetTestCasesLazyQueryHookResult = ReturnType<typeof useGetTestCasesLazyQuery>;
export type GetTestCasesQueryResult = Apollo.QueryResult<GetTestCasesQuery, GetTestCasesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;