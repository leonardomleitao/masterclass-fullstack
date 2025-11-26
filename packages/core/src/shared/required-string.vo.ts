import { ValueObject } from "./value-object";

export interface RequiredStringOptions {
  attributeName?: string;
  errorMessage?: string;
  minLength?: number;
  maxLength?: number;
}

export class RequiredString implements ValueObject<RequiredString, string> {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(
    value: string,
    options?: RequiredStringOptions
  ): RequiredString {
    this.validate(value, options);
    return new RequiredString(value.trim());
  }

  private static validate(
    value: string,
    options?: RequiredStringOptions
  ): void {
    const errorMessage =
      options?.errorMessage ||
      `${options?.attributeName ?? "Valor"} é obrigatório`;

    if (!value || typeof value !== "string") {
      throw new Error(errorMessage);
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      throw new Error(errorMessage);
    }

    if (options?.minLength && trimmedValue.length < options.minLength) {
      throw new Error(
        `${options.attributeName ?? `"${value}"`} deve ter pelo menos ${options.minLength} caracteres`
      );
    }

    if (options?.maxLength && trimmedValue.length > options.maxLength) {
      throw new Error(
        `${options.attributeName ?? `"${value}"`} deve ter no máximo ${options.maxLength} caracteres`
      );
    }
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: RequiredString): boolean {
    return other instanceof RequiredString && this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }

  public toJSON(): string {
    return this._value;
  }
}
