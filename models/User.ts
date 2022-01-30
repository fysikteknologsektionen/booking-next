import {
  Model,
  model,
  models,
  Schema,
} from 'mongoose';
import type { UserDocument } from 'types';

const userSchema = new Schema<UserDocument>({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: String,
  isAdmin: { type: Boolean, required: true, default: false },
});

const UserModel = (models.User as Model<UserDocument>) || model('User', userSchema);

export default UserModel;
