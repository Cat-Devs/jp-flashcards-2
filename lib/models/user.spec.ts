import { UserItem } from './user';

describe('UserItem', () => {
  it('should create a User item', () => {
    const testUser = new UserItem('username');

    expect(testUser.entityType).toBe('User');
  });

  it('should create a User item from a given user', () => {
    const testUserItem = {};

    const rest = UserItem.fromItem(testUserItem);

    expect(rest.entityType).toBe('User');
  });

  it('should throw an error when failing to create a user from a given item', () => {
    expect.assertions(1);
    expect(() => UserItem.fromItem()).toThrowError(`No item`);
  });
});
