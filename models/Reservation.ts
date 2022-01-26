import { model, models, Schema } from 'mongoose';

const reservationSchema = new Schema({
  clientName: {
    /** Name of the person who placed the reservation */
    type: String,
    required: true,
  },
  clientEmail: {
    /** Email of the person who placed the reservation */
    type: String,
    required: true,
  },
  clientPhoneNumber: {
    /** Phone number of the person who placed the reservation */
    type: String,
    required: true,
  },
  clientGroup: {
    /** Eventual group of the person who placed the reservation */
    String,
  },
  description: {
    /** A description of the reservation */
    type: String,
    required: true,
  },
  venue: {
    /** The venue the reservation refers to */
    type: Schema.Types.ObjectId,
    ref: 'Venue',
    required: true,
  },
  startTime: {
    /** Start time and date of the reservation */
    type: Date,
    required: true,
  },
  endTime: {
    /** End time and date of the reservation */
    type: Date,
    required: true,
  },
  status: {
    /** Status of the reservation */
    type: String,
    enum: ['accepted', 'pending', 'declined'],
    required: true,
  },
  comment: {
    /** Optional comment left by the person who placed the reservation */
    type: String,
  },
  timestamp: {
    /** Timestamp that the reservation was created at */
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default models.User || model('Reservation', reservationSchema);
