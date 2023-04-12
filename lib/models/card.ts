import { Card } from '@/gql/graphql';
import { Item } from './base';
import { ulid } from 'ulid';

export class CardItem extends Item {
  id: string;
  en: string;
  jp: string;
  category: string;
  level: number;

  constructor(cardId?: string, en?: string, jp?: string, category?: string, level?: number) {
    super();
    this.id = cardId || ulid();
    this.en = en || '';
    this.jp = jp || '';
    this.category = category || '';
    this.level = level || 0;
  }

  static fromItem(item?: Record<string, unknown>): CardItem {
    if (!item) {
      throw new Error('No item');
    }
    const { id, en, jp, category, level } = item as any as CardItem;

    return new CardItem(id, en, jp, category, level);
  }

  get pk(): string {
    return `c#${this.id}`;
  }

  get sk(): string {
    return `c#${this.id}`;
  }

  toItem(): Card {
    return {
      ...this.keys(),
      id: this.id,
      category: this.category,
      en: this.en,
      jp: this.jp,
      level: this.level,
    };
  }
}
