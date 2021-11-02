import React from "react";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  padding: 15px 0px;

  & :first-child {
    padding-left: 20px;
  }

  & :last-child {
    padding-right: 20px;
  }
`;

export const Logo = styled.svg`
  display: inline-block;
  vertical-align: top;
`;

export const HeaderTitle = styled.h1`
  font-weight: 900;
  font-size: 20px;
  line-height: 1;
  margin: 6px 0 6px 10px;
  display: inline-block;
  vertical-align: top;
`;
