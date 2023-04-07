This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

Rename `.env.sample` to `.env` and replace the following environment variable inside.

NAME | Description
-| -|
NEXT_PUBLIC_GRAPHQL_API_URL | The GraphQL Server URL
GRAPHQL_API_KEY | The API Key for your GraphQL Server
CARDS_TABLE_NAME | Your Flashcards DynamoDB table name
DB_REGION | The AWS region for your DynamoDB table
MOCK | When is set to `true` it will use a mocked database. You won't need to set a real AWS DynamoDB table.

## Mock Database

This project makes use of a mock database for local development.

Just set the `MOCK=true` (set by default) inside your `.env` to get started. Then all the
database requests will be mocked and you don't need to create a real AWS DynamoDB table.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
