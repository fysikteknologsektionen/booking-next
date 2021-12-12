import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const SECRET = process.env.NEXTAUTH_SECRET;
const NODE_ENV = process.env.NODE_ENV;

if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET || !SECRET) {
  throw new Error(
    'Please set the OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET and NEXTAUTH_SECRET environment variables inside .env.local',
  );
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
    }),
  ],
  secret: SECRET,
  debug: NODE_ENV === 'development',
  callbacks: {
    async signIn({ profile }) {
      if (profile.email_verified && profile.email) {
        return profile.email.endsWith('@ftek.se');
      }
      return false;
    },
  },
});
