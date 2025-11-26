import { PersonName } from "../../shared/person-name.vo";
import { Email, HashPassword, Id } from "../../shared";
import { Entity, EntityMode, EntityProps } from "../../shared/entity";

export interface UserProps extends EntityProps<string> {
  name?: string;
  email?: string;
  password?: string;
}

export class User extends Entity<UserProps> {
  public readonly name: string;
  public readonly email: string;
  public readonly password?: string;

  constructor(props: UserProps, mode: EntityMode = "valid") {
    super(props);
    this.name =
      mode === "draft"
        ? (props?.name ?? "")
        : PersonName.create(props?.name ?? "").value;
    this.email =
      mode === "draft"
        ? (props?.email ?? "")
        : Email.create(props?.email ?? "").value;
    this.password = props?.password
      ? HashPassword.create(props.password).value
      : undefined;
  }

  withoutPassword(): User {
    return this.clone({ password: undefined });
  }

  static draft(props: UserProps = {}) {
    return new User(props, "draft");
  }

  get $name(): PersonName {
    return PersonName.create(this.name);
  }

  get $email(): Email {
    return Email.create(this.email);
  }

  get $password(): HashPassword | undefined {
    return this.password ? HashPassword.create(this.password) : undefined;
  }
}
