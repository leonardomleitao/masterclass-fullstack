import { User, UserProps } from "../model/user.entity";

export default interface UserRepository {
  save(user: User): Promise<void>;
  updateProps(user: User, props: Partial<UserProps>): Promise<void>;
  findByEmail(email: string, withPassword?: boolean): Promise<User | null>;
}
