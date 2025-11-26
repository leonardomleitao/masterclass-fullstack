import { User } from "../../../src";
import RegisterUser from "../../../src/users/usecase/register-user.usecase";
import { MockUserRepository } from "../../data/mock-user.repository";
import { MockCryptoProvider } from "../../data/mock-crypto.provider";

describe("RegisterUser UseCase", () => {
  let useCase: RegisterUser;
  let mockRepository: MockUserRepository;
  let mockCrypto: MockCryptoProvider;
  const validHashPassword =
    "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

  beforeEach(() => {
    mockRepository = new MockUserRepository();
    mockCrypto = new MockCryptoProvider();
    useCase = new RegisterUser(mockRepository, mockCrypto);
  });

  describe("execute", () => {
    it("should register user successfully", async () => {
      const userData = {
        name: "João Silva",
        email: "joao@example.com",
        password: "password123",
      };

      mockCrypto.setEncryptResult(userData.password, validHashPassword);

      await useCase.execute(userData);

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(1);
      expect(saveCalls[0]?.name).toBe(userData.name);
      expect(saveCalls[0]?.email).toBe(userData.email);
      expect(saveCalls[0]?.password).toBe(validHashPassword);
    });

    it("should check if user already exists", async () => {
      const userData = {
        name: "Ana Costa",
        email: "ana@example.com",
        password: "password123",
      };

      await useCase.execute(userData);

      const findByEmailCalls = mockRepository.getFindByEmailCalls();
      expect(findByEmailCalls).toHaveLength(1);
      expect(findByEmailCalls[0]?.email).toBe(userData.email);
    });

    it("should throw error when user already exists", async () => {
      const existingUser = new User({
        name: "Existing User",
        email: "existing@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(existingUser);

      const userData = {
        name: "New User",
        email: "existing@example.com",
        password: "password123",
      };

      await expect(useCase.execute(userData)).rejects.toThrow(
        "Usuário já existe"
      );
    });

    it("should throw error when password is empty", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "",
      };

      await expect(useCase.execute(userData)).rejects.toThrow(
        "Senha é obrigatória"
      );
    });

    it("should throw error when password is undefined", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: undefined as any,
      };

      await expect(useCase.execute(userData)).rejects.toThrow(
        "Senha é obrigatória"
      );
    });

    it("should throw error when name is too short", async () => {
      const userData = {
        name: "AB",
        email: "test@example.com",
        password: "password123",
      };

      await expect(useCase.execute(userData)).rejects.toThrow(
        "Nome deve ter pelo menos 3 caracteres"
      );
    });

    it("should throw error when name is undefined", async () => {
      const userData = {
        name: undefined as any,
        email: "test@example.com",
        password: "password123",
      };

      await expect(useCase.execute(userData)).rejects.toThrow(
        "O nome é obrigatório e deve ser uma string"
      );
    });

    it("should encrypt password before saving", async () => {
      const userData = {
        name: "Secure User",
        email: "secure@example.com",
        password: "mypassword",
      };

      await useCase.execute(userData);

      const encryptCalls = mockCrypto.getEncryptCalls();
      expect(encryptCalls).toHaveLength(1);
      expect(encryptCalls[0]).toBe(userData.password);
    });

    it("should not save user when user already exists", async () => {
      const existingUser = new User({
        name: "Existing User",
        email: "existing@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(existingUser);

      const userData = {
        name: "New User",
        email: "existing@example.com",
        password: "password123",
      };

      try {
        await useCase.execute(userData);
      } catch (error) {
        // Expected error
      }

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(0);
    });

    it("should not save user when validation fails", async () => {
      const userData = {
        name: "AB",
        email: "test@example.com",
        password: "password123",
      };

      try {
        await useCase.execute(userData);
      } catch (error) {
        // Expected error
      }

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(0);
    });

    it("should not encrypt password when validation fails", async () => {
      const userData = {
        name: "AB",
        email: "test@example.com",
        password: "password123",
      };

      try {
        await useCase.execute(userData);
      } catch (error) {
        // Expected error
      }

      const encryptCalls = mockCrypto.getEncryptCalls();
      expect(encryptCalls).toHaveLength(0);
    });

    it("should handle different valid inputs", async () => {
      const userData = {
        name: "Maria José Santos",
        email: "maria.jose@example.com.br",
        password: "strongPassword456",
      };

      await useCase.execute(userData);

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(1);
      expect(saveCalls[0]?.name).toBe(userData.name);
      expect(saveCalls[0]?.email).toBe(userData.email);
    });

    it("should generate unique user ID", async () => {
      const userData = {
        name: "ID Test User",
        email: "idtest@example.com",
        password: "password123",
      };

      await useCase.execute(userData);

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(1);
      expect(saveCalls[0]?.id).toBeDefined();
      expect(saveCalls[0]?.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle names with special characters", async () => {
      const userData = {
        name: "José María O'Connor-Silva",
        email: "jose@example.com",
        password: "password123",
      };

      await useCase.execute(userData);

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(1);
      expect(saveCalls[0]?.name).toBe(userData.name);
    });

    it("should handle international email domains", async () => {
      const userData = {
        name: "International User",
        email: "user@müller.de",
        password: "password123",
      };

      await useCase.execute(userData);

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(1);
      expect(saveCalls[0]?.email).toBe(userData.email);
    });

    it("should handle long passwords", async () => {
      const longPassword = "a".repeat(100);
      const userData = {
        name: "Long Password User",
        email: "longpass@example.com",
        password: longPassword,
      };

      await useCase.execute(userData);

      const encryptCalls = mockCrypto.getEncryptCalls();
      expect(encryptCalls).toHaveLength(1);
      expect(encryptCalls[0]).toBe(longPassword);
    });

    it("should handle minimum valid name length", async () => {
      const userData = {
        name: "Ana S",
        email: "ana@example.com",
        password: "password123",
      };

      await useCase.execute(userData);

      const saveCalls = mockRepository.getSaveCalls();
      expect(saveCalls).toHaveLength(1);
      expect(saveCalls[0]?.name).toBe(userData.name);
    });

    it("should handle case-sensitive emails", async () => {
      const userData = {
        name: "Case Test User",
        email: "CaseTest@EXAMPLE.COM",
        password: "password123",
      };

      await useCase.execute(userData);

      const findByEmailCalls = mockRepository.getFindByEmailCalls();
      expect(findByEmailCalls[0]?.email).toBe(userData.email);
    });

    it("should handle empty name after trimming", async () => {
      const userData = {
        name: "  ",
        email: "whitespace@example.com",
        password: "password123",
      };

      await expect(useCase.execute(userData)).rejects.toThrow(
        "Nome deve ter pelo menos 3 caracteres"
      );
    });

    it("should not interfere with existing users when registration fails", async () => {
      const existingUser = new User({
        name: "Existing User",
        email: "existing@example.com",
        password: validHashPassword,
      });
      mockRepository.addUser(existingUser);

      const userData = {
        name: "Short",
        email: "short@example.com",
        password: "password123",
      };

      try {
        await useCase.execute(userData);
      } catch (error) {
        // Expected error
      }

      const users = mockRepository.getUsers();
      expect(users).toHaveLength(1);
      expect(users[0]?.email).toBe(existingUser.email);
    });

    it("should handle special password characters", async () => {
      const userData = {
        name: "Special Password User",
        email: "special@example.com",
        password: "p@ssw0rd!@#$%^&*()",
      };

      await useCase.execute(userData);

      const encryptCalls = mockCrypto.getEncryptCalls();
      expect(encryptCalls).toHaveLength(1);
      expect(encryptCalls[0]).toBe(userData.password);
    });
  });
});
