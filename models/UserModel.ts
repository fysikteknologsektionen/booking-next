import type { Document, Model, Query } from 'mongoose';
import { Schema, model, models } from 'mongoose';

type UserRole = 'user' | 'manager' | 'admin';

/**
 * User data fields.
 */
export interface User {
  googleId: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

/**
 * User document including instance methods.
 */
export interface UserDocument extends User, Document {}

/**
 * User query helper functions.
 */
interface UserQueryHelpers {
  byRole(role: UserRole): Query<any, UserDocument> & UserQueryHelpers;
}

/**
 * User model including static methods.
 */
interface UserModel extends Model<UserDocument, UserQueryHelpers> {}

const userSchema = new Schema<UserDocument, UserModel>({
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

/**
 * Query users by role.
 * @returns Query chain
 */
// eslint-disable-next-line @typescript-eslint/space-before-function-paren, func-names
userSchema.query.byRole = function (
  role: UserRole,
): Query<any, UserDocument> & UserQueryHelpers {
  return this.find({ role });
};

export default (models.User as UserModel)
  || model<UserDocument, UserModel>('User', userSchema);
