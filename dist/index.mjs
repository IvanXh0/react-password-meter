import { useState, useEffect } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/components/PasswordStrengthMeter.tsx

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/components/styles.css
styleInject('.password-strength-meter {\n  width: 100%;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    Oxygen,\n    Ubuntu,\n    Cantarell,\n    "Open Sans",\n    "Helvetica Neue",\n    sans-serif;\n}\n.password-strength-meter__progress {\n  position: relative;\n  width: 100%;\n  height: 4px;\n  background-color: #f3f4f6;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-bottom: 8px;\n}\n.password-strength-meter__bar {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 0;\n  transition: width 300ms ease-out, background-color 300ms ease-out;\n}\n.password-strength-meter__label {\n  font-size: 14px;\n  font-weight: 500;\n  transition: color 300ms ease-out;\n  margin-top: 4px;\n  user-select: none;\n}\n.password-strength-meter__progress:hover {\n  background-color: #e5e7eb;\n}\n@media (prefers-reduced-motion: reduce) {\n  .password-strength-meter__bar,\n  .password-strength-meter__label {\n    transition: none;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .password-strength-meter__progress {\n    background-color: #374151;\n  }\n  .password-strength-meter__progress:hover {\n    background-color: #4b5563;\n  }\n}\n');

// src/themes/default/classic.ts
var classicTheme = {
  weak: { color: "#ff4d4d", label: "Weak" },
  fair: { color: "#ffaa00", label: "Fair" },
  good: { color: "#2196f3", label: "Good" },
  strong: { color: "#4caf50", label: "Strong" }
};

// src/themes/default/emoji.ts
var emojiTheme = {
  weak: { color: "#ff4d4d", label: "\u{1F622}" },
  fair: { color: "#ffaa00", label: "\u{1F914}" },
  good: { color: "#2196f3", label: "\u{1F60A}" },
  strong: { color: "#4caf50", label: "\u{1F680}" }
};

// src/themes/default/minimal.ts
var minimalTheme = {
  weak: { color: "#e0e0e0", label: "1/4" },
  fair: { color: "#9e9e9e", label: "2/4" },
  good: { color: "#616161", label: "3/4" },
  strong: { color: "#212121", label: "4/4" }
};

// src/themes/presets/dark.ts
var darkTheme = {
  weak: { color: "#ef4444", label: "Weak" },
  fair: { color: "#f97316", label: "Fair" },
  good: { color: "#3b82f6", label: "Good" },
  strong: { color: "#22c55e", label: "Strong" }
};

// src/themes/presets/modern.ts
var modernTheme = {
  weak: { color: "#f43f5e", label: "Not Secure" },
  fair: { color: "#fb923c", label: "Could Be Better" },
  good: { color: "#38bdf8", label: "Secure" },
  strong: { color: "#34d399", label: "Very Secure" }
};

// src/themes/presets/pastel.ts
var pastelTheme = {
  weak: { color: "#fecaca", label: "Weak" },
  fair: { color: "#fed7aa", label: "Fair" },
  good: { color: "#bfdbfe", label: "Good" },
  strong: { color: "#bbf7d0", label: "Strong" }
};

// src/themes/index.ts
var themes = {
  classicTheme,
  emojiTheme,
  minimalTheme,
  darkTheme,
  modernTheme,
  pastelTheme
};
var getTheme = (theme) => {
  if (typeof theme === "string") {
    return themes[theme];
  }
  return theme;
};

// src/utils/strength.ts
var calculateStrength = (password) => {
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
    "welcome"
  ];
  let score = 0;
  const checks = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSymbols: /[^A-Za-z0-9]/.test(password),
    hasCommonPassword: commonPasswords.includes(password.toLowerCase())
  };
  if (checks.hasMinLength) score += 10;
  if (checks.hasUpperCase) score += 10;
  if (checks.hasLowerCase) score += 10;
  if (checks.hasNumbers) score += 10;
  if (checks.hasSymbols) score += 10;
  if (password.length >= 12) score += 10;
  if (checks.hasCommonPassword) {
    score = Math.floor(score * 0.5);
  }
  const maxScore = 60;
  const normalizedScore = Math.floor(score / maxScore * 100);
  return Math.min(100, normalizedScore);
};
var getStrengthLevel = (score) => {
  if (score < 30) return "weak";
  if (score < 50) return "fair";
  if (score < 70) return "good";
  return "strong";
};
var PasswordStrengthMeter = ({
  password,
  theme = "classicTheme",
  showLabel = true,
  className = "",
  onChange,
  strengthCalculator = calculateStrength
}) => {
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState("weak");
  const activeTheme = getTheme(theme);
  useEffect(() => {
    const score = strengthCalculator(password);
    const strengthLevel = getStrengthLevel(score);
    setStrength(score);
    setLevel(strengthLevel);
    onChange == null ? void 0 : onChange({ score, level: strengthLevel });
  }, [password, strengthCalculator, onChange]);
  return /* @__PURE__ */ jsxs("div", { className: `password-strength-meter ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "password-strength-meter__progress", children: /* @__PURE__ */ jsx(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": strength,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        className: "password-strength-meter__bar",
        style: {
          width: `${strength}%`,
          backgroundColor: activeTheme[level].color
        }
      }
    ) }),
    showLabel && /* @__PURE__ */ jsx(
      "div",
      {
        className: "password-strength-meter__label",
        style: { color: activeTheme[level].color },
        children: activeTheme[level].label
      }
    )
  ] });
};

export { PasswordStrengthMeter, calculateStrength, getStrengthLevel };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map