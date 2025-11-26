import CryptoProvider from "../../src/users/provider/crypto.provider";

export class MockCryptoProvider implements CryptoProvider {
  private encryptCalls: string[] = [];
  private compareCalls: Array<{ password: string; hashedPassword: string }> =
    [];
  private encryptResults: Map<string, string> = new Map();
  private compareResults: Map<string, boolean> = new Map();

  async encrypt(password: string): Promise<string> {
    this.encryptCalls.push(password);

    // Check if we have a predefined result for this password
    if (this.encryptResults.has(password)) {
      return this.encryptResults.get(password)!;
    }

    return `$2a$10$${"".padEnd(53, "x").substring(0, 53)}`;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    this.compareCalls.push({ password, hashedPassword });

    const key = `${password}:${hashedPassword}`;

    // Check if we have a predefined result for this comparison
    if (this.compareResults.has(key)) {
      return this.compareResults.get(key)!;
    }

    // Default behavior: check if the hash matches our encrypt pattern
    const expectedHash = await this.encrypt(password);
    return hashedPassword === expectedHash;
  }

  // Test helper methods
  getEncryptCalls(): string[] {
    return [...this.encryptCalls];
  }

  getCompareCalls(): Array<{ password: string; hashedPassword: string }> {
    return [...this.compareCalls];
  }

  setEncryptResult(password: string, hashedResult: string): void {
    this.encryptResults.set(password, hashedResult);
  }

  setCompareResult(
    password: string,
    hashedPassword: string,
    result: boolean
  ): void {
    const key = `${password}:${hashedPassword}`;
    this.compareResults.set(key, result);
  }

  reset(): void {
    this.encryptCalls = [];
    this.compareCalls = [];
    this.encryptResults.clear();
    this.compareResults.clear();
  }

  mockEncrypt(password: string, hash: string): void {
    this.setEncryptResult(password, hash);
  }

  mockCompare(password: string, hashedPassword: string, result: boolean): void {
    this.setCompareResult(password, hashedPassword, result);
  }

  // Simulate realistic bcrypt behavior
  simulateValidHash(password: string): string {
    return `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`;
  }
}
