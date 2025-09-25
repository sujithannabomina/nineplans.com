import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      // Attach token sub as id for convenience
      if (session?.user && token?.sub) session.user.id = token.sub;
      return session;
    },
  },
  // You can add pages: { signIn: '/login' } if you want a custom page
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
