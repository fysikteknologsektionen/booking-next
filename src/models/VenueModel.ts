import type {
  AccessibleFieldsDocument,
  AccessibleModel,
} from '@casl/mongoose';
import {
  accessibleRecordsPlugin,
  accessibleFieldsPlugin,
} from '@casl/mongoose';
import type { Types } from 'mongoose';
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

type VenueDocument = Venue & AccessibleFieldsDocument;
type VenueModel = AccessibleModel<VenueDocument>;

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
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Plugins
venueSchema.plugin(accessibleRecordsPlugin);
venueSchema.plugin(accessibleFieldsPlugin);

export default (models.Venue as VenueModel)
  || model<VenueDocument, VenueModel>('Venue', venueSchema);
