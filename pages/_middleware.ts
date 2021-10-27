import { NextResponse, NextRequest } from "next/server";

const acceptedRegions = ["mg", "sp", "rj"];

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  let response = NextResponse.next();
  if (url.pathname == "/") {
    const dc = request.cookies["distribution_center"];
    if (dc) {
      response = NextResponse.rewrite(`/${dc}`);
    } else if (
      request.geo.country &&
      request.geo.country == "BR" &&
      request.geo.region &&
      acceptedRegions.includes(request.geo.region.toLowerCase())
    ) {
      // TODO: add cookie
      response = NextResponse.rewrite(`/${request.geo.region.toLowerCase()}`);
    } else {
      response = NextResponse.rewrite(`/sp`);
    }
  }
  return response;
}
