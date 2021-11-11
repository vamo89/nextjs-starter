import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { CheckoutPage } from "../modules/checkout";
import MainLayout from "../product/layout/MainLayout";

const Sacola: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Comida Virtual - Sua Sacola</title>
      </Head>

      <CheckoutPage />
    </MainLayout>
  );
};

export default Sacola;
