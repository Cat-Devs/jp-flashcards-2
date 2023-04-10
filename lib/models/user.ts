import { Item } from './base';

export class UserItem extends Item {
  username: string;
  name: string;
  email: string;

  constructor(username: string, name?: string, email?: string) {
    super();
    this.username = username;
    this.name = name || '';
    this.email = email || '';
  }

  static fromItem(item?: Record<string, unknown>): UserItem {
    if (!item) {
      throw new Error('No item');
    }

    const { username, name, email } = item as any as UserItem;

    return new UserItem(username, name, email);
  }

  get pk(): string {
    return `USER#${this.username}`;
  }

  get sk(): string {
    return `USER#${this.username}`;
  }

  toItem(): Record<string, string> {
    return {
      ...this.keys,
      username: this.username,
      name: this.name,
      email: this.email,
    };
  }
}
