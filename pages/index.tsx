import type { GetServerSidePropsContext, NextPage } from "next";
import findDistributionCenterByLocation from "./helpers/findDistributionCenterByLocation";
import findLocationByIp from "./helpers/findLocationByIp";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.req.headers.host) {
    const location = await findLocationByIp(context.req.headers.host);
    const distributionCenter = findDistributionCenterByLocation(location);

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
