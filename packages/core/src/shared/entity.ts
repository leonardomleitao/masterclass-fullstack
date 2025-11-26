import { Id } from "./id.vo";

export type EntityMode = "draft" | "valid";

export interface EntityProps<ID = string | number> {
  id?: ID;
}

export abstract class Entity<PROPS extends EntityProps> {
  public readonly props: Readonly<PROPS>;
  public readonly mode: EntityMode = "valid";
  public readonly id: NonNullable<PROPS["id"]>;

  constructor(props: Readonly<PROPS>, mode: EntityMode = "valid") {
    this.props = Object.freeze({
      ...props,
      id: props.id ? props.id : Id.create().value,
    });
    this.mode = mode;
    this.id = this.props.id!;

    if ((props as any).props) {
      throw new Error("Props should not contain 'props' property");
    }
  }

  get data(): Readonly<PROPS> {
    return this.props;
  }

  isDraft(): boolean {
    return this.mode === "draft";
  }

  isValid(): boolean {
    return this.mode === "valid";
  }

  equals(entity?: unknown): boolean {
    if (entity == null) return false;
    if (!(entity instanceof Entity)) return false;
    if (this === entity) return true;
    if (this.constructor !== entity.constructor) return false;
    return this.sameId(entity as Entity<PROPS>);
  }

  notEquals(entity?: unknown): boolean {
    return !this.equals(entity);
  }

  protected sameId(other: Entity<PROPS>): boolean {
    const id: any = this.id as any;
    return this.id === other.id;
  }

  asDraft(): this {
    return this.clone(this.props, "draft");
  }

  asValid(): this {
    return this.clone(this.props, "valid");
  }

  clone(newProps: Partial<PROPS>, newMode: EntityMode = this.mode): this {
    return new (this.constructor as any)(
      {
        ...this.props,
        ...newProps,
      },
      newMode
    );
  }
}
