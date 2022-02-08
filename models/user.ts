import {
  Model,
  model,
  models,
  Schema,
} from 'mongoose';

type UserRole = 'user' | 'manager' | 'admin';
interface User {
  googleId: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}
export interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: String,
  role: {
    type: String,
    enum: ['user', 'manager', 'admin'],
    required: true,
    default: 'user',
  },
});

const UserModel = (models.User as Model<UserDocument>) || model('User', userSchema);

export default UserModel;
