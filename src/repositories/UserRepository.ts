import type { User } from 'src/models/UserModel';
import UserModel from 'src/models/UserModel';
import BaseRepository from './BaseRepository';

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel, ['role']);
  }
}
