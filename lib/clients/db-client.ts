import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../config';

let clientInstance: DynamoDBDocumentClient | undefined;

export const getDbClient = (force?: boolean): DynamoDBDocumentClient => {
  const isOffline = process.env.TABLE_OFFLINE === 'true';
  const REGION = isOffline ? 'localhost' : process.env.AWS_REGION; //e.g. "us-east-1"

  if (clientInstance && !force) {
    return clientInstance;
  }

  const client = new DynamoDBClient({
    region: REGION,
    ...(isOffline && { endpoint: 'http://localhost:8000' }),
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

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
