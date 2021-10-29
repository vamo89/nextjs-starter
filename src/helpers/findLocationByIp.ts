// findLocationByIp(162.158.193.252) - rio
// findLocationByIp(201.17.149.246) - minas
// findLocationByIp(186.220.122.122) - sp
export type LocationType =
  | {
      country: string;
      region: string;
      city: string;
    }
  | undefined;

const findLocationByIp = async (ip: string): Promise<LocationType> => {
  // Really simple ip regex, only validate that we have 4 groups with 1 to 3 digits each, divided by points
  const simpleIpRegex = /^(\d{1,3}\.){3}(\d{1,3})$/;

  if (!simpleIpRegex.test(ip)) {
    return undefined;
  }

  const fetch = require("node-fetch");

  const json = await fetch(`http://ipinfo.io/${ip}/json`)
    .then((res: any) => res.json())
    .catch((err: any) => console.error("error:" + err));

  if (json.error) {
    return undefined;
  }

  const { country, region, city } = json;

  return {
    country,
    region,
    city,
  };
};

export default findLocationByIp;
