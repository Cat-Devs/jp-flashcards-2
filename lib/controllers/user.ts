import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { getDbClient } from '../clients/db-client';
import { User } from '../../gql/graphql';
import { UserItem } from '../models/user';
import { TABLE_NAME } from '../config';

export const createUser = async (username: string, name: string, email: string): Promise<User> => {
  const user = new UserItem(username, name, email);
  const params: PutCommandInput = {
    TableName: TABLE_NAME,
    ConditionExpression: 'attribute_not_exists(PK)',
    Item: user.toItem(),
  };

  try {
    const client = getDbClient();
    await client.send(new PutCommand(params));
    return user;
  } catch (err) {
    throw err;
  }
};

export const getUser = async (username: string): Promise<UserItem> => {
  const user = new UserItem(username);
  const params: GetCommandInput = {
    TableName: TABLE_NAME,
    Key: user.keys(),
  };

  try {
    const client = getDbClient();
    const data = await client.send(new GetCommand(params));

    if (!data?.Item) {
      throw new Error(`Failed to retrieve user: "${username}"`);
    }

    const user = UserItem.fromItem(data.Item);
    return user;
  } catch (err) {
    throw err;
  }
};
