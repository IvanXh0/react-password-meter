import { useEffect, useState } from "react";
import "./styles.css";
import { getTheme } from "../themes";
import { calculateStrength, getStrengthLevel } from "../utils";
import { PasswordStrengthMeterProps, StrengthLevel } from "../types";

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  theme = "classicTheme",
  showLabel = true,
  className = "",
  onChange,
  strengthCalculator = calculateStrength,
}) => {
  const [strength, setStrength] = useState<number>(0);
  const [level, setLevel] = useState<StrengthLevel>("weak");
  const activeTheme = getTheme(theme);

  useEffect(() => {
    const score = strengthCalculator(password);
    const strengthLevel = getStrengthLevel(score);
    setStrength(score);
    setLevel(strengthLevel);
    onChange?.({ score, level: strengthLevel });
  }, [password, strengthCalculator, onChange]);

  return (
    <div className={`password-strength-meter ${className}`}>
      <div className="password-strength-meter__progress">
        <div
          role="progressbar"
          aria-valuenow={strength}
          aria-valuemin={0}
          aria-valuemax={100}
          className="password-strength-meter__bar"
          style={{
            width: `${strength}%`,
            backgroundColor: activeTheme[level].color,
          }}
        />
      </div>
      {showLabel && (
        <div
          className="password-strength-meter__label"
          style={{ color: activeTheme[level].color }}
        >
          {activeTheme[level].label}
        </div>
      )}
    </div>
  );
};
