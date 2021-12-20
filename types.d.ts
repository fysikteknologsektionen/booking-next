import { PopulatedDoc, Types } from 'mongoose';

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
