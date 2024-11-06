// @ts-expect-error yeah
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordStrengthMeter } from "../components/PasswordStrengthMeter";
import type { ThemeConfig } from "../types";

describe("PasswordStrengthMeter", () => {
  it("renders without crashing", () => {
    render(<PasswordStrengthMeter password="" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows correct strength for different passwords", async () => {
    const { rerender } = render(<PasswordStrengthMeter password="123" />);
    expect(screen.getByText("Weak")).toBeInTheDocument();

    rerender(<PasswordStrengthMeter password="Passw0rd" />);
    expect(screen.getByText("Fair")).toBeInTheDocument();

    rerender(<PasswordStrengthMeter password="P@ssw0rd123!" />);
    expect(screen.getByText("Strong")).toBeInTheDocument();
  });

  it("applies custom theme correctly", () => {
    const customTheme: ThemeConfig = {
      weak: { color: "#red", label: "Custom Weak" },
      fair: { color: "#yellow", label: "Custom Fair" },
      good: { color: "#blue", label: "Custom Good" },
      strong: { color: "#green", label: "Custom Strong" },
    };

    render(<PasswordStrengthMeter password="weak" theme={customTheme} />);
    expect(screen.getByText("Custom Weak")).toBeInTheDocument();
  });

  it("calls onChange callback with correct values", () => {
    const onChange = jest.fn();
    render(<PasswordStrengthMeter password="test" onChange={onChange} />);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        score: expect.any(Number),
        level: expect.stringMatching(/weak|fair|good|strong/),
      }),
    );
  });

  it("respects strength calculation rules", () => {
    const { rerender } = render(<PasswordStrengthMeter password="" />);

    expect(screen.getByText("Weak")).toBeInTheDocument();

    rerender(<PasswordStrengthMeter password="abc" />);
    expect(screen.getByText("Weak")).toBeInTheDocument();

    rerender(<PasswordStrengthMeter password="Passw0rd" />);
    expect(screen.getByText("Fair")).toBeInTheDocument();

    rerender(<PasswordStrengthMeter password="MyPassw0rd!" />);
    expect(screen.getByText("Strong")).toBeInTheDocument();

    rerender(<PasswordStrengthMeter password="MyStr0ng@P@ssw0rd" />);
    expect(screen.getByText("Strong")).toBeInTheDocument();
  });
});
