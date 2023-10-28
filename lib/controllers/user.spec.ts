import 'aws-sdk-client-mock-jest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, QueryCommand, PutCommandInput, PutCommand } from '@aws-sdk/lib-dynamodb';
import { createUser, getUser } from './user';
import { UserItem } from '../models/user';
import { TABLE_NAME } from '../config';

describe('User', () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);

  describe('getUser', () => {
    it('should return a user', async () => {
      const testUserName = 'test-user';
      ddbMock.on(GetCommand).resolves({
        Item: { username: testUserName },
      });

      const res = await getUser(testUserName);

      expect(ddbMock).toReceiveCommand(GetCommand);
      expect(res.username).toBe(testUserName);
    });

    it('should try to get the requested user', async () => {
      const testUserName = 'test-user';
      const testUser = new UserItem(testUserName);
      const testGetParams = { Key: testUser.keys() };
      ddbMock.on(GetCommand).resolves({ Item: {} });

      await getUser(testUserName);

      expect(ddbMock).toReceiveCommandWith(GetCommand, testGetParams);
    });

    it('should throw an error when the user is not found', async () => {
      const testUserName = 'test-user';
      ddbMock.on(GetCommand).resolves({});

      expect.assertions(1);
      await expect(getUser(testUserName)).rejects.toThrowError(`Failed to retrieve user: "${testUserName}"`);
    });

    it('should throw an error when failing to perform the get operation', async () => {
      const testUserName = 'test-user';
      const testError = 'test error';
      ddbMock.on(GetCommand).rejects(testError);

      expect.assertions(1);
      await expect(getUser(testUserName)).rejects.toThrowError(testError);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const testUserName = 'test-user';
      const testName = 'test-name';
      const testEmail = 'test-email';
      const testUser = new UserItem(testUserName, testName, testEmail);
      const testPutParams: PutCommandInput = {
        TableName: TABLE_NAME,
        ConditionExpression: 'attribute_not_exists(PK)',
        Item: testUser.toItem(),
      };

      await createUser(testUserName, testName, testEmail);

      expect(ddbMock).toReceiveCommandWith(PutCommand, testPutParams);
    });

    it('should return the new user', async () => {
      const testUserName = 'test-user';
      const testName = 'test-name';
      const testEmail = 'test-email';
      const testUser = new UserItem(testUserName, testName, testEmail);

      const res = await createUser(testUserName, testName, testEmail);

      expect(res).toEqual(testUser);
    });

    it('should throw an error when failing to create the user', async () => {
      const testError = 'test error';
      ddbMock.on(PutCommand).rejects(testError);

      expect.assertions(1);
      await expect(createUser('a', 'b', 'c')).rejects.toThrowError(testError);
    });
  });
});
