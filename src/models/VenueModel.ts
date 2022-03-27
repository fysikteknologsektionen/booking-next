import type { Model, Types } from 'mongoose';
import { model, models, Schema } from 'mongoose';

/**
 * Venue data fields.
 */
export interface Venue {
  name: string;
  description?: string;
  managers: Types.ObjectId[];
  enabled: boolean;
}

const venueSchema = new Schema<Venue>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default (models.Venue as Model<Venue>)
  || model<Venue>('Venue', venueSchema);
