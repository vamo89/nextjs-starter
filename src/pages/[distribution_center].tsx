import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetStaticPropsContext } from "next";
import MainLayout from "../product/layout/MainLayout";
import { Title, Card, Description, Grid } from "../components";

type Props = {
  categories: [
    {
      name: string;
      slug: string;
      image: {
        url: string;
      };
    }
  ];
  distributionCenter: string;
};

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://whispering-stream-54419.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query DistributionCenters {
        distributionCenters {
          slug
        }
      }
    `,
  });

  const paths = data.distributionCenters.map(
    (distributionCenter: { slug: string }) => `/${distributionCenter.slug}`
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ distribution_center: string }>
) {
  const client = new ApolloClient({
    uri: "https://whispering-stream-54419.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Categories($dc_slug: String) {
        categories(where: { distribution_centers: { slug: $dc_slug } }) {
          name
          slug
          image {
            url
          }
        }
      }
    `,
    variables: {
      dc_slug: context.params!.distribution_center,
    },
  });

  return {
    props: {
      categories: data.categories,
      distributionCenter: context.params!.distribution_center,
    },
    revalidate: 60,
  };
}

const Home: NextPage<Props> = (props: Props) => {
  return (
    <MainLayout>
      <Head>
        <title>Comida Virtual {props.distributionCenter}</title>
      </Head>
      <Title text="Bem vindo!" />

      <Description
        text={`A primeira loja de comida virtual de ${props.distributionCenter}`}
      />

      <Grid>
        {props.categories.map((category) => {
          return (
            <Card key={category.name} href={`/categories/${category.slug}`}>
              <Image
                src={`${category.image.url}`}
                alt={`Foto da categoria ${category.name}`}
                width={310}
                height={200}
              />
              <h2>{category.name}</h2>
              <p>Esta é a categoria de {category.name}</p>
            </Card>
          );
        })}
      </Grid>
    </MainLayout>
  );
};

export default Home;
