import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type InviteUserInput = {
  /** User access level */
  accessLevel: Scalars['String']['input'];
  /** User company ID */
  companyId: Scalars['String']['input'];
  /** User email address */
  email: Scalars['String']['input'];
  /** User job description */
  jobDescription: Scalars['String']['input'];
  /** User first name */
  name: Scalars['String']['input'];
  /** User phone number */
  phoneNumber: Scalars['String']['input'];
  /** User surname */
  surname: Scalars['String']['input'];
};

export type InvitedUser = {
  __typename?: 'InvitedUser';
  /** Flag to determine if invite was successful or not */
  successFullInvite: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  inviteUser: InvitedUser;
  uploadFile: UploadFileResponse;
};


export type MutationInviteUserArgs = {
  inviteUser: InviteUserInput;
};


export type MutationUploadFileArgs = {
  userInput: UserInput;
};

export type Query = {
  __typename?: 'Query';
  sayHello: Scalars['String']['output'];
};

export type UploadFileResponse = {
  __typename?: 'UploadFileResponse';
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UserInput = {
  buffer: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  fileType: Scalars['String']['input'];
};

export type UploadFileMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type UploadFileMutation = (
  { __typename?: 'Mutation' }
  & { uploadFile: (
    { __typename?: 'UploadFileResponse' }
    & Pick<UploadFileResponse, 'url'>
  ) }
);

export type InviteUserMutationVariables = Exact<{
  inviteUser: InviteUserInput;
}>;


export type InviteUserMutation = (
  { __typename?: 'Mutation' }
  & { inviteUser: (
    { __typename?: 'InvitedUser' }
    & Pick<InvitedUser, 'successFullInvite'>
  ) }
);

export type SayHelloQueryVariables = Exact<{ [key: string]: never; }>;


export type SayHelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'sayHello'>
);


export const UploadFileDocument = gql`
    mutation UploadFile($userInput: UserInput!) {
  uploadFile(userInput: $userInput) {
    url
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const InviteUserDocument = gql`
    mutation InviteUser($inviteUser: InviteUserInput!) {
  inviteUser(inviteUser: $inviteUser) {
    successFullInvite
  }
}
    `;
export type InviteUserMutationFn = Apollo.MutationFunction<InviteUserMutation, InviteUserMutationVariables>;

/**
 * __useInviteUserMutation__
 *
 * To run a mutation, you first call `useInviteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserMutation, { data, loading, error }] = useInviteUserMutation({
 *   variables: {
 *      inviteUser: // value for 'inviteUser'
 *   },
 * });
 */
export function useInviteUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteUserMutation, InviteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteUserMutation, InviteUserMutationVariables>(InviteUserDocument, options);
      }
export type InviteUserMutationHookResult = ReturnType<typeof useInviteUserMutation>;
export type InviteUserMutationResult = Apollo.MutationResult<InviteUserMutation>;
export type InviteUserMutationOptions = Apollo.BaseMutationOptions<InviteUserMutation, InviteUserMutationVariables>;
export const SayHelloDocument = gql`
    query SayHello {
  sayHello
}
    `;

/**
 * __useSayHelloQuery__
 *
 * To run a query within a React component, call `useSayHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useSayHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSayHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useSayHelloQuery(baseOptions?: Apollo.QueryHookOptions<SayHelloQuery, SayHelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SayHelloQuery, SayHelloQueryVariables>(SayHelloDocument, options);
      }
export function useSayHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SayHelloQuery, SayHelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SayHelloQuery, SayHelloQueryVariables>(SayHelloDocument, options);
        }
export type SayHelloQueryHookResult = ReturnType<typeof useSayHelloQuery>;
export type SayHelloLazyQueryHookResult = ReturnType<typeof useSayHelloLazyQuery>;
export type SayHelloQueryResult = Apollo.QueryResult<SayHelloQuery, SayHelloQueryVariables>;