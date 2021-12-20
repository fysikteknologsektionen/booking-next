import { model, models, Schema } from 'mongoose';
import type { Venue } from '../types';

const venueSchema = new Schema<Venue>({
  name: {
    /** Venue name */
    type: String,
    required: true,
  },
  description:
    /** Venue description */
    String,
  manager: {
    /** Venue manager */
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  enabled: {
    /** Whether the venue is enabled and should be listed */
    type: Boolean,
    required: true,
    default: false,
  },
});

export default models.Venue || model('Venue', venueSchema);
