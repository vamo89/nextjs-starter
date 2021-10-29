import React from "react";
import styled from "styled-components";
import { ThemeType } from "../common/types/theme";

type StyledButtonProps = {
  primary: boolean;
  size: "small" | "medium" | "large";
};

const fontSize = (size: StyledButtonProps["size"]) => {
  if (size === "small") {
    return "12px";
  } else if (size === "medium") {
    return "14px";
  }
  // Large
  return "16px";
};

const paddingSize = (size: StyledButtonProps["size"]) => {
  if (size === "small") {
    return "10px 16px";
  } else if (size === "medium") {
    return "11px 20px";
  }
  // Large
  return "12px 24px";
};

export const StyledButton = styled.button<StyledButtonProps>(
  ({ primary, size }) => `
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  color: ${(theme: ThemeType) => (primary ? "white" : theme.colors.primary)};
  background-color: ${primary ? "#1ea7fd" : "transparent"};
  box-shadow: ${
    primary ? undefined : "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset"
  };

  font-size: ${fontSize(size)};
  padding: ${paddingSize(size)};

  & + & {
    margin-left: 10px;
  }
`
);
