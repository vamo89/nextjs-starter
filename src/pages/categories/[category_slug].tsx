import type { NextPage } from "next";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetStaticPropsContext } from "next";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import MainLayout from "../../product/layout/MainLayout";
import { Card, Title, Loading, Grid } from "../../components";

type Product = {
  title: string;
  description: string;
  slug: string;
  price: number;
  image: {
    url: string;
  };
  status: "published" | "draft";
  categories: [
    {
      slug: string;
    }
  ];
};

type Props = {
  products: [Product];
  category: string;
};

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://whispering-stream-54419.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Categories {
        categories {
          slug
        }
      }
    `,
  });

  const paths = data.categories.map(
    (category: { slug: string }) => `/categories/${category.slug}`
  );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ category_slug: string }>
) {
  const client = new ApolloClient({
    uri: "https://whispering-stream-54419.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data: categoryData } = await client.query({
    query: gql`
      query Categories($slug: String) {
        categories(where: { slug: $slug }) {
          name
        }
      }
    `,
    variables: {
      slug: context.params!.category_slug,
    },
  });

  const { data: productData } = await client.query({
    query: gql`
      query Products($categorySlug: String) {
        products(
          where: { categories: { slug: $categorySlug }, status: "published" }
        ) {
          title
          description
          slug
          price
          status
          categories {
            slug
          }
          image {
            url
          }
        }
      }
    `,
    variables: {
      categorySlug: context.params!.category_slug,
    },
  });

  return {
    props: {
      products: productData.products,
      category: categoryData.categories[0].name,
    },
    revalidate: 60,
  };
}

const CategoryPage: NextPage<Props> = (props: Props) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <Loading />;
  }
  return (
    <MainLayout>
      <Head>
        <title>Comida Virtual - Produto {props.category}</title>
      </Head>
      <Title text={`Categoria ${props.category}`} />

      <Grid>
        {props.products?.map((product) => {
          return (
            <Card key={product.title} href={`/products/${product.slug}`}>
              <Image
                src={`${product.image.url}`}
                alt={`Foto do produto ${product.title}`}
                width={310}
                height={200}
              />
              <h2>{product.title}</h2>
              <p>
                R${product.price} - {product.description}
              </p>
            </Card>
          );
        })}
      </Grid>
    </MainLayout>
  );
};

export default CategoryPage;
