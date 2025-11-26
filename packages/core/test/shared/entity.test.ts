import { Entity, EntityMode } from "../../src/shared/entity";
import { Id } from "../../src/shared/id.vo";

// Test implementation of Entity
interface TestEntityProps {
  id?: string;
  name: string;
  value?: number;
}

class TestEntity extends Entity<TestEntityProps> {
  constructor(props: TestEntityProps, mode: EntityMode = "valid") {
    super(props, mode);
  }

  get name(): string {
    return this.props.name;
  }

  get value(): number | undefined {
    return this.props.value;
  }
}

describe("Entity", () => {
  describe("Constructor", () => {
    it("should create entity with provided id", () => {
      const id = "550e8400-e29b-41d4-a716-446655440000";
      const entity = new TestEntity({ id, name: "Test" });

      expect(entity.id).toBe(id);
      expect(entity.props.id).toBe(id);
    });

    it("should generate id when not provided", () => {
      const entity = new TestEntity({ name: "Test" });

      expect(entity.id).toBeDefined();
      expect(entity.props.id).toBeDefined();
      expect(entity.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      );
    });

    it("should create entity in valid mode by default", () => {
      const entity = new TestEntity({ name: "Test" });

      expect(entity.mode).toBe("valid");
      expect(entity.isValid()).toBe(true);
      expect(entity.isDraft()).toBe(false);
    });

    it("should create entity in specified mode", () => {
      const entity = new TestEntity({ name: "Test" }, "draft");

      expect(entity.mode).toBe("draft");
      expect(entity.isDraft()).toBe(true);
      expect(entity.isValid()).toBe(false);
    });

    it("should freeze props to ensure immutability", () => {
      const entity = new TestEntity({ name: "Test", value: 10 });

      expect(() => {
        (entity.props as any).name = "Changed";
      }).toThrow();
    });

    it("should throw error if props contains 'props' property", () => {
      expect(() => {
        new TestEntity({ name: "Test", props: {} } as any);
      }).toThrow("Props should not contain 'props' property");
    });

    it("should preserve all provided properties", () => {
      const props = { name: "Test", value: 42 };
      const entity = new TestEntity(props);

      expect(entity.props.name).toBe("Test");
      expect(entity.props.value).toBe(42);
    });
  });

  describe("Data access", () => {
    it("should return readonly props through data getter", () => {
      const entity = new TestEntity({ name: "Test", value: 10 });
      const data = entity.data;

      expect(data).toBe(entity.props);
      expect(data.name).toBe("Test");
      expect(data.value).toBe(10);
    });

    it("should provide access to individual properties", () => {
      const entity = new TestEntity({ name: "Test Name", value: 100 });

      expect(entity.name).toBe("Test Name");
      expect(entity.value).toBe(100);
    });

    it("should handle undefined optional properties", () => {
      const entity = new TestEntity({ name: "Test" });

      expect(entity.value).toBeUndefined();
    });
  });

  describe("Mode management", () => {
    it("should correctly identify draft mode", () => {
      const entity = new TestEntity({ name: "Test" }, "draft");

      expect(entity.isDraft()).toBe(true);
      expect(entity.isValid()).toBe(false);
      expect(entity.mode).toBe("draft");
    });

    it("should correctly identify valid mode", () => {
      const entity = new TestEntity({ name: "Test" }, "valid");

      expect(entity.isValid()).toBe(true);
      expect(entity.isDraft()).toBe(false);
      expect(entity.mode).toBe("valid");
    });

    it("should convert to draft mode", () => {
      const entity = new TestEntity({ name: "Test" }, "valid");
      const draftEntity = entity.asDraft();

      expect(draftEntity.isDraft()).toBe(true);
      expect(draftEntity.isValid()).toBe(false);
      expect(draftEntity.id).toBe(entity.id);
      expect(draftEntity.name).toBe(entity.name);
    });

    it("should convert to valid mode", () => {
      const entity = new TestEntity({ name: "Test" }, "draft");
      const validEntity = entity.asValid();

      expect(validEntity.isValid()).toBe(true);
      expect(validEntity.isDraft()).toBe(false);
      expect(validEntity.id).toBe(entity.id);
      expect(validEntity.name).toBe(entity.name);
    });
  });

  describe("Equality", () => {
    it("should return true for entities with same id", () => {
      const id = "550e8400-e29b-41d4-a716-446655440000";
      const entity1 = new TestEntity({ id, name: "Test1" });
      const entity2 = new TestEntity({ id, name: "Test2" });

      expect(entity1.equals(entity2)).toBe(true);
    });

    it("should return false for entities with different ids", () => {
      const entity1 = new TestEntity({ name: "Test1" });
      const entity2 = new TestEntity({ name: "Test2" });

      expect(entity1.equals(entity2)).toBe(false);
    });

    it("should return true for same entity instance", () => {
      const entity = new TestEntity({ name: "Test" });

      expect(entity.equals(entity)).toBe(true);
    });

    it("should return false when comparing with null or undefined", () => {
      const entity = new TestEntity({ name: "Test" });

      expect(entity.equals(null)).toBe(false);
      expect(entity.equals(undefined)).toBe(false);
    });

    it("should return false when comparing with non-Entity object", () => {
      const entity = new TestEntity({ name: "Test" });

      expect(entity.equals({ id: entity.id })).toBe(false);
      expect(entity.equals("string")).toBe(false);
      expect(entity.equals(123)).toBe(false);
    });

    it("should return false for entities of different classes", () => {
      class AnotherEntity extends Entity<TestEntityProps> {}

      const id = "550e8400-e29b-41d4-a716-446655440000";
      const entity1 = new TestEntity({ id, name: "Test" });
      const entity2 = new AnotherEntity({ id, name: "Test" });

      expect(entity1.equals(entity2)).toBe(false);
    });

    it("should handle Id value object comparison", () => {
      const idValue = "550e8400-e29b-41d4-a716-446655440000";
      const id1 = Id.create(idValue);
      const id2 = Id.create(idValue);

      const entity1 = new TestEntity({ id: id1.value, name: "Test1" });
      const entity2 = new TestEntity({ id: id2.value, name: "Test2" });

      expect(entity1.equals(entity2)).toBe(true);
    });

    it("should return correct result for notEquals", () => {
      const entity1 = new TestEntity({ name: "Test1" });
      const entity2 = new TestEntity({ name: "Test2" });
      const id = "550e8400-e29b-41d4-a716-446655440000";
      const entity3 = new TestEntity({ id, name: "Test3" });
      const entity4 = new TestEntity({ id, name: "Test4" });

      expect(entity1.notEquals(entity2)).toBe(true);
      expect(entity3.notEquals(entity4)).toBe(false);
    });
  });

  describe("Cloning", () => {
    it("should clone entity with same properties", () => {
      const entity = new TestEntity({ name: "Test", value: 10 });
      const cloned = entity.clone({});

      expect(cloned.equals(entity)).toBe(true);
      expect(cloned.name).toBe("Test");
      expect(cloned.value).toBe(10);
      expect(cloned.mode).toBe(entity.mode);
    });

    it("should clone entity with updated properties", () => {
      const entity = new TestEntity({ name: "Test", value: 10 });
      const cloned = entity.clone({ name: "Updated", value: 20 });

      expect(cloned.equals(entity)).toBe(true); // Same id
      expect(cloned.name).toBe("Updated");
      expect(cloned.value).toBe(20);
    });

    it("should clone entity with different mode", () => {
      const entity = new TestEntity({ name: "Test" }, "valid");
      const cloned = entity.clone({}, "draft");

      expect(cloned.equals(entity)).toBe(true);
      expect(cloned.mode).toBe("draft");
      expect(cloned.isDraft()).toBe(true);
    });

    it("should clone entity maintaining original mode by default", () => {
      const entity = new TestEntity({ name: "Test" }, "draft");
      const cloned = entity.clone({ value: 15 });

      expect(cloned.mode).toBe("draft");
      expect(cloned.isDraft()).toBe(true);
    });

    it("should preserve id when cloning", () => {
      const entity = new TestEntity({ name: "Test", value: 10 });
      const cloned = entity.clone({ name: "Updated" });

      expect(cloned.id).toBe(entity.id);
    });

    it("should create new instance when cloning", () => {
      const entity = new TestEntity({ name: "Test" });
      const cloned = entity.clone({});

      expect(cloned).not.toBe(entity);
      expect(cloned.equals(entity)).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should handle entity with minimal properties", () => {
      const entity = new TestEntity({ name: "T" });

      expect(entity.name).toBe("T");
      expect(entity.id).toBeDefined();
      expect(entity.isValid()).toBe(true);
    });

    it("should handle entity with all properties", () => {
      const id = "550e8400-e29b-41d4-a716-446655440000";
      const entity = new TestEntity({ id, name: "Full Test", value: 999 });

      expect(entity.id).toBe(id);
      expect(entity.name).toBe("Full Test");
      expect(entity.value).toBe(999);
    });

    it("should handle zero and negative values", () => {
      const entity = new TestEntity({ name: "Zero Test", value: 0 });
      const negativeEntity = new TestEntity({
        name: "Negative Test",
        value: -1,
      });

      expect(entity.value).toBe(0);
      expect(negativeEntity.value).toBe(-1);
    });

    it("should handle empty string name", () => {
      const entity = new TestEntity({ name: "" });

      expect(entity.name).toBe("");
    });

    it("should maintain immutability across operations", () => {
      const entity = new TestEntity({ name: "Test", value: 10 });
      const draft = entity.asDraft();
      const cloned = entity.clone({ value: 20 });

      // Original should remain unchanged
      expect(entity.name).toBe("Test");
      expect(entity.value).toBe(10);
      expect(entity.isValid()).toBe(true);

      // Draft should have same data but different mode
      expect(draft.name).toBe("Test");
      expect(draft.value).toBe(10);
      expect(draft.isDraft()).toBe(true);

      // Clone should have updated data
      expect(cloned.name).toBe("Test");
      expect(cloned.value).toBe(20);
    });
  });
});
