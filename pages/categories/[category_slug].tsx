import type { NextPage } from "next";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetStaticPropsContext } from "next";

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
    paths: paths,
    fallback: "blocking",
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
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Categoria {props.category}</h1>

      <div className={styles.grid}>
        {props.products?.map((product) => {
          return (
            <a
              key={product.title}
              href={`/products/${product.slug}`}
              className={styles.card}
            >
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
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
