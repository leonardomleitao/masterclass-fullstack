import { HashPassword } from "../../src/shared/hash-password.vo";

describe("HashPassword Value Object", () => {
  describe("create", () => {
    it("should create a valid hash password", () => {
      const validHash =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hashPassword = HashPassword.create(validHash);
      expect(hashPassword.value).toBe(validHash);
    });

    it("should trim whitespace", () => {
      const validHash =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hashPassword = HashPassword.create(`  ${validHash}  `);
      expect(hashPassword.value).toBe(validHash);
    });

    it("should accept valid bcrypt hash formats", () => {
      const validHashes = [
        "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS",
        "$2x$10$fVH8e28OQRj9tqiDXs1e1uxpsjN0c7II7YPKXua2NAKYvM6iibfF2",
        "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        "$2b$04$qHZkhxHlrpS5Uz7pNydkSu6Js584cJr9lGo8XZ5v8wRoNbhKH7nF6",
        "$2a$15$k42ZFHFWqBp3vWli.nIn8uYyIkbvYRvodzbfbK18SSsY.CsIQPlxO",
      ];

      validHashes.forEach((hash) => {
        expect(() => HashPassword.create(hash)).not.toThrow();
      });
    });
  });

  describe("validation", () => {
    it("should throw error for null or undefined hash", () => {
      expect(() => HashPassword.create(null as any)).toThrow(
        "O hash da senha não pode estar vazio"
      );
      expect(() => HashPassword.create(undefined as any)).toThrow(
        "O hash da senha não pode estar vazio"
      );
    });

    it("should throw error for non-string hash", () => {
      expect(() => HashPassword.create(123 as any)).toThrow(
        "O hash da senha não pode estar vazio"
      );
      expect(() => HashPassword.create({} as any)).toThrow(
        "O hash da senha não pode estar vazio"
      );
    });

    it("should throw error for empty hash", () => {
      expect(() => HashPassword.create("")).toThrow(
        "O hash da senha não pode estar vazio"
      );
      expect(() => HashPassword.create("   ")).toThrow(
        "O hash da senha não pode estar vazio"
      );
    });

    it("should throw error for invalid hash formats", () => {
      const invalidHashes = [
        "password123",
        "plaintext",
        "md5hash",
        "$1$invalid",
        "$2b$12$invalid",
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5D",
        "$3b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS",
        "2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS",
        "$2b12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS",
        "$2b$1$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS",
        "$2b$123$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS",
        "",
        "   ",
        "short",
      ];

      invalidHashes.forEach((hash) => {
        expect(() => HashPassword.create(hash)).toThrow();
      });
    });

    it("should throw specific error for invalid bcrypt format", () => {
      expect(() => HashPassword.create("password123")).toThrow(
        "A senha deve estar criptografada"
      );
    });

    it("should throw specific error for plain text password", () => {
      expect(() => HashPassword.create("plaintext")).toThrow(
        "A senha deve estar criptografada"
      );
    });
  });

  describe("getters", () => {
    it("should return correct algorithm", () => {
      const hashPassword = HashPassword.create(
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS"
      );
      expect(hashPassword.algorithm).toBe("2b");
    });

    it("should return correct cost", () => {
      const hashPassword = HashPassword.create(
        "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
      );
      expect(hashPassword.cost).toBe(10);
    });

    it("should return correct value", () => {
      const validHash =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hashPassword = HashPassword.create(validHash);
      expect(hashPassword.value).toBe(validHash);
    });

    it("should handle different algorithms", () => {
      const hashA = HashPassword.create(
        "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
      );
      const hashX = HashPassword.create(
        "$2x$10$fVH8e28OQRj9tqiDXs1e1uxpsjN0c7II7YPKXua2NAKYvM6iibfF2"
      );
      const hashY = HashPassword.create(
        "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
      );

      expect(hashA.algorithm).toBe("2a");
      expect(hashX.algorithm).toBe("2x");
      expect(hashY.algorithm).toBe("2y");
    });

    it("should handle different costs", () => {
      const hash4 = HashPassword.create(
        "$2b$04$qHZkhxHlrpS5Uz7pNydkSu6Js584cJr9lGo8XZ5v8wRoNbhKH7nF6"
      );
      const hash15 = HashPassword.create(
        "$2a$15$k42ZFHFWqBp3vWli.nIn8uYyIkbvYRvodzbfbK18SSsY.CsIQPlxO"
      );

      expect(hash4.cost).toBe(4);
      expect(hash15.cost).toBe(15);
    });
  });

  describe("equals", () => {
    it("should return true for same hash passwords", () => {
      const hash =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hashPassword1 = HashPassword.create(hash);
      const hashPassword2 = HashPassword.create(hash);
      expect(hashPassword1.equals(hashPassword2)).toBe(true);
    });

    it("should return false for different hash passwords", () => {
      const hash1 =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hash2 =
        "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
      const hashPassword1 = HashPassword.create(hash1);
      const hashPassword2 = HashPassword.create(hash2);
      expect(hashPassword1.equals(hashPassword2)).toBe(false);
    });

    it("should return false when comparing with non-HashPassword object", () => {
      const hashPassword = HashPassword.create(
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS"
      );
      expect(
        hashPassword.equals(
          "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS" as any
        )
      ).toBe(false);
    });
  });

  describe("toString and toJSON", () => {
    it("should return hash string for toString", () => {
      const validHash =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hashPassword = HashPassword.create(validHash);
      expect(hashPassword.toString()).toBe(validHash);
    });

    it("should return hash string for toJSON", () => {
      const validHash =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hashPassword = HashPassword.create(validHash);
      expect(hashPassword.toJSON()).toBe(validHash);
    });

    it("should work correctly with JSON.stringify", () => {
      const validHash =
        "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeWyLsXtVt5DKuRMS";
      const hashPassword = HashPassword.create(validHash);
      expect(JSON.stringify({ hashPassword })).toBe(
        `{"hashPassword":"${validHash}"}`
      );
    });
  });
});
