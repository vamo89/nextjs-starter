import React from "react";

import { Button } from "../Button";
import { Logo } from "../Logo";
import { HeaderWrapper, HeaderTitle } from "./header.styles";

interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onSacola: () => void;
  onCreateAccount: () => void;
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onSacola,
  onCreateAccount,
}: HeaderProps) => (
  <header>
    <HeaderWrapper>
      <div>
        <Logo />
        <HeaderTitle>Acme</HeaderTitle>
      </div>
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
