import {
  Model, model, models, Schema,
} from 'mongoose';
import { Timeslot, Venue } from '../types';

const timeslotSchema = new Schema<Timeslot>({
  startTime: {
    /** Start time of the timeslot */
    type: Date,
    required: true,
  },
  endTime: {
    /** End time of the timeslot */
    type: Date,
    required: true,
  },
  weekdays:
    /** Array of weekday indicies that timeslot should exist for (0 is Monday, 6 is Sunday) */
    [Number],
});

const venueSchema = new Schema<Venue>({
  name: {
    /** Venue name */
    type: String,
    required: true,
  },
  description:
    /** Venue description */
    String,
  managers:
    /** Venue managers */
    [{ type: Schema.Types.ObjectId, ref: 'User' }],
  enabled: {
    /** Whether the venue is enabled and should be listed */
    type: Boolean,
    required: true,
    default: false,
  },
  timeslots: [timeslotSchema],
});

export default (models.Venue as Model<Venue>) || model('Venue', venueSchema);
