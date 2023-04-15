import { Item } from './base';

export class UserCardsItem extends Item {
  cardId: string;
  username: string;
  accuracy: number;

  constructor(username: string, cardId: string, accuracy?: number) {
    super('UserCard');
    this.cardId = cardId;
    this.username = username;
    this.accuracy = accuracy || 0;
  }

  static fromItem(item?: Record<string, unknown>): UserCardsItem {
    if (!item) {
      throw new Error('No item');
    }
    const { username, cardId, accuracy } = item as any as UserCardsItem;

    return new UserCardsItem(username, cardId, accuracy);
  }

  get pk(): string {
    return `u#${this.username}`;
  }

  get sk(): string {
    return `c#${this.cardId}`;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      username: this.username,
      accuracy: this.accuracy,
      cardId: this.sk,
    };
  }
}
