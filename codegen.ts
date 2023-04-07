import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `./pages/api/schema/*.graphql`,
  documents: ['app/**/query.graphql'],
  overwrite: true,
  generates: {
    './gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: '@apollo/client',
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
