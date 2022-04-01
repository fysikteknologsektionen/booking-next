import type { Model, Types } from 'mongoose';
import { model, models, Schema } from 'mongoose';

interface AnonymousClient {
  name: string;
  email: string;
  cellphone: string;
  group?: string;
}

export enum ReservationStatus {
  PENDING,
  ACCEPTED,
  DENIED,
}

/**
 * Reservation data fields.
 */
export interface Reservation {
  client?: Types.ObjectId;
  anonymousClient?: AnonymousClient;
  description?: string;
  venue: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
}

const anonymousClientSchema = new Schema<AnonymousClient>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  cellphone: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  group: {
    type: String,
    maxlength: 100,
  },
});

const reservationSchema = new Schema<Reservation>({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  anonymousClient: anonymousClientSchema,
  description: {
    type: String,
    maxlength: 500,
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Venue',
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator(this: Reservation, v: Date) {
        return v > this.startTime;
      },
      message: 'endTime has to be after startTime',
    },
  },
  status: {
    type: Number,
    enum: ReservationStatus,
    required: true,
    default: ReservationStatus.PENDING,
  },
});

export default (models.Reservation as Model<Reservation>)
  || model<Reservation>('Reservation', reservationSchema);
