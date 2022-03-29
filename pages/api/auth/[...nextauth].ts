import UserModel, { UserRole } from 'src/models/UserModel';
import NextAuth from 'next-auth/next';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from 'src/lib/dbConnect';

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const SECRET = process.env.NEXTAUTH_SECRET;
const NODE_ENV = process.env.NODE_ENV;

if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET || !SECRET) {
  throw new Error(
    `One or more of environment variables "GOOGLE_OAUTH_CLIENT_ID",
    "GOOGLE_OAUTH_CLIENT_SECRET" or "NEXTAUTH_SECRET" are not set. Please set them.`,
  );
}

// The default google provider
const providers: Provider[] = [
  GoogleProvider({
    clientId: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
  }),
];

// If we're not in production we set up a simple username based credentials provider so that
// we can still test all authentication functionality
if (NODE_ENV !== 'production') {
  providers.push(
    Credentials({
      name: 'DEV provider',
      credentials: {
        username: { label: 'Username', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        await dbConnect();

        // Dummy data
        const userData = {
          email: 'foo@bar.com',
          googleId: Date.now().toString(),
          role: UserRole.ADMIN,
        };

        // Upsert user
        const user = await UserModel.findOneAndUpdate(
          { name: credentials.username },
          userData,
          {
            new: true,
            upsert: true,
          },
        );

        return user; // Will be null if invalid
      },
    }),
  );
}

export default NextAuth({
  providers,
  secret: SECRET,
  debug: NODE_ENV !== 'production',
  callbacks: {
    async signIn({ profile, account, user }) {
      // Allow by default if using DEV provider
      if (NODE_ENV !== 'production' && account.provider === 'credentials') {
        return true;
      }

      // The oauth client should be set up to only allow users within the organisation,
      // but as a sanity check we'll validate the email
      if (!profile.email_verified || !profile.email?.endsWith('ftek.se')) {
        return false;
      }

      await dbConnect();

      // The user data collected from google
      const userData = {
        name: user.name,
        email: user.email,
        image: user.image,
        googleId: user.id,
      };

      // We upsert to update our local user records incase the data has changed
      await UserModel.findOneAndUpdate({ googleId: user.id }, userData, {
        upsert: true,
      });

      return true;
    },
  },
});
