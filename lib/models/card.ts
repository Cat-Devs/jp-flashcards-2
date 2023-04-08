import { Item } from './base';
import { ulid } from 'ulid';

export class CardItem extends Item {
  cardId: string;
  en: string | undefined;
  jp: string | undefined;

  constructor(cardId: string = ulid(), en?: string, jp?: string) {
    super();
    this.cardId = cardId;
    this.en = en;
    this.jp = jp;
  }

  static fromItem(item?: Record<string, string>): CardItem {
    if (!item) {
      throw new Error('No item');
    }

    return new CardItem(item.cardId);
  }

  get pk(): string {
    return '';
  }

  get sk(): string {
    return `CARD#${this.cardId}`;
  }

  toItem(): Record<string, string> {
    return {
      ...this.keys,
      en: this.cardId,
    };
  }
}
