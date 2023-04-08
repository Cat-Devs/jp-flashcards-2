import { DynamoDBDocumentClient, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import cards from '../__fixtures__/cards.json';

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
      Items: [cards[0]],
    })
    .on(ScanCommand)
    .resolves({
      Items: cards,
    });
}
