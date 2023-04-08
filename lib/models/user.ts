import { Item } from './base';

export class User extends Item {
  username: string;
  name: string;

  constructor(username: string, name: string) {
    super();
    this.username = username;
    this.name = name || '';
  }

  static fromItem(item?: Record<string, string>): User {
    if (!item) {
      throw new Error('No item');
    }

    return new User(item.username, item.name);
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
    };
  }
}
