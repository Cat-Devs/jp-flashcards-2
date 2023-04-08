import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { mockDb } from './mockDb';

const REGION = process.env.DB_REGION; //e.g. "us-east-1"
const isMock = process.env.MOCK === 'true';

let clientInstance: DynamoDBDocumentClient;

export const getClient = (): DynamoDBDocumentClient => {
  if (clientInstance) {
    return clientInstance;
  }

  const client = new DynamoDBClient({ region: REGION });
  mockDb(isMock);

  const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  };

  const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
  };

  const translateConfig = { marshallOptions, unmarshallOptions };

  // Create the DynamoDB Document client.
  clientInstance = DynamoDBDocumentClient.from(client, translateConfig);
  return clientInstance;
};
