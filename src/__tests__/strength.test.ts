import { calculateStrength, getStrengthLevel } from "../utils/strength";

describe("Password Strength Utils", () => {
  describe("calculateStrength", () => {
    it("returns 0 for empty password", () => {
      expect(calculateStrength("")).toBe(0);
    });

    it("calculates correct scores for different passwords", () => {
      expect(calculateStrength("123")).toBeLessThan(30);
      expect(calculateStrength("abc")).toBeLessThan(30);

      expect(calculateStrength("Password1")).toBeGreaterThanOrEqual(20);
      expect(calculateStrength("Password1")).toBeLessThan(40);

      expect(calculateStrength("MyPassw0rd!")).toBeGreaterThanOrEqual(70);
      expect(calculateStrength("MyPassw0rd!")).toBeLessThan(90);

      expect(calculateStrength("MyStr0ng@P@ssw0rd")).toBeGreaterThanOrEqual(90);
    });

    it("penalizes common passwords", () => {
      const commonPassword = calculateStrength("password123");
      const strongerPassword = calculateStrength("MyUniqueP@ss123");
      expect(commonPassword).toBeLessThan(strongerPassword);
    });
  });

  describe("getStrengthLevel", () => {
    it("returns correct levels for different scores", () => {
      expect(getStrengthLevel(20)).toBe("weak");
      expect(getStrengthLevel(40)).toBe("fair");
      expect(getStrengthLevel(60)).toBe("good");
      expect(getStrengthLevel(80)).toBe("strong");
    });
  });
});
