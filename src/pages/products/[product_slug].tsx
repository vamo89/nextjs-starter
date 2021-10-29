import type { NextPage } from "next";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetStaticPropsContext } from "next";

type Product = {
  title: string;
  description: string;
  price: number;
  image: {
    url: string;
  };
};

type Props = {
  product: Product;
};

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://whispering-stream-54419.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Products {
        products {
          slug
        }
      }
    `,
  });

  const paths = data.products.map(
    (products: { slug: string }) => `/products/${products.slug}`
  );

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ product_slug: string }>
) {
  const client = new ApolloClient({
    uri: "https://whispering-stream-54419.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Products($slug: String) {
        products(where: { slug: $slug }) {
          title
          description
          price
          image {
            url
          }
        }
      }
    `,
    variables: { slug: context.params!.product_slug },
  });

  const product: Product = data.products[0];

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}

const ProductPage: NextPage<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produto {props.product.title}</h1>

      <div>
        <Image
          src={`${props.product.image.url}`}
          alt={`Foto do produto ${props.product.title}`}
          width={310}
          height={200}
        />
        <h2>{props.product.title}</h2>
        <p>
          R${props.product.price} - {props.product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;