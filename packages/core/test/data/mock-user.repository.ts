import { User, UserProps } from "../../src/users/model/user.entity";
import UserRepository from "../../src/users/provider/user.repository";

export class MockUserRepository implements UserRepository {
  private users: User[] = [];
  private saveCalls: User[] = [];
  private updatePropsCalls: Array<{ user: User; props: Partial<UserProps> }> =
    [];
  private findByEmailCalls: Array<{ email: string; withPassword?: boolean }> =
    [];

  constructor(initialUsers: User[] = []) {
    this.users = [...initialUsers];
  }

  async save(user: User): Promise<void> {
    this.saveCalls.push(user);

    const existingIndex = this.users.findIndex((u) => u.id === user.id);

    if (existingIndex >= 0) {
      this.users[existingIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  async updateProps(user: User, props: Partial<UserProps>): Promise<void> {
    this.updatePropsCalls.push({ user, props });

    const existingIndex = this.users.findIndex((u) => u.id === user.id);

    if (existingIndex >= 0) {
      const updatedUser = user.clone(props);
      this.users[existingIndex] = updatedUser;
    }
  }

  async findByEmail(
    email: string,
    withPassword?: boolean
  ): Promise<User | null> {
    this.findByEmailCalls.push({ email, withPassword });

    const user = this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return null;
    }

    return withPassword === false ? user.withoutPassword() : user;
  }

  // Test helper methods
  getSaveCalls(): User[] {
    return [...this.saveCalls];
  }

  getUpdatePropsCalls(): Array<{ user: User; props: Partial<UserProps> }> {
    return [...this.updatePropsCalls];
  }

  getFindByEmailCalls(): Array<{ email: string; withPassword?: boolean }> {
    return [...this.findByEmailCalls];
  }

  getUsers(): User[] {
    return [...this.users];
  }

  reset(): void {
    this.users = [];
    this.saveCalls = [];
    this.updatePropsCalls = [];
    this.findByEmailCalls = [];
  }

  setUsers(users: User[]): void {
    this.users = [...users];
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((u) => u.id !== userId);
  }

  getUserById(userId: string): User | null {
    return this.users.find((u) => u.id === userId) || null;
  }

  getUserByEmail(email: string): User | null {
    return this.users.find((u) => u.email === email) || null;
  }
}
