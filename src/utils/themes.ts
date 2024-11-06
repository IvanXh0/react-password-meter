import type { ThemeConfig } from "../types";

export const defaultThemes: Record<string, ThemeConfig> = {
  classic: {
    weak: { color: "#ff4d4d", label: "Weak" },
    fair: { color: "#ffaa00", label: "Fair" },
    good: { color: "#2196f3", label: "Good" },
    strong: { color: "#4caf50", label: "Strong" },
  },
  emoji: {
    weak: { color: "#ff4d4d", label: "😢" },
    fair: { color: "#ffaa00", label: "🤔" },
    good: { color: "#2196f3", label: "😊" },
    strong: { color: "#4caf50", label: "🚀" },
  },
  minimal: {
    weak: { color: "#e0e0e0", label: "1/4" },
    fair: { color: "#9e9e9e", label: "2/4" },
    good: { color: "#616161", label: "3/4" },
    strong: { color: "#212121", label: "4/4" },
  },
};
