import React from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

const VercelLogo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`;

export const Footer = () => (
  <StyledFooter>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{" "}
      <VercelLogo>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </VercelLogo>
    </a>
  </StyledFooter>
);
