import * as client from '../client';
import { createUser, getUser } from './user';
import { UserItem } from '../models/user';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';

jest.mock('../client');

describe('User', () => {
  describe('getUser', () => {
    it('should return a user', async () => {
      const testUserName = 'test-user';
      const mockSend = jest.fn().mockReturnValue({
        Item: { username: testUserName },
      });
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockSend,
      } as any);
      const res = await getUser(testUserName);

      expect(mockSend).toBeCalled();
      expect(res.username).toBe(testUserName);
    });

    it('should throw an error when the user is not found', async () => {
      const testUserName = 'test-user';
      const mockSend = jest.fn().mockReturnValue({});
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockSend,
      } as any);

      expect.assertions(1);
      await expect(getUser(testUserName)).rejects.toThrowError(`Failed to retrieve user: "${testUserName}"`);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const testUserName = 'test-user';
      const testName = 'test-name';
      const testEmail = 'test-email';
      const testUser = new UserItem(testUserName, testName, testEmail);
      const testPutParams: PutCommandInput = {
        TableName: `${process.env.CARDS_TABLE_NAME}`,
        ConditionExpression: 'attribute_not_exists(PK)',
        Item: testUser.toItem(),
      };
      const mockPut = jest.fn();
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockPut,
      } as any);

      await createUser(testUserName, testName, testEmail);

      expect(mockPut).toHaveBeenCalledWith(expect.objectContaining({ input: testPutParams }));
    });

    it('should return the new user', async () => {
      const testUserName = 'test-user';
      const testName = 'test-name';
      const testEmail = 'test-email';
      const mockPut = jest.fn();
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockPut,
      } as any);
      const testUser = new UserItem(testUserName, testName, testEmail);

      const res = await createUser(testUserName, testName, testEmail);

      expect(res).toEqual(testUser);
    });

    it('should throw an error when failing to create the user', async () => {
      const testError = 'test error';
      const mockScan = jest.fn().mockImplementationOnce(() => {
        throw new Error(testError);
      });
      jest.spyOn(client, 'getClient').mockReturnValue({
        send: mockScan,
      } as any);

      expect.assertions(1);
      await expect(createUser('a', 'b', 'c')).rejects.toThrowError(testError);
    });
  });
});
