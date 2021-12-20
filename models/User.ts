import { model, models, Schema } from 'mongoose';
import type { User } from '../types';

const userSchema = new Schema<User>({
  googleId: {
    /** Google profile ID, managed by Google */
    type: String,
    required: true,
    unique: true,
  },
  name: {
    /** User's name, managed by Google */
    type: String,
    required: true,
  },
  email: {
    /** User's email, managed by Google */
    type: String,
    required: true,
    unique: true,
  },
  image:
    /** Link to user's image, managed by Google */
    String,
  manages:
    /** Array of venues that the user is a manager of */
    [{ type: Schema.Types.ObjectId, ref: 'Venue' }],
});

export default models.User || model('User', userSchema);
