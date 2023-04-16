import { UserCardsItem } from './userCards';

describe('UserItem', () => {
  it('should create a UserCard item', () => {
    const testUserCard = new UserCardsItem('username', 'cardId');

    expect(testUserCard.entityType).toBe('UserCard');
  });

  it('should create a UserCard item from a given item', () => {
    const testItem = {};

    const rest = UserCardsItem.fromItem(testItem);

    expect(rest.entityType).toBe('UserCard');
  });

  it('should throw an error when failing to create a userCard from a given item', () => {
    expect.assertions(1);
    expect(() => UserCardsItem.fromItem()).toThrowError(`No item`);
  });

  it('should return the list of keys', () => {
    const testUsername = 'testUsername';
    const testCardId = 'testCardId';
    const userCard = new UserCardsItem(testUsername, testCardId);
    expect(userCard.keys()).toEqual({
      PK: `u#${testUsername}`,
      SK: `c#${testCardId}`,
    });
  });

  it('should return the the userCard item', () => {
    const testUsername = 'testUsername';
    const testCardId = 'testCardId';
    const testAccuracy = 10;
    const userCard = new UserCardsItem(testUsername, testCardId, testAccuracy);
    expect(userCard.toItem()).toEqual({
      PK: `u#${testUsername}`,
      SK: `c#${testCardId}`,
      accuracy: testAccuracy,
      cardId: testCardId,
      username: testUsername,
    });
  });
});
