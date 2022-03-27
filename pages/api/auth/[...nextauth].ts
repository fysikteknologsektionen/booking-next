import UserModel from 'src/models/UserModel';
import NextAuth from 'next-auth/next';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from 'src/lib/dbConnect';

const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const SECRET = process.env.NEXTAUTH_SECRET;
const NODE_ENV = process.env.NODE_ENV;

if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET || !SECRET) {
  throw new Error(
    'Please set the OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET and NEXTAUTH_SECRET environment variables inside .env.local',
  );
}

// The default google provider
const providers: Provider[] = [
  GoogleProvider({
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
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
        await dbConnect();

        // Dummy data
        const userData = {
          email: 'foo@bar.com',
          googleId: Date.now().toString(),
        };

        // Upsert user (note that we filter on name -- this is not consistent with how we actually
        // intend to use this is in production, but rather a result of having no consistent googleId
        // when developing without oauth).
        const user = await UserModel.findOneAndUpdate(
          { name: credentials?.username },
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
        return false; // Authentication unsuccessful
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

      return true; // Authentication successful
    },
  },
});
