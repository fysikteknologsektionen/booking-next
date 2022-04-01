// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {

  interface Session {
    user: {
      id: string;
      name?: string;
      image?: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name?: string;
    image?: string;
    sub: string;
  }
}
