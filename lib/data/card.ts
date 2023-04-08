import { Card, Maybe } from '@/gql/graphql';
import { QueryCommand, QueryCommandInput, ScanCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { getClient } from './client';

export const getCard = async (id: string): Promise<Maybe<Card>> => {
  const params: QueryCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: {
      '#pk': 'id',
    },
    ExpressionAttributeValues: {
      ':pk': id,
    },
  };

  try {
    const client = getClient();
    const data = await client.send(new QueryCommand(params));

    if (!data.Items?.length) {
      return null;
    }

    const cardItem: Card = data.Items[0] as any as Card;
    return cardItem;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCards = async (): Promise<Array<Maybe<Card>>> => {
  const params: ScanCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
  };

  try {
    const client = getClient();
    const data = await client.send(new ScanCommand(params));
    if (!data.Items?.length) {
      return [];
    }

    const cardItem: Card[] = data.Items as any as Card[];
    return cardItem;
  } catch (err) {
    return [];
  }
};
