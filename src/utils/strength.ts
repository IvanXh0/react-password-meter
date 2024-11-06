import type { StrengthLevel } from "../types";

export const calculateStrength = (password: string): number => {
  if (!password) return 0;

  let score = 0;
  const checks = {
    length: { min: 8, bonus: 12 },
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numbers: /[0-9]/,
    symbols: /[^A-Za-z0-9]/,
    repeating: /(.)\1{2,}/,
    consecutive:
      /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i,
    common: /(password|123456|qwerty|admin|letmein|welcome)/i,
  };

  // Length checks
  if (password.length >= checks.length.min) score += 1;
  if (password.length >= checks.length.bonus) score += 1;

  // Character variety checks
  if (checks.uppercase.test(password)) score += 1;
  if (checks.lowercase.test(password)) score += 1;
  if (checks.numbers.test(password)) score += 1;
  if (checks.symbols.test(password)) score += 1;

  // Deductions
  if (checks.repeating.test(password)) score -= 1;
  if (checks.consecutive.test(password)) score -= 1;
  if (checks.common.test(password)) score -= 2;

  // Normalize score to 0-100
  return Math.max(Math.min((score / 6) * 100, 100), 0);
};

export const getStrengthLevel = (score: number): StrengthLevel => {
  if (score < 25) return "weak";
  if (score < 50) return "fair";
  if (score < 75) return "good";
  return "strong";
};
