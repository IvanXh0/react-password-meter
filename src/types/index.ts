import type { themes } from "../themes";

export type StrengthLevel = "weak" | "fair" | "good" | "strong";

export interface StyleConfig {
  color: string;
  label: string;
}

export interface ThemeConfig {
  weak: StyleConfig;
  fair: StyleConfig;
  good: StyleConfig;
  strong: StyleConfig;
}

export type ThemeName = keyof typeof themes;

export interface StrengthResult {
  score: number;
  level: StrengthLevel;
}

export interface PasswordStrengthMeterProps {
  /** Password string to evaluate */
  password: string;
  /** Predefined theme name or custom theme configuration */
  theme?: ThemeName | ThemeConfig;
  /** Whether to show the strength label */
  showLabel?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Callback fired when password strength changes */
  onChange?: (result: StrengthResult) => void;
  /** Custom strength calculation function */
  strengthCalculator?: (password: string) => number;
}
