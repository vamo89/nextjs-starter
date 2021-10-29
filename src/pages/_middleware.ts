import { NextResponse, NextRequest } from "next/server";
import findDistributionCenterByLocation from "../helpers/findDistributionCenterByLocation";
import findLocationByIp from "../helpers/findLocationByIp";

const acceptedRegions = ["mg", "sp", "rj"];

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  let response = NextResponse.next();
  if (url.pathname == "/") {
    const dc = request.cookies["distribution_center"];
    const location = request.ip && findLocationByIp(request.ip);
    const dcByIp = location && findDistributionCenterByLocation(await location);
    console.log(
      "cookie: ",
      dc,
      "geo: ",
      request.geo,
      "ip: ",
      request.ip,
      "dc by ip: ",
      dcByIp
    );
    if (dc) {
      response = NextResponse.rewrite(`/${dc}`);
    } else if (
      request.geo.country &&
      request.geo.country == "BR" &&
      request.geo.region &&
      acceptedRegions.includes(request.geo.region.toLowerCase())
    ) {
      // Only available in Vercel's pro or enterprise plans
      const newDc = request.geo.region.toLowerCase();
      response.cookie("distribution_center", newDc);
      response = NextResponse.rewrite(`/${newDc}`);
    } else if (dcByIp) {
      response.cookie("distribution_center", dcByIp);
      response = NextResponse.rewrite(`/${dcByIp}`);
    } else {
      response = NextResponse.rewrite(`/sp`);
    }
  }
  return response;
}
