import type { StrengthLevel } from "../types";

export const calculateStrength = (password: string): number => {
  if (!password) return 0;

  const commonPasswords = [
    "password",
    "password1",
    "password123",
    "passw0rd",
    "passw0rd1",
    "passw0rd123",
    "p@ssword",
    "p@ssword1",
    "p@ssword123",
    "p@ssw0rd",
    "p@ssw0rd1",
    "p@ssw0rd123",
    "123456",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
  ];

  let score = 0;

  // Basic checks
  const checks = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSymbols: /[^A-Za-z0-9]/.test(password),
    hasCommonPassword: commonPasswords.includes(password.toLowerCase()),
  };

  // Basic scoring - total possible: 40
  if (checks.hasMinLength) score += 10;
  if (checks.hasUpperCase) score += 10;
  if (checks.hasLowerCase) score += 10;
  if (checks.hasNumbers) score += 10;

  // Additional features - total possible: 20
  if (checks.hasSymbols) score += 10;
  if (password.length >= 12) score += 10;

  // Penalties for common passwords
  if (checks.hasCommonPassword) {
    score = Math.floor(score * 0.5); // 50% penalty
  }

  // Normalize score between 0 and 100
  const maxScore = 60; // Total possible score
  const normalizedScore = Math.floor((score / maxScore) * 100);
  return Math.min(100, normalizedScore);
};

export const getStrengthLevel = (score: number): StrengthLevel => {
  if (score < 30) return "weak";
  if (score < 50) return "fair";
  if (score < 70) return "good";
  return "strong";
};
