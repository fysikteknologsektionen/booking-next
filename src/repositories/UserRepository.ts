import type { User } from 'src/models/UserModel';
import UserModel from 'src/models/UserModel';
import AbstractRespository from './AbstractRepository';

export default class UserRepository extends AbstractRespository<User> {
  constructor() {
    super(UserModel, ['role']);
  }
}
