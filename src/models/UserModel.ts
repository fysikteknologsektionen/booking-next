import type { Model } from 'mongoose';
import { Schema, model, models } from 'mongoose';

export enum UserRole {
  USER,
  MANAGER,
  ADMIN,
}

/**
 * User data fields.
 */
export interface User {
  googleId: string;
  name?: string;
  email?: string;
  image?: string;
  role: UserRole;
}

const userSchema = new Schema<User>({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  image: String,
  role: {
    type: Number,
    enum: UserRole,
    required: true,
    default: UserRole.USER,
  },
});

export default (models.User as Model<User>) || model<User>('User', userSchema);
