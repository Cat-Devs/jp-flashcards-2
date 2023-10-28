# JP Flashcards 2

## Table of Contents

- [JP Flashcards 2](#jp-flashcards-2)
  - [Table of Contents](#table-of-contents)
  - [Project and Specification](#project-and-specification)
  - [Setup](#setup)
  - [Local DynamoDB](#local-dynamodb)
    - [Mock DB table](#mock-db-table)
  - [Getting Started](#getting-started)

## Project and Specification

- [Intro](docs/intro.md#jp-flashcards)
  - [What is JP FlashCards](docs/intro.md#what-is-jp-flashcards)
  - [Application Requirements](docs/intro.md#application-requirements)
  - [Functional Requirements](docs/intro.md#functional-requirements)
  - [Non Functional Requirements](docs/intro.md#non-functional-requirements)
  - [Settings](docs/settings.md#Settings)
    - [Game Settings](docs/settings.md#game-settings)
  - [Game modes](docs/game_modes.md#game-modes)
    - [Learning](docs/game_modes.md#learning)
    - [Strength](docs/game_modes.md#strength)
    - [Fast Game](docs/game_modes.md#fast-game)
  - [Cards and Decks](docs/cards_and_decks.md#cards-and-decks)
    - [Cards deck](docs/cards_and_decks.md#cards-deck)
    - [Decks](docs/cards_and_decks.md#decks)
    - [Cards](docs/cards_and_decks.md#cards)
      - [Flash card](docs/cards_and_decks.md#flash-card)
      - [User card](docs/cards_and_decks.md#user-card)
      - [User weak card](docs/cards_and_decks.md#user-weak-card)
  - [Data entities and access pattern](docs/entity_charts.md#data-entities-and-access-pattern)
    - [Entity Charts](docs/entity_charts.md#entity-charts)
    - [Access Pattern](docs/entity_charts.md#access-pattern)

## Setup

Rename `.env.sample` to `.env` and replace the following environment variable inside.

NAME | Description
-| -|
NEXT_PUBLIC_GRAPHQL_API_URL | The GraphQL Server URL
GRAPHQL_API_KEY | The API Key for your GraphQL Server
TABLE_NAME | Your Flashcards DynamoDB table name
AWS_REGION | The AWS region for your resources
TABLE_OFFLINE | When is set to `true` it will use a local DynamoDB instance
BUCKET_OFFLINE | When is set to `true` it will use a local S3 instance

## Local DynamoDB

This project makes use of a mock database for local development.

Just set the `TABLE_OFFLINE=true` inside your `.env` to get started.
Then all the database requests will be mocked and you don't need to create any
real DynamoDB table.

### Mock DB table

The mock data for the `jp_flashcards` table is defined at `offline/migrations/flashcards-seed.json`.

To start DynamoDB local, run

```sh
pnpm localdb
```

Then you can verify the table exists with

```sh
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

finally, scan the table content with

```sh
aws dynamodb scan --table-name jp_flashcards --endpoint-url http://localhost:8000
```

## Getting Started

First, run the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

If you want to use a local DynamoDB instance, you will also need to open another terminal session
and run:

```sh
pnpm localdb
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
