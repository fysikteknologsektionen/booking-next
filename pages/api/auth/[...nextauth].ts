import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { upsertUser } from 'services/user';

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const SECRET = process.env.NEXTAUTH_SECRET;

if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET || !SECRET) {
  throw new Error(
    `One or more of environment variables "GOOGLE_OAUTH_CLIENT_ID",
    "GOOGLE_OAUTH_CLIENT_SECRET" or "NEXTAUTH_SECRET" are not set. Please set them.`,
  );
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      image?: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    image?: string;
    sub: string;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  secret: SECRET,
  debug: process.env.NODE_ENV === 'development',
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
        if (!googleUser.name || !googleUser.email) {
          throw new Error('Invalid google user.');
        }
        const localUser = await upsertUser(googleUser.id, {
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.image || null,
        });

        // Construct token
        newToken = {
          name: localUser.name,
          image: localUser.image ?? undefined,
          sub: localUser.id.toString(),
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
