import UserModel from '@models/user';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '../../../lib/dbConnect';

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
    async signIn({ profile, user }) {
      if (profile.email_verified && profile.email?.endsWith('@ftek.se')) {
        await dbConnect();

        const userData = {
          name: user.name,
          email: user.email,
          image: user.image,
          googleId: user.id,
        };
        // Update local user data with data from Google
        await UserModel.findOneAndUpdate({ googleId: user.id }, userData, {
          upsert: true,
        });
        return true;
      }
      return false;
    },
  },
});
