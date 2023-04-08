import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { getClient } from './client';
import { User } from '../models/user';

export const createUser = async (user: User): Promise<User> => {
  const client = getClient();
  const params: PutCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    Item: user.toItem(),
  };

  try {
    await client.send(new PutCommand(params));
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUser = async (username: string): Promise<User> => {
  const client = getClient();
  const user = new User(username, '');

  const params: GetCommandInput = {
    TableName: process.env.CARDS_TABLE_NAME as string,
    Key: user.keys(),
  };

  try {
    await client.send(new GetCommand(params));
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
