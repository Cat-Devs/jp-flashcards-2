import 'aws-sdk-client-mock-jest';
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getCard, getCardsByCategory, getCardsByLevel } from './card';
import { CardItem } from '../models/card';

describe('Card', () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);

  describe('getCard', () => {
    it('should return a card', async () => {
      const testCardId = 'test-id';
      const testCard = new CardItem(testCardId);
      ddbMock.on(GetCommand).resolves({ Item: { PK: testCardId } });
      const params: GetCommandInput = {
        TableName: process.env.CARDS_TABLE_NAME as string,
        Key: testCard.keys(),
      };

      const res = await getCard(testCardId);

      expect(ddbMock).toHaveReceivedCommandWith(GetCommand, params);
      expect(res.id).toBe(testCardId);
    });

    it('should throw an error when the card is not found', async () => {
      const testCardId = 'another-id';
      ddbMock.on(GetCommand).resolves({});

      expect.assertions(1);
      await expect(getCard(testCardId)).rejects.toThrowError(`Failed to retrieve card: "${testCardId}"`);
    });

    it('should throw an error when failing to perform the query operation', async () => {
      const testCardId = 'another-id';
      const testError = 'Test error';
      ddbMock.on(GetCommand).rejects(testError);

      expect.assertions(1);
      await expect(getCard(testCardId)).rejects.toThrowError(testError);
    });
  });

  describe('getCardsByCategory', () => {
    it('should return a list of cards', async () => {
      const testCard = new CardItem('testCardId');
      const testCategory = 'cats';
      ddbMock.on(QueryCommand).resolves({ Items: [testCard.toItem()] });
      const params: QueryCommandInput = {
        TableName: process.env.CARDS_TABLE_NAME as string,
        IndexName: 'GSI2',
        KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk)',
        ExpressionAttributeNames: {
          '#PK': 'GSI2-PK',
          '#SK': 'GSI2-SK',
        },
        ExpressionAttributeValues: {
          ':pk': `cc#${testCategory}`,
          ':sk': `cl#`,
        },
      };

      const res = await getCardsByCategory(testCategory);

      expect(ddbMock).toHaveReceivedCommandWith(QueryCommand, params);
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(testCard);
    });

    it('should return a list of cards matching a requested category', async () => {
      const testCard = new CardItem('testCardId');
      ddbMock.on(QueryCommand).resolves({
        Items: [testCard],
      });
      const res = await getCardsByCategory('cats');

      expect(res[0]).toEqual(testCard);
    });

    it('should throw an error when the cards are not found', async () => {
      ddbMock.on(QueryCommand).resolves({
        Items: [],
      });

      expect.assertions(1);
      await expect(getCardsByCategory('cats')).rejects.toThrowError(`Failed to retrieve cards`);
    });
  });

  describe('getCardsByLevel', () => {
    it('should return a list of cards', async () => {
      const testCard = new CardItem('testCardId');
      const testLevel = 1;
      ddbMock.on(QueryCommand).resolves({ Items: [testCard.toItem()] });
      const params: QueryCommandInput = {
        TableName: process.env.CARDS_TABLE_NAME as string,
        IndexName: 'GSI1',
        KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk)',
        ExpressionAttributeNames: {
          '#PK': 'GSI1-PK',
          '#SK': 'GSI1-SK',
        },
        ExpressionAttributeValues: {
          ':pk': `cl#00${testLevel}`,
          ':sk': `cc#`,
        },
      };

      const res = await getCardsByLevel(testLevel);

      expect(ddbMock).toHaveReceivedCommandWith(QueryCommand, params);
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(testCard);
    });

    it('should return a list of cards matching a requested level', async () => {
      const testCard = new CardItem('testCardId');
      ddbMock.on(QueryCommand).resolves({
        Items: [testCard],
      });
      const res = await getCardsByLevel(1);

      expect(res[0]).toEqual(testCard);
    });

    it('should throw an error when the cards are not found', async () => {
      ddbMock.on(QueryCommand).resolves({
        Items: [],
      });

      expect.assertions(1);
      await expect(getCardsByLevel(1)).rejects.toThrowError(`Failed to retrieve cards`);
    });
  });
});
