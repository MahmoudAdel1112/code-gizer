// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

interface NextAuthUserWithStringId {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      username?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User extends NextAuthUserWithStringId {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: { scope: "read:user repo" },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        } as NextAuthUserWithStringId;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user && account) {
        token.id = user.id;
        token.username = user.username;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
