import { User } from "../model/user.entity";
import UseCase from "../../shared/use-case";
import UserRepository from "../provider/user.repository";

export default class UserByEmail implements UseCase<string, User> {
  constructor(private readonly repo: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.repo.findByEmail(email?.toLowerCase?.());
    if (!user) throw new Error("Usuário não encontrado");
    return user.withoutPassword();
  }
}
