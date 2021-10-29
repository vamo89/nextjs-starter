import React from "react";
import { StyledButton } from "./button.styles";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  label,
  ...props
}: ButtonProps) => (
  <StyledButton type="button" primary={primary} size={size} {...props}>
    {label}
  </StyledButton>
);
