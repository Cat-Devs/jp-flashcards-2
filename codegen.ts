import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `./app/api/graphql/schema/*.graphql`,
  documents: ['lib/queries/**'],
  overwrite: true,
  generates: {
    './gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
