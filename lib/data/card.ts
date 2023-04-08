import { Card, Maybe } from '@/gql/graphql';
import { GetCommand, GetCommandInput, ScanCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { getClient } from './client';
import { CardItem } from '../models/card';

export const getCard = async (cardId: string): Promise<Maybe<Card>> => {
  const params: GetCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    Key: new CardItem(cardId).keys(),
  };

  try {
    const client = getClient();
    const data = await client.send(new GetCommand(params));

    if (!data?.Item) {
      return null;
    }

    const cardItem = data.Item as any as Card;
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
