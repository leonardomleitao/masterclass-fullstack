export interface ValueObject<T, V = any> {
  value: V;
  equals(other: T): boolean;
  toString(): string;
  toJSON(): string;
}
