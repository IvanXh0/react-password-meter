# React Password Strength Meter

A customizable, lightweight password strength meter component for React applications.

## Features

🎨 Multiple built-in themes (Classic, Emoji, Minimal)  
💪 Comprehensive strength calculation  
🛠 Fully customizable themes and scoring  
📦 Lightweight with zero dependencies  
💻 Written in TypeScript  
⚡️ Easy to integrate  
🔒 Common password detection

## Installation

```bash
npm install @xho/react-password-meter
```

or

```bash
yarn add @xho/react-password-meter
```

## Usage

### Basic Usage

```tsx
import { PasswordStrengthMeter } from "@xho/react-password-meter";

function App() {
  return <PasswordStrengthMeter password="yourpassword" theme="classicTheme" />;
}
```

### With Custom Theme

```tsx
import { PasswordStrengthMeter, ThemeConfig } from "@xho/react-password-meter";

const customTheme: ThemeConfig = {
  weak: { color: "#ff4d4d", label: "Too Weak" },
  fair: { color: "#ffaa00", label: "Getting Better" },
  good: { color: "#2196f3", label: "Almost There" },
  strong: { color: "#4caf50", label: "Perfect!" },
};

function App() {
  return (
    <PasswordStrengthMeter
      password="yourpassword"
      theme={customTheme}
      onChange={({ score, level }) => console.log(score, level)}
    />
  );
}
```

## Props

| Prop                 | Type                               | Default             | Description                          |
| -------------------- | ---------------------------------- | ------------------- | ------------------------------------ |
| `password`           | `string`                           | `""`                | The password to evaluate             |
| `theme`              | `ThemeName \| ThemeConfig`         | `"classicTheme"`    | Theme configuration                  |
| `showLabel`          | `boolean`                          | `true`              | Whether to show strength label       |
| `className`          | `string`                           | `""`                | Additional CSS classes               |
| `onChange`           | `(result: StrengthResult) => void` | -                   | Callback when strength changes       |
| `strengthCalculator` | `(password: string) => number`     | Built-in calculator | Custom strength calculation function |
