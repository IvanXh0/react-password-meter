import type { ThemeConfig } from "../types";
import { classicTheme } from "./default/classic";
import { emojiTheme } from "./default/emoji";
import { minimalTheme } from "./default/minimal";
import { darkTheme } from "./presets/dark";
import { modernTheme } from "./presets/modern";
import { pastelTheme } from "./presets/pastel";

export const themes = {
  classicTheme,
  emojiTheme,
  minimalTheme,
  darkTheme,
  modernTheme,
  pastelTheme,
} as const;

export type ThemeName = keyof typeof themes;

export const getTheme = (theme: ThemeName | ThemeConfig): ThemeConfig => {
  if (typeof theme === "string") {
    return themes[theme];
  }
  return theme;
};
