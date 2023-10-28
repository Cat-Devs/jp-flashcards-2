import { Card } from '@/gql/graphql';
import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { getDbClient } from '../clients/db-client';
import { UserCardsItem } from '../models/userCards';
import { UserItem } from '../models/user';
import { TABLE_NAME } from '../config';

export const getUserCards = async (username: string): Promise<Array<Card>> => {
  const userItem = new UserItem(username);
  const params: QueryCommandInput = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': userItem.pk,
      ':sk': 'c#',
    },
  };

  try {
    const client = getDbClient();
    const data = await client.send(new QueryCommand(params));

    if (!data?.Items) {
      throw new Error(`Failed to retrieve user cards`);
    }

    const cards = data.Items.map((dataItem) => UserCardsItem.fromItem(dataItem));
    return cards as any;
  } catch (err) {
    throw err;
  }
};
