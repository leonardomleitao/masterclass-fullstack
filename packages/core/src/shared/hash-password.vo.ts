import { ValueObject } from "./value-object";

export class HashPassword implements ValueObject<HashPassword, string> {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(hashPassword: string): HashPassword {
    this.validate(hashPassword);
    return new HashPassword(hashPassword.trim());
  }

  private static validate(hashPassword: string): void {
    if (!hashPassword || typeof hashPassword !== "string") {
      throw new Error("O hash da senha não pode estar vazio");
    }

    const trimmedHash = hashPassword.trim();

    if (trimmedHash.length === 0) {
      throw new Error("O hash da senha não pode estar vazio");
    }

    // Regex para validar hash bcrypt (formato: $2a$, $2b$, $2x$, $2y$ seguido de cost e hash)
    const bcryptRegex = /^\$2[abxy]\$\d{2}\$[A-Za-z0-9.\/]{53}$/;

    if (!bcryptRegex.test(trimmedHash)) {
      throw new Error("A senha deve estar criptografada");
    }
  }

  public get value(): string {
    return this._value;
  }

  public get algorithm(): string {
    return this._value.split("$")[1]!;
  }

  public get cost(): number {
    return parseInt(this._value.split("$")[2]!, 10);
  }

  public equals(other: HashPassword): boolean {
    if (!(other instanceof HashPassword)) {
      return false;
    }
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }

  public toJSON(): string {
    return this._value;
  }
}
