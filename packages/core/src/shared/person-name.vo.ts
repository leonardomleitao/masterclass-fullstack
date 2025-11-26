import { ValueObject } from "./value-object";

export class PersonName implements ValueObject<PersonName, string> {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(name: string): PersonName {
    this.validate(name);
    return new PersonName(name.trim());
  }

  private static validate(name: string): void {
    if (!name || typeof name !== "string") {
      throw new Error("O nome é obrigatório e deve ser uma string");
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres");
    }

    if (trimmedName.length > 120) {
      throw new Error("O nome deve ter no máximo 120 caracteres");
    }

    const validNameRegex =
      /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]+$/;
    if (!validNameRegex.test(trimmedName)) {
      throw new Error(
        "O nome contém caracteres inválidos. Apenas letras, espaços, apóstrofes e hífens são permitidos"
      );
    }

    const nameParts = trimmedName
      .split(/\s+/)
      .filter((part) => part.length > 0);
    if (nameParts.length < 2) {
      throw new Error("O nome deve conter pelo menos um nome e um sobrenome");
    }

    if (/\s{2,}/.test(trimmedName)) {
      throw new Error("O nome não pode conter espaços múltiplos consecutivos");
    }

    // Validar se não começa ou termina com caracteres especiais
    if (/^[-'\s]|[-'\s]$/.test(trimmedName)) {
      throw new Error(
        "O nome não pode começar ou terminar com espaços, hífens ou apóstrofes"
      );
    }
  }

  public get value(): string {
    return this._value;
  }

  public get firstName(): string {
    const firstName = this._value.split(" ")[0];
    return firstName!;
  }

  public get lastName(): string {
    const parts = this._value.split(" ");
    const lastName = parts[parts.length - 1];
    return lastName!;
  }

  public get fullName(): string {
    return this._value;
  }

  public get initials(): string {
    const nameParts = this.value
      .trim()
      .split(/\s+/)
      .filter((part) => part.length > 0);

    return (this.firstName.charAt(0) + this.lastName.charAt(0)).toUpperCase();
  }

  public equals(other: PersonName): boolean {
    if (!(other instanceof PersonName)) {
      return false;
    }
    return this._value.toLowerCase() === other._value.toLowerCase();
  }

  public toString(): string {
    return this._value;
  }

  public toJSON(): string {
    return this._value;
  }

  public toFormattedString(): string {
    return this._value
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(" ");
  }
}
