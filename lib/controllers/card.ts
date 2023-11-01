import { Card } from '@/gql/graphql';
import { GetCommand, GetCommandInput, QueryCommandInput, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { getDbClient } from '../clients/db-client';
import { CardItem } from '../models/card';
import { getImage } from '../helpers/get-image';
import { BUCKET_NAME, TABLE_NAME } from '../config';
import { logHelper } from '../helpers/log';

export const getCard = async (cardId: string): Promise<Card> => {
  const card = new CardItem(cardId);

  const params: GetCommandInput = {
    TableName: TABLE_NAME,
    Key: card.keys(),
  };

  try {
    const client = getDbClient();
    const data = await client.send(new GetCommand(params));

    if (!data.Item) {
      logHelper('warn', `Card "${cardId}" not found`);
      return {} as unknown as Card;
    }

    logHelper('info', `Retrieved card: "${cardId}"`, data.Item['PK'], data.Item['SK']);

    const image = await getImage(BUCKET_NAME, data.Item.image);
    logHelper('info', 'image', image && image.substring(0, 10), '...');

    return CardItem.fromItem({
      ...data.Item,
      image,
    });
  } catch (err) {
    logHelper('error', `Failed to retrieve card: "${cardId}"`);

    throw err;
  }
};

export const getCardsByLevelAndCategory = async (level: number, category: string): Promise<Array<Card>> => {
  const params: QueryCommandInput = {
    TableName: TABLE_NAME,
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
    const client = getDbClient();
    const data = await client.send(new QueryCommand(params));
    if (!data.Items?.length) {
      console.log('No items found');
      return [];
    }

    const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
    return card;
  } catch (err) {
    throw err;
  }
};

export const getCardsByCategory = async (category: string): Promise<Array<Card>> => {
  const params: QueryCommandInput = {
    TableName: TABLE_NAME,
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
    const client = getDbClient();
    const data = await client.send(new QueryCommand(params));
    if (!data.Items?.length) {
      console.log('No items found');
      return [];
    }

    const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
    return card;
  } catch (err) {
    throw err;
  }
};

export const getCardsByLevel = async (level: number): Promise<Array<Card>> => {
  const params: QueryCommandInput = {
    TableName: TABLE_NAME,
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
    const client = getDbClient();
    const data = await client.send(new QueryCommand(params));
    if (!data.Items?.length) {
      console.log('No items found');
      return [];
    }

    const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
    return card;
  } catch (err) {
    throw err;
  }
};
