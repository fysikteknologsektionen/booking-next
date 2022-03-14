import type {
  Document, Model, PopulatedDoc, Types,
} from 'mongoose';
import { model, models, Schema } from 'mongoose';
import type { UserDocument } from './UserModel';

/**
 * Venue data fields.
 */
export interface Venue {
  name: string;
  description?: string;
  managers: PopulatedDoc<UserDocument, Types.ObjectId>[];
  enabled: boolean;
}

/**
 * User document including instance methods.
 */
export interface VenueDocument extends Venue, Document {}

/**
 * Venue model including static methods.
 */
interface VenueModel extends Model<VenueDocument> {}

const venueSchema = new Schema<VenueDocument>({
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
  managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default (models.Venue as VenueModel)
  || model<VenueDocument, VenueModel>('Venue', venueSchema);
