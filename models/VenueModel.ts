import type {
  Document, Model, PopulatedDoc, Types,
} from 'mongoose';
import { model, models, Schema } from 'mongoose';
import type { UserDocument } from './UserModel';

export interface Venue {
  name: string;
  description?: string;
  managers: PopulatedDoc<UserDocument, Types.ObjectId>[];
  enabled: boolean;
}

export interface VenueDocument extends Venue, Document {}

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

const VenueModel = (models.Venue as Model<VenueDocument>) || model('Venue', venueSchema);

export default VenueModel;
