import { User } from "../../../src";
import UserLogin from "../../../src/users/usecase/user-login.usecase";
import { MockUserRepository } from "../../data/mock-user.repository";
import { MockCryptoProvider } from "../../data/mock-crypto.provider";

describe("UserLogin UseCase", () => {
  let useCase: UserLogin;
  let mockRepository: MockUserRepository;
  let mockCrypto: MockCryptoProvider;
  const validHashPassword =
    "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

  beforeEach(() => {
    mockRepository = new MockUserRepository();
    mockCrypto = new MockCryptoProvider();
    useCase = new UserLogin(mockRepository, mockCrypto);
  });

  describe("execute", () => {
    it("should login user successfully with correct credentials", async () => {
      const user = new User({
        id: "user-123",
        name: "João Silva",
        email: "joao@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("password123", validHashPassword, true);

      const result = await useCase.execute({
        email: "joao@example.com",
        password: "password123",
      });

      expect(result.id).toBe(user.id);
      expect(result.name).toBe(user.name);
      expect(result.email).toBe(user.email);
      expect(result.password).toBeUndefined();
    });

    it("should find user by email with password flag", async () => {
      const user = new User({
        name: "Ana Costa",
        email: "ana@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("password123", validHashPassword, true);

      await useCase.execute({
        email: "ana@example.com",
        password: "password123",
      });

      const findByEmailCalls = mockRepository.getFindByEmailCalls();
      expect(findByEmailCalls).toHaveLength(1);
      expect(findByEmailCalls[0]?.email).toBe("ana@example.com");
      expect(findByEmailCalls[0]?.withPassword).toBe(true);
    });

    it("should compare password using crypto provider", async () => {
      const user = new User({
        name: "Maria José",
        email: "maria@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("mypassword", validHashPassword, true);

      await useCase.execute({
        email: "maria@example.com",
        password: "mypassword",
      });

      const compareCalls = mockCrypto.getCompareCalls();
      expect(compareCalls).toHaveLength(1);
      expect(compareCalls[0]?.password).toBe("mypassword");
      expect(compareCalls[0]?.hashedPassword).toBe(validHashPassword);
    });

    it("should throw error when user not found", async () => {
      await expect(
        useCase.execute({
          email: "nonexistent@example.com",
          password: "password123",
        })
      ).rejects.toThrow("Usuário não encontrado");
    });

    it("should throw error when password is incorrect", async () => {
      const user = new User({
        name: "Pedro Santos",
        email: "pedro@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("wrongpassword", validHashPassword, false);

      await expect(
        useCase.execute({
          email: "pedro@example.com",
          password: "wrongpassword",
        })
      ).rejects.toThrow("Senha incorreta");
    });

    it("should not compare password when user not found", async () => {
      try {
        await useCase.execute({
          email: "notfound@example.com",
          password: "password123",
        });
      } catch (error) {
        // Expected error
      }

      const compareCalls = mockCrypto.getCompareCalls();
      expect(compareCalls).toHaveLength(0);
    });

    it("should return user without password even when authentication succeeds", async () => {
      const userWithPassword = new User({
        id: "user-456",
        name: "Secure User",
        email: "secure@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(userWithPassword);
      mockCrypto.setCompareResult("correctpass", validHashPassword, true);

      const result = await useCase.execute({
        email: "secure@example.com",
        password: "correctpass",
      });

      expect(result.password).toBeUndefined();
      expect(result.id).toBe(userWithPassword.id);
      expect(result.name).toBe(userWithPassword.name);
      expect(result.email).toBe(userWithPassword.email);
    });

    it("should handle case-insensitive email matching", async () => {
      const user = new User({
        name: "Case Test User",
        email: "test@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("password", validHashPassword, true);

      const result = await useCase.execute({
        email: "TEST@EXAMPLE.COM",
        password: "password",
      });

      expect(result.email).toBe("test@example.com");
    });

    it("should work with different password types", async () => {
      const hashPassword1 = await new MockCryptoProvider().encrypt(
        "$2a$10$hash1"
      );
      const hashPassword2 = await new MockCryptoProvider().encrypt(
        "$2a$10$hash2"
      );

      const users = [
        new User({
          name: "User Abc",
          email: "user1@example.com",
          password: hashPassword1,
        }),
        new User({
          name: "User Abc",
          email: "user2@example.com",
          password: hashPassword2,
        }),
      ];

      users.forEach((user) => mockRepository.addUser(user));
      mockCrypto.setCompareResult("pass1", "$2a$10$hash1", true);
      mockCrypto.setCompareResult("pass2", "$2a$10$hash2", true);

      const result1 = await useCase.execute({
        email: "user1@example.com",
        password: "pass1",
      });
      const result2 = await useCase.execute({
        email: "user2@example.com",
        password: "pass2",
      });

      expect(result1.name).toBe("User Abc");
      expect(result1.password).toBeUndefined();
      expect(result2.name).toBe("User Abc");
      expect(result2.password).toBeUndefined();
    });

    it("should return new instance without affecting original user", async () => {
      const originalUser = new User({
        id: "user-789",
        name: "Original User",
        email: "original@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(originalUser);
      mockCrypto.setCompareResult("password", validHashPassword, true);

      const result = await useCase.execute({
        email: "original@example.com",
        password: "password",
      });

      expect(result).not.toBe(originalUser);
      expect(result.password).toBeUndefined();
      expect(originalUser.password).toBe(validHashPassword);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty email", async () => {
      await expect(
        useCase.execute({
          email: "",
          password: "password123",
        })
      ).rejects.toThrow("Usuário não encontrado");
    });

    it("should handle empty password", async () => {
      const user = new User({
        name: "Test User",
        email: "test@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("", validHashPassword, false);

      await expect(
        useCase.execute({
          email: "test@example.com",
          password: "",
        })
      ).rejects.toThrow("Senha incorreta");
    });

    it("should handle special characters in password", async () => {
      const user = new User({
        name: "Special User",
        email: "special@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      const specialPassword = "p@ssw0rd!@#$%^&*()";
      mockCrypto.setCompareResult(specialPassword, validHashPassword, true);

      const result = await useCase.execute({
        email: "special@example.com",
        password: specialPassword,
      });

      expect(result.name).toBe("Special User");
      expect(result.password).toBeUndefined();
    });

    it("should handle international email domains", async () => {
      const user = new User({
        name: "International User",
        email: "user@müller.de",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("password", validHashPassword, true);

      const result = await useCase.execute({
        email: "user@müller.de",
        password: "password",
      });

      expect(result.email).toBe("user@müller.de");
      expect(result.password).toBeUndefined();
    });

    it("should handle long passwords", async () => {
      const user = new User({
        name: "Long Pass User",
        email: "longpass@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      const longPassword = "a".repeat(100);
      mockCrypto.setCompareResult(longPassword, validHashPassword, true);

      const result = await useCase.execute({
        email: "longpass@example.com",
        password: longPassword,
      });

      expect(result.name).toBe("Long Pass User");
      expect(result.password).toBeUndefined();
    });

    it("should handle names with special characters", async () => {
      const user = new User({
        name: "José María O'Connor-Silva",
        email: "jose@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("password", validHashPassword, true);

      const result = await useCase.execute({
        email: "jose@example.com",
        password: "password",
      });

      expect(result.name).toBe("José María O'Connor-Silva");
      expect(result.password).toBeUndefined();
    });

    it("should maintain user ID consistency", async () => {
      const customId = "custom-user-id-123";
      const user = new User({
        id: customId,
        name: "ID Test User",
        email: "idtest@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("password", validHashPassword, true);

      const result = await useCase.execute({
        email: "idtest@example.com",
        password: "password",
      });

      expect(result.id).toBe(customId);
      expect(result.password).toBeUndefined();
    });

    it("should handle multiple failed login attempts", async () => {
      const user = new User({
        name: "Security User",
        email: "security@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(user);
      mockCrypto.setCompareResult("wrong1", validHashPassword, false);
      mockCrypto.setCompareResult("wrong2", validHashPassword, false);
      mockCrypto.setCompareResult("correct", validHashPassword, true);

      await expect(
        useCase.execute({
          email: "security@example.com",
          password: "wrong1",
        })
      ).rejects.toThrow("Senha incorreta");

      await expect(
        useCase.execute({
          email: "security@example.com",
          password: "wrong2",
        })
      ).rejects.toThrow("Senha incorreta");

      const result = await useCase.execute({
        email: "security@example.com",
        password: "correct",
      });

      expect(result.name).toBe("Security User");
      expect(result.password).toBeUndefined();
    });
  });
});
