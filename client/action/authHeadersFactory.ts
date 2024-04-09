"use server";

import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";

export const authHeadersFactory = async () => {
  return await getServerSession(authOptions);
};
