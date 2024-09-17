import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./app/db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
});
