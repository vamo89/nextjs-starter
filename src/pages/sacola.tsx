import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Description, Title } from "../components";
import MainLayout from "../product/layout/MainLayout";

const Sacola: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Comida Virtual - Sua Sacola</title>
      </Head>

      <Title text="Sacola" />
      <Description text="Sacola" />
    </MainLayout>
  );
};

export default Sacola;
