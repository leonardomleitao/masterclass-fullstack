import { User, PersonName, Email, HashPassword } from "../../../src";

describe("User Entity", () => {
  // Hash bcrypt válido gerado com bcryptjs.hashSync('password123', 10)
  const validHashPassword =
    "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

  describe("Constructor", () => {
    it("should create user with provided properties", () => {
      const user = new User({
        name: "João Silva",
        email: "joao.silva@example.com",
        password: validHashPassword,
      });

      expect(user.name).toBe("João Silva");
      expect(user.email).toBe("joao.silva@example.com");
      expect(user.password).toBe(validHashPassword);
    });

    it("should create user with minimal properties", () => {
      const user = new User({
        name: "Ana Maria",
        email: "ana@example.com",
      });

      expect(user.name).toBe("Ana Maria");
      expect(user.email).toBe("ana@example.com");
      expect(user.password).toBeUndefined();
    });

    it("should generate id when not provided", () => {
      const user = new User({
        name: "Pedro Santos",
        email: "pedro@example.com",
      });

      expect(user.id).toBeDefined();
      expect(user.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      );
    });

    it("should use provided id", () => {
      const customId = "550e8400-e29b-41d4-a716-446655440000";
      const user = new User({
        id: customId,
        name: "Maria José",
        email: "maria@example.com",
      });

      expect(user.id).toBe(customId);
    });

    it("should throw error when creating user with empty properties", () => {
      expect(() => new User({})).toThrow(
        "O nome é obrigatório e deve ser uma string"
      );
    });

    it("should create user in draft mode", () => {
      const user = User.draft({
        name: "A",
        email: "user@",
      });

      expect(user.name).toBe("A");
      expect(user.email).toBe("user@");
    });

    it("should create empty user in draft mode", () => {
      const user = User.draft();

      expect(user.name).toBe("");
      expect(user.email).toBe("");
    });
  });

  describe("Name validation", () => {
    it("should accept valid name", () => {
      const user = new User({
        name: "Carlos Roberto",
        email: "carlos@example.com",
      });

      expect(user.name).toBe("Carlos Roberto");
    });

    it("should throw error for empty name", () => {
      expect(
        () =>
          new User({
            name: "",
            email: "test@example.com",
          })
      ).toThrow("O nome é obrigatório e deve ser uma string");
    });

    it("should throw error for undefined name", () => {
      expect(
        () =>
          new User({
            email: "test@example.com",
          })
      ).toThrow("O nome é obrigatório e deve ser uma string");
    });

    it("should throw error for short name", () => {
      expect(
        () =>
          new User({
            name: "AB",
            email: "test@example.com",
          })
      ).toThrow("O nome deve ter pelo menos 3 caracteres");
    });

    it("should throw error for name without surname", () => {
      expect(
        () =>
          new User({
            name: "João",
            email: "joao@example.com",
          })
      ).toThrow("O nome deve conter pelo menos um nome e um sobrenome");
    });

    it("should trim name whitespace", () => {
      const user = new User({
        name: "  José Silva  ",
        email: "jose@example.com",
      });

      expect(user.name).toBe("José Silva");
    });
  });

  describe("Email validation", () => {
    it("should accept valid email", () => {
      const user = new User({
        name: "Ana Costa",
        email: "ana.costa@example.com",
      });

      expect(user.email).toBe("ana.costa@example.com");
    });

    it("should convert email to lowercase", () => {
      const user = new User({
        name: "Paulo Lima",
        email: "PAULO.LIMA@EXAMPLE.COM",
      });

      expect(user.email).toBe("paulo.lima@example.com");
    });

    it("should throw error for empty email", () => {
      expect(
        () =>
          new User({
            name: "Test User",
            email: "",
          })
      ).toThrow("O email não pode estar vazio");
    });

    it("should throw error for undefined email", () => {
      expect(
        () =>
          new User({
            name: "Test User",
          })
      ).toThrow("O email não pode estar vazio");
    });

    it("should throw error for invalid email format", () => {
      expect(
        () =>
          new User({
            name: "Test User",
            email: "invalid-email",
          })
      ).toThrow("O formato do email é inválido");
    });

    it("should trim email whitespace", () => {
      const user = new User({
        name: "Test User",
        email: "  test@example.com  ",
      });

      expect(user.email).toBe("test@example.com");
    });
  });

  describe("Password handling", () => {
    it("should accept valid hash password", () => {
      const user = new User({
        name: "Secure User",
        email: "secure@example.com",
        password: validHashPassword,
      });

      expect(user.password).toBe(validHashPassword);
    });

    it("should handle undefined password", () => {
      const user = new User({
        name: "No Password User",
        email: "nopass@example.com",
      });

      expect(user.password).toBeUndefined();
    });

    it("should handle empty password as undefined", () => {
      const user = new User({
        name: "Empty Password User",
        email: "empty@example.com",
        password: "",
      });

      expect(user.password).toBeUndefined();
    });

    it("should throw error for invalid hash format", () => {
      expect(
        () =>
          new User({
            name: "Invalid Hash User",
            email: "invalid@example.com",
            password: "plaintext-password",
          })
      ).toThrow("A senha deve estar criptografada");
    });

    it("should throw error for malformed bcrypt hash", () => {
      expect(
        () =>
          new User({
            name: "Malformed Hash User",
            email: "malformed@example.com",
            password: "$2a$10$invalid",
          })
      ).toThrow("A senha deve estar criptografada");
    });
  });

  describe("withoutPassword method", () => {
    it("should return user without password", () => {
      const user = new User({
        name: "User With Password",
        email: "withpass@example.com",
        password: validHashPassword,
      });

      const userWithoutPassword = user.withoutPassword();

      expect(user.password).toBe(validHashPassword);
      expect(userWithoutPassword.password).toBeUndefined();
      expect(userWithoutPassword.name).toBe(user.name);
      expect(userWithoutPassword.email).toBe(user.email);
      expect(userWithoutPassword.id).toBe(user.id);
    });

    it("should return same user when password is already undefined", () => {
      const user = new User({
        name: "User Without Password",
        email: "nopass@example.com",
      });

      const userWithoutPassword = user.withoutPassword();

      expect(userWithoutPassword.password).toBeUndefined();
      expect(userWithoutPassword.name).toBe(user.name);
      expect(userWithoutPassword.email).toBe(user.email);
      expect(userWithoutPassword.id).toBe(user.id);
    });

    it("should create new instance without password", () => {
      const user = new User({
        name: "Original User",
        email: "original@example.com",
        password: validHashPassword,
      });

      const userWithoutPassword = user.withoutPassword();

      expect(userWithoutPassword).not.toBe(user);
      expect(userWithoutPassword.equals(user)).toBe(true);
    });
  });

  describe("Value object getters", () => {
    it("should return PersonName value object for name", () => {
      const user = new User({
        name: "João Pedro Silva",
        email: "joao@example.com",
      });

      const nameVO = user.$name;

      expect(nameVO).toBeInstanceOf(PersonName);
      expect(nameVO.value).toBe("João Pedro Silva");
      expect(nameVO.firstName).toBe("João");
      expect(nameVO.lastName).toBe("Silva");
    });

    it("should return Email value object for email", () => {
      const user = new User({
        name: "Test User",
        email: "TEST@EXAMPLE.COM",
      });

      const emailVO = user.$email;

      expect(emailVO).toBeInstanceOf(Email);
      expect(emailVO.value).toBe("test@example.com");
      expect(emailVO.localPart).toBe("test");
      expect(emailVO.domain).toBe("example.com");
    });

    it("should return HashPassword value object when password exists", () => {
      const user = new User({
        name: "Secure User",
        email: "secure@example.com",
        password: validHashPassword,
      });

      const passwordVO = user.$password;

      expect(passwordVO).toBeInstanceOf(HashPassword);
      expect(passwordVO!.value).toBe(validHashPassword);
    });

    it("should return undefined for password value object when no password", () => {
      const user = new User({
        name: "No Password User",
        email: "nopass@example.com",
      });

      const passwordVO = user.$password;

      expect(passwordVO).toBeUndefined();
    });
  });

  describe("Entity behavior", () => {
    it("should inherit equality comparison", () => {
      const id = "550e8400-e29b-41d4-a716-446655440000";
      const user1 = new User({
        id,
        name: "User One",
        email: "user1@example.com",
      });
      const user2 = new User({
        id,
        name: "User Two",
        email: "user2@example.com",
      });

      expect(user1.equals(user2)).toBe(true);
    });

    it("should inherit cloning functionality", () => {
      const user = new User({
        name: "Original User",
        email: "original@example.com",
        password: validHashPassword,
      });
      const cloned = user.clone({
        name: "Cloned User",
        email: "cloned@example.com",
      });

      expect(cloned.id).toBe(user.id);
      expect(cloned.name).toBe("Cloned User");
      expect(cloned.email).toBe("cloned@example.com");
      expect(cloned.password).toBe(validHashPassword);
    });

    it("should provide access to props through data getter", () => {
      const user = new User({
        name: "Data User",
        email: "data@example.com",
        password: validHashPassword,
      });
      const data = user.data;

      expect(data.name).toBe("Data User");
      expect(data.email).toBe("data@example.com");
      expect(data.password).toBe(validHashPassword);
    });
  });

  describe("Edge cases", () => {
    it("should handle user with valid edge values", () => {
      const user = new User({
        name: "Ana Silva", // Minimum valid name length
        email: "a@b.co", // Minimum valid email
        password: validHashPassword,
      });

      expect(user.name).toBe("Ana Silva");
      expect(user.email).toBe("a@b.co");
      expect(user.password).toBe(validHashPassword);
    });

    it("should handle special characters in name", () => {
      const user = new User({
        name: "José María O'Connor-Silva",
        email: "jose@example.com",
      });

      expect(user.name).toBe("José María O'Connor-Silva");
    });

    it("should handle long valid inputs", () => {
      const longName = "João Pedro Antonio Carlos Silva Santos";
      const longEmail = "joao.pedro.antonio.carlos@example-domain.com";
      const user = new User({
        name: longName,
        email: longEmail,
        password: validHashPassword,
      });

      expect(user.name).toBe(longName);
      expect(user.email).toBe(longEmail);
      expect(user.password).toBe(validHashPassword);
    });

    it("should maintain immutability across operations", () => {
      const user = new User({
        name: "Immutable User",
        email: "immutable@example.com",
        password: validHashPassword,
      });

      const withoutPassword = user.withoutPassword();
      const cloned = user.clone({ name: "Cloned User" });

      // Original should remain unchanged
      expect(user.name).toBe("Immutable User");
      expect(user.email).toBe("immutable@example.com");
      expect(user.password).toBe(validHashPassword);

      // Operations should create new instances
      expect(withoutPassword.password).toBeUndefined();
      expect(cloned.name).toBe("Cloned User");
      expect(withoutPassword).not.toBe(user);
      expect(cloned).not.toBe(user);
    });

    it("should handle multiple email formats", () => {
      const users = [
        new User({ name: "User One", email: "user@domain.com" }),
        new User({ name: "User Two", email: "user.name@domain.co.uk" }),
        new User({ name: "User Three", email: "user+tag@domain.org" }),
        new User({ name: "User Four", email: "user_name@domain-name.net" }),
      ];

      expect(users[0]!.email).toBe("user@domain.com");
      expect(users[1]!.email).toBe("user.name@domain.co.uk");
      expect(users[2]!.email).toBe("user+tag@domain.org");
      expect(users[3]!.email).toBe("user_name@domain-name.net");
    });

    it("should handle international characters in name", () => {
      const user = new User({
        name: "François Müller",
        email: "francois@example.com",
      });

      expect(user.name).toBe("François Müller");
      expect(user.$name.firstName).toBe("François");
      expect(user.$name.lastName).toBe("Müller");
    });

    it("should handle case sensitivity correctly", () => {
      const user1 = new User({
        name: "João Silva",
        email: "JOAO@EXAMPLE.COM",
      });
      const user2 = new User({
        name: "joão silva",
        email: "joao@example.com",
      });

      // Names should preserve case
      expect(user1.name).toBe("João Silva");
      expect(user2.name).toBe("joão silva");

      // Emails should be lowercase
      expect(user1.email).toBe("joao@example.com");
      expect(user2.email).toBe("joao@example.com");

      // PersonName comparison should be case-insensitive
      expect(user1.$name.equals(user2.$name)).toBe(true);
      // Email comparison should be case-sensitive (already normalized)
      expect(user1.$email.equals(user2.$email)).toBe(true);
    });

    it("should throw error for names with numbers", () => {
      expect(
        () =>
          new User({
            name: "User 123",
            email: "user123@example.com",
          })
      ).toThrow("O nome contém caracteres inválidos");
    });

    it("should throw error for very long names", () => {
      const veryLongName = "A".repeat(121) + " B";
      expect(
        () =>
          new User({
            name: veryLongName,
            email: "long@example.com",
          })
      ).toThrow("O nome deve ter no máximo 120 caracteres");
    });

    it("should throw error for very long emails", () => {
      const veryLongEmail = "a".repeat(250) + "@example.com";
      expect(
        () =>
          new User({
            name: "Test User",
            email: veryLongEmail,
          })
      ).toThrow("O email deve ter no máximo 254 caracteres");
    });
  });
});
