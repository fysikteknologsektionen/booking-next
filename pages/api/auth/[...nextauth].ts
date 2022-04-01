import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from 'src/lib/dbConnect';
import { upsertUserByGoogleId } from 'src/services/UserService';

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const SECRET = process.env.NEXTAUTH_SECRET;

if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET || !SECRET) {
  throw new Error(
    `One or more of environment variables "GOOGLE_OAUTH_CLIENT_ID",
    "GOOGLE_OAUTH_CLIENT_SECRET" or "NEXTAUTH_SECRET" are not set. Please set them.`,
  );
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  secret: SECRET,
  // debug: process.env.NODE_ENV === 'development',
  callbacks: {
    signIn({ profile }) {
      // Should always be true for organizational users, but check for redundancy
      if (!profile.email_verified) {
        return false;
      }
      return true;
    },
    async jwt({ token, user: googleUser }) {
      let newToken = token;
      // On initial login
      if (googleUser) {
        // Update local user data
        await dbConnect();
        const localUser = await upsertUserByGoogleId(googleUser.id, {
          name: googleUser.name ?? undefined,
          email: googleUser.email ?? undefined,
          image: googleUser.image ?? undefined,
        });

        // Construct token
        newToken = {
          name: localUser.name,
          image: localUser.image,
          sub: localUser._id.toString(),
        };
      }

      return newToken;
    },
    session({ session, token }) {
      // Attach user data to session
      const newSession = {
        ...session,
        user: {
          name: token.name,
          image: token.image,
          id: token.sub,
        },
      };

      return newSession;
    },
  },
});
