import type { UserDocument } from 'models/UserModel';
import UserModel from 'models/UserModel';
import AbstractController from './AbstractController';

export default class UserController extends AbstractController<UserDocument> {
  constructor() {
    super(UserModel, ['role']);
  }
}
