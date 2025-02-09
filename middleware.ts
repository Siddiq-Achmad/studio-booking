import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    process.env.TZ = "Asia/Jakarta"
    if (nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
