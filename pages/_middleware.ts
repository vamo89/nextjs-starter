import { NextResponse, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  let response = NextResponse.next();
  if (url.pathname == "/") {
    const dc = request.cookies["distribution_center"];
    if (dc) {
      response = NextResponse.rewrite(`/${dc}`);
    } else {
      // TODO: try using ip from request to locate the user before defaulting to sp
      response = NextResponse.rewrite(`/sp`);
    }
  }
  return response;
}
