import { Item } from './base';
import { ulid } from 'ulid';

export class CardItem extends Item {
  id: string;
  en: string;
  jp: string;
  category: string;
  level: number;

  constructor(id?: string, en?: string, jp?: string, category?: string, level?: number) {
    super('Card');
    this.id = id || ulid();
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

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      entityCard: this.entityType,
      id: this.id,
      category: this.category,
      en: this.en,
      jp: this.jp,
      level: this.level,
    };
  }
}
