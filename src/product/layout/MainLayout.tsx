import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainLayout: NextPage = ({ children }) => {
  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>Comida Virtual</title>
      </Head>
      <Header
        onLogin={() => {}}
        onLogout={() => {}}
        onSacola={() => {
          router.push("/sacola");
        }}
        onCreateAccount={() => {}}
      />
      <Main>{children}</Main>

      <Footer />
    </Container>
  );
};

export default MainLayout;
