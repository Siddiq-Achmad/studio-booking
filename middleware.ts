import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  async function middleware(req) {
    const { nextUrl } = req;
    process.env.TZ = "Asia/Jakarta";
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
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
