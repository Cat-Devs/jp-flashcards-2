import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `./pages/api/*.gql`,
  documents: ['app/**/*.gql'],
  generates: {
    './gql/graphql.tsx': {
      // preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      // presetConfig: {
      //   gqlTagName: 'gql',
      // },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
