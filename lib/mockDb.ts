import { DynamoDBDocumentClient, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

export function mockDb(isMock: boolean) {
  if (!isMock) {
    return;
  }

  const ddbMock = mockClient(DynamoDBDocumentClient);
  ddbMock
    .on(QueryCommand, {
      KeyConditionExpression: '#pk = :pk',
    })
    .resolves({
      Items: [
        {
          en: 'mock',
          category: 'mock',
          level: 1,
          id: 'mock',
        },
      ],
    })
    .on(ScanCommand)
    .resolves({
      Items: [
        {
          en: 'mock',
          category: 'mock',
          level: 1,
          id: 'mock',
        },
        {
          en: 'mock',
          category: 'mock',
          level: 2,
          id: 'mock',
        },
      ],
    });
}
