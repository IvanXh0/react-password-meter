import React, { useEffect, useState } from "react";
import "./styles.css";
import { getTheme } from "../themes";
import type { PasswordStrengthMeterProps, StrengthLevel } from "../types";
import { calculateStrength, getStrengthLevel } from "../utils";

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
