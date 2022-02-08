import {
  Model,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';
import { UserDocument } from './user';

interface Venue {
  name: string;
  description?: string;
  managers: Types.DocumentArray<UserDocument>;
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
    minlength: 1,
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
