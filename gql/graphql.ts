import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Card = {
  __typename?: 'Card';
  category?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  level?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  card?: Maybe<Card>;
  cards: Array<Maybe<Card>>;
};


export type QueryCardArgs = {
  cardId: Scalars['String'];
};

export type GetCardQueryVariables = Exact<{
  cardId: Scalars['String'];
}>;


export type GetCardQuery = { __typename?: 'Query', card?: { __typename?: 'Card', id: string, en?: string | null } | null };


export const GetCardDocument = gql`
    query GetCard($cardId: String!) {
  card(cardId: $cardId) {
    id
    en
  }
}
    `;

/**
 * __useGetCardQuery__
 *
 * To run a query within a React component, call `useGetCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCardQuery({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useGetCardQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCardQuery, GetCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCardQuery, GetCardQueryVariables>(GetCardDocument, options);
      }
export function useGetCardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCardQuery, GetCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCardQuery, GetCardQueryVariables>(GetCardDocument, options);
        }
export type GetCardQueryHookResult = ReturnType<typeof useGetCardQuery>;
export type GetCardLazyQueryHookResult = ReturnType<typeof useGetCardLazyQuery>;
export type GetCardQueryResult = Apollo.QueryResult<GetCardQuery, GetCardQueryVariables>;