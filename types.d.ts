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
  isAdmin: boolean;
}

interface Timeslot {
  startTime: Date;
  endTime: Date;
  weekdays: number[];
}

interface Venue {
  name: string;
  description?: string;
  managers: PopulatedDoc<User, Types.ObjectId>[];
  enabled: boolean;
  timeslots: Timeslot[];
}

type ReservationStatus = 'accepted' | 'pending' | 'declined';

interface Reservation {
  clientName: string;
  clientEmail: string;
  clientPhoneNumber: string;
  clientGroup?: string;
  description: string;
  venue: PopulatedDoc<Venue, Types.ObjectId>;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  timeslot?: PopulatedDoc<Timeslot, Types.ObjectId>;
  comment?: string;
}
