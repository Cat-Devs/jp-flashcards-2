import { Card } from '@/gql/graphql';
import { GetCommand, GetCommandInput, ScanCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { getClient } from '../client';
import { CardItem } from '../models/card';

export const getCard = async (cardId: string): Promise<Card> => {
  const params: GetCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    Key: new CardItem(cardId).keys(),
  };

  try {
    const client = getClient();
    const data = await client.send(new GetCommand(params));
    console.log(data);

    if (!data?.Item) {
      throw new Error(`Failed to retrieve card: "${cardId}"`);
    }

    const card = CardItem.fromItem(data.Item);
    return card;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCards = async (): Promise<Array<Card>> => {
  const params: ScanCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
  };

  try {
    const client = getClient();
    const data = await client.send(new ScanCommand(params));
    if (!data.Items?.length) {
      return [];
    }

    const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
    return card;
  } catch (err) {
    return [];
  }
};
