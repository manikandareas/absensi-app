import { ApiRoute } from "@/lib/api-route";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(ApiRoute.refreshToken(), {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  const response = await res.json();
  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "abizdhar@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(ApiRoute.signIn(), {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 401 || res.status === 400) {
          return null;
        }
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register",
  },
};
