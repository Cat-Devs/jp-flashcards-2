import { CardItem } from './card';

describe('CardItem', () => {
  it('should create a Card item', () => {
    const testCard = new CardItem(undefined, 'en', 'romaji', 'category', 1);

    expect(testCard.entityType).toBe('Card');
  });

  it('should create a Card item from a given item', () => {
    const testItem = {};

    const rest = CardItem.fromItem(testItem);

    expect(rest.entityType).toBe('Card');
  });

  it('should throw an error when failing to create a card from a given item', () => {
    expect.assertions(1);
    expect(() => CardItem.fromItem()).toThrowError(`No item`);
  });
});
