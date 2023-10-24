import { Item } from './base';

export class CardItem extends Item {
  en: string;
  category: string;
  level: number;
  romaji?: string;
  sample?: string;
  image?: string;

  constructor(
    id?: string,
    en?: string,
    category?: string,
    level?: number,
    romaji?: string,
    sample?: string,
    image?: string
  ) {
    super('Card', id);
    this.en = en || '';
    this.category = category || '';
    this.level = level || 0;
    this.romaji = romaji;
    this.sample = sample;
    this.image = image;
  }

  static fromItem(item?: Record<string, any>): CardItem {
    if (!item) {
      throw new Error('No item');
    }

    const { PK, en, romaji, sample, category, image, level } = item;
    const id = `${PK}`.replace('c#', '');
    return new CardItem(id, en, category, level, romaji, sample, image);
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
      romaji: this.romaji,
      sample: this.sample,
      level: this.level,
      image: this.image,
    };
  }
}
