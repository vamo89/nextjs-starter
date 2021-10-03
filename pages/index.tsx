import type { GetServerSidePropsContext, NextPage } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(context.req.headers);

  return {
    redirect: {
      destination: "/sp",
      permanent: false,
    },
  };
}

const Home: NextPage = () => null;
export default Home;
