import { ulid } from 'ulid';

export abstract class Item {
  #entityType: string;
  #id: string;

  abstract get pk(): string;
  abstract get sk(): string;

  constructor(type: string, id?: string) {
    this.#entityType = type;
    this.#id = id || ulid();
  }

  public get entityType() {
    return this.#entityType;
  }

  public keys() {
    return {
      PK: this.pk,
      SK: this.sk,
    };
  }

  public get id(): string {
    return this.#id;
  }

  abstract toItem(): Record<string, unknown>;
}
