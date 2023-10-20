import { Card } from '@/gql/graphql';
import { GetCommand, GetCommandInput, QueryCommandInput, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { getClient } from '../client';
import { CardItem } from '../models/card';

export const getCard = async (cardId: string): Promise<Card> => {
  const card = new CardItem(cardId);
  const params: GetCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    Key: card.keys(),
  };

  try {
    const client = getClient();
    const data = await client.send(new GetCommand(params));

    if (!data?.Item) {
      throw new Error(`Failed to retrieve card: "${cardId}"`);
    }

    return CardItem.fromItem(data.Item);
  } catch (err) {
    throw err;
  }
};

export const getCardsByLevelAndCategory = async (level: number, category: string): Promise<Array<Card>> => {
  const params: QueryCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    IndexName: 'GSI2',
    KeyConditionExpression: '#PK = :pk and #SK = :sk',
    ExpressionAttributeNames: {
      '#PK': 'GSI2-PK',
      '#SK': 'GSI2-SK',
    },
    ExpressionAttributeValues: {
      ':pk': `cc#${category}`,
      ':sk': `cl#00${level}`,
    },
  };

  try {
    const client = getClient();
    const data = await client.send(new QueryCommand(params));
    if (!data.Items?.length) {
      throw new Error(`Failed to retrieve cards`);
    }

    const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
    return card;
  } catch (err) {
    throw err;
  }
};

export const getCardsByCategory = async (category: string): Promise<Array<Card>> => {
  const params: QueryCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    IndexName: 'GSI2',
    KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk)',
    ExpressionAttributeNames: {
      '#PK': 'GSI2-PK',
      '#SK': 'GSI2-SK',
    },
    ExpressionAttributeValues: {
      ':pk': `cc#${category}`,
      ':sk': `cl#`,
    },
  };

  try {
    const client = getClient();
    const data = await client.send(new QueryCommand(params));
    if (!data.Items?.length) {
      throw new Error(`Failed to retrieve cards`);
    }

    const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
    return card;
  } catch (err) {
    throw err;
  }
};

export const getCardsByLevel = async (level: number): Promise<Array<Card>> => {
  const params: QueryCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    IndexName: 'GSI1',
    KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk)',
    ExpressionAttributeNames: {
      '#PK': 'GSI1-PK',
      '#SK': 'GSI1-SK',
    },
    ExpressionAttributeValues: {
      ':pk': `cl#00${level}`,
      ':sk': `cc#`,
    },
  };

  try {
    const client = getClient();
    const data = await client.send(new QueryCommand(params));
    if (!data.Items?.length) {
      throw new Error(`Failed to retrieve cards`);
    }

    const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
    return card;
  } catch (err) {
    throw err;
  }
};
