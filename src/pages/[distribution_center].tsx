import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetStaticPropsContext } from "next";

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
    <div className={styles.container}>
      <Head>
        <html lang="pt-BR" />
        <title>Comida Virtual</title>
        <meta name="description" content="Sua loja de comida virtual" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bem vindo!</h1>

        <p className={styles.description}>
          A primeira loja de comida virtual de {props.distributionCenter}
        </p>

        <div className={styles.grid}>
          {props.categories.map((category) => {
            return (
              <a
                key={category.name}
                href={`/categories/${category.slug}`}
                className={styles.card}
              >
                <Image
                  src={`${category.image.url}`}
                  alt={`Foto da categoria ${category.name}`}
                  width={310}
                  height={200}
                />
                <h2>{category.name}</h2>
                <p>Esta é a categoria de {category.name}</p>
              </a>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
