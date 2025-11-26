import { User } from "../../../src";
import ChangeUserName from "../../../src/users/usecase/change-user-name.usecase";
import { MockUserRepository } from "../../data/mock-user.repository";

describe("ChangeUserName UseCase", () => {
  let useCase: ChangeUserName;
  let mockRepository: MockUserRepository;
  let loggedUser: User;
  const validHashPassword =
    "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

  beforeEach(() => {
    mockRepository = new MockUserRepository();
    useCase = new ChangeUserName(mockRepository);

    loggedUser = new User({
      id: "user-123",
      name: "João Silva",
      email: "joao@example.com",
      password: validHashPassword,
    });

    mockRepository.addUser(loggedUser);
  });

  describe("execute", () => {
    it("should change user name successfully", async () => {
      const newName = "João Pedro Silva";

      await useCase.execute(newName, loggedUser);

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(1);
      expect(updateCalls[0]?.user.id).toBe(loggedUser.id);
      expect(updateCalls[0]?.props.name).toBe(newName);
    });

    it("should find user by email before updating", async () => {
      const newName = "Maria Silva";

      await useCase.execute(newName, loggedUser);

      const findByEmailCalls = mockRepository.getFindByEmailCalls();
      expect(findByEmailCalls).toHaveLength(1);
      expect(findByEmailCalls[0]?.email).toBe(loggedUser.email);
    });

    it("should throw error when user not found", async () => {
      const nonExistentUser = new User({
        name: "Usuário Inexistente",
        email: "inexistente@example.com",
      });

      await expect(
        useCase.execute("Novo Nome", nonExistentUser)
      ).rejects.toThrow("Usuário não encontrado");
    });

    it("should throw error when name is too short", async () => {
      const shortName = "AB";

      await expect(useCase.execute(shortName, loggedUser)).rejects.toThrow(
        "O nome deve ter pelo menos 3 caracteres"
      );
    });

    it("should throw error when name is empty", async () => {
      const emptyName = "";

      await expect(useCase.execute(emptyName, loggedUser)).rejects.toThrow(
        "O nome é obrigatório e deve ser uma string"
      );
    });

    it("should accept minimum valid name length", async () => {
      const minValidName = "Ana Silva";

      await useCase.execute(minValidName, loggedUser);

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(1);
      expect(updateCalls[0]?.props.name).toBe(minValidName);
    });

    it("should accept long valid names", async () => {
      const longName = "Maria José da Silva Santos Oliveira";

      await useCase.execute(longName, loggedUser);

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(1);
      expect(updateCalls[0]?.props.name).toBe(longName);
    });

    it("should work with different user", async () => {
      const anotherUser = new User({
        id: "user-456",
        name: "Ana Costa",
        email: "ana@example.com",
      });
      mockRepository.addUser(anotherUser);

      const newName = "Ana Paula Costa";

      await useCase.execute(newName, anotherUser);

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(1);
      expect(updateCalls[0]?.user.id).toBe(anotherUser.id);
      expect(updateCalls[0]?.props.name).toBe(newName);
    });

    it("should handle names with special characters", async () => {
      const nameWithSpecialChars = "José María O'Connor-Silva";

      await useCase.execute(nameWithSpecialChars, loggedUser);

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(1);
      expect(updateCalls[0]?.props.name).toBe(nameWithSpecialChars);
    });

    it("should handle names with accents", async () => {
      const accentedName = "François Müller";

      await useCase.execute(accentedName, loggedUser);

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(1);
      expect(updateCalls[0]?.props.name).toBe(accentedName);
    });

    it("should not call updateProps when user not found", async () => {
      const nonExistentUser = new User({
        name: "Usuário Inexistente",
        email: "inexistente@example.com",
      });

      try {
        await useCase.execute("Novo Nome", nonExistentUser);
      } catch (error) {
        // Expected error
      }

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(0);
    });

    it("should not call updateProps when name is invalid", async () => {
      try {
        await useCase.execute("AB", loggedUser);
      } catch (error) {
        // Expected error
      }

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(0);
    });

    it("should validate name before finding user", async () => {
      const shortName = "A";

      await expect(useCase.execute(shortName, loggedUser)).rejects.toThrow(
        "O nome deve ter pelo menos 3 caracteres"
      );

      // Should not have called findByEmail since validation failed first
      const findByEmailCalls = mockRepository.getFindByEmailCalls();
      expect(findByEmailCalls).toHaveLength(0);
    });
  });

  describe("Edge cases", () => {
    it("should trim whitespace in name", async () => {
      const nameWithWhitespace = "   João Silva   ";
      const expectedTrimmed = "João Silva";

      await useCase.execute(nameWithWhitespace, loggedUser);

      const updateCalls = mockRepository.getUpdatePropsCalls();
      expect(updateCalls).toHaveLength(1);
      expect(updateCalls[0]?.props.name).toBe(expectedTrimmed);
    });

    it("should throw error for name with numbers", async () => {
      const nameWithNumbers = "João Silva 123";

      await expect(
        useCase.execute(nameWithNumbers, loggedUser)
      ).rejects.toThrow("O nome contém caracteres inválidos");
    });

    it("should throw error for multiple consecutive spaces", async () => {
      const nameWithSpaces = "João    Silva";

      await expect(useCase.execute(nameWithSpaces, loggedUser)).rejects.toThrow(
        "O nome não pode conter espaços múltiplos consecutivos"
      );
    });

    it("should throw error for name without surname", async () => {
      const singleName = "João";

      await expect(useCase.execute(singleName, loggedUser)).rejects.toThrow(
        "O nome deve conter pelo menos um nome e um sobrenome"
      );
    });

    it("should throw error for name starting with special characters", async () => {
      const invalidName = "-João Silva";

      await expect(useCase.execute(invalidName, loggedUser)).rejects.toThrow(
        "O nome não pode começar ou terminar com espaços, hífens ou apóstrofes"
      );
    });

    it("should throw error for very long names", async () => {
      const veryLongName = "A".repeat(121) + " Silva";

      await expect(useCase.execute(veryLongName, loggedUser)).rejects.toThrow(
        "O nome deve ter no máximo 120 caracteres"
      );
    });
  });
});
