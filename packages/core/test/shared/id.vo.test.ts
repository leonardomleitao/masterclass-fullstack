import { Id } from "../../src/shared";

describe("Id", () => {
  describe("create", () => {
    it("should create an Id with a valid UUID", () => {
      const validUuid = "550e8400-e29b-41d4-a716-446655440000";
      const id = Id.create(validUuid);

      expect(id.value).toBe(validUuid);
    });

    it("should generate a UUID when no value is provided", () => {
      const id = Id.create();

      expect(id.value).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      );
    });

    it("should trim and lowercase the provided value", () => {
      const validUuid = " 550E8400-E29B-41D4-A716-446655440000 ";
      const id = Id.create(validUuid);

      expect(id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    });

    it("should throw an error for invalid UUID", () => {
      expect(() => Id.create("invalid-uuid")).toThrow(
        "O id fornecido não é um UUID válido."
      );
    });

    it("should throw an error for empty string", () => {
      expect(() => Id.create("")).toThrow(
        "O id fornecido não é um UUID válido."
      );
    });
  });

  describe("equals", () => {
    it("should return true for equal Ids", () => {
      const uuid = "550e8400-e29b-41d4-a716-446655440000";
      const id1 = Id.create(uuid);
      const id2 = Id.create(uuid);

      expect(id1.equals(id2)).toBe(true);
    });

    it("should return false for different Ids", () => {
      const id1 = Id.create("550e8400-e29b-41d4-a716-446655440000");
      const id2 = Id.create("550e8400-e29b-41d4-a716-446655440001");

      expect(id1.equals(id2)).toBe(false);
    });

    it("should return false when comparing with non-Id object", () => {
      const id = Id.create("550e8400-e29b-41d4-a716-446655440000");

      expect(id.equals({} as Id)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the string representation of the Id", () => {
      const uuid = "550e8400-e29b-41d4-a716-446655440000";
      const id = Id.create(uuid);

      expect(id.toString()).toBe(uuid);
    });
  });

  describe("toJSON", () => {
    it("should return the JSON representation of the Id", () => {
      const uuid = "550e8400-e29b-41d4-a716-446655440000";
      const id = Id.create(uuid);

      expect(id.toJSON()).toBe(uuid);
    });
  });
});
