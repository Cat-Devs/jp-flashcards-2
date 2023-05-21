import 'aws-sdk-client-mock-jest';
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getUserCards } from './userCards';
import { UserItem } from '../models/user';

describe('userCards', () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);

  describe('getUserCards', () => {
    it('should return the cards for a given user', async () => {
      const testUserName = 'test-user';
      ddbMock.on(QueryCommand).resolves({ Items: [{}] });

      const res = await getUserCards(testUserName);

      expect(ddbMock).toReceiveCommand(QueryCommand);
      expect(res.length).toBe(1);
    });

    it('should query the cards for a given user', async () => {
      const testUserName = 'test-user';
      const userItem = new UserItem(testUserName);
      const testQueryParams: QueryCommandInput = {
        TableName: process.env.CARDS_TABLE_NAME as string,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': userItem.pk,
          ':sk': 'c#',
        },
      };
      ddbMock.on(QueryCommand).resolves({ Items: [{}] });

      await getUserCards(testUserName);

      expect(ddbMock).toReceiveCommandWith(QueryCommand, testQueryParams);
    });

    it('should throw an error when failing to perform the query operation', async () => {
      const testUserName = 'test-user';
      const testError = 'test error';
      ddbMock.on(QueryCommand).rejects(testError);

      expect.assertions(1);
      await expect(getUserCards(testUserName)).rejects.toThrowError(testError);
    });

    it('should throw an error when failing to retrieve user cards', async () => {
      const testUserName = 'test-user';
      ddbMock.on(QueryCommand).resolves({});

      expect.assertions(1);
      await expect(getUserCards(testUserName)).rejects.toThrowError(`Failed to retrieve user cards`);
    });
  });
});
