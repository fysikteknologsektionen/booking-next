import {
  Model,
  model,
  models,
  Schema,
} from 'mongoose';
import type { Timeslot, VenueDocument } from 'types';

const timeslotSchema = new Schema<Timeslot>({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  weekdaysIndex: [Number],
});

const venueSchema = new Schema<VenueDocument>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 500,
  },
  managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  timeslots: [timeslotSchema],
});

const VenueModel = (models.Venue as Model<VenueDocument>) || model('Venue', venueSchema);

export default VenueModel;
