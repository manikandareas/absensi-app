"use client";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
type SessionProviderProps = React.PropsWithChildren;

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};
export default SessionProvider;
