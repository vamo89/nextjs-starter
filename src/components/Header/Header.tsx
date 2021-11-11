import React from "react";
import styled from "styled-components";

import { Button } from "../Button";
import { Logo } from "../Logo";
import { HeaderWrapper, HeaderTitle } from "./header.styles";

const Clickable = styled.div`
  cursor: pointer;
`;

interface HeaderProps {
  user?: {};
  onLogo: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onSacola: () => void;
  onCreateAccount: () => void;
}

export const Header = ({
  user,
  onLogo,
  onLogin,
  onLogout,
  onSacola,
  onCreateAccount,
}: HeaderProps) => (
  <header>
    <HeaderWrapper>
      <Clickable onClick={onLogo}>
        <Logo />
        <HeaderTitle>Acme</HeaderTitle>
      </Clickable>
      <div>
        {user ? (
          <Button size="small" onClick={onLogout} label="Log out" />
        ) : (
          <>
            <Button size="small" onClick={onSacola} label="Sacola" />
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button
              primary
              size="small"
              onClick={onCreateAccount}
              label="Sign up"
            />
          </>
        )}
      </div>
    </HeaderWrapper>
  </header>
);
