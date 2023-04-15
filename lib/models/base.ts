export abstract class Item {
  #entityType: string;

  abstract get pk(): string;
  abstract get sk(): string;

  constructor(type: string) {
    this.#entityType = type;
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

  abstract toItem(): Record<string, unknown>;
}
