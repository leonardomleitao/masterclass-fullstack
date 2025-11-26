import { User } from "../model/user.entity";
import CryptoProvider from "../provider/crypto.provider";
import UseCase from "../../shared/use-case";
import UserRepository from "../provider/user.repository";

type Input = {
  email: string;
  password: string;
};

export default class UserLogin implements UseCase<Input, User> {
  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider
  ) {}

  async execute(input: Input): Promise<User> {
    const { email, password } = input;

    const withPassword = true;
    const user = await this.repo.findByEmail(email, withPassword);
    if (!user) throw new Error("Usuário não encontrado");

    const samePassword = await this.crypto.compare(password, user.password!);
    if (!samePassword) throw new Error("Senha incorreta");

    return user.withoutPassword();
  }
}
