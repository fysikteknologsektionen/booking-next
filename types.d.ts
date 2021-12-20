import mongoose, { Connection, PopulatedDoc, Types } from 'mongoose';

declare global {
  // This is the correct way to extend globalThis as of node 16+
  // eslint-disable-next-line vars-on-top, no-var
  var mongoose: {
    conn: Connection | null;
    promise: Promise<mongoose> | null;
  };
}

interface User {
  googleId: string;
  name: string;
  email: string;
  image?: string;
  manages: [PopulatedDoc<Venue, Types.ObjectId>];
}

interface Venue {
  name: string;
  description?: string;
  manager?: PopulatedDoc<string, Types.ObjectId>;
  enabled: boolean;
}
