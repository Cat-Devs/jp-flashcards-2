export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type Card = {
  category?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
  hiragana?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  kana?: Maybe<Scalars['String']>;
  katakana?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  romaji?: Maybe<Scalars['String']>;
  sample?: Maybe<Scalars['String']>;
};

export type CardsInput = {
  category?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  card?: Maybe<Card>;
  cards: Array<Maybe<Card>>;
  user?: Maybe<User>;
  userCards: Array<Maybe<UserCards>>;
};


export type QueryCardArgs = {
  cardId: Scalars['String'];
};


export type QueryCardsArgs = {
  input: CardsInput;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserCardsArgs = {
  username: Scalars['String'];
};

export type User = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username: Scalars['ID'];
};

export type UserCards = {
  accuracy?: Maybe<Scalars['Int']>;
  cardId: Scalars['String'];
};

export type GetCardQueryVariables = Exact<{
  cardId: Scalars['String'];
}>;


export type GetCardQuery = { card?: { id: string, en?: string | null, romaji?: string | null, category?: string | null, level?: number | null, sample?: string | null, image?: string | null } | null };
