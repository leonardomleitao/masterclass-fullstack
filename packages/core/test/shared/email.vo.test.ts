import { Email } from "../../src/shared/email.vo";

describe("Email Value Object", () => {
  describe("create", () => {
    it("should create a valid email", () => {
      const email = Email.create("test@example.com");
      expect(email.value).toBe("test@example.com");
    });

    it("should convert email to lowercase", () => {
      const email = Email.create("Test@EXAMPLE.COM");
      expect(email.value).toBe("test@example.com");
    });

    it("should trim whitespace", () => {
      const email = Email.create("  test@example.com  ");
      expect(email.value).toBe("test@example.com");
    });

    it("should accept valid email formats", () => {
      const validEmails = [
        "user@domain.com",
        "user.name@domain.com",
        "user+tag@domain.com",
        "user_name@domain.com",
        "123@domain.com",
        "user@domain.co.uk",
        "user@sub.domain.com",
        "a@b.co",
        "test.email+tag@example.com",
        "user@domain-name.com",
      ];

      validEmails.forEach((emailAddress) => {
        expect(() => Email.create(emailAddress)).not.toThrow();
      });
    });
  });

  describe("validation", () => {
    it("should throw error for null or undefined email", () => {
      expect(() => Email.create(null as any)).toThrow(
        "O email não pode estar vazio"
      );
      expect(() => Email.create(undefined as any)).toThrow(
        "O email não pode estar vazio"
      );
    });

    it("should throw error for non-string email", () => {
      expect(() => Email.create(123 as any)).toThrow(
        "O email não pode estar vazio"
      );
      expect(() => Email.create({} as any)).toThrow(
        "O email não pode estar vazio"
      );
    });

    it("should throw error for empty email", () => {
      expect(() => Email.create("")).toThrow("O email não pode estar vazio");
      expect(() => Email.create("   ")).toThrow("O email não pode estar vazio");
    });

    it("should throw error for email too long", () => {
      const longEmail = "a".repeat(250) + "@domain.com";
      expect(() => Email.create(longEmail)).toThrow(
        "O email deve ter no máximo 254 caracteres"
      );
    });

    it("should throw error for invalid email formats", () => {
      const invalidEmails = [
        "invalid-email",
        "@domain.com",
        "user@",
        "user@@domain.com",
        "user..name@domain.com",
        ".user@domain.com",
        "user.@domain.com",
        "user@domain..com",
        "user@-domain.com",
        "user@domain-.com",
        "user name@domain.com",
        // "user@domain",
        "user@.domain.com",
        "user@domain.",
        "",
      ];

      invalidEmails.forEach((emailAddress) => {
        expect(() => Email.create(emailAddress)).toThrow();
      });
    });

    it("should throw specific error for consecutive dots in local part", () => {
      expect(() => Email.create("user..name@domain.com")).toThrow(
        "O email não pode conter pontos consecutivos na parte local"
      );
    });

    it("should throw specific error for local part starting or ending with dot", () => {
      expect(() => Email.create(".user@domain.com")).toThrow(
        "O email não pode começar ou terminar com ponto na parte local"
      );
      expect(() => Email.create("user.@domain.com")).toThrow(
        "O email não pode começar ou terminar com ponto na parte local"
      );
    });

    it("should throw specific error for consecutive dots in domain", () => {
      expect(() => Email.create("user@domain..com")).toThrow(
        "O formato do email é inválido"
      );
    });

    it("should throw specific error for domain starting or ending with hyphen", () => {
      expect(() => Email.create("user@-domain.com")).toThrow(
        "O formato do email é inválido"
      );
      expect(() => Email.create("user@domain-.com")).toThrow(
        "O formato do email é inválido"
      );
    });
  });

  describe("getters", () => {
    it("should return correct local part", () => {
      const email = Email.create("user.name@domain.com");
      expect(email.localPart).toBe("user.name");
    });

    it("should return correct domain", () => {
      const email = Email.create("user@sub.domain.com");
      expect(email.domain).toBe("sub.domain.com");
    });

    it("should return correct value", () => {
      const email = Email.create("Test@DOMAIN.COM");
      expect(email.value).toBe("test@domain.com");
    });
  });

  describe("equals", () => {
    it("should return true for same email addresses", () => {
      const email1 = Email.create("test@example.com");
      const email2 = Email.create("test@example.com");
      expect(email1.equals(email2)).toBe(true);
    });

    it("should return true for same email addresses with different cases", () => {
      const email1 = Email.create("Test@EXAMPLE.COM");
      const email2 = Email.create("test@example.com");
      expect(email1.equals(email2)).toBe(true);
    });

    it("should return false for different email addresses", () => {
      const email1 = Email.create("test1@example.com");
      const email2 = Email.create("test2@example.com");
      expect(email1.equals(email2)).toBe(false);
    });

    it("should return false when comparing with non-Email object", () => {
      const email = Email.create("test@example.com");
      expect(email.equals("test@example.com" as any)).toBe(false);
    });
  });

  describe("toString and toJSON", () => {
    it("should return email string for toString", () => {
      const email = Email.create("test@example.com");
      expect(email.toString()).toBe("test@example.com");
    });

    it("should return email string for toJSON", () => {
      const email = Email.create("test@example.com");
      expect(email.toJSON()).toBe("test@example.com");
    });

    it("should work correctly with JSON.stringify", () => {
      const email = Email.create("test@example.com");
      expect(JSON.stringify({ email })).toBe('{"email":"test@example.com"}');
    });
  });
});
