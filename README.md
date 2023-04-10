This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

Rename `.env.sample` to `.env` and replace the following environment variable inside.

NAME | Description
-| -|
NEXT_PUBLIC_GRAPHQL_API_URL | The GraphQL Server URL
GRAPHQL_API_KEY | The API Key for your GraphQL Server
CARDS_TABLE_NAME | Your Flashcards DynamoDB table name
DB_REGION | The AWS region for your DynamoDB table
OFFLINE | When is set to `true` it will use a local DynamoDB instance

## Local DynamoDB

This project makes use of a mock database for local development.

Just set the `OFFLINE=true` inside your `.env` to get started.
Then all the database requests will be mocked and you don't need to create any
real DynamoDB table.

### Mock DB table

The mock data for the `jp_flashcards_cards` table is defined at `offline/migrations/flashcards-seed.json`.

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
aws dynamodb scan --table-name jp_flashcards_cards --endpoint-url http://localhost:8000
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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
