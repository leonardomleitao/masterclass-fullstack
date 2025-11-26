import { RequiredString } from "../../src/shared/required-string.vo";

describe("RequiredString", () => {
  describe("create", () => {
    it("should create a RequiredString with valid value", () => {
      const value = "test value";
      const requiredString = RequiredString.create(value);

      expect(requiredString.value).toBe(value);
    });

    it("should trim the value", () => {
      const value = "  test value  ";
      const requiredString = RequiredString.create(value);

      expect(requiredString.value).toBe("test value");
    });

    it("should throw default error for empty string", () => {
      expect(() => RequiredString.create("")).toThrow("Valor é obrigatório");
    });

    it("should throw default error for whitespace string", () => {
      expect(() => RequiredString.create("   ")).toThrow("Valor é obrigatório");
    });

    it("should throw default error for null value", () => {
      expect(() => RequiredString.create(null as any)).toThrow(
        "Valor é obrigatório"
      );
    });

    it("should throw default error for undefined value", () => {
      expect(() => RequiredString.create(undefined as any)).toThrow(
        "Valor é obrigatório"
      );
    });

    it("should throw custom error message", () => {
      const customMessage = "Nome é obrigatório";
      expect(() =>
        RequiredString.create("", { errorMessage: customMessage })
      ).toThrow(customMessage);
    });

    it("should validate minimum length", () => {
      expect(() => RequiredString.create("ab", { minLength: 3 })).toThrow(
        '"ab" deve ter pelo menos 3 caracteres'
      );
    });

    it("should validate maximum length", () => {
      expect(() => RequiredString.create("abcdef", { maxLength: 3 })).toThrow(
        '"abcdef" deve ter no máximo 3 caracteres'
      );
    });

    it("should accept value within length bounds", () => {
      const value = "test";
      const requiredString = RequiredString.create(value, {
        minLength: 2,
        maxLength: 10,
      });

      expect(requiredString.value).toBe(value);
    });
  });

  describe("equals", () => {
    it("should return true for equal RequiredStrings", () => {
      const value = "test value";
      const rs1 = RequiredString.create(value);
      const rs2 = RequiredString.create(value);

      expect(rs1.equals(rs2)).toBe(true);
    });

    it("should return false for different RequiredStrings", () => {
      const rs1 = RequiredString.create("value1");
      const rs2 = RequiredString.create("value2");

      expect(rs1.equals(rs2)).toBe(false);
    });

    it("should return false when comparing with non-RequiredString object", () => {
      const rs = RequiredString.create("test");

      expect(rs.equals({} as RequiredString)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the string representation", () => {
      const value = "test value";
      const requiredString = RequiredString.create(value);

      expect(requiredString.toString()).toBe(value);
    });
  });

  describe("toJSON", () => {
    it("should return the JSON representation", () => {
      const value = "test value";
      const requiredString = RequiredString.create(value);

      expect(requiredString.toJSON()).toBe(value);
    });
  });
});
