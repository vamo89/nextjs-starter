import { LocationType } from "./findLocationByIp";

const findDistributionCenterByLocation = (location: LocationType) => {
  // TODO: validate with info from db
  if (location) {
    if (location.country === "BR") {
      if (location.region === "Rio de Janeiro") {
        return "rj";
      }
      if (location.region === "Minas Gerais") {
        return "mg";
      }
    }
  }
  // default
  return "sp";
};

export default findDistributionCenterByLocation;
