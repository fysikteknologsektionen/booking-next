import mongoose, { Connection, Document, PopulatedDoc, Types } from 'mongoose';

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

interface UserDocument extends User, Document {}

interface Timeslot {
  startTime: Date;
  endTime: Date;
  weekdaysIndex: Types.Array<Number>;
}

interface Venue {
  name: string;
  description?: string;
  managers: Types.DocumentArray<UserDocument>;
  enabled: boolean;
  timeslots: Types.DocumentArray<Timeslot>;
}

interface VenueDocument extends Venue, Document {}

type ReservationStatus = 'accepted' | 'pending' | 'declined';

interface Reservation {
  clientName: string;
  clientEmail: string;
  clientTel: string;
  clientGroup?: string;
  description: string;
  venue: PopulatedDoc<Venue, Types.ObjectId>;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  timeslot?: PopulatedDoc<Timeslot, Types.ObjectId>;
  comment?: string;
  readonly timestamp: Date;
}
