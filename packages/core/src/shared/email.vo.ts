import { ValueObject } from "./value-object";

export class Email implements ValueObject<Email, string> {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(email: string): Email {
    const finalEmail = email?.trim?.().toLowerCase();
    this.validate(finalEmail);
    return new Email(finalEmail);
  }

  private static validate(email: string): void {
    if (!email || typeof email !== "string") {
      throw new Error("O email não pode estar vazio");
    }

    if (email.length > 254) {
      throw new Error("O email deve ter no máximo 254 caracteres");
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-\u00A0-\uFFFF]+@[a-zA-Z0-9\u00A0-\uFFFF](?:[a-zA-Z0-9\u00A0-\uFFFF-]{0,61}[a-zA-Z0-9\u00A0-\uFFFF])?(?:\.[a-zA-Z0-9\u00A0-\uFFFF](?:[a-zA-Z0-9\u00A0-\uFFFF-]{0,61}[a-zA-Z0-9\u00A0-\uFFFF])?)*$/;

    if (!emailRegex.test(email)) {
      throw new Error("O formato do email é inválido");
    }

    const [localPart, domainPart] = email.split("@");

    if (localPart && localPart.includes("..")) {
      throw new Error(
        "O email não pode conter pontos consecutivos na parte local"
      );
    }

    // Verificar se não começa ou termina com ponto na parte local
    if (localPart && (localPart.startsWith(".") || localPart.endsWith("."))) {
      throw new Error(
        "O email não pode começar ou terminar com ponto na parte local"
      );
    }
  }

  public get value(): string {
    return this._value;
  }

  public get localPart(): string {
    return this._value.split("@")[0]!;
  }

  public get domain(): string {
    return this._value.split("@")[1]!;
  }

  public equals(other: Email): boolean {
    if (!(other instanceof Email)) {
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
