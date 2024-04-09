import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: "/auth/signin",

    // error: "/error",
  },
});

export const config = { matcher: ["/", "/classes", "/settings"] };
