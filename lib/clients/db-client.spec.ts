import { getDbClient } from './db-client';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

jest.mock('@aws-sdk/client-dynamodb');
jest.mock('@aws-sdk/lib-dynamodb');

describe('DbClient', () => {
  let originalEnv = process.env;
  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return a DynamoDBDocumentClient clientInstance', () => {
    const testClientInstance = { test: true };
    (DynamoDBDocumentClient.from as jest.Mock).mockImplementationOnce(() => testClientInstance);

    const res = getDbClient(true);

    expect(DynamoDBDocumentClient.from).toBeCalled();
    expect(res).toBe(testClientInstance);
  });

  it('should point to a localhost database in OFFLINE mode', () => {
    (DynamoDBClient as jest.Mock).mockReturnValueOnce({});
    (DynamoDBDocumentClient.from as jest.Mock).mockImplementationOnce(() => {});
    process.env.OFFLINE = 'true';

    getDbClient(true);

    expect(DynamoDBClient).toBeCalledWith({
      endpoint: 'http://localhost:8000',
      region: 'localhost',
    });
  });

  it('should point to a remote database when OFFLINE is not set', () => {
    const testRegion = 'test-region';
    (DynamoDBClient as jest.Mock).mockReturnValueOnce({});
    (DynamoDBDocumentClient.from as jest.Mock).mockImplementationOnce(() => {});
    process.env.OFFLINE = 'false';
    process.env.AWS_REGION = testRegion;

    getDbClient(true);

    expect(DynamoDBClient).toBeCalledWith({ region: testRegion });
  });

  it('should return a previous client instance when available', () => {
    const testClientInstance = { test: true };
    (DynamoDBDocumentClient.from as jest.Mock).mockImplementationOnce(() => testClientInstance);
    process.env.OFFLINE = 'true';

    getDbClient(true);
    getDbClient();

    expect(DynamoDBClient).toBeCalledTimes(1);
    expect(DynamoDBDocumentClient.from).toBeCalledTimes(1);
  });
});
