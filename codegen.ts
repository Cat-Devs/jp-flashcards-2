import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `./app/api/graphql/schema/*.graphql`,
  documents: ['app/**/query.graphql'],
  overwrite: true,
  generates: {
    './gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: false,
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
