import { User } from "../../../src";
import UserByEmail from "../../../src/users/usecase/user-by-email.usecase";
import { MockUserRepository } from "../../data/mock-user.repository";

describe("UserByEmail UseCase", () => {
  let useCase: UserByEmail;
  let mockRepository: MockUserRepository;
  const validHashPassword =
    "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

  beforeEach(() => {
    mockRepository = new MockUserRepository();
    useCase = new UserByEmail(mockRepository);
  });

  describe("execute", () => {
    it("should return user without password when user exists", async () => {
      const userWithPassword = new User({
        id: "user-123",
        name: "João Silva",
        email: "joao@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(userWithPassword);

      const result = await useCase.execute("joao@example.com");

      expect(result.id).toBe(userWithPassword.id);
      expect(result.name).toBe(userWithPassword.name);
      expect(result.email).toBe(userWithPassword.email);
      expect(result.password).toBeUndefined();
    });

    it("should call repository findByEmail with correct email", async () => {
      const user = new User({
        name: "Ana Costa",
        email: "ana@example.com",
      });
      mockRepository.addUser(user);

      await useCase.execute("ana@example.com");

      const findByEmailCalls = mockRepository.getFindByEmailCalls();
      expect(findByEmailCalls).toHaveLength(1);
      expect(findByEmailCalls[0]?.email).toBe("ana@example.com");
    });

    it("should throw error when user not found", async () => {
      await expect(useCase.execute("nonexistent@example.com")).rejects.toThrow(
        "Usuário não encontrado"
      );
    });

    it("should return user without password even if original had no password", async () => {
      const userWithoutPassword = new User({
        id: "user-456",
        name: "Maria José",
        email: "maria@example.com",
      });
      mockRepository.addUser(userWithoutPassword);

      const result = await useCase.execute("maria@example.com");

      expect(result.id).toBe(userWithoutPassword.id);
      expect(result.name).toBe(userWithoutPassword.name);
      expect(result.email).toBe(userWithoutPassword.email);
      expect(result.password).toBeUndefined();
    });

    it("should handle case-sensitive email search", async () => {
      const user = new User({
        name: "Case Test User",
        email: "CaseTest@EXAMPLE.COM",
      });
      mockRepository.addUser(user);

      const result = await useCase.execute("CaseTest@EXAMPLE.COM");

      expect(result.email).toBe("casetest@example.com");
    });

    it("should work with different email formats", async () => {
      const users = [
        new User({ name: "User Abc", email: "user@domain.com" }),
        new User({ name: "User Abc", email: "user.name@domain.co.uk" }),
        new User({ name: "User Abc", email: "user+tag@domain.org" }),
        new User({ name: "User Abc", email: "user_name@domain-name.net" }),
      ];

      users.forEach((user) => mockRepository.addUser(user));

      for (const user of users) {
        const result = await useCase.execute(user.email);
        expect(result.email).toBe(user.email);
        expect(result.name).toBe(user.name);
        expect(result.password).toBeUndefined();
      }
    });

    it("should handle international email domains", async () => {
      const user = new User({
        name: "International User",
        email: "user@müller.de",
      });
      mockRepository.addUser(user);

      const result = await useCase.execute("user@müller.de");

      expect(result.email).toBe("user@müller.de");
      expect(result.name).toBe("International User");
      expect(result.password).toBeUndefined();
    });

    it("should return new instance without password", async () => {
      const originalUser = new User({
        id: "user-789",
        name: "Test User",
        email: "test@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(originalUser);

      const result = await useCase.execute("test@example.com");

      expect(result).not.toBe(originalUser);
      expect(result.id).toBe(originalUser.id);
      expect(result.password).toBeUndefined();
      expect(originalUser.password).toBe(validHashPassword);
    });

    it("should handle multiple users with different emails", async () => {
      const user1 = new User({
        name: "First User",
        email: "first@example.com",
        password: validHashPassword,
      });
      const user2 = new User({
        name: "Second User",
        email: "second@example.com",
      });

      mockRepository.addUser(user1);
      mockRepository.addUser(user2);

      const result1 = await useCase.execute("first@example.com");
      const result2 = await useCase.execute("second@example.com");

      expect(result1.name).toBe("First User");
      expect(result1.password).toBeUndefined();
      expect(result2.name).toBe("Second User");
      expect(result2.password).toBeUndefined();
    });

    it("should not call findByEmail when user not found", async () => {
      try {
        await useCase.execute("notfound@example.com");
      } catch (error) {
        // Expected error
      }

      const findByEmailCalls = mockRepository.getFindByEmailCalls();
      expect(findByEmailCalls).toHaveLength(1);
      expect(findByEmailCalls[0]?.email).toBe("notfound@example.com");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty repository", async () => {
      await expect(useCase.execute("any@example.com")).rejects.toThrow(
        "Usuário não encontrado"
      );
    });

    it("should handle special characters in email", async () => {
      const user = new User({
        name: "Special Email User",
        email: "user+test@example.com",
      });
      mockRepository.addUser(user);

      const result = await useCase.execute("user+test@example.com");

      expect(result.email).toBe("user+test@example.com");
      expect(result.password).toBeUndefined();
    });

    it("should handle long email addresses", async () => {
      const longEmail =
        "very.long.email.address.for.testing@example-domain.com";
      const user = new User({
        name: "Long Email User",
        email: longEmail,
      });
      mockRepository.addUser(user);

      const result = await useCase.execute(longEmail);

      expect(result.email).toBe(longEmail);
      expect(result.password).toBeUndefined();
    });

    it("should handle names with special characters", async () => {
      const user = new User({
        name: "José María O'Connor-Silva",
        email: "jose@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);

      const result = await useCase.execute("jose@example.com");

      expect(result.name).toBe("José María O'Connor-Silva");
      expect(result.password).toBeUndefined();
    });

    it("should preserve all user properties except password", async () => {
      const user = new User({
        id: "custom-id-123",
        name: "Complete User",
        email: "complete@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);

      const result = await useCase.execute("complete@example.com");

      expect(result.id).toBe("custom-id-123");
      expect(result.name).toBe("Complete User");
      expect(result.email).toBe("complete@example.com");
      expect(result.password).toBeUndefined();
    });

    it("should handle users with minimum valid data", async () => {
      const user = new User({
        name: "Ana Silva",
        email: "a@b.co",
      });
      mockRepository.addUser(user);

      const result = await useCase.execute("a@b.co");

      expect(result.name).toBe("Ana Silva");
      expect(result.email).toBe("a@b.co");
      expect(result.password).toBeUndefined();
    });
  });
});
