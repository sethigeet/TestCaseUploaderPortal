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
  me?: Maybe<User>;
  getTestCase?: Maybe<TestCase>;
  getTestCases: PaginatedTestCases;
};


export type QueryGetTestCaseArgs = {
  id: Scalars['String'];
};


export type QueryGetTestCasesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
};

export type TestCase = {
  __typename?: 'TestCase';
  id: Scalars['String'];
  productCode: Scalars['String'];
  moduleCode: Scalars['String'];
  menuCode: Scalars['String'];
  testingFor: Scalars['String'];
  testingScope: Scalars['String'];
  description: Scalars['String'];
  expectedResult: Scalars['String'];
  verified: Scalars['Boolean'];
  passed: Scalars['Boolean'];
  actualResult: Scalars['String'];
  userRemarks: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  createdBy: User;
  updatedBy?: Maybe<User>;
};

export type PaginatedTestCases = {
  __typename?: 'PaginatedTestCases';
  testCases: Array<TestCase>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  logoutAllSessions: Scalars['Boolean'];
  register: UserResponse;
  createTestCase: TestCaseResponse;
  createTestCases: TestCasesResponse;
  testTestCase: TestCase;
  verifyTestCase: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationRegisterArgs = {
  credentials: RegisterInput;
};


export type MutationCreateTestCaseArgs = {
  input: CreateTestCaseInput;
};


export type MutationCreateTestCasesArgs = {
  input: CreateTestCasesInput;
};


export type MutationTestTestCaseArgs = {
  input: TestTestCaseInput;
};


export type MutationVerifyTestCaseArgs = {
  id: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type TestCaseResponse = {
  __typename?: 'TestCaseResponse';
  errors?: Maybe<Array<FieldError>>;
  testCase?: Maybe<TestCase>;
};

export type CreateTestCaseInput = {
  productCode: Scalars['String'];
  moduleCode: Scalars['String'];
  menuCode: Scalars['String'];
  testingFor: Scalars['String'];
  testingScope: Scalars['String'];
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
  productCode: Scalars['String'];
  moduleCode: Scalars['String'];
  menuCode: Scalars['String'];
  testingFor: Scalars['String'];
  testingScope: Scalars['String'];
  cases: Array<CaseType>;
};

export type TestTestCaseInput = {
  id: Scalars['String'];
  passed: Scalars['Boolean'];
  actualResult: Scalars['String'];
  userRemarks: Scalars['String'];
};

export type RegularTestCaseFragment = (
  { __typename?: 'TestCase' }
  & Pick<TestCase, 'id' | 'productCode' | 'moduleCode' | 'menuCode' | 'testingFor' | 'testingScope' | 'description' | 'expectedResult' | 'verified' | 'passed' | 'actualResult' | 'userRemarks' | 'createdAt' | 'updatedAt'>
  & { createdBy: (
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

export const RegularTestCaseFragmentDoc = gql`
    fragment RegularTestCase on TestCase {
  id
  productCode
  moduleCode
  menuCode
  testingFor
  testingScope
  description
  expectedResult
  verified
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