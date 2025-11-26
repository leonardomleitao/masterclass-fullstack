import { User } from "../model/user.entity";
import CryptoProvider from "../provider/crypto.provider";
import UseCase from "../../shared/use-case";
import UserRepository from "../provider/user.repository";

type Input = {
  name: string;
  email: string;
  password: string;
};

export default class RegisterUser implements UseCase<Input, void> {
  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider
  ) {}

  async execute(user: Input): Promise<void> {
    const existingUser = await this.repo.findByEmail(user.email);

    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    if (!user.password) {
      throw new Error("Senha é obrigatória");
    }

    if (user.name?.length < 3) {
      throw new Error("Nome deve ter pelo menos 3 caracteres");
    }

    const hashedPassword = await this.crypto.encrypt(user.password!);
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    await this.repo.save(newUser);
  }
}
