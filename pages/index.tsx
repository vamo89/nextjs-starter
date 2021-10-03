import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import type { GetServerSidePropsContext, NextPage } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const findLocationByIp = async (ip: string) => {
    // Really simple ip regex, only validate that we have 4 groups with 1 to 3 digits each, divided by points
    const simpleIpRegex = /^(\d{1,3}\.){3}(\d{1,3})$/;

    if (!simpleIpRegex.test(ip)) {
      return;
    }

    const fetch = require("node-fetch");
    const host = context.req.headers.host;

    const url = "https://tools.keycdn.com/geo.json";

    const options = {
      method: "GET",
      qs: { host },
      headers: {
        "User-Agent":
          "keycdn-tools:https://nextjs-starter-omega-henna.vercel.app",
      },
    };

    const json = await fetch(url, options)
      .then((res: any) => res.json())
      .catch((err: any) => console.error("error:" + err));

    console.log(json.data.geo);

    const regionCode: string = json.data?.geo?.region_code;

    return regionCode.toLowerCase();
  };

  if (context.req.headers.host) {
    const location = findLocationByIp(context.req.headers.host);

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

    const dcSlugs = data.distributionCenters.map(
      (distributionCenterFromDB: { slug: string }) =>
        distributionCenterFromDB.slug
    );

    const distributionCenter =
      (await location) && dcSlugs.includes(location) ? location : "sp";

    return {
      redirect: {
        destination: `/${distributionCenter}`,
        permanent: false,
      },
    };
  }

  // Cannot get region from ip - return the default distribution center
  return {
    redirect: {
      destination: "/sp",
      permanent: false,
    },
  };
}

const Home: NextPage = () => null;
export default Home;
