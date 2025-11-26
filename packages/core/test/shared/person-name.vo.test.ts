import { PersonName } from "../../src/shared/person-name.vo";

describe("PersonName Value Object", () => {
  describe("Valid names", () => {
    it("should create a valid person name", () => {
      const name = PersonName.create("João Silva");
      expect(name.value).toBe("João Silva");
      expect(name.firstName).toBe("João");
      expect(name.lastName).toBe("Silva");
    });

    it("should handle names with multiple middle names", () => {
      const name = PersonName.create("Ana Maria Santos Silva");
      expect(name.firstName).toBe("Ana");
      expect(name.lastName).toBe("Silva");
      expect(name.fullName).toBe("Ana Maria Santos Silva");
    });

    it("should handle names with accents and special characters", () => {
      const name = PersonName.create("José-Maria O'Connor");
      expect(name.value).toBe("José-Maria O'Connor");
    });

    it("should trim whitespace", () => {
      const name = PersonName.create("  João Silva  ");
      expect(name.value).toBe("João Silva");
    });

    it("should generate correct initials", () => {
      const name = PersonName.create("João Maria Silva");
      expect(name.initials).toBe("JS");
    });

    it("should format names correctly", () => {
      const name = PersonName.create("jOÃO maria SILVA");
      expect(name.toFormattedString()).toBe("João Maria Silva");
    });
  });

  describe("Invalid names", () => {
    it("should throw error for names with less than 3 characters", () => {
      expect(() => PersonName.create("Jo")).toThrow(
        "O nome deve ter pelo menos 3 caracteres"
      );
    });

    it("should throw error for names with more than 120 characters", () => {
      const longName = "a".repeat(121);
      expect(() => PersonName.create(longName)).toThrow(
        "O nome deve ter no máximo 120 caracteres"
      );
    });

    it("should throw error for names without surname", () => {
      expect(() => PersonName.create("João")).toThrow(
        "O nome deve conter pelo menos um nome e um sobrenome"
      );
    });

    it("should throw error for empty string", () => {
      expect(() => PersonName.create("")).toThrow(
        "O nome é obrigatório e deve ser uma string"
      );
    });

    it("should throw error for whitespace string", () => {
      expect(() => PersonName.create("  ")).toThrow(
        "O nome deve ter pelo menos 3 caracteres"
      );
    });

    it("should throw error for null or undefined", () => {
      expect(() => PersonName.create(null as any)).toThrow(
        "O nome é obrigatório e deve ser uma string"
      );
      expect(() => PersonName.create(undefined as any)).toThrow(
        "O nome é obrigatório e deve ser uma string"
      );
    });

    it("should throw error for names with invalid characters", () => {
      expect(() => PersonName.create("João Silva123")).toThrow(
        "O nome contém caracteres inválidos"
      );
      expect(() => PersonName.create("João@Silva")).toThrow(
        "O nome contém caracteres inválidos"
      );
      expect(() => PersonName.create("João#Silva")).toThrow(
        "O nome contém caracteres inválidos"
      );
    });

    it("should throw error for names with multiple consecutive spaces", () => {
      expect(() => PersonName.create("João  Silva")).toThrow(
        "O nome não pode conter espaços múltiplos consecutivos"
      );
    });

    it("should throw error for names starting or ending with special characters", () => {
      expect(() => PersonName.create("-João Silva")).toThrow(
        "O nome não pode começar ou terminar com espaços, hífens ou apóstrofes"
      );
      expect(() => PersonName.create("João Silva-")).toThrow(
        "O nome não pode começar ou terminar com espaços, hífens ou apóstrofes"
      );
      expect(() => PersonName.create("'João Silva")).toThrow(
        "O nome não pode começar ou terminar com espaços, hífens ou apóstrofes"
      );
    });
  });

  describe("Value Object behavior", () => {
    it("should be immutable", () => {
      const name = PersonName.create("João Silva");
      const value = name.value;

      // Tentativa de modificar o valor não deve afetar o objeto
      expect(name.value).toBe(value);
    });

    it("should compare equality correctly", () => {
      const name1 = PersonName.create("João Silva");
      const name2 = PersonName.create("João Silva");
      const name3 = PersonName.create("JOÃO SILVA");
      const name4 = PersonName.create("Maria Santos");

      expect(name1.equals(name2)).toBe(true);
      expect(name1.equals(name3)).toBe(true); // Case insensitive
      expect(name1.equals(name4)).toBe(false);
      expect(name1.equals(123 as any)).toBe(false);
    });

    it("should serialize to JSON correctly", () => {
      const name = PersonName.create("João Silva");
      expect(name.toJSON()).toBe("João Silva");
      expect(JSON.stringify(name)).toBe('"João Silva"');
    });

    it("should convert to string correctly", () => {
      const name = PersonName.create("João Silva");
      expect(name.toString()).toBe("João Silva");
      expect(String(name)).toBe("João Silva");
    });
  });

  describe("Edge cases", () => {
    it("should handle names with minimum valid length", () => {
      const name = PersonName.create("Jo A");
      expect(name.value).toBe("Jo A");
    });

    it("should handle names with maximum valid length", () => {
      const longValidName = "Maria ".repeat(19) + "Silvas"; // Exactly 120 chars
      const name = PersonName.create(longValidName);
      expect(name.value.length).toBe(120);
    });

    it("should handle names with international characters", () => {
      const name = PersonName.create("François José María");
      expect(name.value).toBe("François José María");
    });

    it("should handle names with valid hyphens and apostrophes", () => {
      const name = PersonName.create("Jean-Pierre O'Neil");
      expect(name.firstName).toBe("Jean-Pierre");
      expect(name.lastName).toBe("O'Neil");
    });
  });
});
