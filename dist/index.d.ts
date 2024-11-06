declare const themes: {
    readonly classicTheme: ThemeConfig;
    readonly emojiTheme: ThemeConfig;
    readonly minimalTheme: ThemeConfig;
    readonly darkTheme: ThemeConfig;
    readonly modernTheme: ThemeConfig;
    readonly pastelTheme: ThemeConfig;
};

type StrengthLevel = "weak" | "fair" | "good" | "strong";
interface StyleConfig {
    color: string;
    label: string;
}
interface ThemeConfig {
    weak: StyleConfig;
    fair: StyleConfig;
    good: StyleConfig;
    strong: StyleConfig;
}
type ThemeName = keyof typeof themes;
interface StrengthResult {
    score: number;
    level: StrengthLevel;
}
interface PasswordStrengthMeterProps {
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

declare const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps>;

declare const calculateStrength: (password: string) => number;
declare const getStrengthLevel: (score: number) => StrengthLevel;

export { PasswordStrengthMeter, type PasswordStrengthMeterProps, type StrengthLevel, type ThemeConfig, calculateStrength, getStrengthLevel };
