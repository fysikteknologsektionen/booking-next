import type { Ability } from '@casl/ability';
import { ForbiddenError } from '@casl/ability';
import dbConnect from 'src/lib/dbConnect';
import type { User } from 'src/models/UserModel';
import UserModel, { UserRole } from 'src/models/UserModel';

/**
 * Lists all users.
 * @param ability Requesting user ability.
 * @returns Array of users.
 */
export async function listUsers(ability: Ability) {
  ForbiddenError.from(ability).throwUnlessCan('read', 'User');
  await dbConnect();
  return UserModel.find().lean().exec();
}

/**
 * Gets a user by their id.
 * @param ability Requesting user ability.
 * @param id The target user's id.
 * @returns User.
 */
export async function getUserById(ability: Ability, id: string) {
  ForbiddenError.from(ability).throwUnlessCan('read', 'User');
  await dbConnect();
  return UserModel.findById(id).orFail().lean().exec();
}

/**
 * Gets a user's role by id.
 * !!! UNPROTECTED: SHOULD NOT BE EXPOSED BY API !!!
 * @param id The target user's id.
 * @returns User's role.
 */
export async function getUserRoleById(id: string) {
  await dbConnect();
  const user = await UserModel.findById(id)
    .select('role')
    .orFail()
    .lean()
    .exec();
  return user.role;
}

/**
 * Lists all users belonging to the manager or admin role.
 * @param ability Requesting user ability.
 * @returns Array of users.
 */
export async function listManagers(ability: Ability) {
  ForbiddenError.from(ability).throwUnlessCan('read', 'User');
  await dbConnect();
  return UserModel.find()
    .where('role')
    .in([UserRole.MANAGER, UserRole.ADMIN])
    .lean()
    .exec();
}

/**
 * Finds a user by their ID and updates their role.
 * @param ability The requesting user's ability.
 * @param id The target user's ID.
 * @param role The target user's new role.
 * @returns Updated user.
 */
export async function updateUserRole(
  ability: Ability,
  id: string,
  role: UserRole,
) {
  ForbiddenError.from(ability).throwUnlessCan('update', 'User');
  await dbConnect();
  return UserModel.findByIdAndUpdate(id, { role }, { new: true })
    .orFail()
    .lean()
    .exec();
}

/**
 * Finds a user by their google ID and upserts them.
 * !!! UNPROTECTED: SHOULD NOT BE EXPOSED BY API !!!
 * @param googleId The user's google ID.
 * @param data The new user data.
 * @returns Upserted user.
 */
export async function upsertUserByGoogleId(
  googleId: string,
  data: Partial<User>,
) {
  await dbConnect();
  return UserModel.findOneAndUpdate({ googleId }, data, {
    upsert: true,
    new: true,
  })
    .setOptions({ sanitizeFilter: true })
    .orFail()
    .lean()
    .exec();
}

/**
 * Find a user by their ID and deletes them.
 * @ability Requesting user's ability.
 * @param id The target user's ID.
 * @returns Deleted user.
 */
export async function deleteUser(ability: Ability, id: string) {
  ForbiddenError.from(ability).throwUnlessCan('delete', 'User');
  await dbConnect();
  return UserModel.findByIdAndDelete(id).orFail().lean().exec();
}
