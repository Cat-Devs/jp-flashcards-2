import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { getClient } from '../client';
import { UserItem } from '../models/user';

export const createUser = async (user: UserItem): Promise<UserItem> => {
  const params: PutCommandInput = {
    TableName: `${process.env.CARDS_TABLE_NAME}`,
    ConditionExpression: 'attribute_not_exists(PK)',
    Item: user.toItem(),
  };

  try {
    const client = getClient();
    await client.send(new PutCommand(params));
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUser = async (username: string): Promise<UserItem> => {
  const params: GetCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    Key: new UserItem(username).keys(),
  };

  try {
    const client = getClient();
    const data = await client.send(new GetCommand(params));

    if (!data?.Item) {
      throw new Error(`Failed to retrieve user: "${username}"`);
    }

    const user = UserItem.fromItem(data.Item);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
