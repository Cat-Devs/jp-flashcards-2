import * as client from '../client';
import { getUserCards } from './userCards';
import {} from '../models/userCards';
import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { UserItem } from '../models/user';

jest.mock('../client');

describe('userCards', () => {
  describe('getUserCards', () => {
    it('should return the cards for a given user', async () => {
      const testUserName = 'test-user';
      const mockQuery = jest.fn().mockReturnValue({ Items: [{}] });
      jest.spyOn(client, 'getClient').mockReturnValue({ send: mockQuery } as any);
      const res = await getUserCards(testUserName);

      expect(mockQuery).toBeCalled();
      expect(res.length).toBe(1);
    });

    it('should query the cards for a given user', async () => {
      const testUserName = 'test-user';
      const mockQuery = jest.fn().mockReturnValue({ Items: [{}] });
      const userItem = new UserItem(testUserName);
      const testQueryParams: QueryCommandInput = {
        TableName: process.env.CARDS_TABLE_NAME as string,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': userItem.pk,
          ':sk': 'c#',
        },
      };
      jest.spyOn(client, 'getClient').mockReturnValue({ send: mockQuery } as any);

      await getUserCards(testUserName);

      expect(mockQuery).toHaveBeenCalledWith(expect.objectContaining({ input: testQueryParams }));
    });

    it('should throw an error when failing to perform the query operation', async () => {
      const testUserName = 'test-user';
      const testError = 'test error';
      const mockQuery = jest.fn().mockImplementationOnce(() => {
        throw new Error(testError);
      });
      jest.spyOn(client, 'getClient').mockReturnValue({ send: mockQuery } as any);

      expect.assertions(1);
      await expect(getUserCards(testUserName)).rejects.toThrowError(testError);
    });

    it('should throw an error when failing to retrieve user cards', async () => {
      const testUserName = 'test-user';
      const mockQuery = jest.fn().mockReturnValue(null);
      jest.spyOn(client, 'getClient').mockReturnValue({ send: mockQuery } as any);

      expect.assertions(1);
      await expect(getUserCards(testUserName)).rejects.toThrowError(`Failed to retrieve user cards`);
    });
  });
});
